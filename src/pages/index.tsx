// This is the entry point of the app
import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import AlertModal from '@/components/modals/AlertModal';

export default function Home() {
  const { user, signInAnon } = useAuth();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  if (user) {
    router.push('/dashboard');
    return null;
  }
  return (
    <div className='grid grid-cols-1 gap-3 place-items-center justify-items-center bg-slate-600 w-full h-screen mx-auto'>
      <div>
        <div className='m-3 text-center text-neutral-300 text-8xl'>
          JLPT Hero
        </div>
        <div className='m-3 text-center text-4xl text-neutral-400'>
          Prepare for the JLPT
        </div>
        <div className='m-10 text-center'>
          <Link href='/signin'>
            <Button variant='outline'>Sign In</Button>
          </Link>
        </div>
        <div className='m-10 text-center'>
          <Link href='/signup'>
            <Button variant='primary'>Sign Up</Button>
          </Link>
        </div>
        <div className='m-20 text-center'>
          <Button
            variant='primary'
            onClick={async () => {
              try {
                await signInAnon();
                router.push('/dashboard');
              } catch (error) {
                setIsAlertOpen(true);
                console.error(error);
              }
            }}
          >
            Proceed as Guest
          </Button>
        </div>
      </div>
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title='Error'
        message='There was an error signing in as a guest. Please try again.'
      />
    </div>
  );
}
