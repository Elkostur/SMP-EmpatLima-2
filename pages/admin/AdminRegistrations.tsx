import React, { useState, useEffect, useCallback } from 'react';
import type { Registration } from '../../types';
import { getRegistrations, deleteRegistration } from '../../src/services/supabase/registrations';
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';
import { exportToCsv } from '../../src/utils/exportToCsv'; // Import the export utility

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

    const handleDownloadCsv = () => {
        const headers = [
            'Tanggal Pendaftaran',
            'Nama Lengkap Siswa',
            'Tanggal Lahir',
            'Asal Sekolah',
            'Nama Orang Tua/Wali',
            'Telepon',
            'Email'
        ];
        
        // Explicit mapping from header text to data property key
        const keyMap: Record<string, keyof Registration | 'createdAt'> = {
            'Tanggal Pendaftaran': 'createdAt',
            'Nama Lengkap Siswa': 'fullName',
            'Tanggal Lahir': 'birthDate',
            'Asal Sekolah': 'previousSchool',
            'Nama Orang Tua/Wali': 'parentName',
            'Telepon': 'phone',
            'Email': 'email',
        };

        // Map the data to ensure correct property names are used by exportToCsv
        const dataToExport = registrations.map(reg => ({
            createdAt: reg.createdAt,
            fullName: reg.fullName,
            birthDate: reg.birthDate,
            previousSchool: reg.previousSchool,
            parentName: reg.parentName,
            phone: reg.phone,
            email: reg.email,
        }));
        
        exportToCsv('PPDB_Registrations', dataToExport, headers, keyMap);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">PPDB Registrations</h1>
                <button 
                    onClick={handleDownloadCsv} 
                    className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600 disabled:bg-gray-400"
                    disabled={registrations.length === 0}
                >
                    Download as CSV
                </button>
            </div>

            {isLoading ? <p className="dark:text-gray-300">Loading registrations...</p> : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal Pendaftaran</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Lengkap Siswa</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tanggal Lahir</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Asal Sekolah</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nama Orang Tua/Wali</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Telepon</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {registrations.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-gray-100">{item.fullName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{item.birthDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{item.previousSchool}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{item.parentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{item.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{item.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleDeleteClick(item)} className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {registrations.length === 0 && (
                        <p className="text-center text-gray-500 py-8">Tidak ada pendaftaran ditemukan.</p>
                    )}
                </div>
            )}
            
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Konfirmasi Penghapusan"
                message={`Apakah Anda yakin ingin menghapus pendaftaran untuk "${itemToDelete?.fullName}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </div>
    );
};

export default AdminRegistrations;