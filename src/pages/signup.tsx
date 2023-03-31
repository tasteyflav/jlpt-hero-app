import React, { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { getAuth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '@/context/AuthContext';
import useUpdateEmail from '@/hooks/useUpdateEmail';
import useUpdatePassword from '@/hooks/useUpdatePassword';

const SignUp = () => {
  const auth = getAuth();
  const { user, emailSignUp } = useAuth();
  const [email, emailError, handleUpdateEmail, handleEmailError] =
    useUpdateEmail();
  const [password, passwordError, handleUpdatePassword, handlePasswordError] =
    useUpdatePassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await emailSignUp(email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          handleEmailError(error);
        }
      }
    }
  };

  return (
    <div className='grid grid-cols-1 gap-3 place-items-center justify-items-center bg-slate-600 w-full h-screen mx-auto'>
      <div>
        <div className='m-3 text-center text-4xl text-neutral-400'>Sign Up</div>
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
        <div className='mx-10 mb-4 text-center'>
          <Input
            id='password'
            type='password'
            placeholder='Password'
            value={password}
            helpertext={passwordError}
            onChange={handleUpdatePassword}
          />
        </div>
        <div className='m-10 text-center'>
          <Button variant='primary' onClick={handleSubmit}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
