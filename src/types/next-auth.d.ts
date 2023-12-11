import NextAuth from "next-auth"; // eslint-disable-line
import type { User as UserModel } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    id?: string;
    is2FAVerified: boolean;
    user: {
      /** The user's DB ID. */
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends Omit<Omit<UserModel, "role">, "disabled"> {
    hashedPassword?: string;
  }
}
