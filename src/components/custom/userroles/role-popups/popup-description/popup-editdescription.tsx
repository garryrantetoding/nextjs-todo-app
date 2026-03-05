import React, { useState } from 'react';
import { RoleUser } from '../../RoleList'; // Adjust the path if necessary
import { Role } from '@/data/services/enum';

interface EditDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  editRole: RoleUser | null;
  setEditRole: React.Dispatch<React.SetStateAction<RoleUser | null>>;
  onSave: () => void;
  onCancel: () => void;
}



const EditDescriptionModal: React.FC<EditDescriptionModalProps> = ({ isOpen, onClose, editRole, setEditRole, onSave, onCancel }) => {

    if (!isOpen || !editRole) return null; // Don't render the modal if not open or no person to edit

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editRole&& setEditRole) {
      const descriptionValue = e.target.value
      setEditRole({
        ...editRole,
        description: descriptionValue, // Assign the corresponding enum value
      });
    }
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center z-65" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl mb-4">Edit User</h2> 
      <div className="flex items-center">
          <button onClick={onSave} className="bg-blue-500 text-white  rounded-md mr-2 h-8 w-20">
            Save
          </button>
          <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
            Cancel
          </button>
        </div>
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={editRole.roleName || ''}
            onChange={(e) => setEditRole({ ...editRole, roleName: e.target.value })}
            className="p-2 border rounded w-full"
            disabled
          />
        </div>
        <div className="mt-2">
          <label>Description:</label>
          <select
            value={editRole.description || ''}
            onChange={handleDescriptionChange}
            className="p-2 border rounded w-full"
          >
            <option value="Owner">Owner</option>
            <option value="Approver">Approver</option>
            <option value="Staff">Staff</option>
          </select>
        </div>
        
      </div>
      
    </div>
  );
};

export default EditDescriptionModal;
