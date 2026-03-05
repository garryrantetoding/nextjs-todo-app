"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUserAction } from "../../data/actions/auth-actions";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "../custom/auth-custom/zod-errors";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import { SubmitButton } from "@/components/custom/auth-custom/submit-button";
import Link from 'next/link';


type FormState = {
  name: string;
  password: string;
  zodErrors: any;
  message: string | null;
};

const INITIAL_STATE: FormState = {
  name: "",
  password: "",
  zodErrors: null,
  message: null,
};

export function LoginForm() {  // <-- Make sure to specify the return type here
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<any>(null); 
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("password", formState.password);
  
    const response = await loginUserAction(formState, formData);
  
    // console.log(response);
    if (response.message === "Login Successful!") {
      const { access_token, refresh_token } = response.data;
  
      Cookies.set("access_token", access_token, { expires: 7, secure: true });
      Cookies.set("refresh_token", refresh_token, { expires: 7, secure: true });
  
      axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;
  
      router.push("/dashboard");
    } else {
      // Error occurred, update state with backend errors
      setFormState((prev) => ({
        ...prev,
        zodErrors: response.zodErrors || null,
        message: response.message || null,
      }));
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Log In</CardTitle>
            <CardDescription>Enter your details to log in to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="name"
                value={formState.name}
                onChange={handleChange}
              />
              <div className="min-h-[1rem]">
                <ZodErrors error={formState?.zodErrors?.name || []} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="password"
                  value={formState.password}
                  onChange={handleChange}
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
                  {isVisible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                </button>
              </div>
              <div className="min-h-[1rem]">
                <ZodErrors error={formState?.zodErrors?.password || []} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton className="w-full" text="Log In" loadingText="Loading" />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="signup">Sign Up</Link>
        </div>
      </form>
      <Toaster richColors toastOptions={{}} position="top-right" />
    </div>
  );
}
