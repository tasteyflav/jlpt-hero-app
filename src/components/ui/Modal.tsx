import React, { FC } from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = (ModalProps) => {
  const { children, isOpen, onClose } = ModalProps;
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
      onClick={onClose}
    >
      <div
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white rounded-lg'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
