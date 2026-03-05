import { logoutAction } from "../../../data/actions/auth-actions";
import { LogOut } from "lucide-react";
import { useRouter } from 'next/navigation'; // Ensure you have access to the router
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies


interface LogoutButtonProps {
  label?: string; // Optional prop for dynamic label text
}

export function LogoutButton({ label = "Logout" }: LogoutButtonProps) {

  
  const router = useRouter();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform any client-side actions before submitting the form
    // Clear the access token from localStorage
    Cookies.remove("access_token"); // Clear the cookie
    Cookies.remove("refresh_token"); // Clear the cookie
    // Optionally: Call the logout action to handle server-side cleanup
    await logoutAction();
    localStorage.clear();

    // Redirect the user to the login page after logout
    router.push("/login");
  };



  return (
    <form onSubmit={handleLogout}>
      <button type="submit" className="flex items-center space-x-2">
        <LogOut className="w-6 h-6 hover:text-primary" />
        <span>{label}</span> {/* Optional text for accessibility */}
      </button>
    </form>
  );
}
