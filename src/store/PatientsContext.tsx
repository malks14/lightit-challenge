/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Patient } from '../types/patients';

interface PatientsContextType {
  patients: Patient[];
  isLoading: boolean;

  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (patientId: string) => void;

  filter: string;
  setFilter: (filter: string) => void;
  clearFilter: () => void;
  filteredPatients: Patient[];

  sortBy: 'name' | 'date' | 'id';
  setSortBy: (sort: 'name' | 'date' | 'id') => void;

  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;

  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (show: boolean) => void;
  patientToDelete: Patient | null;
  setPatientToDelete: (patient: Patient | null) => void;

  showToast: boolean;
  setShowToast: (show: boolean) => void;
  toastMessage: string;
  setToastMessage: (message: string) => void;
  toastType: 'success' | 'error' | 'info';
  setToastType: (type: 'success' | 'error' | 'info') => void;
}

const PatientsContext = createContext<PatientsContextType | undefined>(
  undefined
);

interface PatientsProviderProps {
  children: ReactNode;
}

export const PatientsProvider = ({ children }: PatientsProviderProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState('');

  const [sortBy, setSortBy] = useState<'name' | 'date' | 'id'>('date');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>(
    'success'
  );

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error(error);
        setToastMessage('Failed to load patients');
        setToastType('error');
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(filter.toLowerCase()) ||
        patient.description.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

  const addPatient = (patient: Patient) => {
    setPatients((prev) => [...prev, patient]);
    setToastMessage('Patient added successfully');
    setToastType('success');
    setShowToast(true);
  };

  const updatePatient = (patient: Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === patient.id ? patient : p)));
    setToastMessage('Patient updated successfully');
    setToastType('success');
    setShowToast(true);
  };

  const deletePatient = (patientId: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
    setToastMessage('Patient deleted successfully');
    setToastType('success');
    setShowToast(true);
  };

  const clearFilter = () => {
    setFilter('');
  };

  const value = {
    patients,
    isLoading,

    addPatient,
    updatePatient,
    deletePatient,

    filter,
    setFilter,
    clearFilter,
    filteredPatients,

    sortBy,
    setSortBy,

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
    setToastMessage,
    toastType,
    setToastType,
  };

  return (
    <PatientsContext.Provider value={value}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => {
  const context = useContext(PatientsContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientsProvider');
  }
  return context;
};
