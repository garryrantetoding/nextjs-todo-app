// "use client";
// import React, { useState } from 'react';
// import Sidebar from '../dashboardpage/sidebar';
// import TopBar from '../dashboardpage/topbar';
// import TabContent from '../dashboardpage/tabcontent';
// import Dashboard from './DashboardForm';

// const tabList = [
//   { id: 'tab1', name: 'User', section: 'Section 1', component: <Dashboard /> },
//   { id: 'tab2', name: '', section: 'Section 2', component: '' },
// ];

// const sections = [
//   { id: 'Section 1', name: 'System' },
//   { id: 'Section 2', name: '' },
// ];

// const DashboardPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>(tabList[0].id); // Default active tab

//   // Handle tab click, dynamically set active tab
//   const handleTabClick = (tabId: string) => {
//     setActiveTab(tabId);
//   };

//   return (
//     <div className="h-screen flex">
//       <Sidebar onTabClick={handleTabClick} tabList={tabList} sections={sections} />
//       <div className="ml-[250px] mt-[70px] p-5 overflow-y-auto">
//         {/* Top bar with dynamic title corresponding to the sidebar tab */}
//         <TopBar activeTab={activeTab} tabList={tabList} />
//         {/* Render the active tab content */}
//         <TabContent activeTab={activeTab} tabList={tabList} />
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
