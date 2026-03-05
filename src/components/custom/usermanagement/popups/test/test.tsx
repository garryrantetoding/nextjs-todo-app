// // // // // import React from 'react';

// // // // // interface UserModalProps {
// // // // //   isOpen: boolean;
// // // // //   onClose: () => void;
// // // // //   onAddUser: (email: string, role: string) => void;
// // // // //   newUser: { name: string; email: string; role: string; password: string };
// // // // //   setNewUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; role: string; password: string }>>;
// // // // // }

// // // // // const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, newUser, setNewUser }) => {
// // // // //   if (!isOpen) return null;

// // // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     const { name, value } = e.target;
// // // // //     setNewUser((prev) => ({ ...prev, [name]: value }));
// // // // //   };

// // // // //   const handleSubmit = () => {
// // // // //     onAddUser(newUser.email, newUser.role);
// // // // //     onClose();  // Close the modal after adding the user
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       className="fixed inset-0 flex justify-center items-center z-20"
// // // // //       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
// // // // //       onClick={onClose}
// // // // //     >
// // // // //       <div
// // // // //         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
// // // // //         onClick={(e) => e.stopPropagation()}
// // // // //       >
// // // // //         <h2 className="text-xl mb-4">Add New User</h2>
// // // // //         <div className="mb-4">
// // // // //           <label>Name</label>
// // // // //           <input
// // // // //             type="text"
// // // // //             name="name"
// // // // //             value={newUser.name}
// // // // //             onChange={handleChange}
// // // // //             className="border p-2 rounded w-full"
// // // // //           />
// // // // //         </div>
// // // // //         <div className="mb-4">
// // // // //           <label>Email</label>
// // // // //           <input
// // // // //             type="email"
// // // // //             name="email"
// // // // //             value={newUser.email}
// // // // //             onChange={handleChange}
// // // // //             className="border p-2 rounded w-full"
// // // // //           />
// // // // //         </div>
// // // // //         <div className="mb-4">
// // // // //           <label>Role</label>
// // // // //           <input
// // // // //             type="text"
// // // // //             name="role"
// // // // //             value={newUser.role}
// // // // //             onChange={handleChange}
// // // // //             className="border p-2 rounded w-full"
// // // // //           />
// // // // //         </div>
// // // // //         <div className="mb-4">
// // // // //           <label>Password</label>
// // // // //           <input
// // // // //             type="password"
// // // // //             name="password"
// // // // //             value={newUser.password}
// // // // //             onChange={handleChange}
// // // // //             className="border p-2 rounded w-full"
// // // // //           />
// // // // //         </div>
// // // // //         <div className="flex justify-between">
// // // // //           <button
// // // // //             onClick={onClose}
// // // // //             className="bg-gray-500 text-white p-2 rounded"
// // // // //           >
// // // // //             Cancel
// // // // //           </button>
// // // // //           <button
// // // // //             onClick={handleSubmit}
// // // // //             className="bg-blue-500 text-white p-2 rounded"
// // // // //           >
// // // // //             Add User
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default UserModal;
// // // // import React, { useState } from 'react';
// // // // import { z } from 'zod';

// // // // // Define the Zod schema for validation
// // // // const userSchema = z.object({
// // // //   name: z.string().min(1, { message: 'Name is required' }),
// // // //   email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
// // // //   role: z.string().min(1, { message: 'Role is required' }),
// // // //   password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).min(1, { message: 'Password is required' }),
// // // // });

// // // // interface UserModalProps {
// // // //   isOpen: boolean;
// // // //   onClose: () => void;
// // // //   onAddUser: (email: string, role: string) => void;
// // // //   newUser: { name: string; email: string; role: string; password: string };
// // // //   setNewUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; role: string; password: string }>>;
// // // // }

// // // // const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, newUser, setNewUser }) => {
// // // //   const [errors, setErrors] = useState({
// // // //     name: '',
// // // //     email: '',
// // // //     role: '',
// // // //     password: '',
// // // //   });

// // // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const { name, value } = e.target;
// // // //     setNewUser((prev) => ({
// // // //       ...prev,
// // // //       [name]: value,
// // // //     }));
// // // //   };

// // // //   const handleSubmit = (e: React.FormEvent) => {
// // // //     e.preventDefault();

// // // //     // Validate the newUser data using Zod
// // // //     const result = userSchema.safeParse(newUser);

// // // //     if (!result.success) {
// // // //       // If validation fails, map the errors to the state
// // // //       const validationErrors: { name: string; email: string; role: string; password: string } = {
// // // //         name: result.error.format().name?._errors.join(', ') || '',
// // // //         email: result.error.format().email?._errors.join(', ') || '',
// // // //         role: result.error.format().role?._errors.join(', ') || '',
// // // //         password: result.error.format().password?._errors.join(', ') || '',
// // // //       };

// // // //       setErrors(validationErrors);
// // // //       return;
// // // //     }

// // // //     // If validation is successful, proceed with adding the user
// // // //     onAddUser(newUser.email, newUser.role);
// // // //     onClose();
// // // //   };

// // // //   if (!isOpen) return null;

// // // //   return (
// // // //     <div
// // // //       className="fixed inset-0 flex justify-center items-center z-10"
// // // //       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
// // // //       onClick={onClose}
// // // //     >
// // // //       <div
// // // //         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
// // // //         onClick={(e) => e.stopPropagation()}
// // // //       >
// // // //         <h2 className="text-xl mb-4">Add New User</h2>
// // // //         <form onSubmit={handleSubmit}>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="name" className="block">Name</label>
// // // //             <input
// // // //               type="text"
// // // //               id="name"
// // // //               name="name"
// // // //               value={newUser.name}
// // // //               onChange={handleInputChange}
// // // //               className="border p-2 w-full"
// // // //             />
// // // //             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="email" className="block">Email</label>
// // // //             <input
// // // //               type="email"
// // // //               id="email"
// // // //               name="email"
// // // //               value={newUser.email}
// // // //               onChange={handleInputChange}
// // // //               className="border p-2 w-full"
// // // //             />
// // // //             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="role" className="block">Role</label>
// // // //             <input
// // // //               type="text"
// // // //               id="role"
// // // //               name="role"
// // // //               value={newUser.role}
// // // //               onChange={handleInputChange}
// // // //               className="border p-2 w-full"
// // // //             />
// // // //             {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
// // // //           </div>
// // // //           <div className="mb-4">
// // // //             <label htmlFor="password" className="block">Password</label>
// // // //             <input
// // // //               type="password"
// // // //               id="password"
// // // //               name="password"
// // // //               value={newUser.password}
// // // //               onChange={handleInputChange}
// // // //               className="border p-2 w-full"
// // // //             />
// // // //             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
// // // //           </div>
// // // //           <div className="flex justify-between">
// // // //             <button
// // // //               type="button"
// // // //               onClick={onClose}
// // // //               className="bg-gray-500 text-white p-2 rounded"
// // // //             >
// // // //               Cancel
// // // //             </button>
// // // //             <button
// // // //               type="submit"
// // // //               className="bg-blue-500 text-white p-2 rounded"
// // // //             >
// // // //               Add User
// // // //             </button>
// // // //           </div>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default UserModal;
// // // import React, { useState, useEffect } from 'react';
// // // import { z } from 'zod';

// // // // Define the Zod schema for validation
// // // const userSchema = z.object({
// // //   name: z.string().min(1, { message: 'Name is required' }),
// // //   email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
// // //   role: z.string().min(1, { message: 'Role is required' }),
// // //   password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).min(1, { message: 'Password is required' }),
// // // });

// // // interface UserModalProps {
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   onAddUser: (email: string, role: string) => void;
// // //   newUser: { name: string; email: string; role: string; password: string };
// // //   setNewUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; role: string; password: string }>>;
// // // }

// // // const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, newUser, setNewUser }) => {
// // //   const [errors, setErrors] = useState({
// // //     name: '',
// // //     email: '',
// // //     role: '',
// // //     password: '',
// // //   });

// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const { name, value } = e.target;
// // //     setNewUser((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     // Validate the newUser data using Zod
// // //     const result = userSchema.safeParse(newUser);

// // //     if (!result.success) {
// // //       // If validation fails, map the errors to the state
// // //       const validationErrors: { name: string; email: string; role: string; password: string } = {
// // //         name: result.error.format().name?._errors.join(', ') || '',
// // //         email: result.error.format().email?._errors.join(', ') || '',
// // //         role: result.error.format().role?._errors.join(', ') || '',
// // //         password: result.error.format().password?._errors.join(', ') || '',
// // //       };

// // //       setErrors(validationErrors);
// // //       return;
// // //     }

// // //     // If validation is successful, proceed with adding the user
// // //     onAddUser(newUser.email, newUser.role);
// // //     onClose();
// // //   };

// // //   // Reset errors when the modal is closed
// // //   useEffect(() => {
// // //     if (!isOpen) {
// // //       setErrors({
// // //         name: '',
// // //         email: '',
// // //         role: '',
// // //         password: '',
// // //       });
// // //     }
// // //   }, [isOpen]);

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div
// // //       className="fixed inset-0 flex justify-center items-center z-10"
// // //       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
// // //       onClick={onClose}
// // //     >
// // //       <div
// // //         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
// // //         onClick={(e) => e.stopPropagation()}
// // //       >
// // //         <h2 className="text-xl mb-4">Add New User</h2>
// // //         <form onSubmit={handleSubmit}>
// // //           <div className="mb-4">
// // //             <label htmlFor="name" className="block">Name</label>
// // //             <input
// // //               type="text"
// // //               id="name"
// // //               name="name"
// // //               value={newUser.name}
// // //               onChange={handleInputChange}
// // //               className="border p-2 w-full"
// // //             />
// // //             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="email" className="block">Email</label>
// // //             <input
// // //               type="email"
// // //               id="email"
// // //               name="email"
// // //               value={newUser.email}
// // //               onChange={handleInputChange}
// // //               className="border p-2 w-full"
// // //             />
// // //             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="role" className="block">Role</label>
// // //             <input
// // //               type="text"
// // //               id="role"
// // //               name="role"
// // //               value={newUser.role}
// // //               onChange={handleInputChange}
// // //               className="border p-2 w-full"
// // //             />
// // //             {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
// // //           </div>
// // //           <div className="mb-4">
// // //             <label htmlFor="password" className="block">Password</label>
// // //             <input
// // //               type="password"
// // //               id="password"
// // //               name="password"
// // //               value={newUser.password}
// // //               onChange={handleInputChange}
// // //               className="border p-2 w-full"
// // //             />
// // //             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
// // //           </div>
// // //           <div className="flex justify-between">
// // //             <button
// // //               type="button"
// // //               onClick={onClose}
// // //               className="bg-gray-500 text-white p-2 rounded"
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               className="bg-blue-500 text-white p-2 rounded"
// // //             >
// // //               Add User
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserModal;
// // import React, { useState, useEffect } from 'react';
// // import { z } from 'zod';

// // // Define the Zod schema for validation
// // const userSchema = z.object({
// //   name: z.string().min(1, { message: 'Name is required' }),
// //   email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
// //   role: z.string().min(1, { message: 'Role is required' }),
// //   password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).min(1, { message: 'Password is required' }),
// // });

// // interface UserModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onAddUser: (email: string, role: string) => void;
// //   newUser: { name: string; email: string; role: string; password: string };
// //   setNewUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; role: string; password: string }>>;
// //   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>; // Add this prop
// // }

// // const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, newUser, setNewUser, setDiscardConfirmationOpen }) => {
// //   const [errors, setErrors] = useState({
// //     name: '',
// //     email: '',
// //     role: '',
// //     password: '',
// //   });

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setNewUser((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // Validate the newUser data using Zod
// //     const result = userSchema.safeParse(newUser);

// //     if (!result.success) {
// //       // If validation fails, map the errors to the state
// //       const validationErrors: { name: string; email: string; role: string; password: string } = {
// //         name: result.error.format().name?._errors.join(', ') || '',
// //         email: result.error.format().email?._errors.join(', ') || '',
// //         role: result.error.format().role?._errors.join(', ') || '',
// //         password: result.error.format().password?._errors.join(', ') || '',
// //       };

// //       setErrors(validationErrors);
// //       return;
// //     }

// //     // If validation is successful, proceed with adding the user
// //     onAddUser(newUser.email, newUser.role);

// //     // Close the modal
// //     onClose();

// //     // Reset the discard confirmation modal state
// //     setDiscardConfirmationOpen(false); // Close the discard confirmation modal here
// //   };

// //   // Reset errors when the modal is closed
// //   useEffect(() => {
// //     if (!isOpen) {
// //       setErrors({
// //         name: '',
// //         email: '',
// //         role: '',
// //         password: '',
// //       });
// //     }
// //   }, [isOpen]);

// //   if (!isOpen) return null;

// //   return (
// //     <div
// //       className="fixed inset-0 flex justify-center items-center z-10"
// //       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <h2 className="text-xl mb-4">Add New User</h2>
// //         <form onSubmit={handleSubmit}>
// //           <div className="mb-4">
// //             <label htmlFor="name" className="block">Name</label>
// //             <input
// //               type="text"
// //               id="name"
// //               name="name"
// //               value={newUser.name}
// //               onChange={handleInputChange}
// //               className="border p-2 w-full"
// //             />
// //             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="email" className="block">Email</label>
// //             <input
// //               type="email"
// //               id="email"
// //               name="email"
// //               value={newUser.email}
// //               onChange={handleInputChange}
// //               className="border p-2 w-full"
// //             />
// //             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="role" className="block">Role</label>
// //             <input
// //               type="text"
// //               id="role"
// //               name="role"
// //               value={newUser.role}
// //               onChange={handleInputChange}
// //               className="border p-2 w-full"
// //             />
// //             {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
// //           </div>
// //           <div className="mb-4">
// //             <label htmlFor="password" className="block">Password</label>
// //             <input
// //               type="password"
// //               id="password"
// //               name="password"
// //               value={newUser.password}
// //               onChange={handleInputChange}
// //               className="border p-2 w-full"
// //             />
// //             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
// //           </div>
// //           <div className="flex justify-between">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="bg-gray-500 text-white p-2 rounded"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="bg-blue-500 text-white p-2 rounded"
// //             >
// //               Add User
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UserModal;
// import React, { useState, useEffect } from 'react';
// import { z } from 'zod';

// // Define the Zod schema for validation
// const userSchema = z.object({
//   name: z.string().min(1, { message: 'Name is required' }),
//   email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
//   role: z.string().min(1, { message: 'Role is required' }),
//   password: z.string().min(6, { message: 'Password must be at least 6 characters long' }).min(1, { message: 'Password is required' }),
// });

// interface UserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddUser: (name: string, email: string, role: string) => void;
//   newUser: { name: string; email: string; role: string; password: string };
//   setNewUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; role: string; password: string }>>;
//   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddUser, newUser, setNewUser, setDiscardConfirmationOpen }) => {
//   const [errors, setErrors] = useState({
//     name: '',
//     email: '',
//     role: '',
//     password: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate the newUser data using Zod
//     const result = userSchema.safeParse(newUser);

//     if (!result.success) {
//       // If validation fails, map the errors to the state
//       const validationErrors: { name: string; email: string; role: string; password: string } = {
//         name: result.error.format().name?._errors.join(', ') || '',
//         email: result.error.format().email?._errors.join(', ') || '',
//         role: result.error.format().role?._errors.join(', ') || '',
//         password: result.error.format().password?._errors.join(', ') || '',
//       };

//       setErrors(validationErrors);
//       return;
//     }

//     // If validation is successful, proceed with adding the user
//     onAddUser(newUser.name, newUser.email, newUser.role);

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
//         role: '',
//         password: '',
//       });
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center z-10"
//       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 className="text-xl mb-4">Add New User</h2>
//         <form onSubmit={handleSubmit}>
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
//               name="role"
//               value={newUser.role}
//               onChange={handleInputChange}
//               className="border p-2 w-full"
//             >
//               <option value="">Select Role</option>
//               <option value="Owner">Owner</option>
//               <option value="Approver">Approver</option>
//               <option value="Staff">Staff</option>
//             </select>
//             {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
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
//           <div className="flex justify-between">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white p-2 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white p-2 rounded"
//             >
//               Add User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserModal;
// // // import React, { useState } from 'react';
// // // import { Person } from '../list';  // Adjust the path if necessary

// // // interface ModalProps {
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   person: Person;
// // //   isEditing: boolean;
// // //   onEdit: () => void;
// // //   editPerson: Person | null;
// // //   setEditPerson: React.Dispatch<React.SetStateAction<Person | null>>;
// // //   onSave: () => void;
// // //   onCancel: () => void;
// // // }

// // // const Modal: React.FC<ModalProps> = ({ isOpen, onClose, person, isEditing, onEdit, editPerson, setEditPerson, onSave, onCancel }) => {
// // //   if (!isOpen) return null;

// // //   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Person) => {
// // //   //   if (editPerson) {
// // //   //     setEditPerson({
// // //   //       ...editPerson,
// // //   //       [field]: e.target.value,
// // //   //     });
// // //   //   }
// // //   // };

// // //   return (
// // //     <div
// // //       className="fixed inset-0 flex justify-center items-center z-10"
// // //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// // //       onClick={onClose}
// // //     >
// // //       <div
// // //         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
// // //         onClick={(e) => e.stopPropagation()}
// // //       >
// // //         <h2 className="text-xl mb-4">Details for user</h2>

       
// // //        {/* Name and Email Section */}
// // //     <div className="mb-4 flex justify-between">
// // //       <div className="w-1/2">
// // //         <div className="mb-2">
// // //           <strong>Name:</strong>
// // //         </div>
// // //         <div className="overflow-x-auto">
// // //           <p className="whitespace-nowrap">{person.Name}</p>
// // //         </div>
// // //       </div>
// // //       <div className="w-1/2">
// // //         <div className="mb-2">
// // //           <strong>Email:</strong>
// // //         </div>
// // //         <div className="overflow-x-auto">
// // //           <p className="whitespace-nowrap">{person.Email}</p>
// // //         </div>
// // //       </div>
// // //     </div>

// // //     {/* Role Section */}
// // //     <div className="mb-4">
// // //       <div className="mb-2">
// // //         <strong>Role:</strong>
// // //       </div>
// // //       <p>{person.Role}</p>
// // //     </div>


// // //     <button onClick={onEdit} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button>
    

// // //         <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mt-4">Close</button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Modal;

// // import React, { useState, useEffect } from 'react';
// // import { UserDetail } from '@/data/services/usermanagement-service';

// // interface Person {
// //   id: number;
// //   Name: string;
// //   Email: string;
// //   Role: string;
// // }

// // // interface ModalProps {
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   selectedPerson: Person | null;
// // //   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // //   isEditing: boolean;
// // //   onEdit: () => void;
// // //   onSave: () => void;
// // //   onCancel: () => void;
// // // }
// // interface ModalProps {
// //     isOpen: boolean;
// //     onClose: () => void;
// //     person: Person;
// //     isEditing: boolean;
// //     onEdit: () => void;
// //     editPerson: Person | null;
// //     setEditPerson: React.Dispatch<React.SetStateAction<Person | null>>;
// //     onSave: () => void;
// //     onCancel: () => void;
// //   }


// // //   onClose: () => void;
// // //   person: Person;
// // //   isEditing: boolean;
// // //   onEdit: () => void;
// // //   editPerson: Person | null;
// // //   setEditPerson: React.Dispatch<React.SetStateAction<Person | null>>;
// // //   onSave: () => void;
// // //   onCancel: () => void;
// // // }

// // // isOpen, onClose, person, isEditing, onEdit, editPerson, setEditPerson, onSave, onCancel 
// // const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedPerson, setIsModalOpen, isEditing, onEdit, onSave, onCancel  }) => {
// //   const [personDetails, setPersonDetails] = useState<Person | null>(null);

// //   // Fetch the latest user details when the modal opens
// //   useEffect(() => {
// //     if (isOpen && selectedPerson) {
// //       const fetchUserDetails = async () => {
// //         try {
// //           const response = await UserDetail()
// //           const data = response.data;

// //           // Assuming data is returned as { Name, Email, Role }
// //           setPersonDetails({
// //             Name: data.Name,
// //             Email: data.Email,
// //             Role: data.Role
// //           });
// //         } catch (error) {
// //           console.error('Error fetching user details:', error);
// //         }
// //       };

// //       fetchUserDetails();
// //     }
// //   }, [isOpen, selectedPerson]);

// //   // Update editPerson state when user starts editing
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Person) => {
// //     if (editPerson) {
// //       setEditPerson({
// //         ...editPerson,
// //         [field]: e.target.value,
// //       });
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div
// //       className="fixed inset-0 flex justify-center items-center z-10"
// //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <h2 className="text-xl mb-4">Details for user</h2>

// //         {/* Display the user details */}
// //         {personDetails && (
// //           <>
// //             <div className="mb-4 flex justify-between">
// //               <div className="w-1/2">
// //                 <div className="mb-2">
// //                   <strong>Name:</strong>
// //                 </div>
// //                 <div className="overflow-x-auto">
// //                   <p className="whitespace-nowrap">{personDetails.Name}</p>
// //                 </div>
// //               </div>
// //               <div className="w-1/2">
// //                 <div className="mb-2">
// //                   <strong>Email:</strong>
// //                 </div>
// //                 <div className="overflow-x-auto">
// //                   <p className="whitespace-nowrap">{personDetails.Email}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Role Section */}
// //             <div className="mb-4">
// //               <div className="mb-2">
// //                 <strong>Role:</strong>
// //               </div>
// //               <p>{personDetails.Role}</p>
// //             </div>

// //             <button onClick={onEdit} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button>
// //           </>
// //         )}

// //         <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mt-4">Close</button>
// //       </div>
// //     </div>
// //   );
// // };

// // // export default Modal;
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Person } from '../list';  // Adjust the path if necessary
// // import { UserDetail } from '@/data/services/usermanagement-service';

// // interface ModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   selectedPerson: Person | null;
// //   isEditing: boolean;
// //   onEdit: () => void;
// //   editPerson: Person | null;
// //   setEditPerson: React.Dispatch<React.SetStateAction<Person | null>>;
// //   onSave: () => void;
// //   onCancel: () => void;
// // }

// // const Modal: React.FC<ModalProps> = ({
// //   isOpen,
// //   onClose,
// //   selectedPerson,
// //   isEditing,
// //   onEdit,
// //   editPerson,
// //   setEditPerson,
// //   onSave,
// //   onCancel
// // }) => {
// //   const [personDetails, setPersonDetails] = useState<Person | null>(null);

// //   // Fetch the latest user details when the modal opens
// //   useEffect(() => {
// //     if (isOpen && selectedPerson) {
// //       const fetchUserDetails = async () => {
// //         try {
// //           const response = await UserDetail()

// //           // Assuming data is returned as { Name, Email, Role }
// //           setPersonDetails({
// //             Name: response.Name,
// //             Email: response.Email,
// //             Role: response.Role
// //           });
// //         } catch (error) {
// //           console.error('Error fetching user details:', error);
// //         }
// //       };

// //       fetchUserDetails();
// //     }
// //   }, [isOpen, selectedPerson]);

// //   // Update editPerson state when user starts editing
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Person) => {
// //     if (editPerson) {
// //       setEditPerson({
// //         ...editPerson,
// //         [field]: e.target.value,
// //       });
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div
// //       className="fixed inset-0 flex justify-center items-center z-10"
// //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-white p-6 rounded-lg shadow-lg w-1/3"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <h2 className="text-xl mb-4">Details for user</h2>

// //         {/* Display the user details */}
// //         {personDetails && (
// //           <>
// //             <div className="mb-4 flex justify-between">
// //               <div className="w-1/2">
// //                 <div className="mb-2">
// //                   <strong>Name:</strong>
// //                 </div>
// //                 <div className="overflow-x-auto">
// //                   <p className="whitespace-nowrap">{personDetails.Name}</p>
// //                 </div>
// //               </div>
// //               <div className="w-1/2">
// //                 <div className="mb-2">
// //                   <strong>Email:</strong>
// //                 </div>
// //                 <div className="overflow-x-auto">
// //                   <p className="whitespace-nowrap">{personDetails.Email}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Role Section */}
// //             <div className="mb-4">
// //               <div className="mb-2">
// //                 <strong>Role:</strong>
// //               </div>
// //               <p>{personDetails.Role}</p>
// //             </div>

// //             <button onClick={onEdit} className="bg-blue-500 text-white p-2 rounded mt-4">Edit</button>
// //           </>
// //         )}

// //         <button onClick={onClose} className="bg-red-500 text-white p-2 rounded mt-4">Close</button>
// //       </div>
// //     </div>
// //   );
// // };