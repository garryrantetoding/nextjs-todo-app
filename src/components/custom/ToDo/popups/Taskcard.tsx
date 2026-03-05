// // components/custom/ToDo/TaskCard.tsx

// import React, { useEffect, useState } from "react";
// import { LoadUserSummary } from "@/data/services/todo-service";
// import { toast } from "sonner";
// import { z } from "zod";

// interface TaskCardProps {
//     Filteruser: string;
// }

// const TaskCard: React.FC<TaskCardProps> = ({ Filteruser }) => {
//     const [tasktodocounter, setTasktodocounter] = useState(0);
//     const [taskdonecounter, setTaskdonecounter] = useState(0);
//     const [combinedcounter, setcombinedcounter] = useState(0);

//     const [loading, setLoading] = useState(true);

//     // Fetch tasks based on Filteruser
//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const dataResponse = await LoadUserSummary(Filteruser);
// console.log("testcounter",dataResponse )

//                  // Safely assign values, defaulting to 0 if they're invalid (undefined or NaN)
//         const todoTask = dataResponse.userSummary?.todoTask ?? 0;  // Default to 0 if undefined or null
//         const doneTask = dataResponse.userSummary?.doneTask ?? 0;  // Default to 0 if undefined or null

//         setTasktodocounter(todoTask);
//         setTaskdonecounter(doneTask);
//                 console.log("testtaskcounter",tasktodocounter )

//                 setcombinedcounter(taskdonecounter + tasktodocounter)

//             } catch (error) {
//                 toast.error("Error fetching tasks", {
//                     style: { backgroundColor: '#FF4D4D', color: 'white' },
//                     position: 'top-center',
//                     duration: 5000,
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTasks();
//     }, [Filteruser]);

//     if (loading) {
//         return <div>Loading tasks...</div>;
//     }

//     return (
//         <div className=" flex justify-between items-center">
//             <div className=" flex justify-between items-center">
//             <div className=" flex h-16 w-32  items-center bg-white border-1 border-solid border-red-500">
//                 <div className="  bg-red-500 h-full">To Do</div>
//                 {tasktodocounter}({combinedcounter})
//             </div>
//             <div className="  flex h-16 w-32  items-center bg-white border-1 border-solid border-green-500">
//                 <div className=" bg-green-500">Done</div>
//                 {taskdonecounter}({combinedcounter})
//             </div>
//             </div>

//         </div>
//     );
// };

// export default TaskCard;
import React, { useEffect, useState } from "react";
import { LoadUserSummary } from "@/data/services/todo-service";
import { toast } from "sonner";
import { z } from "zod";

interface TaskCardProps {
    Filteruser: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ Filteruser }) => {
    const [tasktodocounter, setTasktodocounter] = useState<number>(0);
    const [taskdonecounter, setTaskdonecounter] = useState<number>(0);
    const [combinedcounter, setCombinedCounter] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [taskuser, setTaskuser] = useState<string>("");
    const [isContentVisible, setIsContentVisible] = useState(false);

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    };

    // Fetch tasks based on Filteruser
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const dataResponse = await LoadUserSummary(Filteruser);
                // console.log("testcounter", dataResponse);

                // Safely assign values, defaulting to 0 if they're invalid (undefined or NaN)
                const todoTask = dataResponse.userSummary?.todoTasks ?? 0;  // Default to 0 if undefined or null
                const doneTask = dataResponse.userSummary?.doneTasks ?? 0;  // Default to 0 if undefined or null
                const userTask = dataResponse.userSummary?.name ?? "";  // Default to 0 if undefined or null

                // Calculate combined counter immediately after fetching data
                const combined = todoTask + doneTask;

                // Update state values
                setTasktodocounter(todoTask);
                setTaskdonecounter(doneTask);
                setCombinedCounter(combined);  // Set combined counter after the data is ready
                setTaskuser(userTask);

                console.log("todoTask", todoTask);
                console.log("doneTask", doneTask);
                console.log("combined", combined);

            } catch (error) {
                toast.error("Error fetching tasks", {
                    style: { backgroundColor: '#FF4D4D', color: 'white' },
                    position: 'top-center',
                    duration: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [Filteruser]);

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div className="justify-between items-center border-1 border-black border-solid rounded-md bg-neutral-100">
            {/* <div className="flex justify-center items-center w-full mb-2">Task Summary for {taskuser}</div> */}
                <button
                    onClick={toggleContent}
                    className={`flex justify-center items-center w-full hover:bg-neutral-200  rounded-t-md py-1 px-2 ${isContentVisible ? 'rounded-t-md' : 'rounded-md'}`}
                    >
                   <div>Task Summary for {taskuser}</div> 
                </button>

            {/* Content that will be shown/hidden with expanding animation */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isContentVisible ? 'max-h-screen' : 'max-h-0'
                    }`}
            >
                <div className="flex justify-between items-center mt-2 px-2 pb-2">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex h-16 w-28 rounded-xl items-center bg-white border-1 border-solid border-red-500">
                            <div className="bg-red-500 h-full rounded-l-xl flex justify-center items-center px-2 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                            </div>
                            <div className="flex-1 flex justify-center items-center">

                                {tasktodocounter} /{combinedcounter}
                            </div>
                        </div>
                        <div className="flex h-16 w-28 rounded-xl  items-center bg-white border-1 border-solid border-green-500">
                            <div className="bg-green-500 h-full rounded-l-xl flex justify-center items-center px-2 text-white">


                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>

                            </div>
                            <div className="flex-1 flex justify-center items-center">

                                {taskdonecounter} /{combinedcounter}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TaskCard;
