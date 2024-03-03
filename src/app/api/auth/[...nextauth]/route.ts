import { authOptions } from "@/lib/auth";
import { NextApiHandler } from "next";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
