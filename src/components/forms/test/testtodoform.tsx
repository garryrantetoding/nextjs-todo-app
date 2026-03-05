// 'use client';
// import React, { useState, useEffect } from "react";
// import { z } from "zod";
// import { toast, Toaster } from 'sonner';  // Import Toaster and toast from Sonner
// import { AddTask, LoadTask, DoneTask, DeleteTask } from "@/data/services/todo-service";
// import ToDoList from "../custom/ToDo/todolist";
// import ToDoDoneList from "../custom/ToDo/tododonelist";

// // Zod schemas for validation
// const taskSchema = z.string().min(1, { message: "Task cannot be empty." });
// const todoItemSchema = z.object({
//   id: z.number(),
//   checklist: z.boolean(),
//   task: z.string().min(1),
//   roles: z.string().min(1),

// });

// interface TodoItemNew {
//   id: number;
//   checklist: boolean;
//   task: string;
//   roles: string;
// }


// const ToDoDashboard: React.FC = () => {
//   const [todoOngoing, setTodoOngoing] = useState<TodoItemNew[]>([]); // Ongoing tasks state
//   const [todoDone, setTodoDone] = useState<TodoItemNew[]>([]); // Completed tasks state
//   const [task, setTask] = useState(""); // New task input state
//   const [taskCounter, setTaskCounter] = useState(0); // Ongoing tasks count state
//   const [doneCounter, setDoneCounter] = useState(0); // Completed tasks count state
//   const [loading, setLoading] = useState(true); // Loading state
//   const maxlength = 5; // Max length 

//   useEffect(() => {
//     const loadTodoData = async () => {
//       try {
//         const dataResponse = await LoadTask();  // Ensure LoadTask is imported correctly
//         console.log("todotest",dataResponse)
//         const result = z.array(todoItemSchema).safeParse(dataResponse);
//         console.log("todotest2",result)

//         if (!result.success) {
//           toast.error("Failed to load tasks. Data structure is incorrect."); // Show error via toast
//           return;
//         }

//         // Filter ongoing and completed tasks
//         const filteredTodoList = result.data.filter((item) => !item.checklist);
//         const filteredTodoListDone = result.data.filter((item) => item.checklist);

//         setTodoOngoing(filteredTodoList);
//         setTodoDone(filteredTodoListDone);
//         setTaskCounter(filteredTodoList.length);
//         setDoneCounter(filteredTodoListDone.length);
//       } catch (error: any) {
//         toast.error("Error fetching data", {
//           style: { backgroundColor: '#FF4D4D', color: 'white' },
//           position: 'top-center',
//           duration: 5000,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTodoData();  // Call the function to load tasks
//   }, []);

//   const inputSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate task input
//     const result = taskSchema.safeParse(task);
//     if (!result.success) {
//       toast.error(result.error.errors[0].message); // Show validation error via toast
//       return;
//     }

//     try {
//       const res = await AddTask({ task: task });  // Assuming AddTask is correctly imported
//       if (res?.data) {
//         // Safely use res.data here
//         setTodoOngoing((prev) => [...prev, res.data]);
//         setTask("");
//         setTaskCounter((prev) => prev + 1);
  
//       } else {
//         toast.error("No data returned from the API.");
//       }
     
//       toast.success('Task added successfully!');
//     } catch (error: any) {
//       toast.error("Failed to add task. Please try again.", {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });
//     }
//   };

//   // Handle marking a task as done
//   const handleDone = async (id: number) => {
//     console.log("testid", id)
//     try {
//       const res = await DoneTask(id);
//       console.log("testres", res)

//       setTodoOngoing((prev) => prev.filter((task) => task.id !== id)); // Remove from ongoing list
//       setTodoDone((prev) => [...prev, res.data]); // Add to completed list
//       setTaskCounter((prev) => prev - 1); // Update ongoing task count
//       setDoneCounter((prev) => prev + 1); // Update completed task count

//       toast.success("Task marked as done!");
//     } catch (error: any) {
//       toast.error("Failed to mark task as done.", {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });
//     }
//   };

//   // Handle deleting a task
//   const handleDelete = async (taskId: number) => {
//     try {
//       await DeleteTask(taskId);
//       setTodoOngoing((prev) => prev.filter((task) => task.id !== taskId)); // Remove from ongoing list
//       setTodoDone((prev) => prev.filter((task) => task.id !== taskId)); // Remove from completed list
//       setTaskCounter((prev) => prev - 1); // Update ongoing task count

//       toast.success("Task deleted successfully!");
//     } catch (error: any) {
//       toast.error("Failed to delete task. Please try again.", {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });
//     }
//   };

//   // Handle deleting a completed task
//   const handleDoneDelete = async (donetaskId: number) => {
//     try {
//       await DeleteTask(donetaskId);
//       setTodoOngoing((prev) => prev.filter((task) => task.id !== donetaskId)); // Remove from ongoing list
//       setTodoDone((prev) => prev.filter((task) => task.id !== donetaskId)); // Remove from completed list
//       setDoneCounter((prev) => prev - 1); // Update completed task count

//       toast.success("Completed task deleted successfully!");
//     } catch (error: any) {
//       toast.error("Failed to delete task. Please try again.", {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });
//     }
//   };

//   // Handle character count color change
//   const countCharactersClass = (str: string) => {
//     if (maxlength === null) return 'text-white'; // Default color if maxlength isn't loaded
//     return str.length > maxlength ? 'text-red-500' : 'text-white'; // Red if more than maxlength
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="bg-gray-900 rounded-2xl w-[60vw] pb-8 flex flex-col my-10">
//         <form onSubmit={inputSubmit} className="mt-6 mb-8 mx-8">
//           <div className="relative flex items-center w-full">
//             <label className="w-full relative">
//               <input
//                 className="border-2 border-solid border-violet-400 rounded-md h-8 bg-gray-900 text-white pl-2 pr-12 w-full"  // Adjust padding for the input box
//                 type="text"
//                 value={task}
//                 onChange={(e) => setTask(e.target.value)}
//                 placeholder="Add a new task"
//                 aria-label="New task input"
//               />
//               {/* Character counter inside the input box */}
//               <div
//                 className={`absolute right-2 bottom-1 text-xs z-10 ${countCharactersClass(task)}`} // Apply dynamic color based on character length
//               >
//                 {task.length}/{maxlength} {/* Display character count */}
//               </div>
//             </label>
//             <button
//               className="border-2 border-solid border-violet-400 bg-violet-400 rounded-md text-white hover:bg-white hover:text-violet-400 h-8 w-10 ml-2 text-xl"
//               type="submit"
//               aria-label="Add new task"
//             >
//               +
//             </button>
//           </div>
//         </form>

//         {loading ? (
//           <div className="ml-8">Loading...</div>
//         ) : (
//           <>
//             {/* Ongoing Tasks List */}
//             <ul className="mx-8 mb-2">
//               Tasks to do - {taskCounter}
//             </ul>
//             <ul className="h-64 overflow-y-auto">
//               {/* {todoOngoing.map((item) => (
//                 <li
//                   key={item.id}
//                   className="bg-slate-950 text-violet-500 rounded-xl mx-8 mb-2 flex items-center justify-between pl-2 py-2"
//                 >
//                   <span className="w-[45vw] break-words overflow-x-auto whitespace-nowrap">{item.task}</span>
//                   <div className="flex gap-2">
//                     <button
//                       className="text-violet-500 hover:text-violet-950 rounded-md px-4"
//                       onClick={() => handleDone(item.id)}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                         className="h-6 w-6"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
//                       </svg>
//                     </button>
//                     <button
//                       className="text-violet-500 hover:text-violet-950 rounded-md px-4"
//                       onClick={() => handleDelete(item.id)}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="h-6 w-6"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </li>
//               ))} */}

// <ToDoList
//               searchQuery=""
//               roleFilter=""
//               data={todoOngoing}
//               setData={setTodoOngoing}
//               selectedRows={{}}
//               setSelectedRows={() => {}}
//               onDone={handleDone}
//               onDelete={handleDelete}
//             />
//             </ul>

//             {/* Completed Tasks List */}
//             <ul className="mx-8 mt-6 mb-2">
//               Done - {doneCounter}
//             </ul>
//             <ul className="h-64 overflow-y-auto">
//               {/* {todoDone.map((doneTask) => (
//                 <li
//                   key={doneTask.id}
//                   className="bg-slate-950 text-emerald-300 rounded-xl mx-8 mb-2 flex items-center justify-between pl-2 py-2"
//                 >
//                   <span className="w-[45vw] break-words overflow-x-auto whitespace-nowrap line-through">{doneTask.task}</span>
//                   <button
//                     className="text-violet-500 hover:text-violet-950 rounded-md px-4"
//                     onClick={() => handleDoneDelete(doneTask.id)}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="1.5"
//                       stroke="currentColor"
//                       className="h-6 w-6"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                       />
//                     </svg>
//                   </button>
//                 </li>
//               ))} */}
//                <ToDoDoneList
//               searchQuery=""
//               roleFilter=""
//               data={todoDone}
//               setData={setTodoDone}
//               selectedRows={{}}
//               setSelectedRows={() => {}}
//              onDone={handleDone}
//               onDelete={handleDelete}
//             />
//             </ul>
//           </>
//         )}
//       </div>

//       {/* Toast container */}
//         <Toaster richColors toastOptions={{}} position="top-right" />
//       </div>
//   );
// }

// export default ToDoDashboard;