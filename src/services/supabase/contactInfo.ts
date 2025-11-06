import { supabase } from '../../integrations/supabase/client';
import { uploadImage } from './storage';
import type { ContactInfo } from '../../../types'; // Jalur diperbarui

export const getContactInfo = async (): Promise<ContactInfo | null> => {
    const { data, error } = await supabase
        .from('public.contact_info')
        .select('*')
        .eq('id', 'contact_info_singleton')
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error("Error fetching contact info:", error);
        throw new Error(error.message);
    }
    
    if (!data) return null;
    return {
        address: data.address,
        phone: data.phone,
        email: data.email,
        mapImageUrl: data.map_image_url,
    };
};

export const updateContactInfo = async (data: Partial<ContactInfo>): Promise<ContactInfo> => {
    const { data: existing, error: fetchError } = await supabase
        .from('public.contact_info')
        .select('id')
        .eq('id', 'contact_info_singleton')
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Error checking for existing contact info:", fetchError);
        throw new Error(fetchError.message);
    }

    let result;
    if (existing) {
        const { data: updatedData, error } = await supabase
            .from('public.contact_info')
            .update({
                address: data.address,
                phone: data.phone,
                email: data.email,
                map_image_url: data.mapImageUrl,
            })
            .eq('id', 'contact_info_singleton')
            .select('*')
            .single();
        if (error) throw new Error(error.message);
        result = updatedData;
    } else {
        const { data: insertedData, error } = await supabase
            .from('public.contact_info')
            .insert({
                id: 'contact_info_singleton',
                address: data.address,
                phone: data.phone,
                email: data.email,
                map_image_url: data.mapImageUrl,
            })
            .select('*')
            .single();
        if (error) throw new Error(error.message);
        result = insertedData;
    }
    
    return {
        address: result.address,
        phone: result.phone,
        email: result.email,
        mapImageUrl: result.map_image_url,
    };
};