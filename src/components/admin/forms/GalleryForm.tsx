import React, { useState } from 'react';
import type { GalleryItem } from '../../../../types';
import { addGalleryItem, updateGalleryItem } from '../../../services/supabase/galleries';
import { uploadImage } from '../../../services/supabase/storage';

interface GalleryFormProps {
    item: GalleryItem | null; 
    onSave: (savedItem: GalleryItem) => void; // Changed signature
    onCancel: () => void; 
}

const GalleryForm: React.FC<GalleryFormProps> = ({ item, onSave, onCancel }) => {
    const [title, setTitle] = useState(item?.title || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(item?.imageUrl || null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        setUploadProgress(0);

        let finalImageUrl = item?.imageUrl;

        if (imageFile) {
            finalImageUrl = await uploadImage(imageFile, setUploadProgress);
        } else if (!item) {
            finalImageUrl = `https://picsum.photos/seed/${Date.now()}/600/400`;
        }

        const galleryData = { title, imageUrl: finalImageUrl };
        let savedItem: GalleryItem;

        if (item) {
            savedItem = await updateGalleryItem(item.id, galleryData);
        } else {
            savedItem = await addGalleryItem(galleryData as Omit<GalleryItem, 'id' | 'createdAt'>);
        }
        
        setIsUploading(false);
        onSave(savedItem); // Call onSave with the actual saved item
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{item ? 'Edit Gallery Item' : 'Add New Item'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-gray-700 dark:file:text-emerald-400 dark:hover:file:bg-gray-600" />
                        {previewUrl && (
                            <div className="mt-4">
                                <img src={previewUrl} alt="Image Preview" className="w-48 h-auto object-cover rounded-md" />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t dark:border-gray-700">
                         <div className="flex-grow">
                             {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                                    <div 
                                        className="bg-emerald-500 h-2.5 rounded-full transition-width duration-150" 
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>
                        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" disabled={isUploading} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600 disabled:bg-gray-400">
                            {isUploading ? 'Saving...' : 'Save Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GalleryForm;