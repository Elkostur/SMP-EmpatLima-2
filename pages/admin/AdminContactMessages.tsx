import React, { useState, useEffect, useCallback } from 'react';
import type { ContactMessage } from '../../types';
import { getContactMessages, deleteContactMessage } from '../src/services/supabase/contactMessages'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';

const AdminContactMessages: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<ContactMessage | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    useTitle('Contact Messages | Admin Panel');
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getContactMessages();
        setMessages(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleDeleteClick = (item: ContactMessage) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteContactMessage(itemToDelete.id);
            fetchItems();
            if (selectedMessage?.id === itemToDelete.id) {
                setSelectedMessage(null);
            }
        }
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
    };

    const handleCloseModal = () => {
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
    };

    const MessageDetailView: React.FC<{ message: ContactMessage; onClose: () => void; onDelete: (item: ContactMessage) => void;}> = ({ message, onClose, onDelete }) => (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Message Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl">&times;</button>
                </div>
                <div className="space-y-4">
                    <p><strong>From:</strong> {message.name} &lt;{message.email}&gt;</p>
                    <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}</p>
                    <p><strong>Subject:</strong> {message.subject}</p>
                    <div className="border-t dark:border-gray-700 pt-4 mt-4">
                        <p className="whitespace-pre-wrap">{message.message}</p>
                    </div>
                </div>
                 <div className="flex justify-end gap-4 mt-8 pt-4 border-t dark:border-gray-700">
                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">Close</button>
                    <button onClick={() => onDelete(message)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
                 </div>
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Contact Form Messages</h1>

            {isLoading ? <p className="dark:text-gray-300">Loading messages...</p> : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="whitespace-nowrap">
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-4 text-gray-600 dark:text-gray-300">Date</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">From</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Subject</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map(item => (
                                <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-100">{item.name}</td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{item.subject}</td>
                                    <td className="p-4 flex gap-4">
                                        <button onClick={() => setSelectedMessage(item)} className="text-blue-500 hover:underline text-sm">View</button>
                                        <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {messages.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No messages found.</p>
                    )}
                </div>
            )}
            
            {selectedMessage && (
                <MessageDetailView 
                    message={selectedMessage} 
                    onClose={() => setSelectedMessage(null)} 
                    onDelete={(item) => {
                         setSelectedMessage(null); // Close the modal first
                         handleDeleteClick(item);
                    }}
                />
            )}

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete this message from "${itemToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminContactMessages;