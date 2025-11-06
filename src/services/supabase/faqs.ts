import { supabase } from '../../integrations/supabase/client';
import type { FaqItem } from '../../../types'; // Jalur diperbarui

export const getFaqs = async (): Promise<FaqItem[]> => {
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
    }));
};

export const addFaq = async (data: Omit<FaqItem, 'id'>): Promise<FaqItem> => {
    const { data: newItem, error } = await supabase
        .from('faqs')
        .insert({
            question: data.question,
            answer: data.answer,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        question: newItem.question,
        answer: newItem.answer,
    };
};

export const updateFaq = async (id: string, data: Partial<Omit<FaqItem, 'id'>>): Promise<FaqItem> => {
    const { data: updatedItem, error } = await supabase
        .from('faqs')
        .update({
            question: data.question,
            answer: data.answer,
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: updatedItem.id,
        question: updatedItem.question,
        answer: updatedItem.answer,
    };
};

export const deleteFaq = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};