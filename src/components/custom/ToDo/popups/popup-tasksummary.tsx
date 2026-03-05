import React, { useState, useEffect } from 'react';
import { LoadSummary, LoadUserSummary } from '@/data/services/todo-service';
import BarChart from './barchart';

interface TaskSummaryModalProps {
    isOpen: boolean;
    closeModal: () => void;
    Filteruser: string;
}

const TaskSummaryModal: React.FC<TaskSummaryModalProps> = ({ isOpen, closeModal, Filteruser }) => {
    const [userData, setUserData] = useState<any[]>([]);

    // Fetch data from backend

  
    useEffect(() => {
      const fetchData = async () => {
        console.log("testfilter",Filteruser)
        if (Filteruser===''){
        try {
          const fetchedData = await LoadSummary(); // Assuming this fetches [userId, name, doneTasks, todoTasks]
          console.log("testsummary", fetchedData)

          setUserData(fetchedData); // Store data in the state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    } else {
        try {
            const fetchedData = await LoadUserSummary(Filteruser); // Assuming this fetches [userId, name, doneTasks, todoTasks]
            console.log("testsummary", fetchedData)
  
            setUserData(fetchedData); // Store data in the state
          } catch (error) {
            console.error('Error fetching data:', error);
          }

    }
      };
  
      fetchData();
    }, [Filteruser]);


    if (!isOpen) return null; // Return null if the modal is not open

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-60"
            style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
        // onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg h-[440px] w-[500px]"
                onClick={(e) => e.stopPropagation()}
            >


                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl mb-4">Task Summary</h2>


                        <button
                            onClick={closeModal}
                            className="text-gray-500 p-2 rounded ml-2"
                        >
                            X
                        </button>
                    </div>
                    <BarChart data={userData} />
                </div>
            </div>
            );
};


            export default TaskSummaryModal;
