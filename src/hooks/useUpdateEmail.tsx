import { useState, useRef, ChangeEventHandler } from 'react';
import { FirebaseError } from 'firebase/app';

type UseUpdateEmailHook = [
  email: string,
  emailError: string,
  handleEmailChange: ChangeEventHandler<HTMLInputElement>,
  handleEmailError: (error: FirebaseError) => void
];

const useUpdateEmail = (): UseUpdateEmailHook => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const debounceTimer = useRef(0);
  const isEmailValid = useRef(false);

  const validateEmail = (newEmail: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(String(newEmail).toLowerCase())) {
      isEmailValid.current = true;
    } else {
      isEmailValid.current = false;
    }
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const email = e.target.value;
    setEmail(email);
    clearTimeout(debounceTimer.current);
    validateEmail(email);
    const timer = window.setTimeout(() => {
      if (isEmailValid.current) {
        setEmailError('');
      } else {
        setEmailError('Enter a valid email address');
      }
    }, 600);
    debounceTimer.current = timer;
  };

  const handleEmailError = (error: FirebaseError) => {
    if (error.code === 'auth/user-not-found') {
      setEmailError('No account found with this email');
    } else if (error.code === 'auth/email-already-in-use') {
      setEmailError('This email address is already in use');
    }
  };

  return [email, emailError, handleEmailChange, handleEmailError];
};

export default useUpdateEmail;
