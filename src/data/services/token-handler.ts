

// // // import { getAccessTokenFromCookies } from './get-token'; // Access token helper
// // // import { refreshAccessToken } from './refresh-service'; // Refresh logic

// // // let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
// // // let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls

// // // export async function ensureValidAccessToken() {
    
// // //     let accessToken = await getAccessTokenFromCookies();
    
// // //     if (!accessToken) {
// // //         console.log("No access token found.");
// // //         return null;
// // //     }

// // //     // If access token is expired, try refreshing it
// // //     const tokenExpiration = getTokenExpiration(accessToken); // Implement this to check token expiration
// // //     if (isTokenExpired(tokenExpiration)) {  // Assuming you have logic to check expiration
// // //         if (isRefreshing) {
// // //             // If already refreshing, wait for the previous refresh to finish
// // //             console.log("Access token refresh in progress. Please wait.");
// // //             await refreshTokenPromise;  // Wait for the ongoing refresh to complete
// // //             accessToken = await getAccessTokenFromCookies(); // Get the refreshed token
// // //         } else {
// // //             try {
// // //                 isRefreshing = true;
// // //                 console.log("Refreshing access token...");
// // //                 // Trigger the refresh and store the promise
// // //                 refreshTokenPromise = refreshAccessToken();
// // //                 await refreshTokenPromise; // Wait for refresh to complete
// // //                 accessToken = await getAccessTokenFromCookies(); // Get the refreshed token
// // //             } catch (error) {
// // //                 console.error("Error refreshing access token:", error);
// // //                 isRefreshing = false;
// // //                 return null;
// // //             } finally {
// // //                 isRefreshing = false;
// // //                 refreshTokenPromise = null;  // Clear the refresh promise after it completes
// // //             }
// // //         }
// // //     }

// // //     return accessToken;
// // // }

// // // function getTokenExpiration(token: string) {
// // //     // Implement logic to decode and get the expiration time from JWT token
// // //     return decodeJwt(token).exp;
// // // }

// // // function isTokenExpired(expirationTime: number) {
// // //     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
// // //     return expirationTime < currentTime;
// // // }

// // // function decodeJwt(token: string) {
// // //     const payload = token.split('.')[1];
// // //     const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
// // //     return JSON.parse(decodedPayload);
// // // }

// // import { getAccessTokenFromCookies } from './get-token'; // Access token helper
// // import { refreshAccessToken } from './refresh-service'; // Refresh logic

// // let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
// // let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls

// // export async function ensureValidAccessToken() {
// //   // Get the access token from cookies
// //   let accessToken = await getAccessTokenFromCookies();

// //   if (!accessToken) {
// //     console.log("No access token found.");
// //     return null;
// //   }

// //     // Log the current (old) access token before checking expiration
// //     console.log("Old access token:", accessToken);

// //   // If access token is expired, try refreshing it
// //   const tokenExpiration = getTokenExpiration(accessToken);  // Implement this to check token expiration
// //   if (isTokenExpired(tokenExpiration)) {  // Assuming you have logic to check expiration
// //     if (isRefreshing) {
// //       // If already refreshing, wait for the previous refresh to finish
// //       console.log("Access token refresh in progress. Please wait.");
// //       await refreshTokenPromise;  // Wait for the ongoing refresh to complete
// //       accessToken = await getAccessTokenFromCookies(); // Get the refreshed token
// //     } else {
// //       try {
// //         isRefreshing = true;
// //         console.log("Refreshing access token...");
// //         // Trigger the refresh and store the promise
// //         refreshTokenPromise = refreshAccessToken();
// //         await refreshTokenPromise; // Wait for refresh to complete
// //         accessToken = await getAccessTokenFromCookies(); // Get the refreshed token
// //       } catch (error) {
// //         console.error("Error refreshing access token:", error);
// //         isRefreshing = false;
// //         return null;
// //       } finally {
// //         isRefreshing = false;
// //         refreshTokenPromise = null;  // Clear the refresh promise after it completes
// //       }
// //     }
// //   }


// //   // Log the new access token after refreshing it
// //   console.log("New access token:", accessToken);

// //   return accessToken;
// // }

// // function getTokenExpiration(token: string) {
// //   // Decode and get the expiration time from the JWT token
// //   return decodeJwt(token).exp;
// // }

// // function isTokenExpired(expirationTime: number) {
// //   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
// //   return expirationTime < currentTime;
// // }

// // function decodeJwt(token: string) {
// //   const payload = token.split('.')[1];
// //   const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
// //   return JSON.parse(decodedPayload);
// // }


// import { getAccessTokenFromCookies } from './get-token'; // Access token helper
// import { refreshAccessToken } from './refresh-service'; // Refresh logic

// let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
// let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls



// // export async function ensureValidAccessToken() {
// //     let accessToken = await getAccessTokenFromCookies();
// //     console.log("Access token from cookies wasdfer:", accessToken);  // Debugging log
  
// //     if (!accessToken) {
// //       console.error("No access token found in cookies.");
// //       return null;
// //     }
  
// //     // If you need to refresh the token when it's expired
// //     const tokenExpiration = getTokenExpiration(accessToken); // Assuming you have some way to check token expiry
// //     if (tokenExpiration < Date.now()) {
// //       console.log("Access token expired, refreshing...");
// //       accessToken = await refreshAccessToken();  // Ensure this is working correctly
// //       console.log("New access token after refresh:", accessToken);
// //     }
  
// //     return accessToken;
// //   }

// export async function ensureValidAccessToken() {
//     console.log("Entering ensureValidAccessToken...");
//     let accessToken = await getAccessTokenFromCookies();
//     console.log("Access token from cookies:", accessToken);  // Log if it's retrieved correctly
  
//     if (!accessToken) {
//       console.error("No access token found.");
//       return null;
//     } 

//     console.log("Initial access token:", accessToken);

  
//     // Additional logic to refresh token if expired
//     const tokenExpiration = getTokenExpiration(accessToken);
//     if (tokenExpiration < Date.now()) {
//       console.log("Token expired, refreshing...");
//       accessToken = await refreshAccessToken();
//       console.log("New access token after refresh:", accessToken);
//     }
  
//     return accessToken;
//   }
  
  

// function getTokenExpiration(token: string) {
//   // Decode and get the expiration time from the JWT token
//   return decodeJwt(token).exp;
// }

// function isTokenExpired(expirationTime: number) {
//   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//   return expirationTime < currentTime;
// }

// function decodeJwt(token: string) {
//   const payload = token.split('.')[1];
//   const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
//   return JSON.parse(decodedPayload);
// }

import axios from 'axios';

import { getAccessTokenFromCookies } from './get-token'; // Access token helper
import { refreshAccessToken } from './refresh-service'; // Refresh logic

export const ensureValidAccessToken = async (): Promise<string | null> => {
  // Step 1: Retrieve the access token from cookies or storage.
  let accessToken = await getAccessTokenFromCookies();
  
  if (!accessToken) {
    console.error('No access token found');
    return null;
  }

  console.log("Initial access token:", accessToken);

  // Step 2: Check if the token is expired.
  const isExpired = isTokenExpired(accessToken);
  
  if (isExpired) {
    console.log('Access token is expired, attempting to refresh...');
    
    // Step 3: Try to refresh the token.
    try {
      const newTokens = await refreshAccessToken();
      console.log('New tokens received:', newTokens);

      // Step 4: Update the access token and save it for future use.
      if (newTokens && newTokens.access_token) {
        console.log('Updating access token...');
        accessToken = newTokens.access_token;  // Update the access token to the new one.
      } else {
        console.error('Error: No access token in the refreshed tokens.');
        return null;
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  } else {
    console.log('Access token is still valid.');
  }

  // Step 5: Return the valid access token.
  console.log("Returning valid access token:", accessToken);
  return accessToken;
};

// Utility function to check if the token is expired.
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));  // Decoding the JWT token to get its expiry date.
    const expiryTime = decoded.exp * 1000;  // Convert expiry time to milliseconds.
    const currentTime = Date.now();
    return currentTime >= expiryTime;
  } catch (e) {
    console.error('Error decoding token:', e);
    return true;  // If decoding fails, assume the token is expired.
  }
};


