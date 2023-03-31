import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  user: {};
  placeholder: string;
  value: string;
  helpertext?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const emailSignUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const sendResetEmail = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signInAnon = () => {
    return signInAnonymously(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        emailSignUp,
        signInAnon,
        login,
        logout,
        sendResetEmail,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
