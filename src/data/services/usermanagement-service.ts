"use server";
import axios from "axios";
import { getBackendURL } from '../../lib/utils';
import { Role, Status } from "./enum";
import { getAccessTokenFromCookies } from "./get-token";
import { ensureValidAccessToken } from './token-handler';
import axiosInstance from './axios-instance'; // Assuming axiosInstance is already set up
import { toast } from "sonner";
const baseUrl = getBackendURL();



interface AddUserProps {
    name: string;
    email: string;
    roles: string;
    password: string;
}



export async function LoadList(page: number, pageSize: number,searchQuery: string, roleFilter: string, statusFilter:Status) {
    const url = "/user/get-all";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
        const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
        // const params: any = { page, pageSize,};
        // if (searchQuery) params.email=email; 
        // if (roleFilter) params.role=role; 
        // if (statusFilter) params.status=status; 


        const response = await axiosInstance.get(url, {
            params:{ page, pageSize,email:searchQuery,role:roleFilter,status:statusFilter},
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });
        // const dataResponse = response.data.map((user: any) => ({
        //     id: user.id,
        //     name: user.name,
        //     email: user.email,
        //     roles: user.roles,  // roles should be a string as per your API
        //     status: user.status, // Convert status to boolean
        //     boxColor: user.boxColor,
        //     roleColor: user.roleColor,
        // }));
        // // console.log('Backend Response:', response); // Log the full response for debugging
        // return dataResponse; // Make sure to return data if you want to use it
        return response.data;
    } catch (error: any) {
        // console.error('Error fetching data:', error);
        throw error;
    }
}

export async function LoadUserList() {
    const url = "/user/get-user";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
        const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });
        const dataResponse = response.data.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,  // roles should be a string as per your API
            status: user.status, // Convert status to boolean
            boxColor: user.boxColor,
            roleColor: user.roleColor,
        }));
        // console.log('Backend Response:', response); // Log the full response for debugging
        return dataResponse; // Make sure to return data if you want to use it
    } catch (error: any) {
        // console.error('Error fetching data:', error);
        throw error;
    }
}


// interface UserDetailProps {
//     name: string;
//     email: string;
//     roles: Role;
// }


export const UserDetail = async (id: number) => {
    const url = `/user/${id}`;
    // const url = `${baseUrl}/user/get-all/${id}`;
    const accessToken = await ensureValidAccessToken();
    // console.error('edcr', accessToken);
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
      const response = await axiosInstance.get(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Using the retrieved token
        },
        withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
    });
      return response.data; // Ensure this matches the structure you're expecting { Name, Email, Role }
    } catch (error) {
      throw new Error('Failed to fetch user details');
    }
  };

export async function ChangeStatus(userId: number, newStatus: Status) {
    const url = `/user/${userId}`; // Use the user's ID in the URL
    const accessToken = await ensureValidAccessToken();
    // console.error('edcr', accessToken);
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
        // Send the PUT request with the new status in the request body
        const response = await axiosInstance.put(url, {
            status: newStatus, // The status to update
        }

        , {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        // console.log("Status updated successfully:", response.data);
        return response.data; // Return the updated user data

    } catch (error) {
        console.error('Error updating status:', error);
        throw error;
    }
}


export async function AddUser(userData: AddUserProps) {
    const url = `/user`;
    const accessToken = await ensureValidAccessToken();
    // console.error('edcr', accessToken);
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
        const response = await axiosInstance.post(url, userData, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        // console.log('Backend Response abc:', response); // Log the full response for debugging
// Assuming the backend responds with tokens
if (response.data) {
  
    return {
 
      message: "Add user successful",
    };}

    } catch (error: any) {
        // Error handling (same as before)
        if (error.response) {
            const errorMessage = error.response.data.message;

            if (errorMessage === 'Name has already been used!') {
                console.error("Registration Error: Username already exists");
                return {
                    zodmessage: "Registration failed. Username already exists.",
                    zodErrorsusername: ["Username already exists. Please choose another one."],
                };
            } if (errorMessage === 'Email has already been registered!') {
                console.error("Registration Error: Email already in use");
                return {
                    zodmessage: "Registration failed. Email is already registered.",
                    zodErrorsemail: ["Email is already registered. Please use a different one."],
                };
            } else {
                console.error("Registration Error:", errorMessage);
                return {
                    message: errorMessage || "Registration failed.",
                    zodErrors: {
                        username: [null],
                        email: [null],
                        password: [errorMessage || "Registration failed."],
                    }
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
                zodErrors: [error.message]
            };
        }
    }
}


// export async function DeleteUser(deleteuserId: number) {
//     // Ensure the URL is properly constructed
//     const url = `/user/${deleteuserId}`;
//     const accessToken = await ensureValidAccessToken();
//     // console.error('edcr', accessToken);
//     if (!accessToken) {
//       console.error('No access token found');
//       return;
//     }
//     try {
//       const response = await axiosInstance.delete(url, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//         },
//         withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//     });

//     //   console.log('Backend Response:', response); // Log the full response for debugging
//       return response.data; // Return response so it can be used in the calling function
//     } 
//     catch (error:any) {
//          // Check if the error response is a 401 Unauthorized
         
//          if (error.response && error.response.status === 403) {
//             // console.log('try response error:', error.response);
//             // Trigger a toast error for 401 status
//         throw error;
//         }
//     //   console.error('rfvt', error);
      
    
//     }
// }


export async function DeleteUser(deleteuserId: number) {
    // Ensure the URL is properly constructed
    const url = `/user/${deleteuserId}`;
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return;
    }

    try {
        const response = await axiosInstance.delete(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true, // Ensure cookies are sent with the request (if you're using cookies)
        });

        console.log("errormessage",response)
        if (response.status===200){
            return {errormessage:"success"}

        }
        if (response.data.statuscode === 403){
            return {errormessage:"Forbidden: You do not have permission to delete this user."}

        }
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // Handling the 403 explicitly here
            if (error.response.status === 403) {
                // toast.error('Forbidden: You do not have permission to delete this user.');
                console.error('Error 403:', error.response);
                return {errormessage:"Forbidden: You do not have permission to delete this user."}
            } else {
                console.error('Error:', error.response);
            }
        } else {
            console.error('Request error:', error);
        }
        throw error; // Ensure the error is rethrown if needed
    }
}



  


export async function EditUser(email: string, newName: string, newRole: string) {
    const url = `/user/email/${email}`; // The endpoint you're calling
    const accessToken = await ensureValidAccessToken(); // Use ensureValidAccessToken
  
    console.log("Access token retrieved qasd:", accessToken); // Debugging line: log the access token
  
    if (!accessToken) {
      console.error('No access token found qaadzw');
      return;
    }
  
    try {
        console.log('Access token in EditUser:', accessToken);  // Log the access token

      const response = await axiosInstance.put(url, {
        //   email: email,       // Use email as the identifier
          name: newName,      // Updated name
          roles: newRole,     // Updated role
        }, {
          headers: {
              Authorization: `Bearer ${accessToken}`, // Using the retrieved token
          },
          withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
      });
  
      console.log('Backend Response for Edit wasd:', response); // Debugging line: log the response for debugging
      return response.data; // Assuming the response contains the updated user data
    } catch (error: any) {
        // Error handling (same as before)
        if (error.response) {
            const errorMessage = error.response.data.message;

            if (errorMessage === 'Name already used') {
                console.error("Registration Error: Username already exists");
                return {
                    zodmessage: "Registration failed. Username already exists.",
                    zodErrorsusername: ["Username already exists. Please choose another one."],
                };
            } else {
                console.error("Registration Error:", errorMessage);
                return {
                    message: errorMessage || "Registration failed.",
                    zodErrors: {
                        username: [null],
                             }
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
                zodErrors: [error.message]
            };
        }
    }
}
    
    
    
//     catch (error: any) {
//       console.error('Error updating user qwesa:', error);
//       throw new Error('Failed to update user');
//     }
// }

  


export async function LoadDetail() {
  const url = `/auth/me`;
  const accessToken = await ensureValidAccessToken();
  //   console.error('edcr', accessToken);
  if (!accessToken) {
    console.error('No access token found');
    return;
  }
  try {
      const response = await axiosInstance.get(url, {
          headers: {
              Authorization: `Bearer ${accessToken}`, // Using the retrieved token
          },
          withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
      });
      return response.data.user; // Make sure to return data if you want to use it
  } catch (error: any) {
      console.error('Error fetching data:', error);
      throw error;
  }
}

export async function LoadPermissionsAuth() {
    const url = `/auth/me`;
    const accessToken = await ensureValidAccessToken();
    //   console.error('edcr', accessToken);
    // if (!accessToken) {
    //   console.error('No access token found');
    //   return;
    // }
    try {
        const response = await axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
            timeout: 10000, // Timeout after 10 seconds (adjust as needed)

        });
        console.log("testresponse2" , response.data)
        if (response.data.error){
            return {errormessage:"expired"}

        }
        return response.data.permissions; // Make sure to return data if you want to use it
        
    } catch (error: any) {
        console.error('Error fetching data:', error);
        throw error;
    }
  }

// // // // // // // export async function LogoutUser(userData: AddUserProps) {
// // // // // // //   const url = `/user`;
// // // // // // //   const accessToken = await ensureValidAccessToken();
// // // // // // //   //   console.error('edcr', accessToken);
// // // // // // //   if (!accessToken) {
// // // // // // //     console.error('No access token found');
// // // // // // //     return;
// // // // // // //   }
// // // // // // //   try {
// // // // // // //       const response = await axiosInstance.post(url, userData, {
// // // // // // //           headers: {
// // // // // // //               Authorization: `Bearer ${accessToken}`, // Using the retrieved token
// // // // // // //           },
// // // // // // //           withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
// // // // // // //       });

// // // // // // //     //   console.log('Backend Response abc:', response); // Log the full response for debugging
// // // // // // // // Assuming the backend responds with tokens
// // // // // // // if (response.data) {

// // // // // // //   return {

// // // // // // //     message: "Add user successful",
// // // // // // //   };}

// // // // // // //   } catch (error: any) {
// // // // // // //       // Error handling (same as before)
// // // // // // //       if (error.response) {
// // // // // // //           const errorMessage = error.response.data.message;

// // // // // // //           if (errorMessage === "the username already exists! Please use another username") {
// // // // // // //               console.error("Registration Error: Username already exists");
// // // // // // //               return {
// // // // // // //                   zodmessage: "Registration failed. Username already exists.",
// // // // // // //                   zodErrorsusername: ["Username already exists. Please choose another one."],
// // // // // // //               };
// // // // // // //           } if (errorMessage === "the email already registered! Please use another email") {
// // // // // // //               console.error("Registration Error: Email already in use");
// // // // // // //               return {
// // // // // // //                   zodmessage: "Registration failed. Email is already registered.",
// // // // // // //                   zodErrorsemail: ["Email is already registered. Please use a different one."],
// // // // // // //               };
// // // // // // //           } else {
// // // // // // //               console.error("Registration Error:", errorMessage);
// // // // // // //               return {
// // // // // // //                   message: errorMessage || "Registration failed.",
// // // // // // //                   zodErrors: {
// // // // // // //                       username: [null],
// // // // // // //                       email: [null],
// // // // // // //                       password: [errorMessage || "Registration failed."],
// // // // // // //                   }
// // // // // // //               };
// // // // // // //           }
// // // // // // //       } else if (error.request) {
// // // // // // //           console.error("Registration Error2: No response received from server");
// // // // // // //           return {
// // // // // // //               message: "No response from the server. Please try again later.",
// // // // // // //               zodErrors: ["No response from the server. Please try again later."],
// // // // // // //           };
// // // // // // //       } else {
// // // // // // //           console.error("Registration Error3:", error.message);
// // // // // // //           return {
// // // // // // //               message: error.message,
// // // // // // //               zodErrors: [error.message]
// // // // // // //           };
// // // // // // //       }
// // // // // // //   }
// // // // // // // }



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
//     roles: string;
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


  

// export async function EditUser(email: string, newName: string, newRole: string) {
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

