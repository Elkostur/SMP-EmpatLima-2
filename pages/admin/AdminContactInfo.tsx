import React, { useState, useEffect, useCallback } from 'react';
import type { ContactInfo } from '../../types';
import { getContactInfo, updateContactInfo } from '../../src/services/supabase/contactInfo'; // Jalur diperbarui
import { uploadImage } from '../../src/services/supabase/storage'; // Jalur diperbarui
import useTitle from '../../hooks/useTitle';

const AdminContactInfo: React.FC = () => {
    const [info, setInfo] = useState<ContactInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    useTitle('Edit Contact Info | Admin Panel');

    const fetchInfo = useCallback(async () => {
        setIsLoading(true);
        const data = await getContactInfo();
        // Inisialisasi dengan nilai default kosong jika tidak ada data yang ditemukan
        if (data) {
            setInfo(data);
            setPreviewUrl(data.mapImageUrl || null);
        } else {
            setInfo({
                address: '',
                phone: '',
                email: '',
                mapImageUrl: '', // URL gambar default kosong
            });
            setPreviewUrl(null);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchInfo();
    }, [fetchInfo]);

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
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!info) return; // Seharusnya tidak terjadi dengan inisialisasi default
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!info) return; // Seharusnya tidak terjadi dengan inisialisasi default
        
        setIsSaving(true);
        setUploadProgress(0);
        let updatedInfo = { ...info };

        if (imageFile) {
            const newImageUrl = await uploadImage(imageFile, setUploadProgress);
            updatedInfo.mapImageUrl = newImageUrl;
        } else if (!updatedInfo.mapImageUrl) {
            // Jika tidak ada gambar yang diunggah dan tidak ada gambar yang sudah ada, gunakan placeholder
            updatedInfo.mapImageUrl = `https://picsum.photos/seed/${Date.now()}/600/400`;
        }

        await updateContactInfo(updatedInfo);
        setIsSaving(false);
        alert('Contact info updated successfully!');
        fetchInfo(); // Ambil ulang untuk memastikan data terbaru dan hapus imageFile/previewUrl jika diperlukan
    };

    if (isLoading) {
        return <p className="dark:text-gray-300">Loading contact info...</p>;
    }
    
    // Formulir akan selalu dirender sekarang, bahkan jika info awalnya null
    // State `info` akan memiliki nilai default kosong jika tidak ada data yang ditemukan.

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Edit Contact Information</h1>
            
            <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="address" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Address</label>
                    <textarea id="address" name="address" value={info?.address || ''} onChange={handleInputChange} className="w-full p-2 border rounded h-24 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Phone</label>
                        <input id="phone" type="text" name="phone" value={info?.phone || ''} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 font-bold mb-2">Email</label>
                        <input id="email" type="email" name="email" value={info?.email || ''} onChange={handleInputChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Map Location Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-gray-700 dark:file:text-emerald-400 dark:hover:file:bg-gray-600"/>
                    {(previewUrl || info?.mapImageUrl) && (
                         <div className="mt-4">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Image Preview:</p>
                            <img src={previewUrl || info?.mapImageUrl || ''} alt="Map Preview" className="w-64 h-auto object-cover rounded-md" />
                        </div>
                    )}
                </div>
                
                <div className="flex justify-end items-center gap-4 pt-4 border-t dark:border-gray-700">
                    <div className="flex-grow">
                         {isSaving && uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
                                <div 
                                    className="bg-emerald-500 h-2.5 rounded-full transition-width duration-150" 
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        )}
                    </div>
                    <button type="submit" disabled={isSaving} className="bg-emerald-green text-white px-6 py-3 rounded-md hover:bg-emerald-600 disabled:bg-gray-400 font-bold">
                        {isSaving ? 'Saving...' : 'Save All Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminContactInfo;