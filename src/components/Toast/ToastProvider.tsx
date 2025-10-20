import React from 'react';
import ReactDOM from 'react-dom';
import * as Toast from '@radix-ui/react-toast';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

const ToastComponent = ({ open, onOpenChange, title, description, type = 'info' }: ToastProps) => {
  const toastContent = (
    <Toast.Root 
      open={open} 
      onOpenChange={onOpenChange}
      className={`toast toast--${type}`}
    >
      <Toast.Title className="toast__title">{title}</Toast.Title>
      {description && (
        <Toast.Description className="toast__description">
          {description}
        </Toast.Description>
      )}
      <Toast.Close className="toast__close">×</Toast.Close>
    </Toast.Root>
  );

  return ReactDOM.createPortal(
    toastContent,
    document.body
  );
};

export default ToastComponent;