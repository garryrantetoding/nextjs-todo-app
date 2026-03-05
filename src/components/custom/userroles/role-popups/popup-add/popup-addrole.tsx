// // export default UserModal;
// import React, { useState, useEffect } from 'react';
// import { z } from 'zod';
// import { Role } from '@/data/services/enum';

// // Define the Zod schema for validation
// const roleSchema = z.object({
//   roleName: z.string().min(1, { message: 'Name is required' }),
//   description: z.string().min(1, { message: 'Description is required' }).refine((val) => val !== '', {
//     message: 'Description is required',
//   }),});

// interface AddRoleModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddRole: (roleName: string, description: string) => void;
//   newRole: { roleName: string; description: string};
//   setNewRole: React.Dispatch<React.SetStateAction<{ roleName: string; description: string}>>;
//   setDiscardRoleConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen, onClose, onAddRole, newRole, setNewRole, setDiscardRoleConfirmationOpen }) => {
//   const [errors, setErrors] = useState({
//     roleName: '',
//     description: '',
//   });

//   const handleRoleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//   setNewRole((prev) => {
//     // console.log(`Updating ${name} to ${value}`); // Log to check if password is being updated
//     return {
//       ...prev,
//       [name]: value,
//     };
//   });
// };

//   const handleRoleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate the newUser data using Zod
//     const result = roleSchema.safeParse(newRole);

//     if (!result.success) {
//       // console.log("fieshf",result.error);
//       // If validation fails, map the errors to the state
//       const validationErrors: { roleName: string; description: string} = {
//         roleName: result.error.format().roleName?._errors.join(', ') || '',
//         description: result.error.format().description?._errors.join(', ') || '',
//       };
// // console.log("hifehsf",validationErrors);
//       setErrors(validationErrors);
//       return;
//     }

//     // If validation is successful, proceed with adding the user
//     onAddRole(newRole.roleName, newRole.description);

//     // Close the modal
//     onClose();

//     // Reset the discard confirmation modal state
//     setDiscardRoleConfirmationOpen(false);
//   };

//   // Reset errors when the modal is closed
//   useEffect(() => {
//     if (!isOpen) {
//       setErrors({
//         roleName: '',
//         description: '',
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
//         <h2 className="text-xl mb-4">Add Role</h2>
//         <div className="flex justify-between">
//         <button
//               type="submit"
//               onClick={handleRoleSubmit}
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
//         <form onSubmit={handleRoleSubmit} noValidate>
//           <div className="mb-4">
//             <label htmlFor="roleName" className="block">Role</label>
//             <input
//               type="text"
//               id="roleName"
//               name="roleName"
//               value={newRole.roleName}
//               onChange={handleRoleInputChange}
//               className="border p-2 w-full"
//             />
//             {errors.roleName && <p className="text-red-500 text-sm">{errors.roleName}</p>}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block">Email</label>
//             <input
//               type="text"
//               id="description"
//               name="description"
//               value={newRole.description}
//               onChange={handleRoleInputChange}
//               className="border p-2 w-full"
//             />
//             {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//           </div>
          
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddRoleModal;

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { Role } from '@/data/services/enum';



// Define the Zod schema for validation
const roleSchema = z.object({
  roleName: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }).refine((val) => val !== '', {
    message: 'Description is required',
  }),
  boxColor: z.string().min(1, { message: 'Background color is required' }),
  roleColor: z.string().min(1, { message: 'Text color is required' }),
}).refine((data) => data.boxColor !== data.roleColor, {
  message: 'Background color and text color cannot be the same',
  path: ['roleColor'], // This will mark the `textColor` as invalid if it matches `boxColor`
});


interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRole: (roleName: string, description: string, boxColor: string, roleColor: string,    RolePermission:string[],
  ) => void;
  newRole: { roleName: string; description: string; boxColor: string, roleColor: string,    RolePermission:string[],
  };
  setNewRole: React.Dispatch<React.SetStateAction<{ roleName: string; description: string; boxColor: string, roleColor: string,    RolePermission:string[],
  }>>;
  setDiscardRoleConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;

    backendError: {roleName: string};  // Ensure this matches the type you are passing
    setBackendError: React.Dispatch<React.SetStateAction<{roleName: string}>>;  // Same here
}

const AddRoleModal: React.FC<AddRoleModalProps> = ({ isOpen, onClose, onAddRole, newRole, setNewRole, setDiscardRoleConfirmationOpen,
  backendError,  // Receive the backend error
  setBackendError,  // Receive the function to reset the error
 }) => {
  const [errors, setErrors] = useState({
    roleName: '',
    description: '',
    boxColor: '',
    roleColor: '',
  });

  const handleRoleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSubmit = (e: React.FormEvent) => {
    setErrors({
      roleName: '',
      description: '',
      boxColor: '',
      roleColor: '',
    });
    setBackendError({roleName:''});  // Reset backend error on close


    e.preventDefault();

    // Ensure the colors default to black if empty
    const roleData = {
      ...newRole,
      boxColor: newRole.boxColor || '#000000',  // Default to black if empty
      roleColor: newRole.roleColor || '#000000',  // Default to black if empty
    };

    // Validate the newUser data using Zod
    const result = roleSchema.safeParse(roleData);

    if (!result.success) {
      const validationErrors: { roleName: string; description: string; boxColor: string, roleColor: string } = {
        roleName: result.error.format().roleName?._errors.join(', ') || '',
        description: result.error.format().description?._errors.join(', ') || '',
        boxColor: result.error.format().boxColor?._errors.join(', ') || '',
        roleColor: result.error.format().roleColor?._errors.join(', ') || '',
      };
      setErrors(validationErrors);
      return;
    }

    // If validation is successful, proceed with adding the role
    onAddRole(roleData.roleName, roleData.description, roleData.boxColor, roleData.roleColor, roleData.RolePermission);

    // Close the modal
    onClose();

    // Reset the discard confirmation modal state
    setDiscardRoleConfirmationOpen(false);
  };

  // Reset errors when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setErrors({
        roleName: '',
        description: '',
        boxColor: '',
        roleColor: '',
      });
      setBackendError({roleName:''});  // Reset backend error on close

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
          <h2 className="text-xl mb-4">Add Role</h2>
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={handleRoleSubmit}
              className="bg-blue-500 text-white  h-8 w-20 mr-2 rounded-md"
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
        <form onSubmit={handleRoleSubmit} noValidate>
          <div className="">
            <label htmlFor="roleName" className="block">Role</label>
            <input
              type="text"
              id="roleName"
              name="roleName"
              value={newRole.roleName}
              onChange={handleRoleInputChange}
              className="border p-2 w-full"
            />
            <div className="min-h-[1.5rem]">
            {errors.roleName && <p className="text-red-500 text-sm">{errors.roleName}</p>}

{backendError?.roleName && <p className="text-red-500 text-sm">{backendError?.roleName}</p>}
</div>
          </div>
          <div className="">
            <label htmlFor="description" className="block">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newRole.description}
              onChange={handleRoleInputChange}
              className="border p-2 w-full"
            />
            <div className="min-h-[1.5rem]">
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
          </div>
          
          {/* Background color picker */}
          <div className="">
            <label htmlFor="boxColor" className="block">Background Color</label>
            <input
              type="color"
              id="boxColor"
              name="boxColor"
              value={newRole.boxColor}
              onChange={handleRoleInputChange}
              className="border p-2 w-full"
            />
                 <div className="min-h-[1.5rem]">
            {errors.boxColor && <p className="text-red-500 text-sm">{errors.boxColor}</p>}
            </div>
          </div>
          
          {/* Text color picker */}
          <div className="">
            <label htmlFor="roleColor" className="block">Text Color</label>
            <input
              type="color"
              id="roleColor"
              name="roleColor"
              value={newRole.roleColor}
              onChange={handleRoleInputChange}
              className="border p-2 w-full"
            />
              <div className="min-h-[1.5rem]">
            {errors.roleColor && <p className="text-red-500 text-sm">{errors.roleColor}</p>}
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;
