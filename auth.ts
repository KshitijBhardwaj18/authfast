import GitHub from "next-auth/providers/github";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user.id) {
        return false;
      }
      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) {
        return token;
      }

      token.role = user.role;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
