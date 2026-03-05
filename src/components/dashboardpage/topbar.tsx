// components/TopBar.tsx
import React, { useState, useEffect } from 'react';
// import styles from "./sidebarpage.module.css";
import TopbarDetail from './userprofile/loginuserdetail';
import NotifButton from './userprofile/notifbutton';

interface TopBarProps {
  activeTab: string;
  tabList: { id: string; name: string }[]; // Array of tab info
  topbarHeight: number;
  sidebarWidth: number;
}

const TopBar: React.FC<TopBarProps> = ({ activeTab, tabList, topbarHeight, sidebarWidth }) => {
  const activeTabTitle = tabList.find(tab => tab.id === activeTab)?.name;

  return (
    <div className={`p-4 h-[${topbarHeight}px] bg-white w-full fixed top-0 left-0 border-b-2 border-gray-300 z-40`}>
      <div className="flex justify-between items-center w-full"> {/* Flexbox layout */}
        <h1 className={`m-0 text-2xl text-gray-800  pl-[${sidebarWidth}px] font-bold`}>{activeTabTitle}</h1> {/* Left-aligned title */}
        <div className='flex items-center'>
          <div className='mr-2 p-2'>
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_201_117)">
<rect width="32" height="32" rx="16" fill="#4285F4"/>
<path fillRule="evenodd" clipRule="evenodd" d="M10.8333 14.0417C10.8333 12.6714 11.3777 11.3572 12.3466 10.3883C13.3156 9.41934 14.6297 8.875 16 8.875C17.3703 8.875 18.6844 9.41934 19.6534 10.3883C20.6223 11.3572 21.1667 12.6714 21.1667 14.0417C21.1667 15.412 20.6223 16.7261 19.6534 17.6951C18.6844 18.664 17.3703 19.2083 16 19.2083C14.6297 19.2083 13.3156 18.664 12.3466 17.6951C11.3777 16.7261 10.8333 15.412 10.8333 14.0417ZM10.8333 21.7917C9.12048 21.7917 7.47777 22.4721 6.2666 23.6833C5.05543 24.8944 4.375 26.5371 4.375 28.25C4.375 29.2777 4.78326 30.2633 5.50996 30.99C6.23666 31.7167 7.22229 32.125 8.25 32.125H23.75C24.7777 32.125 25.7633 31.7167 26.49 30.99C27.2167 30.2633 27.625 29.2777 27.625 28.25C27.625 26.5371 26.9446 24.8944 25.7334 23.6833C24.5222 22.4721 22.8795 21.7917 21.1667 21.7917H10.8333Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_201_117">
<rect width="32" height="32" rx="16" fill="white"/>
</clipPath>
</defs>
</svg>

</div>
        <TopbarDetail /> {/* Right-aligned detail */}
        <NotifButton />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
