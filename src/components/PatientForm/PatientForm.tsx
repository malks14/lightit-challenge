import React, { useState, useEffect, useRef } from 'react';
import { Patient } from '../../types/patients';
import './PatientForm.css';
import placeholderImage from '../../assets/Profile_avatar_placeholder_large.png';

interface FormErrors {
  name?: string;
  description?: string;
  website?: string;
  avatar?: string;
}

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (patient: Patient) => void;
  onCancel: () => void;
}

const PatientForm = ({ patient, onSubmit, onCancel }: PatientFormProps) => {
    const [avatarPreview, setAvatarPreview] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    avatar:  ''
  });

  const isEditMode = !!patient;

  const getAvatarSrc = () => {
    const avatar = formData.avatar;
    
    if (!avatar || typeof avatar !== 'string') {
      return placeholderImage;
    }
    
    const shouldUsePlaceholder = 
      avatar === '' || 
      avatar.includes('cloudflare') || 
      avatar.includes('63bedcf7f5cfc0949b634fc8.mockapi.io') || 
      avatar.includes('as.com') 
      
    return shouldUsePlaceholder ? placeholderImage : avatar;
  };


  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        description: patient.description,
        website: patient.website,
        avatar: patient.avatar
      });
    }
  }, [patient]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }


    if (formData.website && formData.website.trim()) {
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(formData.website.trim())) {
        newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
      }
    }


    if (selectedFile) {
      const maxSize = 5 * 1024 * 1024; 
      if (selectedFile.size > maxSize) {
        newErrors.avatar = 'Image size must be less than 5MB';
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(selectedFile.type)) {
        newErrors.avatar = 'Please select a valid image file (JPEG, PNG, GIF, WebP)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const patientData: Patient = {
      id: patient?.id || Date.now().toString(), 
      name: formData.name,
      description: formData.description,
      website: formData.website,
      avatar: selectedFile ? URL.createObjectURL(selectedFile) : formData.avatar,
      createdAt: patient?.createdAt || new Date().toISOString()
    };

    onSubmit(patientData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      if (errors.avatar) {
        setErrors(prev => ({
          ...prev,
          avatar: undefined
        }));
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
<form onSubmit={handleSubmit} className="patient-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'form-input--error' : ''}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className={errors.website ? 'form-input--error' : ''}
          placeholder="https://example.com"
        />
        {errors.website && <span className="form-error">{errors.website}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="avatar">Profile Image</label>
        <div className="avatar-upload">
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          
          <div className="avatar-preview" onClick={() => fileInputRef.current?.click()}>
            {avatarPreview || patient?.avatar ? (
              <img src={avatarPreview || getAvatarSrc()} alt="Preview" />
            ) : (
              <div className="avatar-placeholder">
                <i className="fa-solid fa-camera"></i>
                <p>Click to upload image</p>
              </div>
            )}
          </div>
          
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="btn btn--copy btn--small"
            >
            Choose Image
            </button>
          
          {errors.avatar && <span className="form-error">{errors.avatar}</span>}
        </div>
      </div>
      
      <div className="patient-form__actions">
        <button 
          type="button" 
          onClick={onCancel}
          className="btn btn--secondary"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="btn btn--primary"
        >
          {isEditMode ? 'Update Patient' : 'Add Patient'}
        </button>
      </div>
    </form>
  );
};

export default PatientForm;