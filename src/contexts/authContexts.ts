// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import axiosInstance from "@/data/services/axios-instance";  // Ensure correct import path

// // Define types for User and Permissions (adjust these types as needed)
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// interface AuthContextType {
//   user: User | null;
//   permissions: string[];
// }

// // Create context with default value of undefined (because it will be provided later)
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode; // This specifies the children prop will be of type ReactNode
// }

// // AuthProvider component
// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [permissions, setPermissions] = useState<string[]>([]);

//   useEffect(() => {
//     // Fetch user data and permissions on component mount
//     axiosInstance.get("/api/me")
//       .then(({ data }) => {
//         setUser(data.user); // Assuming `data.user` contains the user object
//         setPermissions(data.permissions || []); // `data.permissions` should be an array
//       })
//       .catch(() => {
//         setUser(null); // Set user to null if there was an error fetching
//         setPermissions([]); // Clear permissions on error
//       });
//   }, []); // This useEffect runs only once when the component mounts

//   return (
//     <AuthContext.Provider value={{ user, permissions }}>
//       {children} {/* Render children wrapped with the AuthContext */}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use AuthContext
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext); // Access the AuthContext

//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
  
//   return context; // Return the context value (user and permissions)
// };
