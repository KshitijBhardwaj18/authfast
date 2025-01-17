"use server"
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
``  
    console.log(user);

    return user;
  } catch  {

    return null;
  }
};


export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
``  
    console.log(user);

    return user;
  } catch  {

    return null;
  }
};

export const getVerifiactionTokenByEmail = async (email: string) => {
    try{
      const verifiactionToken = await db.verifiactionToken.findFirst(
        {
          where: {
           email
          }
        }
      )

      return verifiactionToken;
    }catch {
      return null;
    }
}

export const getVerifiactionTokenByToken = async (token: string) => {
  try{
    const verifiactionToken = await db.verifiactionToken.findUnique(
      {
        where: {
         token
        }
      }
    )

    return verifiactionToken;
  }catch {
    return null;
  }
}

export const getPasswordVerificationToken = async (token : string) => {
  try{
    const verifiactionToken = db.resetPasswordToken.findUnique({
      where: {
        token: token
      }
    })

    return verifiactionToken;
  }catch(error){
    console.log(error);
    return null;
  }
  
}