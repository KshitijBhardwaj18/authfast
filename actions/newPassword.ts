"use server";

import { getPasswordVerificationToken } from "@/data/user";
import { db } from "@/lib/db";
import { newPasswordSchema } from "@/zod/schema";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const NewPasswordTokenVerification = async (token: string) => {
  const existingToken = await getPasswordVerificationToken(token);

  if (!existingToken) {
    return { error: "Invalid link" };
  }

  const expired = existingToken.expires < new Date();

  if (expired) {
    return { error: "Token has expired" };
  }

  return { success: true };
};

export const UpdatePassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string
) => {
  const validatedFields = newPasswordSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid Fields" };
  }

  const { password } = values;

  console.log({"password" : password});

  const hashedPassword = await bcrypt.hash(password, 10);

  const Token = await getPasswordVerificationToken(token);
  console.log(Token);
  if (!Token) {
    return { error: "Server Error" };
  }
  const { email } = Token;

  const tokenDeleted = await db.resetPasswordToken.delete({
    where: {
      id: Token.id,
    },
  });

  console.log(tokenDeleted);

  console.log(email)

  const updatedPassword = await db.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  console.log({"update" : updatedPassword})

  if (updatedPassword == null) {
    return { error: "Invalid credentials" };
  } else {
    return { success: "Password updated" };
  }
};
