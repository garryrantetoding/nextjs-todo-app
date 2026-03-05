// // path: src/data/services/to/usermanagement-service.tsx
// "use server";
// import axios from "axios";
// import { getBackendURL } from '../../lib/utils';
// import { Role, Status } from "./enum";
// import { getAccessTokenFromCookies } from "./get-token";
// const baseUrl = getBackendURL();


// interface LoadListProps {
//     id: number;
//     name: string;
//     email: string;
//     roles: Role;
//     status: Status;
// }

// interface AddUserProps {
//     name: string;
//     email: string;
//     roles: Role;
//     password: string;
// }



// export async function LoadList() {
//     const url = `${baseUrl}/user/get-all`;
//     const accessToken = await getAccessTokenFromCookies();
//     // console.error('edcr', accessToken);
//     if (!accessToken) {
//       console.error('No access token found');
//       return;
//     }
//     try {
//         const response = await axios.get(url, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//             },
//             withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//         });
//         const dataResponse = response.data.map((user: any) => ({
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             roles: user.roles,  // roles should be a string as per your API
//             status: user.status // Convert status to boolean
//         }));
//         // console.log('Backend Response:', response); // Log the full response for debugging
//         return dataResponse; // Make sure to return data if you want to use it
//     } catch (error: any) {
//         // console.error('Error fetching data:', error);
//         throw error;
//     }
// }

// interface UserDetailProps {
//     name: string;
//     email: string;
//     roles: Role;
// }

// // export async function UserDetail(userId: number) {
// //     const url = `${baseUrl}/user/${userId}`; // Use the user's ID in the URL

// //     try {
// //         // Send the PUT request with the new status in the request body
// //         const response = await axios.get(url);
// //         const dataResponse = response.data.map((user: any) => ({
// //             Name: user.name,
// //             Email: user.email,
// //             Role: user.roles,  // roles should be a string as per your API
// //         }));
// //         console.log('Backend Response:', response); // Log the full response for debugging
// //         return dataResponse; // Make sure to return data if you want to use it


// //     } catch (error) {
// //         console.error('Error updating status:', error);
// //         throw error;
// //     }
// // }

// export const UserDetail = async (id: number) => {
//     const url = `${baseUrl}/user/${id}`;
//     // const url = `${baseUrl}/user/get-all/${id}`;
//     const accessToken = await getAccessTokenFromCookies();
//     // console.error('edcr', accessToken);
//     if (!accessToken) {
//       console.error('No access token found');
//       return;
//     }
//     try {
//       const response = await axios.get(url, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//         },
//         withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//     });
//       return response.data; // Ensure this matches the structure you're expecting { Name, Email, Role }
//     } catch (error) {
//       throw new Error('Failed to fetch user details');
//     }
//   };

// export async function ChangeStatus(userId: number, newStatus: Status) {
//     const url = `${baseUrl}/user/${userId}`; // Use the user's ID in the URL
//     const accessToken = await getAccessTokenFromCookies();
//     // console.error('edcr', accessToken);
//     if (!accessToken) {
//       console.error('No access token found');
//       return;
//     }
//     try {
//         // Send the PUT request with the new status in the request body
//         const response = await axios.put(url, {
//             status: newStatus, // The status to update
//         }

//         , {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//             },
//             withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//         });

//         // console.log("Status updated successfully:", response.data);
//         return response.data; // Return the updated user data

//     } catch (error) {
//         console.error('Error updating status:', error);
//         throw error;
//     }
// }


// export async function AddUser(userData: AddUserProps) {
//     const url = `${baseUrl}/user`;
//     const accessToken = await getAccessTokenFromCookies();
//     // console.error('edcr', accessToken);
//     if (!accessToken) {
//       console.error('No access token found');
//       return;
//     }
//     try {
//         const response = await axios.post(url, userData, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//             },
//             withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//         });

//         // console.log('Backend Response abc:', response); // Log the full response for debugging
// // Assuming the backend responds with tokens
// if (response.data) {
  
//     return {
 
//       message: "Add user successful",
//     };}

//     } catch (error: any) {
//         // Error handling (same as before)
//         if (error.response) {
//             const errorMessage = error.response.data.message;

//             if (errorMessage === "the username already exists! Please use another username") {
//                 console.error("Registration Error: Username already exists");
//                 return {
//                     zodmessage: "Registration failed. Username already exists.",
//                     zodErrorsusername: ["Username already exists. Please choose another one."],
//                 };
//             } if (errorMessage === "the email already registered! Please use another email") {
//                 console.error("Registration Error: Email already in use");
//                 return {
//                     zodmessage: "Registration failed. Email is already registered.",
//                     zodErrorsemail: ["Email is already registered. Please use a different one."],
//                 };
//             } else {
//                 console.error("Registration Error:", errorMessage);
//                 return {
//                     message: errorMessage || "Registration failed.",
//                     zodErrors: {
//                         username: [null],
//                         email: [null],
//                         password: [errorMessage || "Registration failed."],
//                     }
//                 };
//             }
//         } else if (error.request) {
//             console.error("Registration Error2: No response received from server");
//             return {
//                 message: "No response from the server. Please try again later.",
//                 zodErrors: ["No response from the server. Please try again later."],
//             };
//         } else {
//             console.error("Registration Error3:", error.message);
//             return {
//                 message: error.message,
//                 zodErrors: [error.message]
//             };
//         }
//     }
// }



// // export async function DeleteUser(deleteuserId: number) {
// //     // Ensure the URL is properly constructed
// //     const url = `${baseUrl}/user/${deleteuserId}`;
  
// //     try {
// //       const response = await axios.delete(url);
  
// //       console.log('Backend Response:', response); // Log the full response for debugging
  
// //       return response; // Return response so it can be used in the calling function if needed
  
// //     } catch (error: any) {
// //       if (axios.isAxiosError(error)) {
// //         if (error.response && error.response.data && error.response.data.message) {
// //           console.error(error.response.data.message); // Error from backend
// //         } else {
// //           console.error("Failed to delete user. Please try again.");
// //         }
// //       } else {
// //         console.error("An unexpected error occurred while deleting user.");
// //       }
// //       throw error; // Rethrow the error to be handled by the caller if needed
// //     }
// //   }

// export async function DeleteUser(deleteuserId: number) {
//     // Ensure the URL is properly constructed
//     const url = `${baseUrl}/user/${deleteuserId}`;
//     const accessToken = await getAccessTokenFromCookies();
//     // console.error('edcr', accessToken);
//     if (!accessToken) {
//       console.error('No access token found');
//       return;
//     }
//     try {
//       const response = await axios.delete(url, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//         },
//         withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//     });

//     //   console.log('Backend Response:', response); // Log the full response for debugging
//       return response.data; // Return response so it can be used in the calling function
//     } 
//     catch (error) {
//       console.error('rfvt', error);
//       throw error;
//     }
// }


  

// export async function EditUser(email: string, newName: string, newRole: Role) {
//   const url = `${baseUrl}/user/email/${email}`; // Assuming the API expects the ID in the URL.
//   const accessToken = await getAccessTokenFromCookies();
// //   console.error('edcr', accessToken);
//   if (!accessToken) {
//     console.error('No access token found');
//     return;
//   }
//   try {
//     const response = await axios.put(url, {
//         email: email,       // Use email as the identifier
//         name: newName,      // Updated name
//         roles: newRole,     // Updated role
//       }, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//         },
//         withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//     });
//     // console.log('Backend Response:', response); // Log the response for debugging
//     return response.data; // Assuming the response contains the updated user data
//   } catch (error: any) {
//     console.error('Error updating user:', error);
//     throw new Error('Failed to update user');
//   }
// }


// export async function LoadDetail() {
//   const url = `${baseUrl}/auth/me`;
//   const accessToken = await getAccessTokenFromCookies();
// //   console.error('edcr', accessToken);
//   if (!accessToken) {
//     console.error('No access token found');
//     return;
//   }
//   try {
//       const response = await axios.get(url, {
//           headers: {
//               Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//           },
//           withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//       });
//       // const dataResponse = response.data.map((user: any) => ({
//       //     id: user.id,
//       //     name: user.name,
//       //     email: user.email,
//       //     roles: user.roles,  // roles should be a string as per your API
//       // }));
//     //   console.log('Backend Response:', response); // Log the full response for debugging
//       return response.data; // Make sure to return data if you want to use it
//   } catch (error: any) {
//       console.error('Error fetching data:', error);
//       throw error;
//   }
// }

// export async function LogoutUser(userData: AddUserProps) {
//   const url = `${baseUrl}/user`;
//   const accessToken = await getAccessTokenFromCookies();
// //   console.error('edcr', accessToken);
//   if (!accessToken) {
//     console.error('No access token found');
//     return;
//   }
//   try {
//       const response = await axios.post(url, userData, {
//           headers: {
//               Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//           },
//           withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//       });

//     //   console.log('Backend Response abc:', response); // Log the full response for debugging
// // Assuming the backend responds with tokens
// if (response.data) {

//   return {

//     message: "Add user successful",
//   };}

//   } catch (error: any) {
//       // Error handling (same as before)
//       if (error.response) {
//           const errorMessage = error.response.data.message;

//           if (errorMessage === "the username already exists! Please use another username") {
//               console.error("Registration Error: Username already exists");
//               return {
//                   zodmessage: "Registration failed. Username already exists.",
//                   zodErrorsusername: ["Username already exists. Please choose another one."],
//               };
//           } if (errorMessage === "the email already registered! Please use another email") {
//               console.error("Registration Error: Email already in use");
//               return {
//                   zodmessage: "Registration failed. Email is already registered.",
//                   zodErrorsemail: ["Email is already registered. Please use a different one."],
//               };
//           } else {
//               console.error("Registration Error:", errorMessage);
//               return {
//                   message: errorMessage || "Registration failed.",
//                   zodErrors: {
//                       username: [null],
//                       email: [null],
//                       password: [errorMessage || "Registration failed."],
//                   }
//               };
//           }
//       } else if (error.request) {
//           console.error("Registration Error2: No response received from server");
//           return {
//               message: "No response from the server. Please try again later.",
//               zodErrors: ["No response from the server. Please try again later."],
//           };
//       } else {
//           console.error("Registration Error3:", error.message);
//           return {
//               message: error.message,
//               zodErrors: [error.message]
//           };
//       }
//   }
// }

