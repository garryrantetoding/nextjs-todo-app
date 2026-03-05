"use client";
import React, { useState, useEffect } from 'react';
import { LoadDetail } from "@/data/services/usermanagement-service";
import { Role } from '@/data/services/enum';
import UserButton from './userdetailbutton'; // Import the button component
import UserDetailMenu from './userdetailmenu';

interface TopbarDetailProps {
  name: string;
  email: string;
  roles: string;
  password: string;
}

const TopbarDetail: React.FC = () => {
  const [data, setData] = useState<TopbarDetailProps | null>(null); 
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await LoadDetail();
        // console.log("Fetched data:", fetchedData); // Add this log to check the data
        setData(fetchedData); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  if (!data) {
    return <div>Loading...</div>; // Optional: show loading state while data is being fetched
  }

  return (
    <div className="flex items-center space-x-4 relative border-2 border-gray-400 rounded-md p-2">
      <div className='mr-12'>
        <div className='font-bold'>{data.name}</div>
        <div>{data.roles}</div>
      </div>

      {/* Button to toggle the dropdown */}
      <UserButton onClick={toggleDropdown} />

      {/* Dropdown Component */}
      <UserDetailMenu visible={dropdownVisible} onClose={() => setDropdownVisible(false)} />
    </div>
  );
};

export default TopbarDetail;
