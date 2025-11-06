import { supabase } from '../../integrations/supabase/client';
import type { Facility } from '../../types';

export const getFacilities = async (): Promise<Facility[]> => {
    const { data, error } = await supabase
        .from('facilities')
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

export const addFacility = async (data: Omit<Facility, 'id'>): Promise<Facility> => {
    const { data: newItem, error } = await supabase
        .from('facilities')
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

export const updateFacility = async (id: string, data: Partial<Omit<Facility, 'id'>>): Promise<Facility> => {
    const { data: updatedItem, error } = await supabase
        .from('facilities')
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

export const deleteFacility = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('facilities')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};