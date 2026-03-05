"use server";
import axios from "axios";
import { getBackendURL } from '../../lib/utils';
import { getAccessTokenFromCookies } from "./get-token";
import { ensureValidAccessToken } from './token-handler';
import axiosInstance from './axios-instance'; // Assuming axiosInstance is already set up

const baseUrl = getBackendURL();

export async function LoadRole(page: number, pageSize: number) {
    const url = "/roles";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
        const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
        const response = await axiosInstance.get(url, {
          params:{ page, pageSize},
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });
        // const dataResponse = response.data.map((role: any) => ({
        //     id: role.id,
        //     roleName: role.roleName,
        //     description: role.description,
        //     boxColor: role.boxColor,
        //     roleColor: role.roleColor,
        //     RolePermission: role.RolePermission,
        // }));
        // console.log('Backend Response:', response); // Log the full response for debugging
        // return dataResponse; // Make sure to return data if you want to use it
        return response.data;
    } catch (error: any) {
        // console.error('Error fetching data:', error);
        throw error;
    }
  
}
    


export async function LoadUserRole() {
  const url = "/roles/get-userrole";
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
      const dataResponse = response.data.map((role: any) => ({
          id: role.id,
          roleName: role.roleName,
          description: role.description,
          boxColor: role.boxColor,
          roleColor: role.roleColor,
          RolePermission: role.RolePermission,
      }));
      // console.log('Backend Response:', response); // Log the full response for debugging
      return dataResponse; // Make sure to return data if you want to use it
  } catch (error: any) {
      // console.error('Error fetching data:', error);
      throw error;
  }

}
  


export const RoleDetail = async (id: number) => {
    const url = `/roles/${id}`;
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
 
interface AddRoleProps {
    roleName: string;
    description: string;
    boxColor: string;
  roleColor: string;
}
 

export async function addRole(roleData: AddRoleProps) {
    const url = `/roles`;
    const accessToken = await ensureValidAccessToken();
    // console.error('edcr', accessToken);
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
        const response = await axiosInstance.post(url, roleData, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });


        // console.log('Backend Response abc:', response); // Log the full response for debugging
// Assuming the backend responds with tokens
if (response.data) {
  
    return {
 
      message: "Add role successful",
    };}

    } catch (error: any) {
        // Error handling (same as before)
        if (error.response) {
            const errorMessage = error.response.data.message;

            if (errorMessage === "Role already exists") {
                console.error("Registration Error: Username already exists");
                return {
                    zodmessage: "Registration failed. role already exists.",
                    zodErrorsRoleName: ["role already exists. Please choose another one."],
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

 



export async function deleteRole(deleteroleId: number) {

 // Ensure the URL is properly constructed
 const url = `/roles/${deleteroleId}`;
 const accessToken = await ensureValidAccessToken();
 // console.error('edcr', accessToken);
 if (!accessToken) {
   console.error('No access token found');
   return;
 }
 try {
   const response = await axiosInstance.delete(url, {
     headers: {
         Authorization: `Bearer ${accessToken}`, // Using the retrieved token
     },
     withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
 });

 //   console.log('Backend Response:', response); // Log the full response for debugging
   return response.data; // Return response so it can be used in the calling function
 } 
 catch (error) {
   console.error('rfvt', error);
   throw error;
 }

}



export async function editUserRole(roleName: string, newDescription: string) {
    const url = `/user/email/${roleName}`; // Assuming the API expects the ID in the URL.
    const accessToken = await ensureValidAccessToken();
    //   console.error('edcr', accessToken);
    if (!accessToken) {
      console.error('No access token found');
      return;
    }
    try {
      const response = await axiosInstance.put(url, {
          roleName: roleName,       // Use email as the identifier
          description: newDescription,      // Updated name
        }, {
          headers: {
              Authorization: `Bearer ${accessToken}`, // Using the retrieved token
          },
          withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
      });
      // console.log('Backend Response:', response); // Log the response for debugging
      console.log('Backend Response for Edit:', response);
  
      return response.data; // Assuming the response contains the updated user data
    } catch (error: any) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }


}

export async function editPermission(roleId: number, selectedItems: string[]) {
  const url = `/roles/permissions/${roleId}`; // Assuming the API expects the ID in the URL.
  const accessToken = await ensureValidAccessToken();
  //   console.error('edcr', accessToken);
  if (!accessToken) {
    console.error('No access token found');
    return;
  }
  try {
    const response = await axiosInstance.patch(url, {
      actions: selectedItems, // The status to update
  }, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Using the retrieved token
        },
        withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
    });
    // console.log('Backend Response:', response); // Log the response for debugging
    console.log('Backend Response for Edit:', response);

    return response.data; // Assuming the response contains the updated user data
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }


}

export const LoadPermission = async (id: number) => {
  const url = `/roles/permissions/${id}`;
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
    console.log(error);
    throw new Error('Failed to fetch user details');
  }
};