"use server";
import axios from "axios";
import { cookies } from 'next/headers'; // Import cookies utility
import { getBackendURL } from '../../lib/utils'; // Assuming you have a utils file with getBackendURL function

const baseUrl = getBackendURL(); // e.g., http://192.168.1.30:3001

interface RegisterUserProps {
  name: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  name: string; // This could be 'username' or 'email' based on your backend
  password: string;
}


export async function registerUserService(userData: RegisterUserProps) {
  const url = `${baseUrl}/auth/register`;

  try {
    const response = await axios.post(url, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log('Backend Response:', response); // Log the full response for debugging

    // Assuming the backend responds with tokens
    if (response.data && response.data.token) {
      const access_token = response.data.token.access_token;
      const refresh_token = response.data.token.refresh_token;

      // Store the tokens in HTTP-only cookies using the cookies() API
      const cookieStore = await cookies();
      cookieStore.set('access_token', access_token, { httpOnly: true, path: '/' });
      cookieStore.set('refresh_token', refresh_token, { httpOnly: true, path: '/' });

      // Optionally, set the Authorization header for future requests
      axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;

      return {
        access_token,
        refresh_token,
        message: "Registration successful",
      };
    } else {
      throw new Error("Unexpected response structure from the backend");
    }

  } catch (error: any) {
    // Error handling (same as before)
    if (error.response) {
      const errorMessage = error.response.data.message;
  
      if (errorMessage === "the username already exists! Please use another username") {
        console.error("Registration Error: Username already exists");
        return {
          zodmessage: "Registration failed. Username already exists.",
          zodErrorsname: ["Username already exists. Please choose another one."],
        };
      }  if (errorMessage === "the email already registered! Please use another email") {
        console.error("Registration Error: Email already in use");
        return {
          zodmessage: "Registration failed. Email is already registered.",
          zodErrorsemail: ["Email is already registered. Please use a different one."],
        };
      }  else {
        console.error("Registration Error:", errorMessage);
        return {
          message: errorMessage || "Registration failed.",
          zodErrors:{ 
            name: [null],
            email: [null],
            password: [errorMessage || "Registration failed."],}
        };
      }
    } else if (error.request) {
      console.error("Registration Error2: No response received from server");
      return {
        message: "No response from the server. Please try again later.",
        zodErrors: ["No response from the server. Please try again later."],
      };
    } else {
      console.error("Registration Error3:", error.message);
      return {
        message: error.message,
        zodErrors:[error.message]
      };
    }
  }
}
export async function loginUserService(userData: LoginUserProps) {
  const url = `${baseUrl}/auth/login`;

  try {
    const response = await axios.post(url, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.token) {
      const access_token = response.data.token.access_token;
      const refresh_token = response.data.token.refresh_token;

      // Store the tokens in HTTP-only cookies using the cookies() API
      const cookieStore = await cookies();
      cookieStore.set('access_token', access_token, { httpOnly: true, path: '/' });
      cookieStore.set('refresh_token', refresh_token, { httpOnly: true, path: '/' });

      // Optionally, set the Authorization header for future requests
      axios.defaults.headers["Authorization"] = `Bearer ${access_token}`;

      return {
        access_token,
        refresh_token,
        message: "Login successful",
        zodErrors: [], // Empty array for no validation errors
      };
    } else {
      throw new Error("No access_token in the response");
    }
  } catch (error: any) {
    if (error) {
      const errorMessage = error.response.data.message;

      if (errorMessage === `Username ${userData.name} does not exist.`) {
        console.error("Login Error: Username does not exist");
        return {
          zodmessage: `Login failed. Username ${userData.name} does not exist.`,
          zodErrors: {
            name: [`Username ${userData.name} does not exist. Please try again.`],
            password: null},
          };
      } else if (errorMessage === "incorrect password!") {
        console.error("Login Error: Incorrect password");
        return {
          zodmessage: "Login failed. Incorrect password.",
          zodErrors: {
            name: null,
            password: ["Incorrect password. Please try again."]},
        };
      } else {
        console.error("Login Error:", errorMessage);
        return {
          message: errorMessage || "Login failed.",
    
        };
      }
    } else if (error.request) {
      console.error("Login Error: No response received from server");
      return {
        message: "No response from the server. Please try again later.",
        zodErrors: ["No response from the server. Please try again later."],
      };
    } else {
      console.error("Login Service Error:", error.message);
      return {
        message: error.message,
        zodErrors: [error.message],
      };
    }
  }
}


//  src>app>data>service>auth-service.ts
//         app>data>actions>auth-action.ts
//      app>lib>utils.ts
//     app>components>form>SigninForm.tsx

//   }