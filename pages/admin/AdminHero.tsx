
import React, { useState, useEffect, useCallback } from 'react';
import type { HeroImage } from '../../types';
import { getHeroImages, addHeroImage, updateHeroImage, deleteHeroImage, uploadImage } from '../../services/firebase';
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';

const HeroForm: React.FC<{ 
    item: HeroImage | null; 
    onSave: (data: { title: string; subtitle: string; imageUrl?: string }) => Promise<void>; 
    onCancel: () => void; 
}> = ({ item, onSave, onCancel }) => {
    const [title, setTitle] = useState(item?.title || '');
    const [subtitle, setSubtitle] = useState(item?.subtitle || '');
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
            finalImageUrl = `https://picsum.photos/seed/${Date.now()}/1920/1080`;
        }

        await onSave({ title, subtitle, imageUrl: finalImageUrl });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{item ? 'Edit Hero Image' : 'Add New Hero Image'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                         <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Subtitle</label>
                            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Image</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-gray-700 dark:file:text-emerald-400 dark:hover:file:bg-gray-600" />
                            {previewUrl && (
                                <div className="mt-4">
                                    <img src={previewUrl} alt="Image Preview" className="w-full h-auto max-h-48 object-cover rounded-md" />
                                </div>
                            )}
                        </div>
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


const AdminHero: React.FC = () => {
    const [items, setItems] = useState<HeroImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<HeroImage | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<HeroImage | null>(null);
    useTitle('Manage Hero Section | Admin Panel');
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getHeroImages();
        setItems(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleSave = async (itemData: { title: string; subtitle: string; imageUrl?: string; }) => {
        if (editingItem) {
            await updateHeroImage(editingItem.id, itemData);
        } else {
            await addHeroImage(itemData as Omit<HeroImage, 'id'>);
        }
        setIsFormVisible(false);
        setEditingItem(null);
        fetchItems();
    };

    const handleDeleteClick = (item: HeroImage) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteHeroImage(itemToDelete.id);
            fetchItems();
        }
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
    };

    const handleCloseModal = () => {
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Hero Section</h1>
                <button onClick={() => { setEditingItem(null); setIsFormVisible(true); }} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Add New Image
                </button>
            </div>

            {isLoading ? <p className="dark:text-gray-300">Loading images...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
                           <div className="relative h-40">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                                     <h3 className="text-white text-lg font-bold text-center">{item.title}</h3>
                                </div>
                           </div>
                           <div className="p-4">
                                <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{item.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.subtitle}</p>
                                <div className="flex gap-2 mt-3 text-sm">
                                    <button onClick={() => { setEditingItem(item); setIsFormVisible(true); }} className="text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline">Delete</button>
                                </div>
                           </div>
                        </div>
                    ))}
                </div>
            )}
            
            {isFormVisible && <HeroForm item={editingItem} onSave={handleSave} onCancel={() => { setIsFormVisible(false); setEditingItem(null); }} />}
        
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the hero image titled "${itemToDelete?.title}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminHero;
