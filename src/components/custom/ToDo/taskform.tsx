// components/TaskForm.tsx
import React, {useState,useEffect} from 'react';
import AddTaskButton from './buttons/addtaskbutton';
import { LoadDetail } from '@/data/services/usermanagement-service';
import ChooseUser from './filter/ChooseUser';
import { Loader2 } from 'lucide-react';

interface TaskFormProps {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  roles: string;
  setRoles: React.Dispatch<React.SetStateAction<string>>;
  users: string;
  setUsers: React.Dispatch<React.SetStateAction<string>>;
  inputSubmit: (e: React.FormEvent) => void;
  maxlength: number;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, setTask,roles, setRoles, users,setUsers, inputSubmit, maxlength }) => {
  // Handle character count color change
  const countCharactersClass = (str: string) => {
    if (maxlength === null) return 'text-black'; // Default color if maxlength isn't loaded
    return str.length > maxlength ? 'text-red-500' : 'text-black'; // Red if more than maxlength
  };

  const handleNameChange = (users: string, roles: string) => {
    setUsers(users); // Set the name in the parent state
    setRoles(roles); // Set the role in the parent state
  };

  const resetForm = () => {
    setTask(''); // Reset task input
    setRoles(''); // Reset roles
    setUsers(''); // Reset users
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inputSubmit(e);
    // resetForm(); // Reset form fields after successful submission
  };


  
  return (
    
    <form onSubmit={inputSubmit} className="mt-8 mb-4 mx-8" noValidate>
      <div className="relative flex items-center gap-2 w-full">
    
   
        <ChooseUser
          onNameChange={handleNameChange}
          users={users}
          roles={roles}
        />
     

            {/* {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>} */}
  
        <label className="w-full relative">
          <input
            className=" rounded-md h-8 pl-2 pr-12 w-full text-black border-solid border-1 border-black bg-white"  // Adjust padding for the input box
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
            aria-label="New task input"
          />

          {/* Character counter inside the input box */}
          <div
            className={`absolute right-2 bottom-1 text-xs z-10 ${countCharactersClass(task)}`} // Apply dynamic color based on character length
          >
            {task.length}/{maxlength} {/* Display character count */}
          </div>
        </label>
                <AddTaskButton onClick={handleFormSubmit} />
            
      </div>
    </form>
   
  );
};

export default TaskForm;
