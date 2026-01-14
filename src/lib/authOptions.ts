import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { mongoConnect } from "./mongoConnect";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { db } = await mongoConnect();
        const user = await db.collection("user").findOne({
          email: credentials.email,
        });

        if (!user || !user.password) {
          throw new Error("No account found with this email. Please log in with Google.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { db } = await mongoConnect();
        const userCollection = db.collection("user");

        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await userCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            phone: "Not Provided",
            provider: "google",
            createdAt: new Date(),
          });
          // New User Role
          user.role = "user";
        } else {
          // Existing User Role from DB
          user.role = existingUser.role || "user";
          user.phone = existingUser.phone || "Not Provided";

          await userCollection.updateOne(
            { email: user.email },
            { $set: { image: user.image } }
          );
        }
      }
      return true;
    },

    async jwt({ token, user, trigger }) {
      // ১. লগইন করার সময় টোকেনে ডেটা রাখা
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }

      // ২. ডাটাবেস থেকে লেটেস্ট রোল আপডেট (অটোমেটিক আপডেট লজিক)
      // যদি ইউজার ইতিমধ্যে লগইন থাকে, তবে প্রতিবার টোকেন ভ্যালিডেশনের সময় ডিবি চেক করবে
      if (!user && token?.email) {
        const { db } = await mongoConnect();
        const dbUser = await db.collection("user").findOne({ email: token.email });
        if (dbUser) {
          token.role = dbUser.role; // DB থেকে লেটেস্ট রোল সিঙ্ক হবে
          token.phone = dbUser.phone;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // টোকেন থেকে সেশনে ডেটা পাস করা
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;