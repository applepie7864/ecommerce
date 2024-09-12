import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Adapter } from 'next-auth/adapters';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(client) as Adapter,
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_SECRET_KEY as string,
        })
    ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };