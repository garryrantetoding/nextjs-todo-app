// // // // src/data/services/axios-instance.ts

// // // import axios from 'axios';
// // // import { refreshAccessToken } from './refresh-service'; // Import your refreshAccessToken function
// // // import { getBackendURL } from '../../lib/utils';

// // // const axiosInstance = axios.create({
// // //   baseURL: getBackendURL(),
// // //   headers: {
// // //       'Content-Type': 'application/json',
// // //   },
// // //   withCredentials: true,  // Make sure to include cookies in the request
// // // });

// // // // Add request interceptor
// // // axiosInstance.interceptors.request.use(
// // //   (config) => {
// // //     // Optionally, you can add authorization headers here if the token exists
// // //     return config;
// // //   },
// // //   (error) => {
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // // Add response interceptor to handle 401 errors (token expiration)
// // // axiosInstance.interceptors.response.use(
// // //   (response) => response,  // Return successful response
// // //   async (error) => {
// // //     if (error.response && error.response.status === 401) {
// // //       // Token is expired or invalid, try to refresh the access token
// // //       const newTokens = await refreshAccessToken();

// // //       console.log("qwertyuio", newTokens)
// // //       if (newTokens && newTokens.access_token) {
// // //         // Retry the original request with the new access token
// // //         error.config.headers['Authorization'] = `Bearer ${newTokens.access_token}`;
// // //         return axiosInstance(error.config);  // Retry the original request
// // //       }

// // //       // If we couldn't refresh the token, log out the user
// // //       console.error('Token refresh failed, logging out...');
// // //       // Optionally, trigger logout logic here
// // //     }
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export default axiosInstance;

// // import axios from 'axios';
// // import { refreshAccessToken } from './refresh-service'; // Import the refreshAccessToken function
// // import { getBackendURL } from '../../lib/utils'; // Backend URL utility
// // import { getAccessTokenFromCookies } from './get-token';

// // let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
// // let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls

// // const axiosInstance = axios.create({
// //   baseURL: getBackendURL(),
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   withCredentials: true,  // Make sure to include cookies in the request
// // });

// // // Add request interceptor to attach the access token
// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     // Optionally, you can add authorization headers here if the token exists
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // // Add response interceptor to handle 401 errors (token expiration)
// // // axiosInstance.interceptors.response.use(
// // //   (response) => response,  // Return successful response
// // //   async (error) => {
// // //     const { config, response } = error;
// // //     if (response && response.status === 401) {
// // //       // Check if refresh is in progress
// // //       if (isRefreshing) {
// // //         // If the refresh process is ongoing, wait for it to complete
// // //         await refreshTokenPromise;  // Wait for the ongoing refresh to finish
// // //         const newAccessToken = await getAccessTokenFromCookies();
// // //         if (newAccessToken) {
// // //              console.log("qwertyuio 1", newAccessToken)

// // //           config.headers['Authorization'] = `Bearer ${newAccessToken}`;  // Retry with new token
// // //           return axiosInstance(config);  // Retry the failed request
// // //         }
// // //       } else {
// // //         try {
// // //           isRefreshing = true;
// // //           // Store the refresh promise to ensure only one refresh request is in progress
// // //           refreshTokenPromise = refreshAccessToken();
// // //           const newTokens = await refreshTokenPromise;

// // //           if (newTokens && newTokens.access_token) {
// // //              console.log("qwertyuio 2", newTokens)

// // //             // Update the config with the new access token
// // //             config.headers['Authorization'] = `Bearer ${newTokens.access_token}`;
// // //             return axiosInstance(config);  // Retry the failed request
// // //           }
// // //         } catch (refreshError) {
// // //           console.error("Error refreshing access token:", refreshError);
// // //         } finally {
// // //           isRefreshing = false;
// // //           refreshTokenPromise = null;  // Reset the promise after refresh completes
// // //         }
// // //       }
// // //     }
// // //     return Promise.reject(error);  // Reject the error if it's not a 401 or refresh fails
// // //   }
// // // );

// // axiosInstance.interceptors.response.use(
// //   (response) => response,
// //   async (error) => {
// //     const originalRequest = error.config;
// //     console.log("Intercepting response error:", error.response.status);  // Debug log
// //     // If token expired, refresh the token and retry
// //     if (error.response.status === 401 && !originalRequest._retry) {
// //       originalRequest._retry = true; // Prevent infinite loops
// //       console.log("Refreshing access token...");
// //       const newTokens = await refreshAccessToken();  // Ensure this calls refresh logic
// //       if (newTokens && newTokens.access_token) {
// //         console.log("New tokens received:", newTokens);
// //         originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;
// //         return axiosInstance(originalRequest);  // Retry the failed request
// //       }
// //     }
// //     return Promise.reject(error);
// //   }
// // );


// // export default axiosInstance;
// import axios from 'axios';
// import { refreshAccessToken } from './refresh-service'; // Import the refreshAccessToken function
// import { getBackendURL } from '../../lib/utils'; // Backend URL utility
// import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from './get-token';

// let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
// let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls

// const axiosInstance = axios.create({
//   baseURL: getBackendURL(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,  // Make sure to include cookies in the request
// });

// // Add request interceptor to attach the access token
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     // Log the access token before adding it to the headers
//     const accessToken = await getAccessTokenFromCookies();
//     console.log('Adding access token to request headers:', accessToken);

//     if (accessToken) {
//       console.log('asdfz Adding access token to request headers:', accessToken);

//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     } else {
//       console.log('No access token found');
//     }

//     // Return the modified config with the access token
//     return config;
//   },
//   (error) => {
//     console.error('Error in request interceptor:', error);
//     return Promise.reject(error);
//   }
// );

// // // // Add response interceptor to handle token expiration (401 error)
// // // axiosInstance.interceptors.response.use(
// // //   (response) => {
// // //     // Log the successful response
// // //     console.log('Request successful:', response);
// // //     return response;
// // //   },
// // //   async (error) => {
// // //     const originalRequest = error.config;
// // //     console.log('Intercepting response error:', error.response.status);  // Debug log

// // //     // If token expired (401), refresh the token and retry the request
// // //     if (error.response.status === 401 && !originalRequest._retry) {
// // //       console.log('Access token expired. Refreshing token...');
// // //       originalRequest._retry = true; // Prevent infinite loops on retries

// // //       // Check if a refresh is already in progress
// // //       if (isRefreshing) {
// // //         console.log('Waiting for current refresh to complete...');
// // //         // If a refresh is in progress, wait for the existing promise to resolve before retrying
// // //         return refreshTokenPromise!.then(() => axiosInstance(originalRequest));
// // //       }

// // //       // Mark that the refresh process has started
// // //       isRefreshing = true;
// // //       refreshTokenPromise = refreshAccessToken()
// // //         .then((newTokens) => {
// // //           if (newTokens && newTokens.access_token) {
// // //             console.log('New tokens received:', newTokens);

// // //             // Update the access token in the request header
// // //             originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;

// // //             // Retry the original request with the new access token
// // //             return axiosInstance(originalRequest);
// // //           } else {
// // //             console.error('Failed to refresh access token. No new tokens.');
// // //             return Promise.reject(error);
// // //           }
// // //         })
// // //         .catch((refreshError) => {
// // //           console.error('Error refreshing access token:', refreshError);
// // //           return Promise.reject(refreshError);
// // //         })
// // //         .finally(() => {
// // //           // Reset the flags after refresh is completed
// // //           isRefreshing = false;
// // //           refreshTokenPromise = null;
// // //         });

// // //       return refreshTokenPromise; // Return the refresh promise for further chaining
// // //     }

// // //     // For other errors, reject the promise with the error
// // //     return Promise.reject(error);
// // //   }
// // // );
// // // Update the axiosInstance response interceptor
// // axiosInstance.interceptors.response.use(
// //   (response) => {
// //     console.log('Request successful:', response);
// //     return response;
// //   },
// //   async (error) => {
// //     const originalRequest = error.config;
// //     console.log('Intercepting response error:', error.response.status);  // Debug log

// //     // If token expired (401), refresh the token and retry the request
// //     if (error.response.status === 401 && !originalRequest._retry) {
// //       console.log('Access token expired. Refreshing token...');
// //       originalRequest._retry = true; // Prevent infinite loops on retries

// //       // Check if a refresh is already in progress
// //       if (isRefreshing) {
// //         console.log('Waiting for current refresh to complete...');
// //         return refreshTokenPromise!.then(() => axiosInstance(originalRequest))
// //         .catch((refreshError) => {
// //           // Handle refresh error (e.g., expired refresh token)
// //           console.log('Error during refresh:', refreshError);
// //           // Optionally, redirect to login or perform other actions
// //           window.location.href = '/login';
// //           return Promise.reject(refreshError);  // Reject the original request
// //         });
// //       }

// //       // Mark that the refresh process has started
// //       isRefreshing = true;
// //       refreshTokenPromise = refreshAccessToken()
// //         .then((newTokens) => {
// //           if (newTokens && newTokens.access_token) {
// //             console.log('New tokens received:', newTokens);

// //             // Update the access token in the request header
// //             originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;

// //             // Retry the original request with the new access token
// //             return axiosInstance(originalRequest);
// //           } else {
// //             console.error('Failed to refresh access token. No new tokens.');
// //             return Promise.reject(error);
// //           }
// //         })
// //         .catch((refreshError) => {
// //           console.error('Error refreshing access token:', refreshError);
// //           return Promise.reject(refreshError);
// //         })
// //         .finally(() => {
// //           // Reset the flags after refresh is completed
// //           isRefreshing = false;
// //           refreshTokenPromise = null;
// //         });

// //       return refreshTokenPromise; // Return the refresh promise for further chaining
// //     }

// //     // For other errors, reject the promise with the error
// //     return Promise.reject(error);
// //   }
// // );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log('Request successful:', response);
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     console.log('Intercepting response error:', error.response.status);  // Debug log
//     const refresh_token =  await getRefreshTokenFromCookies();

//     // If token expired (401), refresh the token and retry the request
//     if (error.response.status === 401 && !originalRequest._retry && refresh_token ) {
//       console.log('Access token expired. Refreshing token...');
//       originalRequest._retry = true; // Prevent infinite loops on retries

//       // Check if a refresh is already in progress
//       if (isRefreshing) {
//         console.log('Waiting for current refresh to complete...');
//         return refreshTokenPromise!.then(() => axiosInstance(originalRequest))
//           .catch((refreshError) => {
//             // Handle refresh error (e.g., expired refresh token)
//             console.log('Error during refresh:', refreshError);
//             // Optionally, redirect to login or perform other actions
//             window.location.href = '/login';
//             return Promise.reject(refreshError);  // Reject the original request
//           });
//       }

//       // Mark that the refresh process has started
//       isRefreshing = true;
//       refreshTokenPromise = refreshAccessToken()
//         .then((newTokens) => {
//           if (newTokens && newTokens.access_token) {
//             console.log('New tokens received:', newTokens);

//             // Update the access token in the request header
//             originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;

//             // Retry the original request with the new access token
//             return axiosInstance(originalRequest);
//           } else {
//             console.error('Failed to refresh access token. No new tokens.');
//             window.location.reload();

//             return Promise.reject(error);
//           }
//         })
//         .catch((refreshError) => {
//           console.error('Error refreshing access token:', refreshError);
//           window.location.reload();

//           return Promise.reject(refreshError);  // Reject promise if refresh fails
//         })
//         .finally(() => {
//           // Reset the flags after refresh is completed
//           isRefreshing = false;
//           refreshTokenPromise = null;
//         });

//       return refreshTokenPromise; // Return the refresh promise for further chaining
//     }

//     // For other errors, reject the promise with the error
//     return Promise.reject(error);
//   }
// );


// export default axiosInstance;
