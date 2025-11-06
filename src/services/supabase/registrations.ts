import { supabase } from '../../integrations/supabase/client';
import { uploadImage } from './storage';
import type { Registration } from '../../../types'; // Jalur diperbarui

export const getRegistrations = async (): Promise<Registration[]> => {
    const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        fullName: item.full_name,
        birthDate: item.birth_date,
        previousSchool: item.previous_school,
        parentName: item.parent_name,
        phone: item.phone,
        email: item.email,
        createdAt: new Date(item.created_at),
        documentUrl: item.document_url,
    }));
};

export const addRegistration = async (
    data: Omit<Registration, 'id' | 'createdAt' | 'documentUrl'>,
    documentFile?: File | null
): Promise<Registration> => {
    let documentUrl: string | undefined = undefined;
    if (documentFile) {
        documentUrl = await uploadImage(documentFile); 
    }

    const { data: newItem, error } = await supabase
        .from('registrations')
        .insert({
            full_name: data.fullName,
            birth_date: data.birthDate,
            previous_school: data.previousSchool,
            parent_name: data.parentName,
            phone: data.phone,
            email: data.email,
            document_url: documentUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        fullName: newItem.full_name,
        birthDate: newItem.birth_date,
        previousSchool: newItem.previous_school,
        parentName: newItem.parent_name,
        phone: newItem.phone,
        email: newItem.email,
        createdAt: new Date(newItem.created_at),
        documentUrl: newItem.document_url,
    };
};

export const deleteRegistration = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};