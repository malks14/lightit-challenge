

import React, { useState, useRef, useEffect } from 'react';
import './DropdownMenu.css';

interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
  danger?: boolean; 
}

interface DropdownMenuProps {
  trigger: React.ReactNode; 
  items: MenuItem[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const DropdownMenu = ({ trigger, items, position = 'bottom-right' }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = (item: MenuItem) => {
    item.onClick();
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu">
      <div 
        ref={triggerRef}
        className="dropdown-menu__trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>

      {isOpen && (
        <div 
          ref={menuRef}
          className={`dropdown-menu__content dropdown-menu__content--${position}`}
        >
          {items.map((item) => (
            <button
              key={item.id}
              className={`dropdown-menu__item ${item.danger ? 'dropdown-menu__item--danger' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && <i className={item.icon}></i>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;