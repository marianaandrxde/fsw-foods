import { db } from "@/app/_lib/prisma";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import {PrismaAdapter} from "@auth/prisma-adapter"
import { authOptions } from "@/app/_lib/auth";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }