"use client";
import {Button} from "@/components/ui/button"
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full bg-black flex items-center justify-center h-full">
      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="text-white text-center text-2xl">🔒 AuthFast</h1>
        <p className="text-neutral-500 text-center text-lg">
          Implement authentication and authorisation at wrap speed.
        </p>
        <div className="flex flex-row gap-2">
          <Button className="bg-white text-black hover:text-white" onClick={() => router.push("/auth/signup")}>
            Sign Up
          </Button>
          <Button className="bg-white hover:text-white text-black" onClick={() => router.push("/auth/signin")}>
            Sign In
          </Button>
          </div>
      </div>
    </div>
  );
}
