import React, { useState, useEffect, useCallback } from 'react';
import type { StaffMember } from '../../types';
import { getStaff, deleteStaffMember } from '../../src/services/supabase/staff'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';
import { useAdminUI } from '../../src/hooks/useAdminUI'; // Import useAdminUI
import SkeletonTable from '../../src/components/admin/SkeletonTable'; // Import SkeletonTable

const AdminStaff: React.FC = () => {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<StaffMember | null>(null);
    useTitle('Manage Staff | Admin Panel');
    const { openForm, formState } = useAdminUI(); // Use useAdminUI hook
    
    const fetchStaff = useCallback(async () => {
        setIsLoading(true);
        const data = await getStaff();
        setStaff(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    // Effect to re-fetch data when the form closes
    useEffect(() => {
        if (!formState.type && !isLoading) { // If form is closed and not initially loading
            fetchStaff(); // Re-fetch items
        }
    }, [formState.type, isLoading, fetchStaff]);

    const handleDeleteClick = (member: StaffMember) => {
        setItemToDelete(member);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteStaffMember(itemToDelete.id);
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
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Staff</h1>
                <button onClick={() => openForm('staff', null)} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Add New Member
                </button>
            </div>

            {isLoading ? <SkeletonTable columns={3} /> : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-4 text-gray-600 dark:text-gray-300">Name</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Position</th>
                                <th className="p-4 text-gray-600 dark:text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map(member => (
                                <tr key={member.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4 flex items-center gap-4 text-gray-800 dark:text-gray-100">
                                        <img src={member.imageUrl} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                                        <span>{member.name}</span>
                                    </td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">{member.position}</td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => openForm('staff', member)} className="text-blue-500 hover:underline text-sm">Edit</button>
                                        <button onClick={() => handleDeleteClick(member)} className="text-red-500 hover:underline text-sm">Delete</button>
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
                message={`Are you sure you want to delete the staff member "${itemToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminStaff;