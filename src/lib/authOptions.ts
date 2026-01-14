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
          const result = await userCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
            phone: "Not Provided",
            provider: "google",
            createdAt: new Date(),
          });
          user.role = "user";
          user.phone = "Not Provided";
        } else {
          // যদি আগে থেকেই Credentials দিয়ে একাউন্ট করা থাকে, তবে তাকে ঐ একাউন্টেই লগইন করতে দাও
          user.role = existingUser.role || "user";
          user.phone = existingUser.phone || "Not Provided";
          
          // ঐচ্ছিক: চাইলে ইউজারের গুগল ইমেজ দিয়ে ডাটাবেস আপডেট করতে পারেন
          await userCollection.updateOne(
            { email: user.email },
            { $set: { image: user.image } }
          );
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      // লগইনের সময় ডাটা টোকেনে পাস করা
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }
      return token;
    },

    async session({ session, token }) {
      // টোকেন থেকে ডাটা সেশনে পাস করা যাতে useSession() এ পাওয়া যায়
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