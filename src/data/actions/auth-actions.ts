"use server";
import { cookies } from 'next/headers';
import { z } from "zod";
import { redirect } from "next/navigation";
import { registerUserService } from "../services/auth-service";
// import { useRouter } from 'next/router';  // Make sure you're importing useRouter
import CryptoJS from "crypto-js";
import { LogoutBackend } from '../services/refresh-service';


// const router = useRouter();

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// Registration Schema
const schemaRegister = z.object({
  name: z.string().min(3, {
    message: "Username must contain at least 3 characters", // Custom error message
  }).max(20, {
    message: "Username must be between 3 and 20 characters", // Custom error message for max length
  }),
  password: z.string()
  .refine((val) => val.length >= 6 && /[a-z]/.test(val) && /[A-Z]/.test(val) && /\d/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Password is invalid. See requirements below:",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  
});

// zodErrors: {
//   username: [null],
//   email: [null],
//   password: ["Registration failed. Password is not strong enough."],},
// message: "Registration failed. Password is not strong enough.",
// isSubmitted: true,
// };

// // Example function to encrypt the password
// const encryptPassword = (password: string) => {
//   const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();
//   return encryptedPassword;
// };

const secretKey = CryptoJS.enc.Utf8.parse("0123456789abcdef0123456789abcdef"); // 32-byte key
const iv = CryptoJS.enc.Utf8.parse("abcdef9876543210"); // 16-byte IV

function encryptPassword(password: string) {
  const encrypted = CryptoJS.AES.encrypt(password, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString(); // Returns Base64 string
}

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }
  
  
  // Encrypt the password here
  const encryptedPassword = encryptPassword(validatedFields.data.password);

  // Replace password with the encrypted password in the payload
  const registerData = {
    ...validatedFields.data,
    password: encryptedPassword,
  };


  try {
    // Call the registerUserService to make the API request for user registration
    const responseData = await registerUserService(registerData);
    // console.log("Registration Response:", responseData);
    
    if (responseData?.access_token && responseData?.refresh_token) {
      // Store tokens in cookies (fix argument type)
      const cookieStore = await cookies();
      cookieStore.set('access_token', responseData.access_token, config);
      cookieStore.set('refresh_token', responseData.refresh_token, config);

      // Redirect to dashboard after successful registration
   
      // // Use router.push() for client-side redirection
      // router.push("/dashboard");  // This is the correct client-side redirect
      
      return {
        ...prevState,
        message: "Registration successful!", 
        data: responseData,
        isSubmitted: true,
      };
    } else if (responseData?.zodmessage === "Registration failed. Username already exists."){
      return {
        ...prevState,
        zodErrors: {
          name: ["Registration failed. Username already exists."],
          email: [null],
          password: [null],
        },
        message: null,
        isSubmitted: true,
      };
    }

    else if (responseData?.zodmessage === "Registration failed. Email is already registered.") {
      return {
      ...prevState,
      zodErrors: {
        name: [null],
        email: ["Registration failed. Email is already registered."],
        password: [null],
      },
      message: null,
      isSubmitted: true,
    };}
   
    else {
      return {
        ...prevState,
        zodErrors: {
          name: [null],
          email: [null],
          password: ["Registration failed. Password is not strong enough."],},
        message: "Registration failed. Password is not strong enough.",
        isSubmitted: true,
      };
    }
  } catch (error: any) {
    console.error("Error in registerUserAction:", error);
    return {
      ...prevState,
      zodErrors: null,
      message: `An unexpected error occurred. ${error?.message || ''}`,
      isSubmitted: true,
    };
  }
}

import { loginUserService } from "../services/auth-service";
import { getRefreshTokenFromCookies } from '../services/get-token';

const schemaLogin = z.object({
  name: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

   // Encrypt the password for login
   const encryptedPassword = encryptPassword(validatedFields.data.password);
// console.log("testpassword", encryptedPassword)
  // // Replace password with the encrypted password in the payload
  // const loginData = {
  //   validatedFields.data.username
  //   password: encryptedPassword,
  // };

  try {
    const responseData = await loginUserService({
      ...validatedFields.data,
      password: encryptedPassword, // Use the encrypted password
    }
    );
    // console.log(responseData); // Log the responseData to check the response
    
    if (responseData?.access_token && responseData?.refresh_token) {
      // Store tokens in cookies (fix argument type)
      const cookieStore = await cookies();
      cookieStore.set('access_token', responseData.access_token, {
        httpOnly: true,
        path: '/',
      });
      cookieStore.set('refresh_token', responseData.refresh_token, {
        httpOnly: true,
        path: '/',
      });

      return { 
        message: "Login Successful!", 
        data: responseData 
      };
    } else if (responseData?.zodmessage === `Login failed. Username ${validatedFields.data.name} does not exist.`){
      return {
        ...prevState,
        zodErrors: {
          name: [`Name ${validatedFields.data.name} does not exist.`],
          password: null,
        },
        message: null,
      };
    } else if (responseData?.zodmessage === "Login failed. Incorrect password."){
      return {
        ...prevState,
        zodErrors: {
          name: null,
          password: ["Incorrect password."],
        },
        message: null,
      };
    } else {
      return {
        ...prevState,
        zodErrors: null,
        message: "Login failed. Invalid credentials or server error.",
      };
    }
  } catch (error: any) {
    console.error("Error in loginUserAction:", error); 
    return {
      ...prevState,
      zodErrors: null,
      message: `An unexpected error occurred. ${error?.message || ''}`,
    };
  }
}

// export async function logoutAction() {
// const refreshToken = await getRefreshTokenFromCookies();
// try {
// const deletebackendtoken =  await LogoutBackend(refreshToken); // Logout the user on the backend

// }
//   // Get the cookie store
//   const cookieStore = await cookies();

//   // Delete the cookies for access_token and refresh_token
//   cookieStore.set('access_token', '', { path: '/', expires: new Date(0) });
//   cookieStore.set('refresh_token', '', { path: '/', expires: new Date(0) });

//   // Redirect to the login page after logout
//   redirect("/login");
// }

export async function logoutAction() {
  const refreshToken = await getRefreshTokenFromCookies(); // Get the refresh token from cookies

  try {
    // Logout the user from the backend
    if (refreshToken) {
      const deleteBackendToken = await LogoutBackend(); // Call the logout API
      if (deleteBackendToken) {
        console.log("Logout successful on the backend.");

  // Get the cookie store
  const cookieStore = await cookies();

  // Delete the cookies for access_token and refresh_token
  cookieStore.set('access_token', '', { path: '/', expires: new Date(0) });
  cookieStore.set('refresh_token', '', { path: '/', expires: new Date(0) });

  // Redirect to the login page after logout
  //  redirect("/login");
      } else {
        console.error("Logout failed on the backend.");
      }
    }
  } catch (error) {
    console.error("Error logging out from backend:", error);
  }

}



export async function logoutBackendAction() {
  const refreshToken = await getRefreshTokenFromCookies(); // Get the refresh token from cookies

  if (!refreshToken) {
    console.error("No refresh token found, can't log out.");
  // Get the cookie store
  const cookieStore = await cookies();
  // Delete the cookies for access_token and refresh_token
  cookieStore.set('access_token', '', { path: '/', expires: new Date(0) });
  cookieStore.set('refresh_token', '', { path: '/', expires: new Date(0) });

  }

  try {
    // Logout the user from the backend
    const deleteBackendToken = await LogoutBackend(); // Call the logout API
    if (deleteBackendToken) {
      console.log("Logout successful on the backend. 2");

      // Get the cookie store
      const cookieStore = await cookies();

      // Delete the cookies for access_token and refresh_token
      cookieStore.set('access_token', '', { path: '/', expires: new Date(0) });
      cookieStore.set('refresh_token', '', { path: '/', expires: new Date(0) });

      // Do not redirect here, let the middleware handle the redirect
    } else {
      console.error("Logout failed on the backend.");
    }
  } catch (error) {
    console.error("Error logging out from backend:", error);
  }
}



