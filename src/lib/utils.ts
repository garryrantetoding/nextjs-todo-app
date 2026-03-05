import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge class names using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to get the backend URL using the NEXT_PUBLIC_BACKEND_URL environment variable
export function getBackendURL(path: string = ""): string {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"; // Fallback URL if .env is not set
  return `${url}${path}`;
}
