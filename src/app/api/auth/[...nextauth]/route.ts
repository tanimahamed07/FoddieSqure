// ❌ ভুল ইমপোর্ট (Error দেয়)
// import authOptions from "@/lib/authOptions" 

// ✅ সঠিক ইমপোর্ট (Named Import)

import authOptions from "@/lib/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };