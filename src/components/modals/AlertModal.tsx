import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const AlertModal = (AlertModalProps: AlertModalProps) => {
  const { isOpen, onClose, title, message } = AlertModalProps;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='grid grid-cols-1 grid-rows-4 place-items-center content-start w-full h-full mx-auto rounded'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-sm text-neutral-600'>{message}</p>
        <Button variant='primary' onClick={onClose}>
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
