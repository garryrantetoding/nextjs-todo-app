// src/components/custom/role-filter.tsx
import React from 'react';

interface RoleFilterProps {
  onRoleChange: (role: string) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({ onRoleChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onRoleChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="role-filter"></label>
      <select id="role-filter" onChange={handleChange} className="border h-10 p-2 bg-white rounded-md"
      >
        <option value="">Role</option>
        <option value="Owner">Owner</option>
        <option value="Approver">Approver</option>
        <option value="Staff">Staff</option>
        {/* Add more roles if needed */}
      </select>
    </div>
  );
};

export default RoleFilter;
