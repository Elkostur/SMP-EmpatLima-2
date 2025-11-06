import { supabase } from '../../integrations/supabase/client';
import type { Extracurricular } from '../../types';

export const getExtracurriculars = async (): Promise<Extracurricular[]> => {
    const { data, error } = await supabase
        .from('extracurriculars')
        .select('*')
        .order('name', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrl: item.image_url,
    }));
};

export const addExtracurricular = async (data: Omit<Extracurricular, 'id'>): Promise<Extracurricular> => {
    const { data: newItem, error } = await supabase
        .from('extracurriculars')
        .insert({
            name: data.name,
            description: data.description,
            image_url: data.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        imageUrl: newItem.image_url,
    };
};

export const updateExtracurricular = async (id: string, data: Partial<Omit<Extracurricular, 'id'>>): Promise<Extracurricular> => {
    const { data: updatedItem, error } = await supabase
        .from('extracurriculars')
        .update({
            name: data.name,
            description: data.description,
            image_url: data.imageUrl,
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: updatedItem.id,
        name: updatedItem.name,
        description: updatedItem.description,
        imageUrl: updatedItem.image_url,
    };
};

export const deleteExtracurricular = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('extracurriculars')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};