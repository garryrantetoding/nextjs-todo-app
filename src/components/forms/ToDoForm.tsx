'use client';
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { toast, Toaster } from 'sonner';  // Import Toaster and toast from Sonner
import { AddTask, LoadTask, DoneTask, DeleteTask, LoadUserTask } from "@/data/services/todo-service";
import ToDoList from "../custom/ToDo/todolist";
import ToDoDoneList from "../custom/ToDo/tododonelist";
import TaskForm from "../custom/ToDo/taskform";
import UserFilter from "../custom/ToDo/filter/UserFilter";
import { Loader2 } from "lucide-react";
import { LoadDetail } from "@/data/services/usermanagement-service";
import TaskSummaryButton from "../custom/ToDo/buttons/Tasksummarybutton";
import TaskSummaryModal from "../custom/ToDo/popups/popup-tasksummary";
import TaskCard from "../custom/ToDo/popups/Taskcard";
import TaskSummary from "../custom/ToDo/popups/TaskSummary";
import PageSizeInput from "../custom/Pagination/pagesizeinput";
import Pagination from "../custom/Pagination/pagination-button";
import { topbarHeight } from "./DashboardPage";

// Zod schemas for validation
const taskSchema = z.string().min(1, { message: "Task cannot be empty." });


const TodoSchema = z.object({
  rolesAndUsers: z
    .string()
    .min(1, { message: 'Roles and Users are required' })
    .refine((val) => val.includes(','), { message: 'Both role and user must be separated by a comma' })
    .refine((val) => {
      const parts = val.split(',');
      return parts.length === 2 && parts[0].trim() !== '' && parts[1].trim() !== '';
    }, { message: 'User is required' }),  // Ensure both role and user are non-empty
  task: z.string().min(1, { message: "Task cannot be empty." }),
});

const todoItemSchema = z.object({
  id: z.number(),
  checklist: z.boolean(),
  task: z.string().min(1),
  roles: z.string().min(1),
  users: z.string().min(1),

});

interface TodoItemNew {
  id: number;
  checklist: boolean;
  task: string;
  roles: string;
  users: string;
}


const ToDoDashboard: React.FC = () => {
  const [todoOngoing, setTodoOngoing] = useState<TodoItemNew[]>([]); // Ongoing tasks state
  const [todoDone, setTodoDone] = useState<TodoItemNew[]>([]); // Completed tasks state
  const [task, setTask] = useState(""); // New task input state
  const [taskCounter, setTaskCounter] = useState(0); // Ongoing tasks count state
  const [doneCounter, setDoneCounter] = useState(0); // Completed tasks count state
  const [loading, setLoading] = useState(true); // Loading state
  const [roles, setRoles] = useState(""); // New task input state
  const [users, setUsers] = useState(""); // New task input state
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false); // State to track if the modal is open
  const [Filteruser, setFilteruser] = useState('');
  const [isFilterEmpty, setisFilterEmpty] = useState<boolean>(false); // Loading state to track fetching

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageOngoing, setPageOngoing] = useState(1);
  const [totalPagesOngoing, setTotalPagesOngoing] = useState(1);

  const [pageDone, setPageDone] = useState(1);
  const [totalPagesDone, setTotalPagesDone] = useState(1);
  const scaleValue = 0.8; // Adjust this value to control the scale


  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);  // Update page and fetch new data
  };


  const handleOngoingPageChange = (pageNumber: number) => {
    setPageOngoing(pageNumber);  // Update page and fetch new data
  };

  const handleDonePageChange = (pageNumber: number) => {
    setPageDone(pageNumber);  // Update page and fetch new data
  };
  const maxlength = 5; // Max length 
  // Zod Schema Validation function

  const [userroles, setuserroles] = useState<string>("");
  const [rendering, setRendering] = useState<boolean>(true); // Loading state to track fetching
  const [isOwner, setisOwner] = useState<boolean>(false); // Loading state to track fetching
  const [userName, setUserName] = useState<string>("");

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await LoadDetail();
        setuserroles(fetchedData.roles); // Set the fetched data to state
        setUserName(fetchedData.name);
        console.log("testrolesuser", userroles)
        if (userroles === "Owner") {
          setisOwner(true)
          setRoles('');
          setUsers('');
          //hide chooseuser
        } else {
          setRoles(fetchedData.roles);
          setUsers(fetchedData.name)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Keep loading for an additional second for smooth transition
        setTimeout(() => {
          setRendering(false); // After a short delay, set loading to false
        }, 500); // 500 ms delay before hiding the loading state
      }
    };

    fetchData();
  }, [userroles, userName]);




  useEffect(() => {
    const loadTodoData = async () => {
      try {
        let dataResponse;
        if (Filteruser === "") {

          // dataResponse = await LoadTask(page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadTask(pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        } else {
          //  dataResponse = await LoadUserTask(Filteruser,page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadUserTask(Filteruser, pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        }

        console.log("todotest", dataResponse)
        const Ongoingresult = z.array(todoItemSchema).safeParse(dataResponse.checklistFalse);
        const Doneresult = z.array(todoItemSchema).safeParse(dataResponse.checklistTrue);

        console.log("todotest2", Ongoingresult)

        // const result = z.array(todoItemSchema).safeParse(dataResponse.data);

        // if (!result.success) {
        //   toast.error("Failed to load tasks. Data structure is incorrect.", {
        //     style: { backgroundColor: '#FF4D4D', color: 'white' },
        //     position: 'top-center',
        //     duration: 5000,
        //   }); // Show error via toast
        //   return;
        // }
        if (!Ongoingresult.success) {
          toast.error("Failed to load to do tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }
        if (!Doneresult.success) {
          toast.error("Failed to load done tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }

        // // Filter ongoing and completed tasks
        // const filteredTodoList = result.data.filter((item) => !item.checklist);
        // const filteredTodoListDone = result.data.filter((item) => item.checklist);
        // setTotalPages(dataResponse.totalPages); // Update total pages

        // setTodoOngoing(filteredTodoList);
        // setTodoDone(filteredTodoListDone);
        // setTaskCounter(filteredTodoList.length);
        // setDoneCounter(filteredTodoListDone.length);


        // Filter ongoing and completed tasks
        const filteredTodoList = Ongoingresult.data;
        const filteredTodoListDone = Doneresult.data;
        setTotalPages(dataResponse.totalPages); // Update total pages
        setTotalPagesOngoing(dataResponse.totalPagesFalse); // Update total pages
        setTotalPagesDone(dataResponse.totalPagesTrue); // Update total pages

        setTodoOngoing(filteredTodoList);
        setTodoDone(filteredTodoListDone);
        setTaskCounter(filteredTodoList.length);
        setDoneCounter(filteredTodoListDone.length);
      } catch (error: any) {
        toast.error("Error fetching data", {
          style: { backgroundColor: '#FF4D4D', color: 'white' },
          position: 'top-center',
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    loadTodoData();  // Call the function to load tasks
  }, [Filteruser, pageOngoing, pageDone, pageSize]);

  // // Filter tasks based on user selection
  // useEffect(() => {
  //   const filteredOngoing = todoOngoing.filter((task) => task.users === Filteruser || Filteruser === '');
  //   const filteredDone = todoDone.filter((task) => task.users === Filteruser || Filteruser === '');

  //   setTaskCounter(filteredOngoing.length);
  //   setDoneCounter(filteredDone.length);
  // }, [Filteruser, todoOngoing, todoDone]);  // Re-run when Filteruser or tasks change

  // Handle opening the modal
  const openSummaryModal = () => {
    setIsSummaryModalOpen(true);

  };

  // Handle closing the modal
  const closeSummaryModal = () => {
    setIsSummaryModalOpen(false);
  };

  const inputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate task input
    // const result = taskSchema.safeParse(task);
    // const result = TodoSchema.safeParse({ users, task });

    // Validate task input
    const result = TodoSchema.safeParse({
      rolesAndUsers: `${roles},${users}`,
      task,
    });
    console.log("testschema", result)

    if (!result.success) {
      toast.error(result.error.errors[0].message, {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      }); // Show validation error via toast
      return;
    }



    const [rolesFromInput, usersFromInput] = result.data.rolesAndUsers.split(',');

    try {
      const res = await AddTask({ roles: rolesFromInput, task: task, users: usersFromInput });  // Assuming AddTask is correctly imported
      // if (res?.data) {
      //   // Safely use res.data here
      //   setTodoOngoing((prev) => [...prev, res.data]);
      //   setTask("");
      //   setTaskCounter((prev) => prev + 1);

      // } else {
      //   toast.error("No data returned from the API.");
      // }

      console.log("testresponse", res)


      if (res?.message) {
        // console.log('User added successfully');
        // Fetch updated list of users after adding a new user
        // const updatedData = await LoadTask(pageOngoing,pageDone,pageSize);

        // const result = z.array(todoItemSchema).safeParse(updatedData);

        // if (!result.success) {
        //   toast.error("Failed to load tasks. Data structure is incorrect.", {
        //     style: { backgroundColor: '#FF4D4D', color: 'white' },
        //     position: 'top-center',
        //     duration: 5000,
        //   }); // Show error via toast
        //   return;
        // }
        // // Filter ongoing and completed tasks
        // const filteredTodoList = result.data.filter((item) => !item.checklist);
        // const filteredTodoListDone = result.data.filter((item) => item.checklist);

        // setTodoOngoing(filteredTodoList);
        // setTodoDone(filteredTodoListDone);

        let dataResponse;
        if (Filteruser === "") {

          // dataResponse = await LoadTask(page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadTask(pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        } else {
          //  dataResponse = await LoadUserTask(Filteruser,page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadUserTask(Filteruser, pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        }

        console.log("todotest", dataResponse)
        const Ongoingresult = z.array(todoItemSchema).safeParse(dataResponse.checklistFalse);
        const Doneresult = z.array(todoItemSchema).safeParse(dataResponse.checklistTrue);

        console.log("todotest2", Ongoingresult)


        if (!Ongoingresult.success) {
          toast.error("Failed to load to do tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }
        if (!Doneresult.success) {
          toast.error("Failed to load done tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }


        // Filter ongoing and completed tasks
        const filteredTodoList = Ongoingresult.data;
        const filteredTodoListDone = Doneresult.data;
        setTotalPages(dataResponse.totalPages); // Update total pages
        setTotalPagesOngoing(dataResponse.totalPagesFalse); // Update total pages
        setTotalPagesDone(dataResponse.totalPagesTrue); // Update total pages

        setTodoOngoing(filteredTodoList);
        setTodoDone(filteredTodoListDone);
        setTaskCounter(filteredTodoList.length);
        setDoneCounter(filteredTodoListDone.length);





        setTask('');
        setRoles('');
        setUsers('');


        // Update counters
        // setTaskCounter((prev) => prev + 1); // Update ongoing task count



        toast.success('Task added successfully!', {
          style: { backgroundColor: '#33B640', color: 'white' },

          position: 'top-center',
          duration: 3000,

        })
      } else {

        const errorMessage = Array.isArray(res?.zodmessage)
          ? res?.zodmessage.join(', ')  // Join the array into a string
          : res?.zodmessage || '';

        toast.error(errorMessage, {
          style: { backgroundColor: '#FF4D4D', color: 'white' },
          position: 'top-center',
          duration: 5000,
        });
      }



    } catch (error: any) {
      toast.error("Failed to add task. Please try again.", {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });
    }
  };


  const handleDone = async (id: number) => {
    console.log("testid", id);
    console.log("testongoingbefore", todoOngoing);
    console.log("testdonebefore", todoDone);

    try {
      const res = await DoneTask(id);
      console.log("testres", res);

      if (res) {
        // console.log('User added successfully');
        // Fetch updated list of users after adding a new user
        // const updatedData = await LoadTask(pageOngoing,pageDone,pageSize);

        // const result = z.array(todoItemSchema).safeParse(updatedData);

        // if (!result.success) {
        //   toast.error("Failed to load tasks. Data structure is incorrect.", {
        //     style: { backgroundColor: '#FF4D4D', color: 'white' },
        //     position: 'top-center',
        //     duration: 5000,
        //   }); // Show error via toast
        //   return;
        // }
        // // Filter ongoing and completed tasks
        // const filteredTodoList = result.data.filter((item) => !item.checklist);
        // const filteredTodoListDone = result.data.filter((item) => item.checklist);

        // setTodoOngoing(filteredTodoList);
        // setTodoDone(filteredTodoListDone);
        // // Update counters
        // setTaskCounter((prev) => prev - 1); // Update ongoing task count
        // setDoneCounter((prev) => prev + 1); // Update completed task count
        let dataResponse;
        if (Filteruser === "") {

          // dataResponse = await LoadTask(page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadTask(pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        } else {
          //  dataResponse = await LoadUserTask(Filteruser,page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadUserTask(Filteruser, pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        }

        console.log("todotest", dataResponse)
        const Ongoingresult = z.array(todoItemSchema).safeParse(dataResponse.checklistFalse);
        const Doneresult = z.array(todoItemSchema).safeParse(dataResponse.checklistTrue);

        console.log("todotest2", Ongoingresult)


        if (!Ongoingresult.success) {
          toast.error("Failed to load to do tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }
        if (!Doneresult.success) {
          toast.error("Failed to load done tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }



        // Filter ongoing and completed tasks
        const filteredTodoList = Ongoingresult.data;
        const filteredTodoListDone = Doneresult.data;
        setTotalPages(dataResponse.totalPages); // Update total pages
        setTotalPagesOngoing(dataResponse.totalPagesFalse); // Update total pages
        setTotalPagesDone(dataResponse.totalPagesTrue); // Update total pages

        setTodoOngoing(filteredTodoList);
        setTodoDone(filteredTodoListDone);
        setTaskCounter(filteredTodoList.length);
        setDoneCounter(filteredTodoListDone.length);

        toast.success("Task marked as done!", {
          style: { backgroundColor: '#33B640', color: 'white' },

          position: 'top-center',
          duration: 3000,

        })
      }
    } catch (error: any) {
      toast.error("Failed to mark task as done.", {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });
    }
  };



  // Handle deleting a task
  const handleDelete = async (taskId: number) => {
    console.log("testid", taskId);
    console.log("testongoingbefore", todoOngoing);
    console.log("testdonebefore", todoDone);
    try {
      const res = await DeleteTask(taskId);
      // setTodoOngoing((prev) => prev.filter((task) => task.id !== taskId)); // Remove from ongoing list
      // setTodoDone((prev) => prev.filter((task) => task.id !== taskId)); // Remove from completed list
      // setTaskCounter((prev) => prev - 1); // Update ongoing task count
      if (res) {

        let dataResponse;
        if (Filteruser === "") {

          // dataResponse = await LoadTask(page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadTask(pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        } else {
          //  dataResponse = await LoadUserTask(Filteruser,page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadUserTask(Filteruser, pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        }

        console.log("todotest", dataResponse)
        const Ongoingresult = z.array(todoItemSchema).safeParse(dataResponse.checklistFalse);
        const Doneresult = z.array(todoItemSchema).safeParse(dataResponse.checklistTrue);

        console.log("todotest2", Ongoingresult)

        if (!Ongoingresult.success) {
          toast.error("Failed to load to do tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }
        if (!Doneresult.success) {
          toast.error("Failed to load done tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }


        // Filter ongoing and completed tasks
        const filteredTodoList = Ongoingresult.data;
        const filteredTodoListDone = Doneresult.data;
        setTotalPages(dataResponse.totalPages); // Update total pages
        setTotalPagesOngoing(dataResponse.totalPagesFalse); // Update total pages
        setTotalPagesDone(dataResponse.totalPagesTrue); // Update total pages

        setTodoOngoing(filteredTodoList);
        setTodoDone(filteredTodoListDone);
        setTaskCounter(filteredTodoList.length);
        setDoneCounter(filteredTodoListDone.length);



        toast.success("Task deleted successfully!", {
          style: { backgroundColor: '#33B640', color: 'white' },

          position: 'top-center',
          duration: 3000,

        })

      }
    } catch (error: any) {
      toast.error("Failed to delete task. Please try again.", {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });
    }
  };

  // Handle deleting a completed task
  const handleDoneDelete = async (donetaskId: number) => {
    try {
      const res = await DeleteTask(donetaskId);
      // setTodoOngoing((prev) => prev.filter((task) => task.id !== donetaskId)); // Remove from ongoing list
      // setTodoDone((prev) => prev.filter((task) => task.id !== donetaskId)); // Remove from completed list
      // setDoneCounter((prev) => prev - 1); // Update completed task count

      if (res) {

        let dataResponse;
        if (Filteruser === "") {

          // dataResponse = await LoadTask(page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadTask(pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        } else {
          //  dataResponse = await LoadUserTask(Filteruser,page,pageSize);  // Ensure LoadTask is imported correctly
          dataResponse = await LoadUserTask(Filteruser, pageOngoing, pageDone, pageSize);  // Ensure LoadTask is imported correctly

        }

        console.log("todotest", dataResponse)
        const Ongoingresult = z.array(todoItemSchema).safeParse(dataResponse.checklistFalse);
        const Doneresult = z.array(todoItemSchema).safeParse(dataResponse.checklistTrue);

        console.log("todotest2", Ongoingresult)

        if (!Ongoingresult.success) {
          toast.error("Failed to load to do tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }
        if (!Doneresult.success) {
          toast.error("Failed to load done tasks. Data structure is incorrect.", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          }); // Show error via toast
          return;
        }


        // Filter ongoing and completed tasks
        const filteredTodoList = Ongoingresult.data;
        const filteredTodoListDone = Doneresult.data;
        setTotalPages(dataResponse.totalPages); // Update total pages
        setTotalPagesOngoing(dataResponse.totalPagesFalse); // Update total pages
        setTotalPagesDone(dataResponse.totalPagesTrue); // Update total pages

        setTodoOngoing(filteredTodoList);
        setTodoDone(filteredTodoListDone);
        setTaskCounter(filteredTodoList.length);
        setDoneCounter(filteredTodoListDone.length);




        toast.success("Completed task deleted successfully!", {
          style: { backgroundColor: '#33B640', color: 'white' },

          position: 'top-center',
          duration: 3000,

        })

      }
    } catch (error: any) {
      toast.error("Failed to delete task. Please try again.", {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });
    }
  };

  // Update filter empty state
  const handleFilterEmpty = (isEmpty: boolean) => {
    setisFilterEmpty(isEmpty);
  };

  // Handle character count color change
  const countCharactersClass = (str: string) => {
    if (maxlength === null) return 'text-white'; // Default color if maxlength isn't loaded
    return str.length > maxlength ? 'text-red-500' : 'text-white'; // Red if more than maxlength
  };

  if (rendering) {
    return (
      <div className={`h-screen flex justify-center items-center bg-neutral-100 translate-y-[-${topbarHeight}px]`}>
        <Loader2 className="mr-2 h-12 w-12 animate-spin" />

        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    ); // Display loading message or spinner while fetching userroles
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-100">
      <div className=" rounded-2xl w-[60vw] pb-8  flex flex-col my-10 bg bg-white drop-shadow-lg"
      // style={{ backgroundColor: 'rgba(29, 24, 37, 1)' }}
      >
        {/* <form onSubmit={inputSubmit} className="mt-6 mb-8 mx-8">
          <div className="relative flex items-center w-full">
            <label className="w-full relative">
              <input
                className="border-2 border-solid border-violet-400 rounded-md h-8 bg-gray-900 text-white pl-2 pr-12 w-full"  // Adjust padding for the input box
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
                aria-label="New task input"
              />
              <div
                className={`absolute right-2 bottom-1 text-xs z-10 ${countCharactersClass(task)}`} // Apply dynamic color based on character length
              >
                {task.length}/{maxlength} 
              </div>
            </label>
            <button
              className="border-2 border-solid border-violet-400 bg-violet-400 rounded-md text-white hover:bg-white hover:text-violet-400 h-8 w-10 ml-2 text-xl"
              type="submit"
              aria-label="Add new task"
            >
              +
            </button>
          </div>
        </form> */}
        {isOwner ? (
          <>


            <TaskForm
              task={task}
              setTask={setTask}
              roles={roles}
              setRoles={setRoles}
              users={users}
              setUsers={setUsers}
              inputSubmit={inputSubmit}
              maxlength={maxlength}
            />
            <div className="mx-8 mb-4 flex items-center gap-4">
              <UserFilter onRoleChange={setFilteruser} isFilterEmpty={handleFilterEmpty} userName={userName} />
              {/* <div className="  flex h-16 w-32  items-center bg-white border-1 border-solid border-red-500">
                <div className=" bg-red-500 h-full">To Do</div>
                {taskCounter}({doneCounter}+{taskCounter})
              </div>
              <div className="items-center  bg-white border-1 border-solid border-green-500">
                <div className=" bg-green-500">Done</div>
                {doneCounter}/({doneCounter}+{taskCounter})
              </div>
              <TaskSummaryButton openModal={openSummaryModal} /> */}
              {isFilterEmpty ? (<TaskCard Filteruser={Filteruser} />) : (
                <TaskSummary />
              )}
            </div>

          </>
        ) : (
          <div className="pt-8 flex justify-center">
            <TaskSummary />
          </div>
        )}


        {loading ? (
          <div className="ml-8">Loading...</div>
        ) : (
          <>
            {/* Ongoing Tasks List */}
            <div className="flex items-center justify-between mx-8 mb-2">

              <div className=" text-black">
                Tasks to do - {taskCounter}
              </div>
              <PageSizeInput
                pageSize={pageSize}
                setPageSize={setPageSize}
                text="list"
              // onPageSizeSubmit={handlePageSizeSubmit}  // Pass the submit handler
              />
            </div>
            <ul className="h-64 ">
              <ToDoList
                searchQuery=""
                roleFilter=""
                Filteruser={Filteruser}
                data={todoOngoing}
                setData={setTodoOngoing}
                selectedRows={{}}
                setSelectedRows={() => { }}
                onDone={handleDone}
                onDelete={handleDelete}
              />
            </ul>
            <Pagination
              currentPage={pageOngoing}
              totalPages={totalPagesOngoing}
              onPageChange={handleOngoingPageChange}
              scale={scaleValue}
            // onPageSizeChange={setPageSize}  // You may use this for future enhancements if needed
            // pageSize={pageSize}
            />

            {/* Completed Tasks List */}
            <ul className="mx-8 mb-2 text-black">
              Done - {doneCounter}
            </ul>
            <ul className="h-64">
              <ToDoDoneList
                searchQuery=""
                roleFilter=""
                Filteruser={Filteruser}
                data={todoDone}
                setData={setTodoDone}
                selectedRows={{}}
                setSelectedRows={() => { }}
                onDone={handleDone}
                onDelete={handleDoneDelete}
              />
            </ul>




            <Pagination
              currentPage={pageDone}
              totalPages={totalPagesDone}
              onPageChange={handleDonePageChange}
              scale={scaleValue}
            // onPageSizeChange={setPageSize}  // You may use this for future enhancements if needed
            // pageSize={pageSize}
            />
          </>
        )}
      </div>
      {/* <TaskSummaryModal isOpen={isSummaryModalOpen} closeModal={closeSummaryModal} Filteruser={Filteruser} /> */}

    </div>
  );
}

export default ToDoDashboard;