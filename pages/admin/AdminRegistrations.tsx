
import React, { useState, useEffect, useCallback } from 'react';
import type { Registration } from '../../types';
import { getRegistrations, deleteRegistration } from '../../services/firebase';
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';

const AdminRegistrations: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Registration | null>(null);
    useTitle('PPDB Registrations | Admin Panel');
    
    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        const data = await getRegistrations();
        setRegistrations(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleDeleteClick = (item: Registration) => {
        setItemToDelete(item);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteRegistration(itemToDelete.id);
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">PPDB Registrations</h1>
            </div>

            {isLoading ? <p className="dark:text-gray-300">Loading registrations...</p> : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="whitespace-nowrap">
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-4 text-gray-600 dark:text-gray-300">Date</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Full Name</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Birth Date</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Previous School</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Parent Name</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Phone</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Email</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Document</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map(item => (
                                <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 font-semibold text-gray-800 dark:text-gray-100">{item.fullName}</td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{item.birthDate}</td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{item.previousSchool}</td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{item.parentName}</td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{item.phone}</td>
                                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{item.email}</td>
                                    <td className="p-4 text-sm">
                                        {item.documentUrl ? (
                                            <a href={item.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => handleDeleteClick(item)} className="text-red-500 hover:underline text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {registrations.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No registrations found.</p>
                    )}
                </div>
            )}
            
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the registration for "${itemToDelete?.fullName}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminRegistrations;