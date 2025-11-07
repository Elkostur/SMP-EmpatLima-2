import React, { useState, useEffect, useCallback } from 'react';
import type { FaqItem } from '../../types';
import { getFaqs, deleteFaq } from '../../src/services/supabase/faqs'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';
import { useAdminUI } from '../../src/hooks/useAdminUI'; // Import useAdminUI
import SkeletonTable from '../../src/components/admin/SkeletonTable'; // Import SkeletonTable

const AdminFaqs: React.FC = () => {
    const [items, setItems] = useState<FaqItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<FaqItem | null>(null);
    useTitle('Manage FAQs | Admin Panel');
    const { openForm } = useAdminUI(); // Use useAdminUI hook
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getFaqs();
        setItems(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleItemSaved = useCallback((savedItem: FaqItem, originalItem?: FaqItem) => {
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

    const handleDeleteClick = (item: FaqItem) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteFaq(itemToDelete.id);
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage FAQs</h1>
                <button onClick={() => openForm('faq', null, handleItemSaved)} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Create New
                </button>
            </div>

            {isLoading ? <SkeletonTable columns={3} /> : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-4 text-gray-600 dark:text-gray-300">Question</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Answer</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-100">{item.question}</td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{item.answer.substring(0, 100)}...</td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => openForm('faq', item, handleItemSaved)} className="text-blue-500 hover:underline text-sm">Edit</button>
                                        <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {items.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No FAQs found.</p>
                    )}
                </div>
            )}
            
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete this FAQ? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminFaqs;