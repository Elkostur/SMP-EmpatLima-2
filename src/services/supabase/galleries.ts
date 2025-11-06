import { supabase } from '../../integrations/supabase/client';
import type { GalleryItem } from '../../../types'; // Jalur diperbarui

export const getGalleries = async (): Promise<GalleryItem[]> => {
    const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        title: item.title,
        imageUrl: item.image_url,
        createdAt: new Date(item.created_at),
    }));
};

export const addGalleryItem = async (itemData: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> => {
    const { data, error } = await supabase
        .from('galleries')
        .insert({
            title: itemData.title,
            image_url: itemData.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        createdAt: new Date(data.created_at),
    };
};

export const updateGalleryItem = async (itemId: string, itemData: Partial<Omit<GalleryItem, 'id' | 'createdAt'>>): Promise<GalleryItem> => {
    const { data, error } = await supabase
        .from('galleries')
        .update({
            title: itemData.title,
            image_url: itemData.imageUrl,
        })
        .eq('id', itemId)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        createdAt: new Date(data.created_at),
    };
};

export const deleteGalleryItem = async (itemId: string): Promise<void> => {
    const { error } = await supabase
        .from('galleries')
        .delete()
        .eq('id', itemId);
    
    if (error) throw new Error(error.message);
};