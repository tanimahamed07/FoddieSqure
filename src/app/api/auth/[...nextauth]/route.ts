import authOptions from "@/lib/authOptions";
import NextAuth from "next-auth";

// NextAuth handler for authentication
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
