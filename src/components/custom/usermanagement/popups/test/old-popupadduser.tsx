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
//   .refine((val) => val !== Role.Empty, { message: 'Please select a valid role' }), // Check for empty role
// password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).refine((val) => val !== '', {
//     message: 'Password is required',
//   }),});


// interface UserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddUser: (name: string, email: string, roles: string, password: string) => void;
//   newUser: { name: string; email: string; roles: string; password: string };
//   setNewUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; roles: Role; password: string }>>;
//   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }


// const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, newUser, setNewUser, setDiscardConfirmationOpen }) => {
//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     roles: '',
//     password: '',
//   });

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
//               id="role"
//               name="roles"
//               value={newUser.roles}
//               onChange={handleInputChange}
//               className="border p-2 w-full"
//             >
//               <option value={Role.Empty}>Select Role</option>
//               <option value={Role.Owner}>Owner</option>
//               <option value={Role.Approver}>Approver</option>
//               <option value={Role.Staff}>Staff</option>
//             </select>
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
