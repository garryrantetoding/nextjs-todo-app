// // export default UserModal;
// import React, { useState, useEffect } from 'react';
// import { z } from 'zod';
// import { Role } from '@/data/services/enum';

// // Define the Zod schema for validation
// const userSchema = z.object({
//   name: z.string().min(1, { message: 'Name is required' }),
//   email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
//   roles: z
//   .string()
//   .min(1, { message: 'Role is required' })
//   .refine((val) => val !== '', { message: 'Please select a valid role' }), // Check for empty role
// password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).refine((val) => val !== '', {
//     message: 'Password is required',
//   }),});




// interface UserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddUser: (name: string, email: string, roles: string, password: string) => void;
//   newUser: { name: string; email: string; roles: string; password: string };
//   setNewUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; roles: string; password: string }>>;
//   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, newUser, setNewUser, setDiscardConfirmationOpen }) => {
//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     roles: '',
//     password: '',
//   });

//   const [roles, setRoles] = useState([]); // state to store roles
  
//   useEffect(() => {
//     // Fetch the data from your backend API here
//     const fetchRoles = async () => {
//       try {
//         const response = await LoadRole(); // Replace with your API endpoint
//         const data = await response.roleName;
//         setRoles(data); // assuming data is an array of roles
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       }
//     };
    
//     fetchRoles();
//   }, []); // Empty dependency array to run only once on component mount
  
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//   setNewUser((prev) => {
//     // console.log(`Updating ${name} to ${value}`); // Log to check if password is being updated
//     return {
//       ...prev,
//       [name]: value,
//     };
//   });
// };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate the newUser data using Zod
//     const result = userSchema.safeParse(newUser);

//     if (!result.success) {
//       // console.log("fieshf",result.error);
//       // If validation fails, map the errors to the state
//       const validationErrors: { name: string; email: string; roles: string; password: string } = {
//         name: result.error.format().name?._errors.join(', ') || '',
//         email: result.error.format().email?._errors.join(', ') || '',
//         roles: result.error.format().roles?._errors.join(', ') || '',
//         password: result.error.format().password?._errors.join(', ') || '',
//       };
// // console.log("hifehsf",validationErrors);
//       setErrors(validationErrors);
//       return;
//     }

//     // If validation is successful, proceed with adding the user
//     onAddUser(newUser.name, newUser.email, newUser.roles, newUser.password);

//     // Close the modal
//     onClose();

//     // Reset the discard confirmation modal state
//     setDiscardConfirmationOpen(false);
//   };

//   // Reset errors when the modal is closed
//   useEffect(() => {
//     if (!isOpen) {
//       setErrors({
//         name: '',
//         email: '',
//         roles: '',
//         password: '',
//       });
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-10"
//       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl mb-4">Add User</h2>
//         <div className="flex justify-between">
//         <button
//               type="submit"
//               onClick={handleSubmit}
//               className="bg-blue-500 text-white  h-8 w-20 mr-2 rounded-md"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md"
//             >
//               Cancel
//             </button>
           
//           </div>
//         </div>
//         <form onSubmit={handleSubmit} noValidate>
//           <div className="mb-4">
//             <label htmlFor="name" className="block">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={newUser.name}
//               onChange={handleInputChange}
//               className="border p-2 w-full"
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={newUser.email}
//               onChange={handleInputChange}
//               className="border p-2 w-full"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="role" className="block">Role</label>
//             <select
//         id="role"
//         name="roles"
//         value={newUser.roles}
//         onChange={handleInputChange}
//         className="border p-2 w-full"
//       >
//         <option value="">Select Role</option>
//         {roles.length > 0 ? (
//           roles.map((role) => (
//             <option key={role.id} value={role.roleName}>
//               {role.roleName}
//             </option>
//           ))
//         ) : (
//           <option value="" disabled>
//             Loading roles...
//           </option>
//         )}
//       </select>
//             {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={newUser.password}
//               onChange={handleInputChange}
//               className="border p-2 w-full"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>
          
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserModal;


import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { LoadUserRole } from '@/data/services/userroles-service';

// Define the Zod schema for validation
const userSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  roles: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== '', { message: 'Please select a valid role' }), // Check for empty role
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .refine((val) => val !== '', { message: 'Password is required' }),
});

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (name: string, email: string, roles: string, password: string) => void;
  newUser: { name: string; email: string; roles: string; password: string };
  setNewUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; roles: string; password: string }>>;
  setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backendError: {name: string; email:string};  // Ensure this matches the type you are passing
  setBackendError: React.Dispatch<React.SetStateAction<{name: string; email:string}>>;  // Same here
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, newUser, setNewUser, setDiscardConfirmationOpen,
  backendError,  // Receive the backend error
  setBackendError,  // Receive the function to reset the error
 }) => {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    roles: '',
    password: '',
  });

  const [roles, setRoles] = useState<any[]>([]); // State to store roles

  // Fetch roles from the backend API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await LoadUserRole(); // API function to load roles
        const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
        setRoles(data); // Set the roles in state
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []); // Empty dependency array to run only once on component mount

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    setErrors({
      name: '',
      email: '',
      roles: '',
      password: '',
    });
    setBackendError({name:'', email:'',});  // Reset backend error on close


    e.preventDefault();


    // Validate the newUser data using Zod
    const result = userSchema.safeParse(newUser);

    if (!result.success) {
      // If validation fails, map the errors to the state
      const validationErrors: { name: string; email: string; roles: string; password: string } = {
        name: result.error.format().name?._errors.join(', ') || '',
        email: result.error.format().email?._errors.join(', ') || '',
        roles: result.error.format().roles?._errors.join(', ') || '',
        password: result.error.format().password?._errors.join(', ') || '',
      };

      setErrors(validationErrors);
      return;
    }

    // If validation is successful, proceed with adding the user
    onAddUser(newUser.name, newUser.email, newUser.roles, newUser.password);

    // Close the modal
    onClose();

    // Reset the discard confirmation modal state
    setDiscardConfirmationOpen(false);
  };

  // Reset errors when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setErrors({
        name: '',
        email: '',
        roles: '',
        password: '',
      });
      setBackendError({name:'', email:'',});  // Reset backend error on close
    }      
  }, [isOpen,setBackendError]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-60"
      style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl mb-4">Add User</h2>
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 text-white h-8 w-20 mr-2 rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="">
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
                          <div className="min-h-[1.5rem]">

            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}{backendError?.name && <p className="text-red-500 text-sm">{backendError?.name}</p>}
</div>
          </div>
          <div className="">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
                          <div className="min-h-[1.5rem]">

            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}{backendError?.email && <p className="text-red-500 text-sm">{backendError?.email}</p>}
         </div>
          </div>
          <div className="">
            <label htmlFor="role" className="block">Role</label>
            <select
              id="role"
              name="roles"
              value={newUser.roles}
              onChange={handleInputChange}
              className="border p-2 w-full"
            >
              <option value="">Select Role</option>
              {roles.length > 0 ? (
                roles.map((role) => (
                  <option key={role.id} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading roles...
                </option>
              )}
            </select>
            <div className="min-h-[1.5rem]">

            {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
          </div>
          </div>
          <div className="" >
            <label htmlFor="password" className="block">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
                          <div className="min-h-[1.5rem]">

            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UserModal;
