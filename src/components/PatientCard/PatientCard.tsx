import React, { useState } from 'react';
import type { Patient } from '../../types/patients';
import './PatientCard.css';
import placeholderImage from '../../assets/Profile_avatar_placeholder_large.png';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { formatDate } from '../../utils/dateFormatter';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
  isExpanded: boolean;
  onToggleExpand: (patientId: string) => void;
}

const PatientCard = ({ patient, onEdit, onDelete, isExpanded, onToggleExpand }: PatientCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getAvatarSrc = () => {
    const avatar = patient.avatar;
    
    if (!avatar || typeof avatar !== 'string') {
      return placeholderImage;
    }
    
    const shouldUsePlaceholder = 
      avatar === '' || 
      avatar.includes('cloudflare') || 
      avatar.includes('63bedcf7f5cfc0949b634fc8.mockapi.io') || 
      avatar.includes('as.com') ||
      imageError;
      
    return shouldUsePlaceholder ? placeholderImage : avatar;
  };

  const menuItems = [
    {
      id: 'edit',
      label: 'Edit patient',
      icon: 'fas fa-edit',
      onClick: () => onEdit(patient)
    },
    {
      id: 'delete',
      label: 'Delete patient',
      icon: 'fas fa-trash',
      onClick: () => onDelete(patient.id),
      danger: true
    }
  ];
  return (
    <article className="patient-card">
        <header className="patient-card__header">
        <DropdownMenu
          trigger={<i className="fa-solid fa-ellipsis fa-lg"></i>}
          items={menuItems}
          position="bottom-right"
        />
        </header>
      <div className="patient-card__image-section">
        <img 
          src={getAvatarSrc()} 
          alt={patient.name}
          onError={handleImageError}
        />
      </div>

      <div className="patient-card__content-section">
        <h3 className="patient-card__name">{patient.name}</h3>
     
        

        {isExpanded && (
          <div className="patient-card__expanded-content">
               <p className="patient-card__description">
          {patient.description || "No patient information added"}
        </p>
            <div className="patient-card__website">
              <strong>Website:</strong>
              <a 
                href={patient.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="patient-card__website-link"
              >
                {patient.website}
              </a>
            </div>
            <div className="patient-card__id">
              <strong>ID:</strong> {patient.id}
            </div>
            <div className="patient-card__created">
              <strong>Created:</strong> {formatDate(patient.createdAt)}
            </div>
          </div>
        )}
        
        <footer className="patient-card__footer">
          <button 
            className="patient-card__action-btn"
            onClick={() => onToggleExpand(patient.id)}
          >
            {isExpanded ? 'Show less' : 'View more'}
          </button>
        </footer>
      </div>
    </article>
  );
};

export default PatientCard;