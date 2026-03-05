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
//   // // Function to refresh the access token
//   // export async function refreshAccessToken(): Promise<string | null> {
//   //   try {
//   //     const response = await axios.post('/auth/refresh', {}, { withCredentials: true });
//   //     const { accessToken } = response.data;
//   //     document.cookie = `access_token=${accessToken}; Path=/; Secure; HttpOnly`; // Save the token in cookies
//   //     return accessToken;
//   //   } catch (error) {
//   //     console.error('Error refreshing access token:', error);
//   //     return null;
//   //   }
//   // }
  
//   // // Function to check if the token is expired
//   // export function checkIfTokenExpired(token: string): boolean {
//   //   const payload = JSON.parse(atob(token.split('.')[1]));
//   //   const expiration = payload.exp * 1000; // Expiration time is in seconds, so multiply by 1000 to get milliseconds
//   //   return expiration < Date.now();
//   // }
  