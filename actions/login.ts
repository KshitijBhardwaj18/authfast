"use server"

import * as z from "zod";
import { LoginSchema } from "@/zod/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationToken } from "@/lib/mail";


export const Login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success){
        return {error : "Invalid Fields"}
    }

    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if( !existingUser || !existingUser.email || !existingUser.password){
        return {error : "Invalid Credentials"}
    }

    if(!existingUser.emailVerified){
        const verficationToken = await generateVerificationToken(email);
        await sendVerificationToken(
            verficationToken.email,
            verficationToken.token
        )
        return {success: "Confirmation email sent"}
    }

   
    try{
        await signIn("credentials", {email,password, redirectTo: DEFAULT_LOGIN_REDIRECT} )
    }catch (error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error : "Invalid Credentials"}
                default:
                    return {error: "Something went wrong"}
            }
        }
        throw error;
    }

   

}