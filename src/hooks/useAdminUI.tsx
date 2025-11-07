import React, { createContext, useState, useContext, useCallback, type ReactNode } from 'react';
import type { Achievement, Extracurricular, Facility, FaqItem, GalleryItem, HeroImage, Post, StaffMember } from '../../types';

// Import all admin form components
import AchievementForm from '../components/admin/forms/AchievementForm';
import ExtracurricularForm from '../components/admin/forms/ExtracurricularForm';
import FacilityForm from '../components/admin/forms/FacilityForm';
import FaqForm from '../components/admin/forms/FaqForm';
import GalleryForm from '../components/admin/forms/GalleryForm';
import HeroForm from '../components/admin/forms/HeroForm';
import PostForm from '../components/admin/forms/PostForm';
import StaffForm from '../components/admin/forms/StaffForm';

type FormType = 
  | 'achievement' 
  | 'extracurricular' 
  | 'facility' 
  | 'faq' 
  | 'gallery' 
  | 'hero' 
  | 'post' 
  | 'staff';

interface FormState {
  type: FormType | null;
  data: any | null; // Can be Achievement, Extracurricular, etc.
}

interface AdminUIContextType {
  formState: FormState;
  openForm: (type: FormType, data?: any) => void;
  closeForm: () => void;
}

const AdminUIContext = createContext<AdminUIContextType | undefined>(undefined);

export const AdminUIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>({ type: null, data: null });

  const openForm = useCallback((type: FormType, data: any = null) => {
    setFormState({ type, data });
  }, []);

  const closeForm = useCallback(() => {
    setFormState({ type: null, data: null });
  }, []);

  const renderFormModal = () => {
    if (!formState.type) return null;

    const commonProps = {
      item: formState.data, // 'item' is a generic prop name for the data being edited
      onCancel: closeForm,
    };

    switch (formState.type) {
      case 'achievement':
        return <AchievementForm {...commonProps} onSave={formState.data ? (data) => {} : (data) => {}} />;
      case 'extracurricular':
        return <ExtracurricularForm {...commonProps} onSave={formState.data ? (data) => {} : (data) => {}} />;
      case 'facility':
        return <FacilityForm {...commonProps} onSave={formState.data ? (data) => {} : (data) => {}} />;
      case 'faq':
        return <FaqForm {...commonProps} onSave={formState.data ? (data) => {} : (data) => {}} />;
      case 'gallery':
        return <GalleryForm {...commonProps} onSave={formState.data ? (data) => {} : (data) => {}} />;
      case 'hero':
        return <HeroForm {...commonProps} onSave={formState.data ? (data) => {} : (data) => {}} />;
      case 'post':
        return <PostForm {...commonProps} onSave={formState.data ? (data) => {} : (data) => {}} />;
      case 'staff':
        return <StaffForm {...commonProps} onSave={formState.data ? (data) => {} : (data) => {}} />;
      default:
        return null;
    }
  };

  const value = { formState, openForm, closeForm };

  return (
    <AdminUIContext.Provider value={value}>
      {children}
      {renderFormModal()}
    </AdminUIContext.Provider>
  );
};

export const useAdminUI = (): AdminUIContextType => {
  const context = useContext(AdminUIContext);
  if (context === undefined) {
    throw new Error('useAdminUI must be used within an AdminUIProvider');
  }
  return context;
};