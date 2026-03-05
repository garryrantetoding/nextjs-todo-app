// export default axiosInstance;
import axios from 'axios';
import { refreshAccessToken } from './refresh-service'; // Import the refreshAccessToken function
import { getBackendURL } from '../../lib/utils'; // Backend URL utility
import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from './get-token';
import { toast } from 'sonner';
let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls

const axiosInstance = axios.create({
  baseURL: getBackendURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Make sure to include cookies in the request
});

// Add request interceptor to attach the access token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Log the access token before adding it to the headers
    const accessToken = await getAccessTokenFromCookies();
    console.log('Adding access token to request headers:', accessToken);

    if (accessToken) {
      console.log('asdfz Adding access token to request headers:', accessToken);

      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      console.log('No access token found');
    }

    // Return the modified config with the access token
    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Request successful:', response);

     // Check if the response data contains statuscode === 401
     if (response.data.statuscode === 401) {
      console.error('Access token has expired or refresh token is invalid.');
      // Handle the case where the token has expired or is invalid
      window.location.href = '/login';  // Redirect to login
      return Promise.reject('Access token expired or refresh token is invalid');  // Reject the promise with a custom error message
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log('Intercepting response error:', error.response.status);  // Debug log
    const refresh_token =  await getRefreshTokenFromCookies();
    console.log("3hiriehs",refresh_token)
    if (error.response?.status === 403) {
      console.error('Forbidden: You do not have permission to perform this action.');
      // Optionally trigger a global error toast for 403
      // toast.error('You do not have permission to perform this action.');
      return Promise.reject(error);

    }
    // If token expired (401), refresh the token and retry the request
    if (error.response.status === 401 && !originalRequest._retry && refresh_token ) {
      console.log('Access token expired. Refreshing token...');
      originalRequest._retry = true; // Prevent infinite loops on retries

      // Check if a refresh is already in progress
      if (isRefreshing) {
        console.log('Waiting for current refresh to complete...');
        return refreshTokenPromise!.then(() => axiosInstance(originalRequest))
          .catch((refreshError) => {
            // Handle refresh error (e.g., expired refresh token)
            console.log('Error during refresh:', refreshError);
            // Optionally, redirect to login or perform other actions
            window.location.href = '/login';
            return Promise.reject(refreshError);  // Reject the original request
          });
      }

      // Mark that the refresh process has started
      isRefreshing = true;
      refreshTokenPromise = refreshAccessToken()
        .then((newTokens) => {
          if (newTokens && newTokens.access_token) {
            console.log('New tokens received:', newTokens);

            // Update the access token in the request header
            originalRequest.headers['Authorization'] = `Bearer ${newTokens.access_token}`;

            // Retry the original request with the new access token
            return axiosInstance(originalRequest);
          } else {
            console.error('Failed to refresh access token. No new tokens.');
            window.location.reload();

            return Promise.reject(error);
          }
        })
        .catch((refreshError) => {
          console.error('Error refreshing access token:', refreshError);
          window.location.reload();

          return Promise.reject(refreshError);  // Reject promise if refresh fails
        })
        .finally(() => {
          // Reset the flags after refresh is completed
          isRefreshing = false;
          refreshTokenPromise = null;
        });

      return refreshTokenPromise; // Return the refresh promise for further chaining
    }

    // For other errors, reject the promise with the error
    return Promise.reject(error);
  }
);


export default axiosInstance;
