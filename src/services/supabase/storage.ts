import { supabase } from '../../integrations/supabase/client';
import { convertToWebP } from '../../utils/imageConverter'; // Import the new utility

// Utility function to sanitize file name
const sanitizeFileName = (fileName: string): string => {
    // Replace non-alphanumeric characters (except dot and hyphen) with underscores
    let sanitized = fileName.replace(/[^a-zA-Z0-9-.]/g, '_');
    // Ensure no multiple underscores next to each other
    sanitized = sanitized.replace(/_+/g, '_');
    return sanitized;
};

export const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    
    // 1. Convert file to WebP format
    const webpFile = await convertToWebP(file);
    
    // 2. Sanitize the file name
    const sanitizedFileName = sanitizeFileName(webpFile.name);
    
    // Use the converted file for upload
    const filePath = `public/${Date.now()}-${sanitizedFileName}`;
    
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