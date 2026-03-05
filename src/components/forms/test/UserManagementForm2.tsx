// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';
// import { LogoutButton } from "@/components/custom/auth-custom/logout-button";
// import axios from "axios";
// import { getBackendURL } from "@/lib/utils"; // Assuming you have a utils file with getBackendURL function
// import Cookies from 'js-cookie'; // Import js-cookie to handle cookies

// interface UserAccount {
//   username: string; // Assuming username is a string
// }

// const baseUrl = getBackendURL(); // e.g., http://192.168.1.30:3001

// export function DashboardForm() {
//   const [username, setUsername] = useState<string | null>(null); // Corrected state type
//   const [loading, setLoading] = useState<boolean>(true); // Loading state
//   const router = useRouter(); // To redirect if needed
//   const url = `${baseUrl}/user/me`;

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(url);
//         console.log(response)
//         // Assuming the response contains a 'username' field
//         if (response.data && response.data.username) {
//           setUsername(response.data.username); // Set the username from the API response
//         } else {
//           console.error("No username found in response.");
//           Cookies.remove("access_token"); // Clear the cookie
//           Cookies.remove("refresh_token"); // Clear the cookie
//           router.push("/login"); // Redirect if no username found
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         Cookies.remove("access_token"); // Clear the cookie
//         Cookies.remove("refresh_token"); // Clear the cookie        router.push("/login"); // Redirect if there's an error
//       }

//       setLoading(false); // Set loading to false once the logic is complete
//     };

//     fetchUserData();
//   }, [router]); // Dependency on router to handle redirection when necessary


//   // Show loading state if token is being validated
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//       <div>
//         <h1>Dashboard</h1>
//         {loading ? (
//           <p>Loading...</p> // Show loading state
//         ) : username ? (
//           <p>Welcome, {username}!</p> // Display the username if found
//         ) : (
//           <p>Error loading user information.</p> // Error state if something goes wrong
//         )}
//       </div>
//       <LogoutButton /> {/* Your Logout Button */}
//     </div>
//   );
// }

