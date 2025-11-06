import React, { useState, useEffect, useCallback } from 'react';
import type { StaffMember } from '../../types';
import { getStaff, addStaffMember, updateStaffMember, deleteStaffMember } from '../../src/services/supabase/staff'; // Jalur diperbarui
import { uploadImage } from '../../src/services/supabase/storage'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';

const StaffForm: React.FC<{ 
    member: StaffMember | null; 
    onSave: (data: Omit<StaffMember, 'id'>) => Promise<void>; 
    onCancel: () => void; 
}> = ({ member, onSave, onCancel }) => {
    const [name, setName] = useState(member?.name || '');
    const [position, setPosition] = useState(member?.position || '');
    const [bio, setBio] = useState(member?.bio || '');
    const [nuptk, setNuptk] = useState(member?.nuptk || '');
    const [address, setAddress] = useState(member?.address || '');
    const [religion, setReligion] = useState(member?.religion || '');
    const [email, setEmail] = useState(member?.email || '');
    const [phone, setPhone] = useState(member?.phone || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(member?.imageUrl || null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        setUploadProgress(0);

        let finalImageUrl = member?.imageUrl;

        if (imageFile) {
            finalImageUrl = await uploadImage(imageFile, setUploadProgress);
        } else if (!member) {
            finalImageUrl = `https://picsum.photos/seed/${Date.now()}/400/400`;
        }

        await onSave({ name, position, bio, nuptk, address, religion, email, phone, imageUrl: finalImageUrl || '' });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{member ? 'Edit Staff Member' : 'Add New Staff'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Full Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Position</label>
                                <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                            </div>
                         </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Bio</label>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-2 border rounded h-24 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">NUPTK</label>
                                <input type="text" value={nuptk} onChange={(e) => setNuptk(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Agama</label>
                                <input type="text" value={religion} onChange={(e) => setReligion(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                             <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                             <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Telepon</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Alamat</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Image</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-gray-700 dark:file:text-emerald-400 dark:hover:file:bg-gray-600" />
                            {previewUrl && (
                                <div className="mt-4">
                                    <img src={previewUrl} alt="Image Preview" className="w-32 h-32 object-cover rounded-full" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-4 mt-8 pt-4 border-t dark:border-gray-700">
                        <div className="flex-grow">
                             {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                                    <div 
                                        className="bg-emerald-500 h-2.5 rounded-full transition-width duration-150" 
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>
                        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" disabled={isUploading} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600 disabled:bg-gray-400">
                           {isUploading ? 'Saving...' : 'Save Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AdminStaff: React.FC = () => {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<StaffMember | null>(null);
    useTitle('Manage Staff | Admin Panel');
    
    const fetchStaff = useCallback(async () => {
        setIsLoading(true);
        const data = await getStaff();
        setStaff(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    const handleSave = async (staffData: Omit<StaffMember, 'id'>) => {
        if (editingMember) {
            await updateStaffMember(editingMember.id, staffData);
        } else {
            await addStaffMember(staffData);
        }
        setIsFormVisible(false);
        setEditingMember(null);
        fetchStaff();
    };

    const handleDeleteClick = (member: StaffMember) => {
        setItemToDelete(member);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deleteStaffMember(itemToDelete.id);
            fetchStaff();
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
                <button onClick={() => { setEditingMember(null); setIsFormVisible(true); }} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Add New Member
                </button>
            </div>

            {isLoading ? <p className="dark:text-gray-300">Loading staff...</p> : (
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
                                        <button onClick={() => { setEditingMember(member); setIsFormVisible(true); }} className="text-blue-500 hover:underline text-sm">Edit</button>
                                        <button onClick={() => handleDeleteClick(member)} className="text-red-500 hover:underline text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {isFormVisible && <StaffForm member={editingMember} onSave={handleSave} onCancel={() => { setIsFormVisible(false); setEditingMember(null); }} />}

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