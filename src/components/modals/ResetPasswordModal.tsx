import React, { FC } from 'react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ResetPasswordModalProps {
  isOpen: boolean;
  emailError: string;
  email: string;
  handleUpdateEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordReset: () => void;
  onClose: () => void;
}

const ResetPasswordModal: FC<ResetPasswordModalProps> = (
  ResetPasswordModalProps
) => {
  const {
    isOpen,
    onClose,
    email,
    emailError,
    handleUpdateEmail,
    handlePasswordReset,
  } = ResetPasswordModalProps;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='grid grid-cols-1 grid-rows-4 place-items-center content-start w-full h-full mx-auto rounded'>
        <h1 className='text-2xl font-bold'>Reset Password</h1>
        <p className='text-sm text-neutral-600'>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        <Input
          id='email'
          type='text'
          placeholder='Email'
          value={email}
          helpertext={emailError}
          onChange={handleUpdateEmail}
        />
        <Button variant='primary' onClick={handlePasswordReset}>
          Request Password Reset
        </Button>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
