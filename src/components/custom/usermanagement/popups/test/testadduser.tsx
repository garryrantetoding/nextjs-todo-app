// import { useState, useEffect } from 'react';

// const MyComponent = () => {
//   const [roles, setRoles] = useState([]); // state to store roles
//   const [newUser, setNewUser] = useState({ roles: '' }); // state for user form
  
//   useEffect(() => {
//     // Fetch the data from your backend API here
//     const fetchRoles = async () => {
//       try {
//         const response = await fetch('/api/getRoles'); // Replace with your API endpoint
//         const data = await response.json();
//         setRoles(data); // assuming data is an array of roles
//       } catch (error) {
//         console.error('Error fetching roles:', error);
//       }
//     };
    
//     fetchRoles();
//   }, []); // Empty dependency array to run only once on component mount
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <select
//         id="role"
//         name="roles"
//         value={newUser.roles}
//         onChange={handleInputChange}
//         className="border p-2 w-full"
//       >
//         <option value="">Select Role</option>
//         {roles.length > 0 ? (
//           roles.map((role) => (
//             <option key={role.id} value={role.value}>
//               {role.name}
//             </option>
//           ))
//         ) : (
//           <option value="" disabled>
//             Loading roles...
//           </option>
//         )}
//       </select>
//     </div>
//   );
// };

// export default MyComponent;
