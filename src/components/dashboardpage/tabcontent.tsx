// // import React from 'react';

// // interface TabContentProps {
// //   activeTab: string;
// //   tabList: { id: string, component: React.ReactNode }[]; // Array of tab components
// // }

// // const TabContent: React.FC<TabContentProps> = ({ activeTab, tabList }) => {
// //   const activeTabContent = tabList.find(tab => tab.id === activeTab)?.component;

// //   return (
// //     <div>
// //       {activeTabContent ? activeTabContent : <div>Select a Tab</div>}
// //     </div>
// //   );
// // };

// // export default TabContent;
// // components/TabContent.tsx
// import React from 'react';

// interface TabContentProps {
//   activeTab: string;
//   tabList: { id: string, component: React.ReactNode }[]; // Array of tab components
//   tabSection:

// // user: any;  // You can replace `any` with a more specific type based on your user data structure
// }

// const TabContent: React.FC<TabContentProps> = ({ activeTab, tabList }) => {
//   const activeTabContent = tabList.find(tab => tab.id === activeTab)?.component;

//   return (
//     <div>
//       {activeTabContent ? activeTabContent : <div>Select a Tab</div>}
//     </div>
//   );
// };

// export default TabContent;
import React from 'react';

interface TabContentProps {
  activeTab: string;
  tabList: { id: string; component: React.ReactNode }[]; // Array of tab components
  topbarHeight: number;  // Accept the topbarHeight as a prop
  sidebarWidth: number;

}

const TabContent: React.FC<TabContentProps> = ({ activeTab, tabList, topbarHeight, sidebarWidth }) => {
  const activeTabContent = tabList.find(tab => tab.id === activeTab)?.component;

  return (
    <div className={`mt-[${topbarHeight}px]`}>
      {activeTabContent ? activeTabContent : <div className={`flex items-center justify-center text-6xl mt-[-${topbarHeight}px] ml-[${sidebarWidth}px] h-screen`}>Select a Tab</div>}
    </div>
  );
};

export default TabContent;
