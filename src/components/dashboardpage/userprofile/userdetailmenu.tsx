import React from 'react';
import { LogoutButton } from '@/components/custom/auth-custom/logout-button';

// Define the type for the Dropdown component
interface DropdownProps {
  visible: boolean;
  onClose: () => void;
}

const UserDetailMenu: React.FC<DropdownProps> = ({ visible, onClose }) => {
  if (!visible) return null; // Don't render if dropdown isn't visible

  return (
    <div className="absolute bg-white shadow-lg right-0 top-full p-4 mt-2 rounded border z-50">
      <ul>
<LogoutButton label="Log out"/>
      </ul>
    </div>
  );
};

export default UserDetailMenu;
