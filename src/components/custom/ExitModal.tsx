import React from 'react';
import { LogoutButton } from './auth-custom/logout-button';

interface ExitModalProps {
  isExitModalOpen: boolean;
  onCloseExitModal: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isExitModalOpen, onCloseExitModal }) => {
  if (!isExitModalOpen) return null;

  return (
    <div      className="w-full h-full fixed inset-0 flex justify-center items-center z-80 bg-white"
    >
    
        <div className='mr-2'>Your session has expired.</div>
        <div className='mr-2'>Please re-log to continue.</div>
        <LogoutButton label="Log in"/>
   
    </div>
  );
};

export default ExitModal;
