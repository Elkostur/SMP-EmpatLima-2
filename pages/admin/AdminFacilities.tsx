import React, { useState, useEffect, useCallback } from 'react';
import type { Facility } from '../../types';
import { getFacilities, deleteFacility } from '../../src/services/supabase/facilities'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';
import { useAdminUI } from '../../src/hooks/useAdminUI'; // Import useAdminUI
import SkeletonTable from '../../src/components/admin/SkeletonTable'; // Import SkeletonTable

const AdminFacilities: React.FC = () => {
    const [items, setItems] = useState<Facility[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Facility | null>(null);
    useTitle('Manage Facilities | Admin Panel');
    const { openForm, formState } = useAdminUI(); // Use useAdminUI hook
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getFacilities();
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

    const handleDeleteClick = (item: Facility) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteFacility(itemToDelete.id);
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Facilities</h1>
                <button onClick={() => openForm('facility', null)} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Create New
                </button>
            </div>

            {isLoading ? <SkeletonTable columns={4} /> : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-4 text-gray-600 dark:text-gray-300">Image</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Name</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Description</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-24 h-16 object-cover rounded-md" />
                                    </td>
                                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-100">{item.name}</td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{item.description.substring(0, 100)}...</td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => openForm('facility', item)} className="text-blue-500 hover:underline text-sm">Edit</button>
                                        <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the facility "${itemToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminFacilities;