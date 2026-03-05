// // import axios from 'axios';

// // export function getAccessTokenFromCookies() {
// //   const cookies = document.cookie.split(';');
// //   const token = cookies.find(cookie => cookie.trim().startsWith('access_token='));
// //   return token ? token.split('=')[1] : null;
// // }

// // export async function refreshAccessToken() {
// //   try {
// //     const response = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
// //     const { accessToken } = response.data;
// //     document.cookie = `access_token=${accessToken}; Path=/; Secure; HttpOnly`;
// //     return accessToken;
// //   } catch (error) {
// //     console.error('Error refreshing access token:', error);
// //     window.location.href = '/login'; // Redirect to login if refresh fails
// //     return null;
// //   }
// // }

// // export function checkIfTokenExpired(token) {
// //   const payload = JSON.parse(atob(token.split('.')[1]));
// //   const expiration = payload.exp * 1000;
// //   return expiration < Date.now();
// // }

// import axios from 'axios';
// import { cookies } from 'next/headers';  // Import from 'next/headers'
// import { getBackendURL } from '../../lib/utils';
// const baseUrl = getBackendURL();

// // Function to get the access token from cookies
// export async function getAccessTokenFromCookies(): Promise<string | null> {
//   const cookieStore = await cookies();
//   // Extract the token value from the cookies
//   const atoken = cookieStore.get("access_token")?.value;

//   // console.log("qazw", token);  // Logs token value for debugging
//   return atoken || null;  // Return token or null if not found
// }

// export async function getRefreshTokenFromCookies(): Promise<string | null> {
//   const cookieStore = await cookies();
//   // Extract the token value from the cookies
//   const rtoken = cookieStore.get("refresh_token")?.value;

//   // console.log("qazw", token);  // Logs token value for debugging
//   return rtoken || null;  // Return token or null if not found
// }


// // export const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
// //   const url = `${baseUrl}/auth/refresh`;

// //   console.log("qawswe", refreshToken);

// //   try {
// //     // Send the request to refresh the access token using Axios
// //     const response = await axios.post(url, {
// //       refresh_token: refreshToken,
// //     });
// // console.log("qsasw", response)
// //     if (response.status === 200 && response.data.access_token) {
// //       return response.data.access_token; // Return the new access token
// //     }

// //     return null; // Return null if no access token is found
// //   } catch (error) {
// //     console.error('Error refreshing access token:', error);
// //     return null; // Return null if the request fails
// //   }
// // };


