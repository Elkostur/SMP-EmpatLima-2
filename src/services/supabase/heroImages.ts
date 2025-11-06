import { supabase } from '../../integrations/supabase/client';
import type { HeroImage } from '../../types';

export const getHeroImages = async (): Promise<HeroImage[]> => {
    const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        imageUrl: item.image_url,
    }));
};

export const addHeroImage = async (data: Omit<HeroImage, 'id'>): Promise<HeroImage> => {
    const { data: newItem, error } = await supabase
        .from('hero_images')
        .insert({
            title: data.title,
            subtitle: data.subtitle,
            image_url: data.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        title: newItem.title,
        subtitle: newItem.subtitle,
        imageUrl: newItem.image_url,
    };
};

export const updateHeroImage = async (id: string, data: Partial<Omit<HeroImage, 'id'>>): Promise<HeroImage> => {
    const { data: updatedItem, error } = await supabase
        .from('hero_images')
        .update({
            title: data.title,
            subtitle: data.subtitle,
            image_url: data.imageUrl,
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: updatedItem.id,
        title: updatedItem.title,
        subtitle: updatedItem.subtitle,
        imageUrl: updatedItem.image_url,
    };
};

export const deleteHeroImage = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('hero_images')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};