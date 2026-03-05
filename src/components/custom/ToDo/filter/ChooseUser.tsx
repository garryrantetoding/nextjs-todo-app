// // src/components/custom/role-filter.tsx

// import React, { useState, useEffect } from 'react';
// import { LoadList } from '@/data/services/usermanagement-service';

// interface ChooseUserProps {
//   onNameChange: (users: string, roles:string) => void;
// }

// const ChooseUser: React.FC<ChooseUserProps> = ({ onNameChange }) => {
//     const [TaskNames, setTaskNames] = useState<any[]>([]); // State to store roles
  
//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     // const selectedUser = JSON.parse(event.target.value);
//     // // onNameChange(event.target.value);
//     // onNameChange(selectedUser.users, selectedUser.roles); // passing the object to parent component
//     // console.log("testuserandrole",selectedUser)
//     const value = event.target.value;
//     if (value) {
//       const selectedUser = JSON.parse(value);
//       onNameChange(selectedUser.users, selectedUser.roles); // passing the object to parent component
//       console.log("testuserandrole", selectedUser);
//     } else {
//       // If the value is empty, reset users and roles in the parent component
//       onNameChange("", "");
//       console.log("No user selected");
//     }
//   };


//     // Fetch roles from the backend API
//     useEffect(() => {
//       const fetchRoles = async () => {
//         try {
//           const response = await LoadList(); // API function to load roles
//           const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
//           setTaskNames(data); // Set the roles in state
//         } catch (error) {
//           console.error('Error fetching roles:', error);
//         }
//       };
  
//       fetchRoles();
//     }, []); // Empty dependency array to run only once on component mount
  
   
//   return (
//     <div>
//       <label htmlFor="role-filter"></label>
//       {TaskNames && (<select id="role-filter" onChange={handleChange} className="rounded-md h-8 pl-2 pr-12 w-40 mr-2 text-black border-solid border-1 border-black bg-white"
//       >
//         {/* <option value="">Role</option>
//         <option value="Owner">Owner</option>
//         <option value="Approver">Approver</option>
//         <option value="Staff">Staff</option> */}

// <option value={JSON.stringify({ users: "", roles: "" })}>Name</option>
//               {TaskNames.length > 0 ? (
//                 TaskNames.map((userlist) => (
//                   <option key={userlist.id} 
//                   // value={`users:${users.name}; roles:${users.roles}`}
//                   value={JSON.stringify({ users: userlist.name, roles: userlist.roles })}
//                   >
//                     {userlist.name} - {userlist.roles}
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

// export default ChooseUser;

import React, { useState, useEffect } from 'react';
import { LoadUserList } from '@/data/services/usermanagement-service';

interface ChooseUserProps {
  onNameChange: (users: string, roles: string) => void;
  users: string;  // Passing `users` as a prop
  roles: string;  // Passing `roles` as a prop
}

const ChooseUser: React.FC<ChooseUserProps> = ({ onNameChange, users, roles }) => {
  const [TaskNames, setTaskNames] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>(''); // Local state for managing select value
  
  // Update `selectedUser` whenever the `users` or `roles` props change
  useEffect(() => {
    setSelectedUser(JSON.stringify({ users, roles }));
  }, [users, roles]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const selectedUser = JSON.parse(event.target.value);
    // setSelectedUser(event.target.value);  // Update local state
    // onNameChange(selectedUser.users, selectedUser.roles); // Pass values to parent

    const value = event.target.value;
    if (value) {
      const selectedUser = JSON.parse(value);
      onNameChange(selectedUser.users, selectedUser.roles); // passing the object to parent component
      console.log("testuserandrole", selectedUser);
    } else {
      // If the value is empty, reset users and roles in the parent component
      onNameChange("", "");
      console.log("No user selected");
    }
 
  };

  // Fetch roles from the backend API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await LoadUserList(); // API function to load roles
        const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
        setTaskNames(data); // Set the roles in state
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <label htmlFor="role-filter"></label>
      <select
        id="role-filter"
        value={selectedUser} // Controlled value here
        onChange={handleChange}
        className="rounded-md h-8 pl-2 pr-12 w-40 mr-2 text-black border-solid border-1 border-black bg-white"
      >
        <option value="">Select Name</option>
        {TaskNames.length > 0 ? (
          TaskNames.map((userlist) => (
            <option
              key={userlist.id}
              value={JSON.stringify({ users: userlist.name, roles: userlist.roles })}
            >
              {userlist.name} - {userlist.roles}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Loading roles...
          </option>
        )}
      </select>
    </div>
  );
};

export default ChooseUser;
