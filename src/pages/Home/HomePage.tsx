// In HomePage.tsx
import React, { useState } from 'react';
import PatientCard from '../../components/PatientCard/PatientCard';
import ReusableModal from '../../components/ReusableModal/ReusableModal';
import PatientForm from '../../components/PatientForm/PatientForm';
import Toast from '../../components/Toast/Toast';
import LoadingSpinner from '../../components/LoadinSpinner/LoadingSpinner';
import { usePatients } from '../../store/PatientsContext';
import './HomePage.css';
import { Patient } from '../../types/patients';

const HomePage = () => {
  const [expandedPatientId, setExpandedPatientId] = useState<string | null>(null);
  const {
    filteredPatients,
    isLoading,
    isEditModalOpen,
    setIsEditModalOpen,
    isAddModalOpen,
    setIsAddModalOpen,
    selectedPatient,
    setSelectedPatient,
    showDeleteConfirm,
    setShowDeleteConfirm,
    patientToDelete,
    setPatientToDelete,
    showToast,
    setShowToast,
    toastMessage,
    toastType,
    addPatient,
    updatePatient,
    deletePatient
  } = usePatients();

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleDeletePatient = (patientId: string) => {
    const patient = filteredPatients.find(p => p.id === patientId);
    if (patient) {
      setPatientToDelete(patient);
      setShowDeleteConfirm(true);
    }
  };

  const confirmDelete = () => {
    if (patientToDelete) {
      deletePatient(patientToDelete.id);
      setShowDeleteConfirm(false);
      setPatientToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setPatientToDelete(null);
  };

  // Add these handlers for modal closing
  const handleEditSubmit = (patient: Patient) => {
    updatePatient(patient);
    setIsEditModalOpen(false);
    setSelectedPatient(null);
  };

  const handleAddSubmit = (patient: Patient) => {
    addPatient(patient);
    setIsAddModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setSelectedPatient(null);
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  
  
  const handleToggleExpand = (patientId: string) => {
    setExpandedPatientId(prev => (prev === patientId ? null : patientId));
  };

  return (
    <main className="home-page__container">
      <div>
        <div className="home-page__header">   
          <h1 className="patients-title">Patients</h1>
          <button className="add-patient-btn" onClick={() => setIsAddModalOpen(true)}>
          Add patient
        </button>
        </div>
        
        {isLoading ? (
          <LoadingSpinner size="large" />
        ) : filteredPatients.length === 0 ? (
          <div className="empty-state">
            <h2>No patients found</h2>
          </div>
        ) : (
          <div className="patients-container">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onEdit={handleEditPatient}
                onDelete={handleDeletePatient}
                isExpanded={expandedPatientId === patient.id}
                onToggleExpand={handleToggleExpand}
              />
            ))}
          </div>
        )}
        
        <ReusableModal
          isOpen={isEditModalOpen}
          onClose={handleEditCancel}
          title="Edit patient"
        >
          <PatientForm 
            patient={selectedPatient!} 
            onSubmit={handleEditSubmit} 
            onCancel={handleEditCancel} 
          />
        </ReusableModal>

        <ReusableModal
          isOpen={isAddModalOpen}
          onClose={handleAddCancel}
          title="Add patient"
        >
          <PatientForm 
            onSubmit={handleAddSubmit} 
            onCancel={handleAddCancel} 
          />
        </ReusableModal>

        <ReusableModal
          isOpen={showDeleteConfirm}
          onClose={cancelDelete}
          title="Delete patient"
        >
          <div className="delete-confirmation__container">
            <p>Are you sure you want to delete <strong>{patientToDelete?.name}</strong>?</p>
            <p className="delete-warning">This action cannot be undone.</p>
            
            <div className="delete-confirmation__actions">
              <button onClick={cancelDelete} className="btn btn--copy">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn btn--danger">
                Delete patient
              </button>
            </div>
          </div>
        </ReusableModal>
      </div>
      
      <Toast 
        open={showToast} 
        onOpenChange={setShowToast} 
        title={toastType === 'success' ? 'Success!' : toastType === 'error' ? 'Error!' : 'Info!'}
        description={toastMessage} 
        type={toastType} 
      />
    </main>
  );
};

export default HomePage;