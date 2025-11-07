import React, { createContext, useState, useContext, useEffect, useCallback, type ReactNode } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
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
  data: any | null; // The actual item data to edit/add
  onItemSaved?: (savedItem: any, originalItem?: any) => void; // Callback to update parent's state
}

interface AdminUIContextType {
  formState: FormState; // Expose formState so admin pages can react to it
  openForm: (type: FormType, data?: any, onItemSavedCallback?: (savedItem: any, originalItem?: any) => void) => void;
  closeForm: () => void;
}

const AdminUIContext = createContext<AdminUIContextType | undefined>(undefined);

export const AdminUIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentFormState, setCurrentFormState] = useState<FormState>({ type: null, data: null });

  // Effect to load from localStorage on initial mount or path change
  useEffect(() => {
    const savedStateString = localStorage.getItem('adminFormState');
    if (savedStateString) {
      const savedState = JSON.parse(savedStateString);
      // Only restore if the saved form was for the current path
      if (savedState.path === location.pathname) {
        setCurrentFormState({
          type: savedState.type,
          data: savedState.data, // This is where the form's data will be restored from
          onItemSaved: undefined, // Do not restore callback from localStorage
        });
        // Ensure URL params are also set if restoring from localStorage
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('formType', savedState.type);
        if (savedState.data && savedState.data.id) {
            newSearchParams.set('itemId', savedState.data.id);
        } else if (savedState.data) { // For new items, if data is provided (e.g., default values)
            newSearchParams.set('itemData', encodeURIComponent(JSON.stringify(savedState.data)));
            newSearchParams.set('itemId', 'new'); // Indicate it's a new item
        }
        setSearchParams(newSearchParams, { replace: true });
      } else {
        // If saved state is for a different path, clear it
        localStorage.removeItem('adminFormState');
      }
    }
  }, [location.pathname]); // Only run on initial mount or path change

  // Effect to update localStorage and URL when currentFormState changes
  useEffect(() => {
    if (currentFormState.type) {
      // Store only serializable data
      localStorage.setItem('adminFormState', JSON.stringify({
        type: currentFormState.type,
        data: currentFormState.data,
        path: location.pathname,
      }));
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('formType', currentFormState.type);
      if (currentFormState.data && currentFormState.data.id) {
        newSearchParams.set('itemId', currentFormState.data.id);
      } else if (currentFormState.data) {
        newSearchParams.set('itemData', encodeURIComponent(JSON.stringify(currentFormState.data)));
        newSearchParams.set('itemId', 'new');
      } else {
        newSearchParams.delete('itemId');
        newSearchParams.delete('itemData');
      }
      setSearchParams(newSearchParams, { replace: true });
    } else {
      localStorage.removeItem('adminFormState');
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('formType');
      newSearchParams.delete('itemId');
      newSearchParams.delete('itemData');
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [currentFormState, location.pathname, searchParams, setSearchParams]); // Depend on currentFormState, path, and searchParams

  const openForm = useCallback((type: FormType, data: any = null, onItemSavedCallback?: (savedItem: any, originalItem?: any) => void) => {
    setCurrentFormState({ type, data, onItemSaved: onItemSavedCallback });
  }, []);

  const closeForm = useCallback(() => {
    setCurrentFormState({ type: null, data: null, onItemSaved: undefined });
  }, []);

  // New handler to update form data in currentFormState
  const handleFormContentChange = useCallback((newData: any) => {
    setCurrentFormState(prevState => ({
      ...prevState,
      data: { ...prevState.data, ...newData }
    }));
  }, []);

  const renderFormModal = () => {
    if (!currentFormState.type) return null;

    // This is the onSave handler that forms will call after their internal save logic
    const handleFormSave = (savedItem: any) => {
      if (currentFormState.onItemSaved) {
        currentFormState.onItemSaved(savedItem, currentFormState.data); // Pass saved and original item
      }
      closeForm();
    };

    const commonProps = {
      item: currentFormState.data,
      onCancel: closeForm,
      onSave: handleFormSave,
      onDataChange: handleFormContentChange, // Pass the new handler
    };

    switch (currentFormState.type) {
      case 'achievement': return <AchievementForm {...commonProps} />;
      case 'extracurricular': return <ExtracurricularForm {...commonProps} />;
      case 'facility': return <FacilityForm {...commonProps} />;
      case 'faq': return <FaqForm {...commonProps} />;
      case 'gallery': return <GalleryForm {...commonProps} />;
      case 'hero': return <HeroForm {...commonProps} />;
      case 'post': return <PostForm {...commonProps} />;
      case 'staff': return <StaffForm {...commonProps} />;
      default: return null;
    }
  };

  const value = { formState: currentFormState, openForm, closeForm };

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