import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyBdA-DDmM-qFbnWtetUX_cKQY7LARL1aR8',
  authDomain: 'jlpt-hero.firebaseapp.com',
  projectId: 'jlpt-hero',
  storageBucket: 'jlpt-hero.appspot.com',
  messagingSenderId: '122848434028',
  appId: '1:122848434028:web:6f11c8b82c650fd8960549',
  measurementId: 'G-GL0QLQEFNJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
