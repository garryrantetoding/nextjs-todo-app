import axiosInstance from './axios-instance';  // Import the axios instance
import { getRefreshTokenFromCookies } from './get-token';  // Import the function to get refresh token from cookies
import { cookies } from 'next/headers';  // Import cookies for setting the new access token
import { getBackendURL } from '../../lib/utils'; // Assuming you have a utils file with getBackendURL function
import axios from 'axios';
const baseUrl = getBackendURL();  // Assuming you're using this for the backend URL (can be passed via axiosInstance as well, but this is for context)

// // Function to refresh the access token using the refresh token
// export async function refreshAccessToken() {
//   const url = `${baseUrl}/auth/refresh`;  // The URL for refreshing the token
//   const refreshToken = await getRefreshTokenFromCookies();  // Retrieve the refresh token from cookies

//   console.log("Sending refresh token", refreshToken);  // Optional: Logging the refresh token

//   try {
//     // Use axiosInstance to make the POST request for refreshing the access token
//     const response = await axios.post(url, {
//       refresh_token: refreshToken,  // Send the refresh token to backend
//     }, {
//       withCredentials: true,  // Ensure that cookies are sent with the request
//     });


//     console.log("Response received from backend:", response);  // Optional: Debugging the response

//     if (response.data.access_token) {
//       console.log("New access token received:", response.data.access_token);  // Optional: Log the new access token

//     const cookieStore = await cookies();  // Access the cookie store to update the tokens

//     // Set the new access and refresh tokens in the cookies
//     cookieStore.set('access_token', response.data.access_token, {
//       httpOnly: true,  // To prevent client-side access to the token
//       path: '/',  // Cookie is available throughout the app
//     });

//     cookieStore.set('refresh_token', response.data.refresh_token, {
//       httpOnly: true,
//       path: '/',
//     });

//     console.log("wjdshfd:", response.data);  // Optional: Log the new access token

//       return response.data;  // Return the new access token data

//     }

//     return null;  // Return null if no access token is found in the response
//   } catch (error) {
//     console.error('Error refreshing access token:', error);  // Log errors
//     return null;  // Return null if the request fails
//   }
// }

// refreshAccessToken() in refresh-service.ts
export async function refreshAccessToken() {
  const url = `${baseUrl}/auth/refresh`;  // The URL for refreshing the token
  const refreshToken = await getRefreshTokenFromCookies();  // Retrieve the refresh token from cookies

  console.log("Sending refresh token", refreshToken);  // Debugging refresh token
  console.log("Attempting to refresh access token...");
  if (!refreshToken) {
    // Clear cookies or reset state if needed
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    window.location.reload();
  }
  try {
    // Send request to refresh the access token
    const response = await axios.post(url, { refresh_token: refreshToken }, {
      withCredentials: true,  // Include cookies in the request
    });

    console.log("Response received from backend:", response);  // Debugging response

    if (response.data.access_token) {
      console.log("New access token received:", response.data.access_token);  // Debugging new token

      // Set the new tokens in cookies
      const cookieStore = await cookies();  // Update the cookies with the new tokens
      cookieStore.set('access_token', response.data.access_token, {
        httpOnly: true,
        path: '/',
      });

      cookieStore.set('refresh_token', response.data.refresh_token, {
        httpOnly: true,
        path: '/',
      });
      console.log("Refreshed access token:", response.data);

      return response.data;  // Return the new tokens
    } 
    if (response.data.statuscode === 401){
      return {errormessage:"expired"}

  }
  
  } catch (error:any) {
    console.error("Error refreshing access token:", error);
    // If refresh token is expired, log the user out and redirect to login page
    if (error.response && error.response.status === 401) {
      // Redirect the user to the login page
      //window.location.href = '/login'; // Adjust this based on your app's routing

      // Clear cookies or reset state if needed
      const cookieStore = await cookies();
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
      // window.location.reload();
      console.log("Refresh token expired. Redirecting to login...");
    }

    // throw error;  // Return null if refresh fails

        // Reject the promise if refresh fails to notify calling functions
        return Promise.reject(error);  // Reject the error properly
  }
}



    // // Delete the cookies for access_token and refresh_token
    // cookieStore.set('access_token', '', { path: '/', expires: new Date(0) });
    // cookieStore.set('refresh_token', '', { path: '/', expires: new Date(0) });

// Function to logout from the backend using the refresh token
export async function LogoutBackend() {
  
  const url = `${baseUrl}/auth/logout`;  // The URL for logging out
  const refreshToken = await getRefreshTokenFromCookies();  // Retrieve the refresh token from cookies

  console.log("Sending refresh token for logout", refreshToken);  // Optional: Logging the refresh token

  try {
    // Send the refresh token to the backend for logout
    const response = await axiosInstance.post(url, {
      refresh_token: refreshToken,  // Send the refresh token for logout
    }, {
      withCredentials: true,  // Ensure cookies are sent with the request
    });

    console.log("Logout response from backend:", response);  // Optional: Debugging the response

    if (response.data.message === "Logged out successfully") {

      return response.data.message;  // Return success message on successful logout
    }

    return null;  // Return null if the logout was unsuccessful
  } catch (error) {
    console.error('Logout failed:', error);  // Log errors
    return null;  // Return null if the request fails
  }
}




// import axios from 'axios';
// import { cookies } from 'next/headers';  // Import from 'next/headers'
// import { getBackendURL } from '../../lib/utils';
// import { getRefreshTokenFromCookies } from './get-token';
// const baseUrl = getBackendURL();

// export async function refreshAccessToken() {
//     const url = `${baseUrl}/auth/refresh`;
//       const refreshToken = await getRefreshTokenFromCookies();
    
  
//     console.log("Sending refresh token", refreshToken);
  
//     try {
//       // Send the request to refresh the access token using Axios
//       const response = await axios.post(url, {
//         refresh_token: refreshToken,
//       }, {
//         withCredentials: true,  // This ensures that cookies are sent with the request
//       });
  
//       const cookieStore = await cookies(); // Assuming cookies() is a function that gives access to the cookie store
//       cookieStore.set('access_token', response.data.access_token, {
//         httpOnly: true,
//         path: '/',
//       });
  
//       cookieStore.set('refresh_token', response.data.refresh_token, {
//         httpOnly: true,
//         path: '/',
//       });
  
//       console.log("Response received from backend:", response);
  
//       if (response.data.access_token) {
//         console.log("testreturn", response)

//         return response.data; // Return the new access token
//       }
  
//       return null; // Return null if no access token is found
//     } catch (error) {
//       console.error('Error refreshing access token:', error);
//       return null; // Return null if the request fails
//     }
//   };
  
  
  
//   export async function LogoutBackend() {
//     const url = `${baseUrl}/auth/logout`;
//     const refreshToken = await getRefreshTokenFromCookies();

  
  
//     console.log("qesdiss", refreshToken);
  
//     try {
//       // Send the request to refresh the access token using Axios
//       const response = await axios.post(url, {
//         refresh_token: refreshToken,
//       }, {
//         withCredentials: true,  // This ensures that cookies are sent with the request
//       });
//   console.log("deidiqa",response)
//       if (response.data.message === "Logged out successfully") {
//         return response.data.message; // Return the new access token
//       }
  
//       return null; // Return null if no access token is found
//     } catch (error) {
//       console.error('logout failed', error);
//       return null; // Return null if the request fails
//     }
//   };