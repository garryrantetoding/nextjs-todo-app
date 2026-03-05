// export default Modal;
import React, { useEffect, useState } from 'react';
import { RoleUser } from '../../RoleList'; // Adjust the path if necessary
import { RoleDetail } from '@/data/services/userroles-service';
import DescriptionEditButton from '../../role-buttons/descriptionedit-button';

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole: RoleUser | null;
  isEditing: boolean;
  onEdit: () => void;
  editRole?: RoleUser | null;  // Optional property
  setEditRole?: React.Dispatch<React.SetStateAction<RoleUser | null>>;  // Optional property
  onSave: () => void;
  onCancel: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DescriptionModal: React.FC<DescriptionModalProps> = ({
  isOpen,
  onClose,
  selectedRole,
  isEditing,
  onEdit,
  editRole,
  setEditRole,
  onSave,
  onCancel
}) => {
  const [roleDetails, setPersonDetails] = useState<RoleUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  // To handle loading state for fetching details

  // Fetch user details when the modal opens
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (isOpen && selectedRole && !isEditing) {
        setLoading(true);  // Set loading state to true
        console.log("asdzdaa 2",selectedRole)

        try {
          const response = await RoleDetail(selectedRole.id);  // Make sure selectedPerson has a valid email
          // console.log("test", response);
          setPersonDetails({
            id: selectedRole.id,  // Assume selectedPerson already has `id`
            roleName: response.roleName,
            description: response.description,
            boxColor: response.boxColor,
            roleColor: response.roleColor,
            RolePermission: response.RolePermission,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);  // Set loading state to false once data is fetched
        }
      }
    };

    fetchUserDetails();
  }, [isOpen, selectedRole, isEditing]); // Re-run when modal opens or when selectedPerson changes

  // Update editPerson state when user starts editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof RoleUser) => {
    if (editRole && setEditRole) {
      setEditRole({
        ...editRole,
        [field]: e.target.value,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
  className="fixed inset-0 flex justify-center items-center z-60"
  style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
  onClick={onClose}
>
  <div
    className="bg-white p-6 rounded-lg shadow-lg w-1/2"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Header and buttons container */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl">Role description</h2>

      {/* Buttons container (Edit and Close buttons) */}
      <div className="flex items-center">
        {/* Show Edit button only after the details are loaded */}
        {/* {roleDetails && !loading && (
          <DescriptionEditButton onClick={onEdit} />
        )} */}

        {/* Close button on the right */}
        <button
          onClick={onClose}
          className="text-gray-500 p-2 rounded ml-2"  
        >
          X
        </button>
      </div>
    </div>

    {/* Display loading state while fetching data */}
    {loading && <p>Loading...</p>}

    {/* Display the user details */}
    {roleDetails && !loading && (
      <>
        <div className="mb-4 flex justify-between">
          <div className="w-1/2">
            <div className="mb-2">
              <strong>Role:</strong>
            </div>
            <div className="overflow-x-auto">
              <p className="whitespace-nowrap">{roleDetails.roleName}</p>
            </div>
          </div>
      
        </div>

        {/* Role Section */}
        <div className="mb-4">
          <div className="mb-2">
            <strong>Description:</strong>
          </div>
          <p>{roleDetails.description}</p>
        </div>

      </>
    )}

  </div>
</div>

  );
};

export default DescriptionModal;
