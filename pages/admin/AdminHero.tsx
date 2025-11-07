import React, { useState, useEffect, useCallback } from 'react';
import type { HeroImage } from '../../types';
import { getHeroImages, deleteHeroImage } from '../../src/services/supabase/heroImages'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';
import { useAdminUI } from '../../src/hooks/useAdminUI'; // Import useAdminUI
import SkeletonCard from '../../src/components/admin/SkeletonCard'; // Import SkeletonCard

const AdminHero: React.FC = () => {
    const [items, setItems] = useState<HeroImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<HeroImage | null>(null);
    useTitle('Manage Hero Section | Admin Panel');
    const { openForm } = useAdminUI(); // Use useAdminUI hook
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getHeroImages();
        setItems(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleItemSaved = useCallback((savedItem: HeroImage, originalItem?: HeroImage) => {
        setItems(prevItems => {
            if (originalItem) {
                // Update existing item
                return prevItems.map(item => item.id === savedItem.id ? savedItem : item);
            } else {
                // Add new item
                return [savedItem, ...prevItems];
            }
        });
    }, []);

    const handleDeleteClick = (item: HeroImage) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteHeroImage(itemToDelete.id);
            setItems(prevItems => prevItems.filter(item => item.id !== itemToDelete.id));
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
                <button onClick={() => openForm('hero', null, handleItemSaved)} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Add New Image
                </button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) : ( // 3 columns for image, title/subtitle, actions
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
                                    <button onClick={() => openForm('hero', item, handleItemSaved)} className="text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline">Delete</button>
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
                message={`Are you sure you want to delete the hero image titled "${itemToDelete?.title}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminHero;