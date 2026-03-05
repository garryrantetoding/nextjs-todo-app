
import React, { useState, useEffect } from 'react';
import { LoadUserList } from '@/data/services/usermanagement-service';

interface UserFilterProps {
  onRoleChange: (role: string) => void;
  isFilterEmpty: (isEmpty: boolean) => void;  // Update to pass a boolean indicating if the filter is empty  
  userName:string;
}

const UserFilter: React.FC<UserFilterProps> = ({ onRoleChange, isFilterEmpty, userName }) => {
  const [username, setUsername] = useState<any[]>([]); // State to store roles
  const [selectedUser, setSelectedUser] = useState<string>(''); // State for selected role

  // Handle role change, update both local state and notify parent
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedUser(selected); // Update local state
    onRoleChange(selected); // Notify parent component of the change
      
    // Notify parent if the filter is empty or not
    if (selected === '') {
      isFilterEmpty(false);  // If no role is selected, set it to true
    } else {
      isFilterEmpty(true); // If a role is selected, set it to false
    }
  };

  // Fetch roles from the backend API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await LoadUserList(); // API function to load roles
        const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
        setUsername(data); // Set the roles in state
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []); // Empty dependency array to run only once on component mount

  // Define styles for conditional text color
  const selectStyle = {
    color: selectedUser=== "" ? '#adadad' : 'black', // Apply red color if no role is selected
  };

  const myaccount =(name:string)=>{
 if (name===userName)
  return "*"
else {
  return "\xa0"
}
  }

  return (
    <div>
      <label htmlFor="role-filter"></label>
      {username && (
        <select
          id="role-filter"
          onChange={handleChange} // Handle change event
          value={selectedUser} // Bind the value to the selected role state
          className={`h-10 w-40 p-2 bg-white rounded-md border-solid border-1 border-black`}
        //   className="rounded-md h-8 pl-2 pr-12 w-40 mr-2 text-black border-solid border-1 border-black bg-white"

          style={selectStyle} // Apply the conditional style for text color
        >
          {/* Default empty option */}
          <option value="">Filter Name</option>

          {/* Display roles dynamically */}
          {username.length > 0 ? (
            username.map((listuser) => (
              <option key={listuser.id} value={listuser.name}>
                {myaccount(listuser.name)}{listuser.name} - {listuser.roles}
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

export default UserFilter;
