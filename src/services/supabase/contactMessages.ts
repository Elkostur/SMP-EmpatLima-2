import { supabase } from '../../integrations/supabase/client';
import type { ContactMessage } from '../../../types'; // Jalur diperbarui

export const getContactMessages = async (): Promise<ContactMessage[]> => {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        createdAt: new Date(item.created_at),
    }));
};

export const addContactMessage = async (data: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> => {
    const { data: newItem, error } = await supabase
        .from('contact_messages')
        .insert({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        name: newItem.name,
        email: newItem.email,
        subject: newItem.subject,
        message: newItem.message,
        createdAt: new Date(newItem.created_at),
    };
};

export const deleteContactMessage = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};