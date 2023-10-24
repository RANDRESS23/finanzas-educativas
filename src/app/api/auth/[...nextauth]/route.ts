import { verifyPassword } from "@/libs/bcrypt";
import { db } from "@/libs/prismaDB";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type User } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        document: {
          label: "Document",
          type: "text",
          placeholder: "Put your document",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Put your password",
        },
      },
      async authorize(credentials, _) {
        if (credentials?.document === null || credentials?.password === null) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { document: credentials?.document },
        });

        if (existingUser === null) return null;

        const passwordMatch = await verifyPassword(
          credentials?.password ?? "",
          existingUser.hashedPassword,
        );

        if (!passwordMatch) return null;

        return {
          id: `${existingUser.id}`,
          documentType: existingUser.documentType,
          document: existingUser.document,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          phoneNumber: existingUser.phoneNumber,
          email: existingUser.email,
          createdAt: existingUser.createdAt,
          updatedAt: existingUser.updatedAt,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user !== undefined) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
