import { supabase } from '../../integrations/supabase/client';
import { uploadImage } from './storage';
import type { Achievement } from '../../../types'; // Jalur diperbarui

export const getAchievements = async (): Promise<Achievement[]> => {
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date,
        imageUrl: item.image_url,
    }));
};

export const addAchievement = async (data: Omit<Achievement, 'id'>): Promise<Achievement> => {
    const { data: newItem, error } = await supabase
        .from('achievements')
        .insert({
            title: data.title,
            description: data.description,
            date: data.date,
            image_url: data.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        title: newItem.title,
        description: newItem.description,
        date: newItem.date,
        imageUrl: newItem.image_url,
    };
};

export const updateAchievement = async (id: string, data: Partial<Omit<Achievement, 'id'>>): Promise<Achievement> => {
    const { data: updatedItem, error } = await supabase
        .from('achievements')
        .update({
            title: data.title,
            description: data.description,
            date: data.date,
            image_url: data.imageUrl,
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: updatedItem.id,
        title: updatedItem.title,
        description: updatedItem.description,
        date: updatedItem.date,
        imageUrl: updatedItem.image_url,
    };
};

export const deleteAchievement = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};