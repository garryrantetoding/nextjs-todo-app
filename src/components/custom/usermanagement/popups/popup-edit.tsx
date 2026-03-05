// import React, { useState, useEffect } from 'react';
// import { Person } from '../UserList';  // Adjust the path if necessary
// import { Role } from '@/data/services/enum';
// import { LoadRole } from '@/data/services/userroles-service';

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   editPerson: Person | null;
//   setEditPerson: React.Dispatch<React.SetStateAction<Person | null>>;
//   onSave: () => void;
//   onCancel: () => void;
// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, editPerson, setEditPerson, onSave, onCancel }) => {

//     if (!isOpen || !editPerson) return null; // Don't render the modal if not open or no person to edit

//     const [roles, setRoles] = useState<any[]>([]); // State to store roles
    
//       // Fetch roles from the backend API
//       useEffect(() => {
//         const fetchRoles = async () => {
//           try {
//             const response = await LoadRole(); // API function to load roles
//             const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
//             setRoles(data); // Set the roles in state
//           } catch (error) {
//             console.error('Error fetching roles:', error);
//           }
//         };
    
//         fetchRoles();
//       }, []); // Empty dependency array to run only once on component mount

//   const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     if (editPerson && setEditPerson) {
//       // const roleValue = e.target.value as keyof typeof Role; // Cast the string to a valid Role enum key
//       const roleValue = e.target.value ;

//       setEditPerson({
//         ...editPerson,
//         // roles: Role[roleValue], // Assign the corresponding enum value
//         roles: roleValue, // Assign the corresponding enum value

//       });
//     }
//   };


//   return (
//     <div className="fixed inset-0 flex justify-center items-center z-20" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
      
      
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//       <div className="flex justify-between items-center mb-4">
//       <h2 className="text-xl mb-4">Edit User</h2> 
//       <div className="flex items-center">
//           <button onClick={onSave} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
//             Save
//           </button>
//           <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
//             Cancel
//           </button>
//         </div>
//         </div>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={editPerson.name || ''}
//             onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
//             className="p-2 border rounded w-full"
//           />
//         </div>
//         <div className="mt-2">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={editPerson.email}
//             onChange={(e) => setEditPerson({ ...editPerson, email: e.target.value })}
//             className="p-2 border rounded w-full"
//             disabled
//           />
//         </div>
//         <div className="mt-2">
//           <label>Role:</label>
//           <select
//             value={editPerson.roles || ''}
//             onChange={handleRoleChange}
//             className="p-2 border rounded w-full"
//           >
//             {/* <option value="Owner">Owner</option>
//             <option value="Approver">Approver</option>
//             <option value="Staff">Staff</option> */}
//              <option value="">Select Role</option>
//               {roles.length > 0 ? (
//                 roles.map((role) => (
//                   <option key={role.id} value={role.roleName}>
//                     {role.roleName}
//                   </option>
//                 ))
//               ) : (
//                 <option value="" disabled>
//                   Loading roles...
//                 </option>
//               )}
//           </select>
//         </div>
        
//       </div>
      
//     </div>
//   );
// };

// export default EditModal;

"use client";
import React, { useState, useEffect } from 'react';
import { Person } from '../UserList';  // Adjust the path if necessary
import { LoadUserRole } from '@/data/services/userroles-service';
import { z } from 'zod';

// Define the Zod schema for validation
const editSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  roles: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== '', { message: 'Please select a valid role' }), // Check for empty role
  
});
interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editPerson: Person | null;
  setEditPerson: React.Dispatch<React.SetStateAction<Person | null>>;
  onSave: () => void;
  onCancel: () => void;
  backendError: { name: string; }; // For backend error display
  setBackendError: React.Dispatch<React.SetStateAction<{ name: string; }>>; // To reset the backend error

}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, editPerson, setEditPerson, onSave, onCancel,  backendError,
  setBackendError,}) => {

  const [roles, setRoles] = useState<any[]>([]); // State to store roles
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [validationErrors, setValidationErrors] = useState<{ name: string; roles: string }>({
    name: '', roles:'',
  }); // State to store Zod validation errors

  // Fetch roles from the backend API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await LoadUserRole(); // API function to load roles
        const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
        setRoles(data); // Set the roles in state
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchRoles();
  }, []); // Empty dependency array to run only once on component mount

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editPerson && setEditPerson) {
      const roleValue = e.target.value;

      setEditPerson({
        ...editPerson,
        roles: roleValue, // Assign the corresponding enum value
      });
    }
  };

  const handleSave = async () => {
    // Validate the form using Zod
    const result = editSchema.safeParse(editPerson);

    if (!result.success) {
      // If validation fails, map the errors to the state
      const errors = {
        name: result.error.format().name?._errors.join(', ') || '',
        roles: result.error.format().roles?._errors.join(', ') || '',

      };

      setValidationErrors(errors);
      return; // Prevent saving if validation fails
    }

    // If validation is successful, proceed with saving
    onSave();
    setBackendError({ name: '' }); // Clear backend errors on save
  };


  // Reset errors when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setValidationErrors({ name: '', roles:'', }); // Reset validation errors
      setBackendError({ name: '' }); // Reset backend errors
    }
  }, [isOpen, setBackendError]);

  if (!isOpen || !editPerson) return null; // Don't render the modal if not open or no person to edit

  return (
    <div className="fixed inset-0 flex justify-center items-center z-65" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl mb-4">Edit User</h2>
          <div className="flex items-center">
            <button onClick={handleSave} className="bg-blue-500 text-white rounded-md mr-2 h-8 w-20">
              Save
            </button>
            <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
              Cancel
            </button>
          </div>
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={editPerson.name || ''}
            onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
            className="p-2 border rounded w-full"
          />
             <div className="min-h-[1.25rem]">
             {validationErrors.name && <p className="text-red-500 text-sm">{validationErrors.name}</p>}
          {backendError.name && <p className="text-red-500 text-sm">{backendError.name}</p>}
          </div>

        </div>
        <div className="mt-2">
          <label>Email:</label>
          <input
            type="email"
            value={editPerson.email}
            onChange={(e) => setEditPerson({ ...editPerson, email: e.target.value })}
            className="p-2 border rounded w-full"
            disabled
          />
                       <div className="min-h-[1.25rem]"></div>

        </div>
        <div className="mt-2">
          <label>Role:</label>
          <select
            value={editPerson.roles || ''}
            onChange={handleRoleChange}
            className="p-2 border rounded w-full"
            disabled={loading} // Disable select while loading
          >
            {loading ? (
              <option value="" disabled>
                Loading roles...
              </option>
            ) : (
              <>
                <option value="">Select Role</option> {/* This is now rendered only after roles are loaded */}
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <option key={role.id} value={role.roleName}>
                      {role.roleName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No roles available
                  </option>
                )}
              </>
            )}
          </select>
          <div className="min-h-[1.25rem]">
          {validationErrors.roles && <p className="text-red-500 text-sm">{validationErrors.roles}</p>}
</div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
