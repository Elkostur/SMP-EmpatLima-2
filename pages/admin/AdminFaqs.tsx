
import React, { useState, useEffect, useCallback } from 'react';
import type { FaqItem } from '../../types';
import { getFaqs, addFaq, updateFaq, deleteFaq } from '../../services/firebase';
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';

const FaqForm: React.FC<{ 
    item: FaqItem | null; 
    onSave: (data: { question: string; answer: string }) => Promise<void>; 
    onCancel: () => void; 
}> = ({ item, onSave, onCancel }) => {
    const [question, setQuestion] = useState(item?.question || '');
    const [answer, setAnswer] = useState(item?.answer || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await onSave({ question, answer });
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{item ? 'Edit FAQ' : 'Create New FAQ'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Question</label>
                        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Answer</label>
                        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} className="w-full p-2 border rounded h-32 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required></textarea>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" disabled={isSaving} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600 disabled:bg-gray-400">
                           {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminFaqs: React.FC = () => {
    const [items, setItems] = useState<FaqItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<FaqItem | null>(null);
    useTitle('Manage FAQs | Admin Panel');
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getFaqs();
        setItems(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleSave = async (formData: { question: string; answer: string; }) => {
        if (editingItem) {
            await updateFaq(editingItem.id, formData);
        } else {
            await addFaq(formData);
        }
        setIsFormVisible(false);
        setEditingItem(null);
        fetchItems();
    };

    const handleDeleteClick = (item: FaqItem) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteFaq(itemToDelete.id);
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage FAQs</h1>
                <button onClick={() => { setEditingItem(null); setIsFormVisible(true); }} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Create New
                </button>
            </div>

            {isLoading ? <p className="dark:text-gray-300">Loading FAQs...</p> : (
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
                                        <button onClick={() => { setEditingItem(item); setIsFormVisible(true); }} className="text-blue-500 hover:underline text-sm">Edit</button>
                                        <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {isFormVisible && <FaqForm item={editingItem} onSave={handleSave} onCancel={() => { setIsFormVisible(false); setEditingItem(null); }} />}

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
