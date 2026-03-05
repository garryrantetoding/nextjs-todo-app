// // src/components/custom/role-filter.tsx

// import React, { useState, useEffect } from 'react';
// import { LoadRole } from '@/data/services/userroles-service';

// interface RoleFilterProps {
//   onRoleChange: (role: string) => void;
// }

// const RoleFilter: React.FC<RoleFilterProps> = ({ onRoleChange }) => {
//     const [roles, setRoles] = useState<any[]>([]); // State to store roles
//     const [selectedRole, setSelectedRole] = useState("");
  
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     onRoleChange(event.target.value);
//   };


//     // Fetch roles from the backend API
//     useEffect(() => {
//       const fetchRoles = async () => {
//         try {
//           const response = await LoadRole(); // API function to load roles
//           const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
//           setRoles(data); // Set the roles in state
//         } catch (error) {
//           console.error('Error fetching roles:', error);
//         }
//       };
  
//       fetchRoles();
//     }, []); // Empty dependency array to run only once on component mount
  
   
//   return (
//     <div>
//       <label htmlFor="role-filter"></label>
//       {roles && (
//         <select id="role-filter" onChange={handleChange} 
//         // className="border h-10 p-2 bg-white rounded-md text-red-900"
//          value={selectedRole} // Track the selected value
//     className={`border h-10 p-2 bg-white rounded-md ${selectedRole === "" ? 'text-red-900' : 'text-black'}`}

//       >
//         {/* <option value="">Role</option>
//         <option value="Owner">Owner</option>
//         <option value="Approver">Approver</option>
//         <option value="Staff">Staff</option> */}

// <option value="" >Role</option>
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
//         {/* Add more roles if needed */}
//       </select>)}

      
//     </div>
//   );
// };

// export default RoleFilter;

import React, { useState, useEffect } from 'react';
import { LoadUserRole } from '@/data/services/userroles-service';

interface RoleFilterProps {
  onRoleChange: (role: string) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({ onRoleChange }) => {
  const [roles, setRoles] = useState<any[]>([]); // State to store roles
  const [selectedRole, setSelectedRole] = useState<string>(''); // State for selected role

  // Handle role change, update both local state and notify parent
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedRole(selected); // Update local state
    onRoleChange(selected); // Notify parent component of the change
  };

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

  // Define styles for conditional text color
  const selectStyle = {
    color: selectedRole === "" ? '#adadad' : 'black', // Apply red color if no role is selected
  };

  return (
    <div>
      <label htmlFor="role-filter"></label>
      {roles && (
        <select
          id="role-filter"
          onChange={handleChange} // Handle change event
          value={selectedRole} // Bind the value to the selected role state
          className={`border h-10 p-2 bg-white rounded-md `}
          style={selectStyle} // Apply the conditional style for text color
        >
          {/* Default empty option */}
          <option value="">Role</option>

          {/* Display roles dynamically */}
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
      )}
    </div>
  );
};

export default RoleFilter;
