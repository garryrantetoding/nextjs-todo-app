
// interface TodoItemNew {
//   id: number;
//   checklist: boolean;
//   task: string;
// }


//     const loadTodo = async () => {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todo`);
//         const dataResponse: TodoItemNew[] = res.data;

//         const result = z.array(todoItemSchema).safeParse(dataResponse);

//         if (!result.success) {
//           toast.error("Failed to load tasks. Data structure is incorrect."); // Show error via toast
//           return;
//         }

//         // Filter ongoing and completed tasks
//         const filteredTodoList = result.data.filter((item) => !item.checklist);
//         const filteredTodoListOngoing = result.data.filter((item) => item.checklist);

//         setTodoOngoing(filteredTodoList);
//         setTodoDone(filteredTodoListOngoing);
//         setTaskCounter(filteredTodoList.length);
//         setDoneCounter(filteredTodoListOngoing.length);
//       } catch (error: any) {
//         if (axios.isAxiosError(error)) {
//           if (error.response && error.response.data && error.response.data.message) {
//             toast.error(error.response.data.message); // Error from backend
//           } else {
//             toast.error("An unexpected error occurred while loading data.");
//           }
//         } else {
//           toast.error("Failed to load data. Please try again.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };


//   const inputSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate task input
//     const result = taskSchema.safeParse(task);
//     if (!result.success) {
//       toast.error(result.error.errors[0].message); // Show validation error via toast
//       return;
//     }

//     try {
//       const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todo`, { task });
//       setTodoOngoing((prev) => [...prev, res.data]);
//       setTask("");
//       setTaskCounter((prev) => prev + 1);

//       toast.success('Task added successfully!');
//     } catch (error: any) {
//       if (axios.isAxiosError(error)) {
//         if (error.response && error.response.data && error.response.data.message) {
//           toast.error(error.response.data.message); // Error from backend
//         } else {
//           toast.error("Failed to add task. Please try again.");
//         }
//       } else {
//         toast.error("An unexpected error occurred while adding task.");
//       }
//     }
//   };

//   // Handle marking a task as done
//   const handleDone = async (id: number) => {
//     try {
//       const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todo/${id}`);
//       setTodoOngoing((prev) => prev.filter((task) => task.id !== id)); // Remove from ongoing list
//       setTodoDone((prev) => [...prev, res.data]); // Add to completed list
//       setTaskCounter((prev) => prev - 1); // Update ongoing task count
//       setDoneCounter((prev) => prev + 1); // Update completed task count

//       toast.success("Task marked as done!");
//     } catch (error: any) {
//       if (axios.isAxiosError(error)) {
//         if (error.response && error.response.data && error.response.data.message) {
//           toast.error(error.response.data.message); // Error from backend
//         } else {
//           toast.error("Failed to mark task as done.");
//         }
//       } else {
//         toast.error("An unexpected error occurred while marking task as done.");
//       }
//     }
//   };

//   // Handle deleting a task
//   const handleDelete = async (taskId: number) => {
//     try {
//       await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todo/${taskId}`);
//       setTodoOngoing((prev) => prev.filter((task) => task.id !== taskId)); // Remove from ongoing list
//       setTodoDone((prev) => prev.filter((task) => task.id !== taskId)); // Remove from completed list
//       setTaskCounter((prev) => prev - 1); // Update ongoing task count

//       toast.success("Task deleted successfully!");
//     } catch (error: any) {
//       if (axios.isAxiosError(error)) {
//         if (error.response && error.response.data && error.response.data.message) {
//           toast.error(error.response.data.message); // Error from backend
//         } else {
//           toast.error("Failed to delete task. Please try again.");
//         }
//       } else {
//         toast.error("An unexpected error occurred while deleting task.");
//       }
//     }
//   };

//   // Handle deleting a completed task
//   const handleDoneDelete = async (donetaskId: number) => {
//     try {
//       await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todo/${donetaskId}`);
//       setTodoOngoing((prev) => prev.filter((task) => task.id !== donetaskId)); // Remove from ongoing list
//       setTodoDone((prev) => prev.filter((task) => task.id !== donetaskId)); // Remove from completed list
//       setDoneCounter((prev) => prev - 1); // Update completed task count

//       toast.success("Completed task deleted successfully!");
//     } catch (error: any) {
//       if (axios.isAxiosError(error)) {
//         if (error.response && error.response.data && error.response.data.message) {
//           toast.error(error.response.data.message); // Error from backend
//         } else {
//           toast.error("Failed to delete task. Please try again.");
//         }
//       } else {
//         toast.error("An unexpected error occurred while deleting task.");
//       }
//     }
//   };

"use server";
import axios from "axios";
import { getBackendURL } from '../../lib/utils';
import { Role, Status } from "./enum";
import { getAccessTokenFromCookies } from "./get-token";
import { ensureValidAccessToken } from './token-handler';
import axiosInstance from './axios-instance'; // Assuming axiosInstance is already set up
// import { toast } from "sonner";
const baseUrl = getBackendURL();




interface TodoItemProps {
    roles: string;
    task: string;
    users: string;
  }



export async function LoadTask(pageOngoing: number,pageDone: number, pageSize: number) {
    const url = "/todos";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return;
    }
    try {
        const response = await axiosInstance.get(url, {     
            params:{ pageFalse:pageOngoing,pageTrue:pageDone,  pageSize},
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });
        // const dataResponse = response.data.map((todotask: any) => ({
        //     id: todotask.id,
        //     checklist: todotask.checklist,
        //     task: todotask.task,
        //     roles: todotask.roles,
        //     users: todotask.users
        // }));


        if (!response.data) {
            console.error("Failed to load tasks. Data structure is incorrect."); // Show error via toast
            return;
        }
        // console.log('Backend Response:', response); // Log the full response for debugging
        // return dataResponse; // Make sure to return data if you want to use it
return response.data

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && error.response.data.message) {

                return { errormessage: error.response.data.message }

            } else {
                return { errormessage: "An unexpected error occurred while loading data." }

            }
        } else {

            return { errormessage: "Failed to load data. Please try again." }

        }
    }
}

export async function LoadUserTask(users: string,pageOngoing: number,pageDone: number, pageSize: number) {
    const url = `/todos/name/${users}`;
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return;
    }
    try {
        const response = await axiosInstance.get(url, {
             params:{ pageFalse:pageOngoing,pageTrue:pageDone, pageSize},
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });
        // const dataResponse = response.data.map((todotask: any) => ({
        //     id: todotask.id,
        //     checklist: todotask.checklist,
        //     task: todotask.task,
        //     roles: todotask.roles,
        //     users: todotask.users
        // }));


        if (!response.data) {
            console.error("Failed to load tasks. Data structure is incorrect."); // Show error via toast
            return;
        }
        // console.log('Backend Response:', response); // Log the full response for debugging
        // return dataResponse; // Make sure to return data if you want to use it
return response.data

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && error.response.data.message) {

                return { errormessage: error.response.data.message }

            } else {
                return { errormessage: "An unexpected error occurred while loading data." }

            }
        } else {

            return { errormessage: "Failed to load data. Please try again." }

        }
    }
}

// interface UserDetailProps {
//     name: string;
//     email: string;
//     roles: Role;
// }


// export const UserDetail = async (id: number) => {
//     const url = `/user/${id}`;
//     // const url = `${baseUrl}/user/get-all/${id}`;
//     const accessToken = await ensureValidAccessToken();
//     // console.error('edcr', accessToken);
//     if (!accessToken) {
//       console.error('No access token found');
//       return;
//     }
//     try {
//       const response = await axiosInstance.get(url, {
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

export async function DoneTask(taskId: number) {
    const url = `/todos/${taskId}`; // Use the user's ID in the URL
    const accessToken = await ensureValidAccessToken();
    // console.error('edcr', accessToken);
    if (!accessToken) {
        console.error('No access token found');
        return;
    }
    try {
        // Send the PUT request with the new status in the request body
        const response = await axiosInstance.put(url

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


export async function AddTask(task: TodoItemProps) {
    const url = `/todos`;
    const accessToken = await ensureValidAccessToken();
    // console.error('edcr', accessToken);
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
        const response = await axiosInstance.post(url, task, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        // console.log('Backend Response abc:', response); // Log the full response for debugging
// Assuming the backend responds with tokens
if (response.data) {
  
    // return response.data;
    return {
 
        message: "Add successful",
      };
    }

    } catch (error: any) {
        // Error handling (same as before)
        if (error.response) {
            const errorMessage = error.response.data.message;

            if (errorMessage === 'Task with the same name already exists!') {
                console.error("Registration Error: Username already exists");
                return {
                    zodmessage: "Task with the same name already exists!",
                };
            } if (errorMessage === 'the task is too long, max 5 characters') {
                console.error("Registration Error: Email already in use");
                return {
                    zodmessage: "the task is too long, max 5 characters",
                };
            } if (errorMessage === 'Invalid role provided!') {
                console.error("Registration Error: Email already in use");
                return {
                    zodmessage: "Invalid role provided!",
                };
             } else {
                console.error("Registration Error:", errorMessage);
                return {
                    zodmessage: errorMessage || "Registration failed.",
                    
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





export async function DeleteTask(deleteTaskId: number) {
    // Ensure the URL is properly constructed
    const url = `/todos/${deleteTaskId}`;
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



  

export async function LoadSummary() {
    const url = "/todos/summary";
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
        // const dataResponse = response.data.map((tasksummary: any) => ({
        //     userId: tasksummary.userId,
        //     name: tasksummary.name,
        //     doneTasks: tasksummary.doneTasks,
        //     todoTasks: tasksummary.todoTasks,
        // }));


        if (!response.data) {
            console.error("Failed to load tasks. Data structure is incorrect."); // Show error via toast
            return;
        }
        // console.log('Backend Response:', response); // Log the full response for debugging
        return response.data; // Make sure to return data if you want to use it


    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && error.response.data.message) {

                return { errormessage: error.response.data.message }

            } else {
                return { errormessage: "An unexpected error occurred while loading data." }

            }
        } else {

            return { errormessage: "Failed to load data. Please try again." }

        }
    }
}

export const LoadUserSummary = async (users: string) => {
    const url = `/todos/summary/${users}`;
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

// export async function EditUser(email: string, newName: string, newRole: string) {
//     const url = `/user/email/${email}`; // The endpoint you're calling
//     const accessToken = await ensureValidAccessToken(); // Use ensureValidAccessToken
  
//     console.log("Access token retrieved qasd:", accessToken); // Debugging line: log the access token
  
//     if (!accessToken) {
//       console.error('No access token found qaadzw');
//       return;
//     }
  
//     try {
//         console.log('Access token in EditUser:', accessToken);  // Log the access token

//       const response = await axiosInstance.put(url, {
//         //   email: email,       // Use email as the identifier
//           name: newName,      // Updated name
//           roles: newRole,     // Updated role
//         }, {
//           headers: {
//               Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//           },
//           withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//       });
  
//       console.log('Backend Response for Edit wasd:', response); // Debugging line: log the response for debugging
//       return response.data; // Assuming the response contains the updated user data
//     } catch (error: any) {
//         // Error handling (same as before)
//         if (error.response) {
//             const errorMessage = error.response.data.message;

//             if (errorMessage === 'Name already used') {
//                 console.error("Registration Error: Username already exists");
//                 return {
//                     zodmessage: "Registration failed. Username already exists.",
//                     zodErrorsusername: ["Username already exists. Please choose another one."],
//                 };
//             } else {
//                 console.error("Registration Error:", errorMessage);
//                 return {
//                     message: errorMessage || "Registration failed.",
//                     zodErrors: {
//                         username: [null],
//                              }
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
    
    
    
// //     catch (error: any) {
// //       console.error('Error updating user qwesa:', error);
// //       throw new Error('Failed to update user');
// //     }
// // }

  


// export async function LoadDetail() {
//   const url = `/auth/me`;
//   const accessToken = await ensureValidAccessToken();
//   //   console.error('edcr', accessToken);
//   if (!accessToken) {
//     console.error('No access token found');
//     return;
//   }
//   try {
//       const response = await axiosInstance.get(url, {
//           headers: {
//               Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//           },
//           withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//       });
//       return response.data.user; // Make sure to return data if you want to use it
//   } catch (error: any) {
//       console.error('Error fetching data:', error);
//       throw error;
//   }
// }

// export async function LoadPermissionsAuth() {
//     const url = `/auth/me`;
//     const accessToken = await ensureValidAccessToken();
//     //   console.error('edcr', accessToken);
//     // if (!accessToken) {
//     //   console.error('No access token found');
//     //   return;
//     // }
//     try {
//         const response = await axiosInstance.get(url, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`, // Using the retrieved token
//             },
//             withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
//             timeout: 10000, // Timeout after 10 seconds (adjust as needed)

//         });
//         console.log("testresponse2" , response.data)
//         if (response.data.error){
//             return {errormessage:"expired"}

//         }
//         return response.data.permissions; // Make sure to return data if you want to use it
        
//     } catch (error: any) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
//   }