"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/zod/schema";
import { Login } from "@/actions/login";
import FormSuccess from "./form-success";
import FormError from "./form-error";
import { useState } from "react";
import SocialLogin from "./socialLogin";

const SignInForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParam = useSearchParams();
  const urlError =
    searchParam.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with other provider"
      : "";
  console.log(urlError);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(values);

    try {
      const response = await Login(values);

      if (response?.error) {
        setError(response?.error);
      } else {
        setSuccess(response?.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SocialLogin />
      <div className="flex items-center justify-center my-4">
        <div className="w-full border-t border-gray-300"></div>
        <span className="px-2 text-gray-500 text-[10px]  whitespace-nowrap">
          Continue with
        </span>
        <div className="w-full border-t border-gray-300"></div>
      </div>

      <div>
        <div className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="placeholder:text-[10px]"
                        placeholder="email@xyz.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button asChild className="font-normal p-0" variant="link"> 
              <Link href="/auth/reset">
                Forgot your password
              </Link>

              </Button>
             
              <Button type="submit" className="w-full  ">
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-2">
            <FormSuccess message={success} />
            <FormError message={error || urlError} />
          </div>
        </div>
      </div>

      <div>
        <Link
          className="text-[12px] text-slate-500 font-[400] underline text-center flex items-center justify-center mt-3 "
          href="/auth/signup"
        >
          Don&apos;t have a account?
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;