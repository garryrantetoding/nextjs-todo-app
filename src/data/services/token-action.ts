// // import { useEffect } from 'react';
// // import { getAccessTokenFromCookies, refreshAccessToken, checkIfTokenExpired} from "../services/get-token";
// // import axios from 'axios';

// // function MyApp({ Component, pageProps }) {
// //   useEffect(() => {
// //     async function handleTokenOnReload() {
// //       let accessToken = getAccessTokenFromCookies();

// //       if (accessToken) {
// //         const isTokenExpired = checkIfTokenExpired(accessToken);
// //         if (isTokenExpired) {
// //           accessToken = await refreshAccessToken();
// //         }
// //       } else {
// //         window.location.href = '/login';
// //       }

// //       if (accessToken) {
// //         const userData = await axios.get('/api/user', {
// //           headers: { Authorization: `Bearer ${accessToken}` }
// //         });
// //       }
// //     }

// //     handleTokenOnReload();
// //   }, []);

// //   return <Component {...pageProps} />;
// // }

// // export default MyApp;
// import { refreshAccessToken } from "./refresh-service";

// export async function refreshaction() {
//     const refreshToken = await refreshAccessToken(); // Get the refresh token from cookies
//   return {test:"fneifins"}
    
  
//     // try {
//     //   // Logout the user from the backend
//     //   const deleteBackendToken = await LogoutBackend(); // Call the logout API
//     //   if (deleteBackendToken) {
//     //     console.log("Logout successful on the backend. 2");
  
//     //     // Get the cookie store
//     //     const cookieStore = await cookies();
  
//     //     // Delete the cookies for access_token and refresh_token
//     //     cookieStore.set('access_token', '', { path: '/', expires: new Date(0) });
//     //     cookieStore.set('refresh_token', '', { path: '/', expires: new Date(0) });
  
//     //     // Do not redirect here, let the middleware handle the redirect
//     //   } else {
//     //     console.error("Logout failed on the backend.");
//     //   }
//     // } catch (error) {
//     //   console.error("Error logging out from backend:", error);
//     // }
//   }
  