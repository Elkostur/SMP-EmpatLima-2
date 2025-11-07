import React, { useState, useEffect, useCallback } from 'react';
import type { GalleryItem } from '../../types';
import { getGalleries, deleteGalleryItem } from '../../src/services/supabase/galleries'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';
import { useAdminUI } from '../../src/hooks/useAdminUI'; // Import useAdminUI
import SkeletonCard from '../../src/components/admin/SkeletonCard'; // Import SkeletonCard

const AdminGalleries: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
    useTitle('Manage Galleries | Admin Panel');
    const { openForm, formState } = useAdminUI(); // Use useAdminUI hook
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getGalleries();
        setItems(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // Effect to re-fetch data when the form closes
    useEffect(() => {
        if (!formState.type && !isLoading) { // If form is closed and not initially loading
            fetchItems(); // Re-fetch items
        }
    }, [formState.type, isLoading, fetchItems]);

    const handleDeleteClick = (item: GalleryItem) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteGalleryItem(itemToDelete.id);
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Galleries</h1>
                <button onClick={() => openForm('gallery', null)} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Add New Item
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
                           <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                           <div className="p-4">
                                <p className="font-semibold truncate text-gray-800 dark:text-gray-100">{item.title}</p>
                                <div className="flex gap-2 mt-2 text-sm">
                                    <button onClick={() => openForm('gallery', item)} className="text-blue-500 hover:underline text-sm">Edit</button>
                                    <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline text-sm">Delete</button>
                                </div>
                           </div>
                        </div>
                    ))}
                </div>
            )}
            
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the gallery item "${itemToDelete?.title}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminGalleries;