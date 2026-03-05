"use client";

import Link from "next/link";
import { registerUserAction } from "../../data/actions/auth-actions";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import { SubmitButton } from "../custom/auth-custom/submit-button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "../custom/auth-custom/zod-errors";
import PasswordStrengthField from "../custom/auth-custom/password-strength";
import { Eye, EyeOff } from "lucide-react";

const INITIAL_STATE = {
  data: null,
  zodErrors: null,
  message: null,
  isSubmitted: false,  // Track if the form has been submitted
};

export function SigninForm() {
  const [formState, formAction] = React.useActionState(registerUserAction, INITIAL_STATE);
  const router = useRouter();  // We use useRouter to handle redirection
  const [password, setPassword] = useState(""); // State to manage password input
  const [isVisible, setIsVisible] = useState(false);
  // const [backendError, setBackendError] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);

  React.useEffect(() => {
    if (formState?.isSubmitted) {
      // Check if registration was successful
      if (formState?.message === "Registration successful!") {
        // console.log("test")
        const { access_token, refresh_token } = formState?.data || {};

        if (access_token && refresh_token) {
          // Store tokens in cookies instead of localStorage
          Cookies.set("access_token", access_token, { expires: 7, secure: true });  // Expires in 7 days
          Cookies.set("refresh_token", refresh_token, { expires: 7, secure: true });

          // Set Authorization header for future requests
          axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;

          // Redirect to dashboard
          router.push("/dashboard");
        }
      // } else if (formState?.zodmessage === "Registration failed. Username already exists."){ 
      //   setBackendError("Registration failed. Username already exists.")
      // }
      // else if (formState?.zodmessage === "Registration failed. Email is already registered.") {
      //   setBackendError("Registration failed. Email is already registered.")
      // } else if (formState?.message === "password is weak") {
      //   setBackendError("password is weak")
      // }
      //   else {
      //   // Handle error message
      //   console.error("Error during registration:", formState?.message);
      }
    }
  }, [formState, router]);  // Dependency on formState to react to state changes

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="name"
              />
              <div className="min-h-[1rem]">
                <ZodErrors error={formState?.zodErrors?.name} />
                {/* <ZodErrors error={formState?.zodErrors?.username}>
  {(() => {
    // Check if there's a Zod error for email
    if (formState?.zodErrors?.username) {
      return (
        <div>
          <p>{formState?.zodErrors?.username}</p>
        </div>
      );
    }

    // If there are backend errors, display them as well
    if (formState?.zodmessage === "Registration failed. Username already exists.") {
      return (
        <div>
          <p>{formState?.zodmessage}</p>
        </div>
      );
    }
  })()}
</ZodErrors> */}

              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <div className="min-h-[1rem]">
                <ZodErrors error={formState?.zodErrors?.email} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isVisible ? "text" : "password"}
                  required
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center justify-center z-20 px-2 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  aria-pressed={isVisible}
                  aria-controls="password"
                >
                  {isVisible ? (
                    <EyeOff size={20} aria-hidden="true" />
                  ) : (
                    <Eye size={20} aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="min-h-[1rem]">
                <ZodErrors error={formState?.zodErrors?.password} />
              </div>
            </div>
            {/* Password Strength Meter */}
            <PasswordStrengthField password={password} setPassword={setPassword} />
          </CardContent>
          <CardFooter className="flex flex-col">
          <SubmitButton className="w-full" text="Sign Up" loadingText="Loading" />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="login">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}
