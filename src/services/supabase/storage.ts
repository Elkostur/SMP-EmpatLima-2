import { supabase } from '../../integrations/supabase/client';

export const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    const filePath = `public/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
        .from('images') // Ganti dengan nama bucket Supabase Storage Anda
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error('Failed to get public URL for uploaded image.');
    }

    if (onProgress) {
        onProgress(100);
    }

    return publicUrlData.publicUrl;
};