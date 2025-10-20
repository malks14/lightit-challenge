import "./ReusableModal.css";
import Backdrop from "../Backdrop/Backdrop";
import { useEffect } from "react";

interface ReusableModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }
  
  const ReusableModal = ({
    isOpen,
    onClose,
    title,
    children
  }: ReusableModalProps) => {
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
          document.body.style.height = '100vh';
        } else {
          document.body.style.overflow = 'unset';
          document.body.style.height = 'unset';
        }
    
        return () => {
          document.body.style.overflow = 'unset';
          document.body.style.height = 'unset';
        };
      }, [isOpen]);
    
      if (!isOpen) return null;
  
    return (
      <>
        <Backdrop onClick={onClose} />
        <div className="reusable-modal">
          <div className="reusable-modal__header">
            <h2 className="reusable-modal__title">{title}</h2>
            <button 
              className="reusable-modal__close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div className="reusable-modal__content">
            {children}
          </div>

        </div>
      </>
    );
  };

  export default ReusableModal;