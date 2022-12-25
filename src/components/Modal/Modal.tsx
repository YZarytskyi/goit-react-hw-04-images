import { useEffect } from 'react';
import s from './Modal.module.css';

interface ModalProps {
  toggleModal: () => void;
  largeImage: string | null;
}

const Modal = ({ toggleModal, largeImage }: ModalProps) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDownCloseModal);

    return () => {
      window.removeEventListener('keydown', onKeyDownCloseModal);
    };
  // eslint-disable-next-line
  }, []);

  const onKeyDownCloseModal = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  return (
    <div className={s.overlay} onClick={toggleModal}>
      <div className={s.modal}>
        <img src={largeImage || ''} alt="" />
      </div>
    </div>
  );
};

export default Modal;
