/**
 * Converts a given image file (File object) into a WebP format File object.
 * @param file The input image file (e.g., image/jpeg, image/png).
 * @param quality The quality for WebP compression (0.0 to 1.0). Default is 0.8.
 * @returns A Promise that resolves to the new WebP File object, or the original file if conversion fails.
 */
export const convertToWebP = (file: File, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
        // Only attempt conversion for common image types
        if (!file.type.startsWith('image/')) {
            return resolve(file);
        }

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        return resolve(file);
                    }
                    
                    ctx.drawImage(img, 0, 0);

                    // Convert canvas content to WebP Blob
                    canvas.toBlob((blob) => {
                        if (blob) {
                            // Create a new File object with the WebP blob
                            const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                                type: 'image/webp',
                                lastModified: Date.now(),
                            });
                            resolve(webpFile);
                        } else {
                            // Fallback to original file if blob creation fails
                            resolve(file);
                        }
                    }, 'image/webp', quality);

                } catch (error) {
                    console.error("WebP conversion failed:", error);
                    resolve(file); // Fallback
                }
            };
            img.onerror = () => resolve(file); // Fallback if image loading fails
            img.src = e.target?.result as string;
        };
        
        reader.onerror = () => resolve(file); // Fallback if file reading fails
        reader.readAsDataURL(file);
    });
};