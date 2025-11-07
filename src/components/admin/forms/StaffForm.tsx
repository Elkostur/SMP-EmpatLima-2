import React, { useState } from 'react';
import type { StaffMember } from '../../../../types';
import { addStaffMember, updateStaffMember } from '../../../services/supabase/staff';
import { uploadImage } from '../../../services/supabase/storage';

interface StaffFormProps {
    item: StaffMember | null; 
    onSave: (savedItem: StaffMember) => void;
    onCancel: () => void; 
    onDataChange: (newData: Partial<StaffMember>) => void; // New prop
}

const StaffForm: React.FC<StaffFormProps> = ({ item, onSave, onCancel, onDataChange }) => {
    const [name, setName] = useState(item?.name || '');
    const [position, setPosition] = useState(item?.position || '');
    const [bio, setBio] = useState(item?.bio || '');
    const [nuptk, setNuptk] = useState(item?.nuptk || '');
    const [address, setAddress] = useState(item?.address || '');
    const [religion, setReligion] = useState(item?.religion || '');
    const [email, setEmail] = useState(item?.email || '');
    const [phone, setPhone] = useState(item?.phone || '');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(item?.imageUrl || null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Update local state and notify parent on change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        onDataChange({ name: value });
    };

    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPosition(value);
        onDataChange({ position: value });
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setBio(value);
        onDataChange({ bio: value });
    };

    const handleNuptkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNuptk(value);
        onDataChange({ nuptk: value });
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);
        onDataChange({ address: value });
    };

    const handleReligionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setReligion(value);
        onDataChange({ religion: value });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        onDataChange({ email: value });
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);
        onDataChange({ phone: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
                onDataChange({ imageUrl: reader.result as string }); // Update preview URL in parent state
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        setUploadProgress(0);

        let finalImageUrl = item?.imageUrl;

        if (imageFile) {
            finalImageUrl = await uploadImage(imageFile, setUploadProgress);
        } else if (!item?.id) { // Changed condition: check for item.id
            finalImageUrl = `https://picsum.photos/seed/${Date.now()}/400/400`;
        }

        const staffData = { name, position, bio, nuptk, address, religion, email, phone, imageUrl: finalImageUrl || '' };
        let savedItem: StaffMember;

        if (item && item.id) { // Changed condition: check for item.id
            savedItem = await updateStaffMember(item.id, staffData);
        } else {
            savedItem = await addStaffMember(staffData);
        }
        
        setIsUploading(false);
        onSave(savedItem); // Call onSave with the actual saved item
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{item && item.id ? 'Edit Staff Member' : 'Add New Staff'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Full Name</label>
                                <input type="text" value={name} onChange={handleNameChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Position</label>
                                <input type="text" value={position} onChange={handlePositionChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
                            </div>
                         </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Bio</label>
                            <textarea value={bio} onChange={handleBioChange} className="w-full p-2 border rounded h-24 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">NUPTK</label>
                                <input type="text" value={nuptk} onChange={handleNuptkChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Agama</label>
                                <input type="text" value={religion} onChange={handleReligionChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                             <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Email</label>
                                <input type="email" value={email} onChange={handleEmailChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                             <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Telepon</label>
                                <input type="tel" value={phone} onChange={handlePhoneChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Alamat</label>
                            <input type="text" value={address} onChange={handleAddressChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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

export default StaffForm;