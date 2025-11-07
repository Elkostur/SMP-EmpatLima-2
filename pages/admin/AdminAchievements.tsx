import React, { useState, useEffect, useCallback } from 'react';
import type { Achievement } from '../../types';
import { getAchievements, deleteAchievement } from '../../src/services/supabase/achievements'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';
import { useAdminUI } from '../../src/hooks/useAdminUI'; // Import useAdminUI
import SkeletonTable from '../../src/components/admin/SkeletonTable'; // Import SkeletonTable

const AdminAchievements: React.FC = () => {
    const [items, setItems] = useState<Achievement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Achievement | null>(null);
    useTitle('Manage Achievements | Admin Panel');
    const { openForm } = useAdminUI(); // Use useAdminUI hook
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getAchievements();
        setItems(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleItemSaved = useCallback((savedItem: Achievement, originalItem?: Achievement) => {
        // Instead of directly manipulating state, re-fetch all items to ensure consistency
        fetchItems(); 
    }, [fetchItems]);

    const handleDeleteClick = (item: Achievement) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteAchievement(itemToDelete.id);
            fetchItems(); // Re-fetch after deletion
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Achievements</h1>
                <button onClick={() => openForm('achievement', null, handleItemSaved)} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Create New Achievement
                </button>
            </div>
            
            {isLoading ? <SkeletonTable columns={3} /> : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-4">Title</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4">{item.title}</td>
                                    <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => openForm('achievement', item, handleItemSaved)} className="text-blue-500 hover:underline text-sm">Edit</button>
                                        <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {items.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No achievements found.</p>
                    )}
                </div>
            )}
        
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the achievement titled "${itemToDelete?.title}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminAchievements;