import { supabase } from '../../integrations/supabase/client';
import { convertToWebP } from '../../utils/imageConverter'; // Import the new utility

export const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    
    // 1. Convert file to WebP format
    const webpFile = await convertToWebP(file);
    
    // Use the converted file for upload
    const filePath = `public/${Date.now()}-${webpFile.name}`;
    
    // Note: Supabase Storage upload API does not natively support progress tracking 
    // in the browser environment without custom implementation (e.g., using XHR/fetch directly).
    // We will simulate progress completion for consistency if a callback is provided.

    const { data, error } = await supabase.storage
        .from('images') // Ganti dengan nama bucket Supabase Storage Anda
        .upload(filePath, webpFile, { // Use webpFile here
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