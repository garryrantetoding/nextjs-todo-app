// // import { DashboardForm } from '@/components/forms/DashboardForm2'
// import Dashboard from '@/components/forms/DashboardForm'
// import React from 'react'
// import Dashboardpage from '@/components/forms/pagedashboard'
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the token



// export default function DashboardRoute(request: NextRequest)  {
//     const token = request.cookies.get("access_token")?.value;
// console.log("zxcv", token)
//     // return <DashboardForm />
//     return <Dashboard />
//   }

  // import { cookies } from 'next/headers';  // Import from 'next/headers'
  // import Dashboard from '@/components/forms/DashboardForm';
  // import React from 'react';
  
  // export default async function DashboardRoute() {
  //   // Await the cookies promise
  //   const cookieStore = await cookies();
  //   const token = cookieStore.get("access_token");
  
  //   console.log("Token:", token);
  
  //   if (!token) {
  //     // Handle the case where the token does not exist
  //     return <div>You need to log in.</div>;
  //   }
  
  //   // You can add logic here to decode the token, etc.
  //   const decodedToken = jwtDecode(token);
  
  //   return <Dashboard />;
  // }
  

//   import { useEffect } from 'react';
// import { getAccessTokenFromCookies, refreshAccessToken, checkIfTokenExpired } from '../utils/auth';
// import axios from 'axios';

// function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     async function handleTokenOnReload() {
//       let accessToken = getAccessTokenFromCookies();

//       if (accessToken) {
//         const isTokenExpired = checkIfTokenExpired(accessToken);
//         if (isTokenExpired) {
//           accessToken = await refreshAccessToken();
//         }
//       } else {
//         window.location.href = '/login';
//       }

//       if (accessToken) {
//         const userData = await axios.get('/api/user', {
//           headers: { Authorization: `Bearer ${accessToken}` }
//         });
//       }
//     }

//     handleTokenOnReload();
//   }, []);

//   return <Component {...pageProps} />;
// }

// export default MyApp;
// import { cookies } from 'next/headers';  // Import from 'next/headers'
import Dashboardpage from '@/components/forms/DashboardPage';
import React from 'react';
// import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the token
//  import { useRouter } from 'next/navigation'; // Ensure you have access to the router

export default async function DashboardRoute() {
  // // // Await the cookies promise
  // // const cookieStore = await cookies();
  
  // // // Extract the token value from the RequestCookie
  // // const token = cookieStore.get("access_token")?.value;

  // // // console.log("qazw", token);

  // // if (!token) {
  // //   // Handle the case where the token does not exist
  // //   return <div>You need to log in.</div>;
  // // }

  // // // You can add logic here to decode the token, etc.
  // // const decodedToken = jwtDecode(token);

  // // console.log("wsxe", decodedToken);

  // const router = useRouter();

  // useEffect(() => {
  //   const refreshToken = getRefreshToken();  // Check if refresh token exists in cookies

  //   if (!refreshToken) {
  //     console.log("No refresh token found, redirecting to login...");
  //     // If no refresh token, redirect to login page
  //     router.push('/login');  // Redirect to login page
  //   }
  // }, [router]);

// // Await the cookies promise
//   const cookieStore = await cookies();
  
//   // Extract the token value from the RequestCookie
//   const refreshtoken = cookieStore.get("refresh_token")?.value;

//   console.log("qazw", refreshtoken);

  

  // if (!refreshtoken) {
  //   // Handle the case where the token does not exist
  //   console.log("qazw 2", refreshtoken);

  //   return <div>You need to log in.</div>;
  // }



  return <Dashboardpage />;
}