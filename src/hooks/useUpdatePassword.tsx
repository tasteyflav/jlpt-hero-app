import { useState, useRef, ChangeEventHandler } from 'react';
import { FirebaseError } from 'firebase/app';

type UseUpdatePasswordHook = [
  password: string,
  passwordError: string,
  handlePasswordChange: ChangeEventHandler<HTMLInputElement>,
  handlePasswordError: (error: FirebaseError) => void
];

const useUpdatePassword = (): UseUpdatePasswordHook => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const debounceTimer = useRef(0);
  const isPasswordValid = useRef(false);

  const validatePassword = (newPassword: string) => {
    if (newPassword.length >= 8) {
      isPasswordValid.current = true;
    } else {
      isPasswordValid.current = false;
    }
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    clearTimeout(debounceTimer.current);
    validatePassword(e.target.value);
    const timer = window.setTimeout(() => {
      if (isPasswordValid.current) {
        setPasswordError('');
      } else {
        setPasswordError('Password must be at least 8 characters');
      }
    }, 600);
    debounceTimer.current = timer;
  };

  const handlePasswordError = (error: FirebaseError) => {
    if (error.code === 'auth/wrong-password') {
      setPasswordError('The password is incorrect');
    }
  };

  return [password, passwordError, handlePasswordChange, handlePasswordError];
};

export default useUpdatePassword;
