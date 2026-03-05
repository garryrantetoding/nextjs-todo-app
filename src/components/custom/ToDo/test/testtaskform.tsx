// // components/TaskForm.tsx
// import React from 'react';
// import AddTaskButton from './buttons/addtaskbutton';
// import ChooseRole from './filter/ChooseRole';
// import ChooseUser from './filter/ChooseUser';

// interface TaskFormProps {
//   task: string;
//   setTask: React.Dispatch<React.SetStateAction<string>>;
//   roles: string;
//   setRoles: React.Dispatch<React.SetStateAction<string>>;
//   users: string;
//   setUsers: React.Dispatch<React.SetStateAction<string>>;
//   inputSubmit: (e: React.FormEvent) => void;
//   maxlength: number;
// }

// const TaskForm: React.FC<TaskFormProps> = ({ task, setTask,roles, setRoles, users,setUsers, inputSubmit, maxlength }) => {
//   // Handle character count color change
//   const countCharactersClass = (str: string) => {
//     if (maxlength === null) return 'text-black'; // Default color if maxlength isn't loaded
//     return str.length > maxlength ? 'text-red-500' : 'text-black'; // Red if more than maxlength
//   };

//   const handleNameChange = (users: string, roles: string) => {
//     setUsers(users); // Set the name in the parent state
//     setRoles(roles); // Set the role in the parent state
//   };

//   const resetForm = () => {
//     setTask(''); // Reset task input
//     setRoles(''); // Reset roles
//     setUsers(''); // Reset users
//   };

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     inputSubmit(e);
//     // resetForm(); // Reset form fields after successful submission
//   };

//   return (
//     <form onSubmit={inputSubmit} className="mt-6 mb-8 mx-8" noValidate>
//       <div className="relative flex items-center gap-2 w-full">
//         {/* Additional input box on the left */}
//         {/* <input
//           className="border-2 border-solid border-violet-400 rounded-md h-8 bg-gray-900 text-white pl-2 pr-12 w-full mr-2"  // Add margin for spacing
//           type="text"
//           placeholder="Additional Info"
//           aria-label="Additional Info input"
//         /> */}
//            {/* <select
//               id="role"
//               name="roles"
//               value={roles}
//               onChange={(e) => setRoles(e.target.value)}
//               className="rounded-md h-8 pl-2 pr-12 w-40 mr-2 text-black border-solid border-1 border-black bg-white "  // Add margin for spacing
//               // style={{
//               //   color:  'rgba(255, 255, 255, 1)', // Text color changes on hover
//               //   backgroundColor: 'rgba(29, 24, 37, 1)', // Text color changes on hover
//               //   border:  'solid 1px rgba(158, 120, 207, 1)', // Text color changes on hover
//               //   }}
//            >
//               <option value="">Select Role</option>
//               <option value="Owner">Owner</option>
//               <option value="Approver">Approver</option>
//               <option value="Staff">Staff</option>
//             </select> */}
//             {/* <ChooseRole onRoleChange={setRoles}/> */}
//             {/* <ChooseUser onNameChange={handleNameChange}/> */}

//             <ChooseUser
//           onNameChange={handleNameChange}
//           users={users}
//           roles={roles}
//         />

//             {/* {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>} */}
  
//         <label className="w-full relative">
//           <input
//             className=" rounded-md h-8 pl-2 pr-12 w-full text-black border-solid border-1 border-black bg-white"  // Adjust padding for the input box
//             type="text"
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             placeholder="Add a new task"
//             aria-label="New task input"
//             // style={{
//             //   color:  'rgba(255, 255, 255, 1)', // Text color changes on hover
//             //   backgroundColor: 'rgba(29, 24, 37, 1)', // Text color changes on hover
//             //   border:  'solid 1px rgba(158, 120, 207, 1)', // Text color changes on hover
//             // }}
//           />
//           {/* Character counter inside the input box */}
//           <div
//             className={`absolute right-2 bottom-1 text-xs z-10 ${countCharactersClass(task)}`} // Apply dynamic color based on character length
//           >
//             {task.length}/{maxlength} {/* Display character count */}
//           </div>
//         </label>
//         {/* <button
//           className="border-2 border-solid border-violet-400 bg-violet-400 rounded-md text-white hover:bg-white hover:text-violet-400 h-8 w-10 ml-2 text-xl"
//           type="submit"
//           aria-label="Add new task"
//         >
//           +
//         </button> */}
//           {/* <AddTaskButton
//           onClick={inputSubmit}
//         /> */}
//         {/* <AddTaskButton onClick={(e: React.FormEvent) => {
//           inputSubmit(e);
//           resetForm(); // Reset the form after successful submission
//         }} /> */}
//                 <AddTaskButton onClick={handleFormSubmit} />
//       </div>
//     </form>
//   );
// };

// export default TaskForm;
