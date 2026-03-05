// // // src/data/services/token-handler.ts

// // import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from './get-token';
// // import { refreshAccessToken } from './refresh-service';

// // export async function ensureValidAccessToken() {
// //   let accessToken = await getAccessTokenFromCookies();

// //   // If no access token exists, we cannot proceed with the API calls
// //   if (!accessToken) {
// //     throw new Error('No access token found');
// //   }

// //   const refreshToken = await getRefreshTokenFromCookies();

// //   // If the access token exists but is invalid or expired, refresh it
// //   try {
// //     const decodedToken = decodeJWT(accessToken); // Implement this if needed for checking expiration
// //     const isExpired = decodedToken && decodedToken.exp * 1000 < Date.now();

// //     if (isExpired && refreshToken) {
// //       // Refresh the token if expired
// //       accessToken = await refreshAccessToken();
// //     }
// //   } catch (error) {
// //     console.error("Error checking or decoding access token:", error);
// //     throw new Error('Failed to refresh access token');
// //   }

// //   return accessToken;
// // }

// // // Function to decode the JWT token (to check expiration)
// // function decodeJWT(token: string) {
// //   try {
// //     const base64Url = token.split('.')[1];
// //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
// //     const jsonPayload = decodeURIComponent(
// //       atob(base64).split('').map(function(c) {
// //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
// //       }).join('')
// //     );
// //     return JSON.parse(jsonPayload);
// //   } catch (error) {
// //     console.error("Failed to decode JWT:", error);
// //     return null;
// //   }
// // }
// import { getAccessTokenFromCookies } from './get-token'; // Access token helper
// import { refreshAccessToken } from './refresh-service'; // Refresh logic

// let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time

// export async function ensureValidAccessToken() {
//     let accessToken = await getAccessTokenFromCookies();
    
//     if (!accessToken) {
//         console.log("No access token found.");
//         return null;
//     }

//     // If access token is expired, try refreshing it
//     const tokenExpiration = getTokenExpiration(accessToken); // Implement this to check token expiration
//     if (isTokenExpired(tokenExpiration)) {  // Assuming you have logic to check expiration
//         if (isRefreshing) {
//             // If already refreshing, wait for the previous refresh to finish
//             console.log("Access token refresh in progress. Please wait.");
//             await waitForTokenRefresh(); // Implement this function to wait for refresh
//             accessToken = await getAccessTokenFromCookies();
//             console.log("qazxcv")
//         } else {
//             try {
//                 isRefreshing = true;
//                 console.log("Refreshing access token...");
//                 await refreshAccessToken();
//                 accessToken = await getAccessTokenFromCookies();
//                 console.log("qazxcv 1")

//             } catch (error) {
//                 console.error("Error refreshing access token:", error);
//                 isRefreshing = false;
//                 return null;
//             } finally {
//                 isRefreshing = false;
//             }
//         }
//     }

//     return accessToken;
// }

// function getTokenExpiration(token: string) {
//     // Implement logic to decode and get the expiration time from JWT token
//     return decodeJwt(token).exp;
// }

// function isTokenExpired(expirationTime: number) {
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     return expirationTime < currentTime;
// }

// function waitForTokenRefresh() {
//     return new Promise(resolve => {
//         const interval = setInterval(async () => {
//             const token = await getAccessTokenFromCookies();
//             if (token) {
//                 clearInterval(interval);
//                 resolve(true);
//             }
//         }, 100); // Check every 100ms
//     });
// }

// function decodeJwt(token: string) {
//     const payload = token.split('.')[1];
//     const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
//     return JSON.parse(decodedPayload);
// }
