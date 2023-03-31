import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { push } = useRouter();
  console.log(user);
  return (
    <div className='grid grid-cols-1 gap-3 place-items-center justify-items-center bg-slate-600 w-full h-screen mx-auto'>
      <div>
        <div>{user ? user.email : ''}</div>
        <Button
          variant='primary'
          onClick={async () => {
            console.log('sign out');
            push('/');
            await logout();
          }}
        >
          Sign Out{' '}
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
