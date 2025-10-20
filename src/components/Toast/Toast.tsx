import React from 'react';
import * as Toast from '@radix-ui/react-toast';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

const ToastComponent = ({ open, onOpenChange, title, description, type = 'info' }: ToastProps) => {
    return (
      <Toast.Root 
        open={open} 
        onOpenChange={onOpenChange}
        className={`ToastRoot ToastRoot--${type}`}
        >
        <Toast.Title className="ToastTitle">{title}</Toast.Title>
        {description && (
          <Toast.Description className="ToastDescription">
            {description}
          </Toast.Description>
        )}
        <Toast.Close className="ToastClose">×</Toast.Close>
      </Toast.Root>
    );
  };

export default ToastComponent;