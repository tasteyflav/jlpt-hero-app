import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ResetPasswordModal from '@/components/modals/ResetPasswordModal';
import AlertModal from '@/components/modals/AlertModal';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';
import useUpdateEmail from '@/hooks/useUpdateEmail';
import useUpdatePassword from '@/hooks/useUpdatePassword';

const SignIn = () => {
  const auth = getAuth();
  const router = useRouter();
  const { user, login, sendResetEmail } = useAuth();
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [email, emailError, handleUpdateEmail, handleEmailError] =
    useUpdateEmail();
  const [password, passwordError, handleUpdatePassword, handlePasswordError] =
    useUpdatePassword();

  const handleSubmit = async (e: React.FormEvent<void>) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password') {
          handlePasswordError(error);
        } else if (error.code === 'auth/user-not-found') {
          handleEmailError(error);
        }
      }
    }
    return;
  };

  const handlePasswordReset = async () => {
    try {
      await sendResetEmail(email);
      setIsAlertOpen(true);
      setIsResetOpen(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/user-not-found') {
          setIsErrorOpen(true);
          setIsResetOpen(false);
        }
      }
    }
  };

  return (
    <div className='grid grid-cols-1 gap-3 place-items-center justify-items-center bg-slate-600 w-full h-screen mx-auto'>
      <div>
        <div className='m-3 text-center text-4xl text-neutral-400'>Sign In</div>
        <div className='mx-10 mb-2 text-center'>
          <Input
            id='email'
            type='text'
            placeholder='Email'
            value={email}
            helpertext={emailError}
            onChange={handleUpdateEmail}
          />
        </div>
        <div className='mx-10 text-center'>
          <Input
            id='password'
            type='password'
            placeholder='Password'
            value={password}
            helpertext={passwordError}
            onChange={handleUpdatePassword}
          />
        </div>
        <div
          className='hover:cursor-pointer hover:text-blue-200 text-center'
          onClick={() => setIsResetOpen(true)}
        >
          Forgot Password?
        </div>
        <div className='m-10 text-center'>
          <Button variant='primary' onClick={handleSubmit}>
            Sign In
          </Button>
        </div>
      </div>
      <ResetPasswordModal
        isOpen={isResetOpen}
        emailError={emailError}
        onClose={() => setIsResetOpen(false)}
        email={email}
        handleUpdateEmail={handleUpdateEmail}
        handlePasswordReset={handlePasswordReset}
      />
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title='Password Reset Link Sent'
        message='An email containing a reset link has been sent. Click on the link to continue.'
      />
      <AlertModal
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        title='Error'
        message='This email address has not been registered.'
      />
    </div>
  );
};

export default SignIn;
