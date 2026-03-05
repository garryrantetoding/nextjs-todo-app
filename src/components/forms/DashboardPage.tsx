// // // // // // pages/dashboard.tsx
// // // // // "use client"
// // // // // import React, { useState } from 'react';
// // // // // import Sidebar from '../dashboardpage/sidebar';
// // // // // import TabContent from '../dashboardpage/tabcontent';
// // // // // import styles from "src/components/sidebarpage.css";

// // // // // const Dashboardpage: React.FC = () => {
// // // // //   const [activeTab, setActiveTab] = useState<string>('tab1'); // Default active tab

// // // // //   const handleTabClick = (tab: string) => {
// // // // //     setActiveTab(tab); // Set the active tab when a button is clicked
// // // // //   };

// // // // //   // Create a mapping for the tab titles
// // // // //   const getTabTitle = (tab: string) => {
// // // // //     switch (tab) {
// // // // //       case 'tab1':
// // // // //         return 'Dashboard';
// // // // //       case 'tab2':
// // // // //         return 'Tab 2 Title';
// // // // //       case 'tab3':
// // // // //         return 'Tab 3 Title';
// // // // //       default:
// // // // //         return 'Select a Tab';
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className={styles.dashboard}>
// // // // //       <Sidebar onTabClick={handleTabClick} />
// // // // //       <div className={styles.content}>
// // // // //         {/* Top bar with dynamic title */}
// // // // //         <div className={styles.topBar}>
// // // // //           <h1>{getTabTitle(activeTab)}</h1>
// // // // //         </div>
// // // // //         {/* Tab content */}
// // // // //         <TabContent activeTab={activeTab} />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Dashboardpage;
// // // // // // // pages/dashboard.tsx
// // // // // // "use client"
// // // // // // import React, { useState } from 'react';
// // // // // // import Sidebar from '../dashboardpage/sidebar';
// // // // // // import TabContent from '../dashboardpage/tabcontent';
// // // // // // // const Dashboard: React.FC = () => {
// // // // // // //   const [activeTab, setActiveTab] = useState<string>('tab1'); // Default active tab

// // // // // // //   const handleTabClick = (tab: string) => {
// // // // // // //     setActiveTab(tab); // Set the active tab when a button is clicked
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="dashboard">
// // // // // // //       <Sidebar onTabClick={handleTabClick} />
// // // // // // //       <div className="content">
// // // // // // //         <TabContent activeTab={activeTab} />
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Dashboard;

// // // // // // // // pages/dashboard.tsx
// // // // // // // "use client"
// // // // // // // import React, { useState } from 'react';
// // // // // // // import Sidebar from '../dashboardpage/sidebar';
// // // // // // // import TabContent from '../dashboardpage/tabcontent';
// // // // // // // import styles from "src/components/sidebarpage.css";

// // // // // // // Explicitly typing the `tabNames` to allow string keys
// // // // // // const Dashboard: React.FC = () => {
// // // // // //   const [activeTab, setActiveTab] = useState<string>('tab1'); // Default active tab

// // // // // //   // Use a more flexible type for `tabNames`
// // // // // //   const tabNames: { [key: string]: string } = {
// // // // // //     tab1: 'Tab 1', // Change here if you want to change the name of Tab 1
// // // // // //     tab2: 'Tab 2 Title',
// // // // // //     tab3: 'Tab 3 Title',
// // // // // //   };

// // // // // //   const handleTabClick = (tab: string) => {
// // // // // //     setActiveTab(tab); // Set the active tab when a button is clicked
// // // // // //   };


// // // // // //   return (
// // // // // //     <div className="dashboard">
// // // // // //       <Sidebar onTabClick={handleTabClick} tabNames={tabNames}  />
// // // // // //       <div className="content">
// // // // // //         {/* Top bar with dynamic title */}
// // // // // //         <div className="topBar">
// // // // // //         <h1>{tabNames[activeTab]}</h1> {/* Automatically gets the title based on activeTab */}
// // // // // //         </div>
// // // // // //         {/* Tab content */}
// // // // // //         <TabContent activeTab={activeTab} />
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Dashboard;
// // // // // // pages/dashboard.tsx
// // // // // "use client"
// // // // // import React, { useState } from 'react';
// // // // // import Sidebar from '../dashboardpage/sidebar';
// // // // // import TabContent from '../dashboardpage/tabcontent';
// // // // // // import styles from "src/components/sidebarpage.css";

// // // // // // Define the tab names object
// // // // // const Dashboard: React.FC = () => {
// // // // //   const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3'>('tab1'); // Default active tab

// // // // //   // Tab names object
// // // // //   const tabNames: { [key: string]: string } = {
// // // // //     tab1: 'Tab 1',
// // // // //     tab2: 'Tab 2 Title',
// // // // //     tab3: 'Tab 3 Title',
// // // // //   };

// // // // //   const handleTabClick = (tab: string) => {
// // // // //     setActiveTab(tab); // Set the active tab when a button is clicked
// // // // //   };

// // // // //   return (
// // // // //     <div className="dashboard">
// // // // //       {/* Pass tabNames prop to Sidebar */}
// // // // //       <Sidebar onTabClick={handleTabClick} tabNames={tabNames} />
// // // // //       <div className="content">
// // // // //         {/* Top bar with dynamic title corresponding to the sidebar tab */}
// // // // //         <div className="topBar">
// // // // //           <h1>{tabNames[activeTab]}</h1> {/* Automatically gets the title based on activeTab */}
// // // // //         </div>
// // // // //         {/* Tab content */}
// // // // //         <TabContent activeTab={activeTab} />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // export default Dashboard;
// // // // pages/dashboard.tsx
// // // "use client"
// // // import React, { useState } from 'react';
// // // import Sidebar from '../dashboardpage/sidebar';
// // // import TabContent from '../dashboardpage/tabcontent';
// // // // import styles from "../dashboardpage/sidebarpage.module.css";
// // // import Dashboard from './DashboardForm';
// // // import TopBar from '../dashboardpage/topbar';
// // // import { Toaster } from 'sonner';

// // // // Example tabList that can be dynamically updated
// // // const tabList = [
// // //   { id: 'tab1', name: 'User Management', component: <Dashboard /> },
// // //   // { id: 'tab2', name: 'Tab 2 Title', component: },
// // //   // { id: 'tab3', name: 'Tab 3 Title', component:  },
// // // ];

// // // const Dashboardpage: React.FC = () => {
// // //   const [activeTab, setActiveTab] = useState<string>(tabList[0].id); // Default active tab

// // //   // Handle tab click, dynamically set active tab
// // //   const handleTabClick = (tabId: string) => {
// // //     setActiveTab(tabId);
// // //   };

// // //   return (
// // //     <div className=" h-screen">
// // //       <Sidebar onTabClick={handleTabClick} tabList={tabList} />
// // //       <div className="ml-[250px] p-5">        {/* Top bar with dynamic title corresponding to the sidebar tab */}
// // //         {/* Use the TopBar component to display the title */}
// // //         <div className="absolute top-0 left-0 w-full z-40">
// // //           <TopBar activeTab={activeTab} tabList={tabList} />
// // //         </div>
// // //         <div className='mt-[100px] h-[calc(100vh-140px)] overflow-y-auto'>
// // //           {/* Render the active tab content */}
// // //           <TabContent activeTab={activeTab} tabList={tabList} />
// // //         </div>
// // //       </div>
// // //       {/* Toast container */}
// // //       <Toaster />
// // //     </div>
// // //   );
// // // };

// // // export default Dashboardpage;

// // // // "use client"
// // // // import React, { useState, useEffect } from 'react';
// // // // import Sidebar from '../dashboardpage/sidebar';
// // // // import TabContent from '../dashboardpage/tabcontent';
// // // // import styles from "src/components/sidebarpage.css";
// // // // import Dashboard from './DashboardForm';
// // // // import TopBar from '../dashboardpage/topbar';
// // // // import { useRouter } from 'next/router';  // Used for redirection to the login page if necessary
// // // // import { getAccessTokenFromCookies, refreshAccessToken, checkIfTokenExpired } from '@/data/services/get-token'; // Import the utility functions
// // // // import axios from 'axios';

// // // // // Example tabList that can be dynamically updated
// // // // const tabList = [
// // // //   { id: 'tab1', name: 'user', component: <Dashboard /> },
// // // //   // { id: 'tab2', name: 'Tab 2 Title', component: },
// // // //   // { id: 'tab3', name: 'Tab 3 Title', component:  },
// // // // ];

// // // // const Dashboardpage: React.FC = () => {
// // // //   const [activeTab, setActiveTab] = useState<string>(tabList[0].id); // Default active tab
// // // //   const [userData, setUserData] = useState(null);  // Store user data
// // // //   const [loading, setLoading] = useState(true);    // Loading state to wait for token validation
// // // //   const router = useRouter();  // Router for redirection to login if necessary

// // // //   // Handle tab click, dynamically set active tab
// // // //   const handleTabClick = (tabId: string) => {
// // // //     setActiveTab(tabId);
// // // //   };

// // // //   // Fetch user data and handle token refresh
// // // //   useEffect(() => {
// // // //     async function handleTokenOnReload() {
// // // //       let accessToken = getAccessTokenFromCookies();
// // // //       console.log('asdfg', accessToken); // Log the access token for debugging

// // // //       if (accessToken) {
// // // //         const isTokenExpired = checkIfTokenExpired(accessToken);
// // // //         if (isTokenExpired) {
// // // //           console.log('Token expired, refreshing...');
// // // //           accessToken = await refreshAccessToken();
// // // //         }
// // // //       } else {
// // // //         console.log('No token found, redirecting to login');

// // // //         router.push('/login');  // Redirect to login if no token is found
// // // //         return;
// // // //       }

// // // //       // if (accessToken) {
// // // //       //   try {
// // // //       //     const { data } = await axios.get('/api/user', {
// // // //       //       headers: { Authorization: `Bearer ${accessToken}` }
// // // //       //     });
// // // //       //     setUserData(data);  // Set the user data
// // // //       //   } catch (error) {
// // // //       //     console.error('Error fetching user data:', error);
// // // //       //     router.push('/login');  // Redirect to login if there's an issue fetching user data
// // // //       //   }
// // // //       // }
// // // //       setLoading(false);  // Set loading to false once done
// // // //     }

// // // //     handleTokenOnReload();
// // // //   }, [router]);

// // // //   // If loading, show loading message or spinner
// // // //   if (loading) {
// // // //     return <div>Loading...</div>;  // You can replace this with a spinner or any loading indicator
// // // //   }

// // // //   return (
// // // //     <div className={styles.dashboard}>
// // // //       <Sidebar onTabClick={handleTabClick} tabList={tabList} />
// // // //       <div className={styles.content}>
// // // //         {/* Top bar with dynamic title corresponding to the sidebar tab */}
// // // //         <TopBar activeTab={activeTab} tabList={tabList} />
// // // //         {/* Render the active tab content */}
// // // //         <TabContent activeTab={activeTab} tabList={tabList} user={userData} />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboardpage;

// // "use client";
// // import React, { useState, useEffect } from 'react';
// // import Sidebar from '../dashboardpage/sidebar';
// // import TopBar from '../dashboardpage/topbar';
// // import TabContent from '../dashboardpage/tabcontent';
// // import Dashboard from './DashboardForm';
// // import { Toaster } from 'sonner';

// // const tabList = [
// //   { id: 'tab1', name: 'User Management', section: 'Section 2', component: <Dashboard /> },
// //   { id: 'tab2', name: '', section: 'Section 1', component: '' },
// // ];

// // const sections = [
// //   { id: 'Section 1', name: 'Features' },
// //   { id: 'Section 2', name: 'Systems' },
// // ];

// // const DashboardPage: React.FC = () => {
// //   const [activeTab, setActiveTab] = useState<string>(tabList[0].id); // Default active tab
// //   const [loading, setLoading] = useState<boolean>(false); // State to handle loading

// //   // Auto reload the page every 5 minutes (300,000 ms)
// //   useEffect(() => {
// //     const intervalId = setInterval(() => {
// //       // Set the loading state to true 1 second before reload
// //       setLoading(true);

// //       // After 1 second, reload the page
// //       setTimeout(() => {
// //         console.log("Auto reloading page...");
// //         window.location.reload();  // Reloads the page
// //       }, 1000); // Wait 1 second before the reload

// //       // Reset the loading state after reload (This will trigger after reload)
// //       setTimeout(() => {
// //         setLoading(false);
// //       }, 2000); // Keep loading for 1 second after the reload (so total loading time = 2 seconds)

// //     }, 300000); // 5 minutes in milliseconds

// //     // Cleanup the interval on component unmount
// //     return () => clearInterval(intervalId);
// //   }, []); // Empty dependency array means this effect only runs once (on mount)

// //   // Handle tab click, dynamically set active tab
// //   const handleTabClick = (tabId: string) => {
// //     setActiveTab(tabId);
// //   };

// //   return (
// //     <div className="h-screen bg-neutral-100">
// //       <Sidebar onTabClick={handleTabClick} tabList={tabList} sections={sections} />
// //       <div className="ml-[250px] p-5">
// //         {/* Top bar with dynamic title corresponding to the sidebar tab */}
// //         {/* Use the TopBar component to display the title */}
// //         <div className="absolute top-0 left-0 w-full z-40">
// //           <TopBar activeTab={activeTab} tabList={tabList} />
// //         </div>
// //         <div className='mt-[100px] h-[calc(100vh-140px)] overflow-y-auto bg-neutral-100'>
// //           {/* Render the active tab content */}
// //           <TabContent activeTab={activeTab} tabList={tabList} />
// //         </div>
// //       </div>
// //       {/* Toast container */}
// //       <Toaster />

// //       {/* Loading Indicator */}
// //       {loading && (
// //         <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 flex justify-center items-center">
// //           <div className="text-white">Loading...</div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DashboardPage;


// "use client";
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../dashboardpage/sidebar';
// import TopBar from '../dashboardpage/topbar';
// import TabContent from '../dashboardpage/tabcontent';
// import UserManagementDashboard from './UserManagementForm';
// import UserRolesDashboard from './UserRolesForm';
// import { Toaster } from 'sonner';
// import { useRouter } from 'next/navigation'; // Ensure you have access to the router
// // import Cookies from 'js-cookie'; // You can use js-cookie to manage cookies easily
// // import useAutoReload from '@/hooks/autoreload';
// // import ToDoDashboard from './old-ToDoForm';
// import ToDoDashboard from './ToDoForm';
// import { LoadDetail } from '@/data/services/usermanagement-service';


// const tabList = [
//   { id: 'tab1', name: 'User Management', section: 'Section 2', component: <UserManagementDashboard /> },
//   { id: 'tab2', name: 'To Do List', section: 'Section 1', component: <ToDoDashboard />},
//   { id: 'tab3', name: 'User Roles', section: 'Section 2', component: <UserRolesDashboard /> },

// ];

// const sections = [
//   { id: 'Section 1', name: 'Features' },
//   { id: 'Section 2', name: 'Systems' },
// ];


// interface UserRolesProps {
//   roles: string;
// }

// // import { GetServerSideProps } from 'next';
// // import Cookies from 'cookies'; // Make sure to install the cookies package: `npm install cookies`

// // export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
// //   const cookies = new Cookies(req, res);
// //   const refreshToken = cookies.get('refresh_token'); // Get the refresh token from the cookie
// // console.log("ojien",refreshToken)
// //   // If no refresh token, redirect to login
// //   if (!refreshToken) {
// //     return {
// //       redirect: {
// //         destination: '/login',
// //         permanent: false,
// //       },
// //     };
// //   }

// //   // If the refresh token exists, allow access to the page
// //   return {
// //     props: {}, // Empty props if you don't need to send any data
// //   };
// // };
// const DashboardPage: React.FC = () => {
// // Check if there is a saved tab in localStorage or default to tab1
// const [activeTab, setActiveTab] = useState<string>('tab1'); // Default to tab1
//   const [isClient, setIsClient] = useState(false); // State to track if we are on the client side
// const [userroles, setuserroles] = useState<UserRolesProps | null>(null); 
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   // Fetch data from backend on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedData = await LoadDetail();
//         // console.log("Fetched data:", fetchedData); // Add this log to check the data
//         setuserroles(fetchedData.roles); // Set the fetched data to state
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to run this effect only once when the component mounts

// // const savedTab = typeof window !== 'undefined' ? localStorage.getItem('activeTab') : 'tab1';
// // const [activeTab, setActiveTab] = useState<string>(savedTab || 'tab1');

//   // const [activeTab, setActiveTab] = useState<string>(tabList[0].id); // Default active tab
//   // const [loading, setLoading] = useState<boolean>(false); // State to handle loading

//   // // Auto reload the page every 5 minutes (300,000 ms)
//   // useEffect(() => {
//   //   const intervalId = setInterval(() => {
//   //     // Set the loading state to true 1 second before reload
//   //     setLoading(true);

//   //     // After 1 second, reload the page
//   //     setTimeout(() => {
//   //       console.log("Auto reloading page...");
//   //       window.location.reload();  // Reloads the page
//   //     }, 1000); // Wait 1 second before the reload

//   //     // Reset the loading state after reload (This will trigger after reload)
//   //     setTimeout(() => {
//   //       setLoading(false);
//   //     }, 2000); // Keep loading for 1 second after the reload (so total loading time = 2 seconds)

//   //   }, 30 * 1000); //  minutes in milliseconds

//   //   // Cleanup the interval on component unmount
//   //   return () => clearInterval(intervalId);
//   // }, []); // Empty dependency array means this effect only runs once (on mount)





//   // const isLoading = useAutoReload(); // Track if the page is loading due to token expiry


// //   const router = useRouter();

// //   useEffect(() => {
// //     console.log("testcookie", document.cookie);  // This will show all cookies available on the client-side

// //     const refreshToken = Cookies.get('refresh_token');
// //     console.log("fhuie 3", refreshToken)

// //  // If refresh token doesn't exist, redirect to login page
// //  if (refreshToken) {
// //   // router.push('/login');
// //   // window.location.reload();  // Reloads the page
// //   console.log("fhuie")

// // }
// //     // If refresh token doesn't exist, redirect to login page
// //     if (!refreshToken) {
// //       // router.push('/login');
// //       // window.location.reload();  // Reloads the page
// //       // window.location.href = '/login';
// //       console.log("fhuie 2")

// //     }
// //   }, []); // The dependency on `router` ensures the effect runs once after mounting





//   // Handle tab click, dynamically set active tab
//   const handleTabClick = (tabId: string) => {
//     setActiveTab(tabId);
//         if (typeof window !== 'undefined') {
//           // Save the active tab to localStorage
//           localStorage.setItem('activeTab', tabId);
//         }
//   };

//   // // add below     <div className="h-screen bg-neutral-100">

//   // {isLoading && (
//   //   <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
//   //     <div className="text-white text-2xl">Loading...</div> {/* Loading spinner or message */}
//   //   </div>
//   // )}

//   // Ensure we only read from localStorage after the component is mounted (client-side)
//   useEffect(() => {
//     setIsClient(true); // Indicate that we are now on the client side
//     const savedTab = localStorage.getItem('activeTab');
//     if (savedTab) {
//       setActiveTab(savedTab); // Set the active tab if found in localStorage
//     }
//   }, []); // Runs once after the initial render

//   if (!isClient) {
//     return null; // Don't render anything until the component is mounted on the client side
//   }

//   return (

//     <div className="h-screen bg-neutral-100">

//       <Sidebar onTabClick={handleTabClick} tabList={tabList} sections={sections} activeTab={activeTab}  />
//       <div className="ml-[250px]">        {/* Top bar with dynamic title corresponding to the sidebar tab */}
//         {/* Use the TopBar component to display the title */}
//          <div className="absolute top-0 left-0 w-full z-40">
//            <TopBar activeTab={activeTab} tabList={tabList} />
//          </div>
//          <div className='mt-[100px] h-auto overflow-y-auto bg-neutral-100'>
//            {/* Render the active tab content */}
//            <TabContent activeTab={activeTab} tabList={tabList} />
//          </div>
//        </div>
//        {/* Toast container */}
//        <Toaster />
//      </div>
//   );
// };

// export default DashboardPage;


"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../dashboardpage/sidebar';
import TopBar from '../dashboardpage/topbar';
import TabContent from '../dashboardpage/tabcontent';
import UserManagementDashboard from './UserManagementForm';
import UserRolesDashboard from './UserRolesForm';
import { Toaster } from 'sonner';
import { LoadDetail } from '@/data/services/usermanagement-service';
import ToDoDashboard from './ToDoForm';
import { Loader2 } from 'lucide-react';
import TrialDashboard from './TrialForm';


const tabList = [
  { id: 'tab1', name: 'User Management', section: 'Section 2', component: <UserManagementDashboard  /> },
  { id: 'tab2', name: 'To Do List', section: 'Section 1', component: <ToDoDashboard /> },
  { id: 'tab3', name: 'User Roles', section: 'Section 2', component: <UserRolesDashboard /> },
  // { id: 'tab4', name: 'Trial', section: 'Section 1', component: <TrialDashboard /> },

];

const sections = [
  { id: 'Section 1', name: 'Features' },
  { id: 'Section 2', name: 'Systems' },
];

export const topbarHeight=100; //sync with below

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('tab1'); // Default to tab1
  const [userroles, setuserroles] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state to track fetching
// State for managing sidebar width and topbar height
const [sidebarWidth, setSidebarWidth] = useState<number>(250);  // Default 250px
const [topbarHeight, setTopbarHeight] = useState<number>(100);  // Default 100px 


  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await LoadDetail();
        setuserroles(fetchedData.roles); // Set the fetched data to state
        console.log("testrolesuser", userroles)
        if (userroles === "Staff") {
          setActiveTab('tab2'); // Staff users should default to tab2
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Keep loading for an additional second for smooth transition
        setTimeout(() => {
          setLoading(false); // After a short delay, set loading to false
        }, 500); // 500 ms delay before hiding the loading state
      }
    };

    fetchData();
  }, [userroles]);

  // useEffect(() => {
  //   // Try to get the saved state from localStorage
  //   const validTab = localStorage.getItem('activeTab');
  //   console.log("testtab",validTab)
  //   // Check if validTab exists and is in tabList
  //   if (validTab && tabList.some(tab => tab.id === validTab)) {
  //     // If validTab exists in tabList, set it as active
  //     setActiveTab(validTab);
  //     console.log("testtab 2",activeTab)

  //   } else {
  //     // If validTab doesn't exist or is not in tabList, set default tab
  //     setActiveTab('tab2');

  //     console.log("testtab 3",activeTab)

  //   }
  // }, [activeTab]); // Effect runs once on mount



  // Handle tab click, dynamically set active tab
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeTab', tabId);
    }
  };

  // Ensure we only read from localStorage after the component is mounted (client-side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('activeTab');
      if (savedTab) {
        setActiveTab(savedTab); // Set the active tab if found in localStorage
      }
    }
  }, []);


  // // Create an array of allowed tab IDs for staff
  // const allowedTabsForStaff = ['tab2', 'tab3', 'tab5'];

  // // Conditionally filter tabList based on user role using allowedTabsForStaff
  // const filteredTabList = userroles === 'Staff'
  //   ? tabList.filter(tab => allowedTabsForStaff.includes(tab.id))  // Show only allowed tabs for staff
  //   : tabList;  // Show all tabs for non-staff users

  // Conditionally filter tabList based on user role
  const filteredTabList = userroles === "Staff"
    ? tabList.filter(tab => tab.id === 'tab2') // Only show tab2 for staff
    : tabList; // Show all tabs if user is not staff

    
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-neutral-100">
        <Loader2 className="mr-2 h-12 w-12 animate-spin" />

        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    ); // Display loading message or spinner while fetching userroles
  }
  return (
    <div className="h-screen bg-neutral-100">
      <Sidebar onTabClick={handleTabClick} tabList={filteredTabList} sections={sections} activeTab={activeTab} sidebarWidth={sidebarWidth}/>
      <div className={`ml-[${sidebarWidth}px]`}> {/* Top bar with dynamic title corresponding to the sidebar tab */}
        <div className="absolute top-0 left-0 w-full z-40">
          <TopBar activeTab={activeTab} tabList={filteredTabList} topbarHeight={topbarHeight} sidebarWidth={sidebarWidth}/>
        </div>
        <div className={` h-screen overflow-y-auto bg-neutral-100`}>
          {/* Render the active tab content */}
          <TabContent activeTab={activeTab}
            tabList={filteredTabList}
            topbarHeight={topbarHeight}
            sidebarWidth={sidebarWidth}
            />
        </div>
      </div>
      <Toaster />
    </div>

    
  );
};

export default DashboardPage;

