// src/components/custom/role-filter.tsx

import React, { useState, useEffect } from 'react';
import { LoadUserRole } from '@/data/services/userroles-service';

interface ChooseRoleProps {
  onRoleChange: (roles: string) => void;
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ onRoleChange }) => {
    const [TaskRoles, setTaskRoles] = useState<any[]>([]); // State to store roles
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRoleChange(event.target.value);
  };


    // Fetch roles from the backend API
    useEffect(() => {
      const fetchRoles = async () => {
        try {
          const response = await LoadUserRole(); // API function to load roles
          const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
          setTaskRoles(data); // Set the roles in state
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      };
  
      fetchRoles();
    }, []); // Empty dependency array to run only once on component mount
  
   
  return (
    <div>
      <label htmlFor="role-filter"></label>
      {TaskRoles && (<select id="role-filter" onChange={handleChange} className="rounded-md h-8 pl-2 pr-12 w-40 mr-2 text-black border-solid border-1 border-black bg-white"
      >
        {/* <option value="">Role</option>
        <option value="Owner">Owner</option>
        <option value="Approver">Approver</option>
        <option value="Staff">Staff</option> */}

<option value="">Role</option>
              {TaskRoles.length > 0 ? (
                TaskRoles.map((role) => (
                  <option key={role.id} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading roles...
                </option>
              )}
        {/* Add more roles if needed */}
      </select>)}

      
    </div>
  );
};

export default ChooseRole;
