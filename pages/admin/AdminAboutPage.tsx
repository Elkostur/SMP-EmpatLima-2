import React, { useState, useEffect, useCallback } from 'react';
import type { AboutPageContent } from '../../types';
import { getAboutPageContent, updateAboutPageContent } from '../../src/services/supabase/aboutPageContent'; // Jalur diperbarui
import { uploadImage } from '../../src/services/supabase/storage'; // Jalur diperbarui
import useTitle from '../../hooks/useTitle';

const AdminAboutPage: React.FC = () => {
    const [content, setContent] = useState<AboutPageContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    useTitle('Edit About Page | Admin Panel');

    const fetchContent = useCallback(async () => {
        setIsLoading(true);
        const data = await getAboutPageContent();
        setContent(data);
        setPreviewUrl(data?.principalWelcome.imageUrl || null);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

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
        if (!content) return;
        const { name, value } = e.target;
        setContent({ ...content, [name]: value });
    };

    const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!content) return;
        const { name, value } = e.target;
        setContent({ 
            ...content, 
            principalWelcome: { ...content.principalWelcome, [name]: value }
        });
    };

    const handleCoreValueChange = (index: number, field: 'title' | 'description', value: string) => {
        if (!content) return;
        const newCoreValues = [...content.coreValues];
        newCoreValues[index] = { ...newCoreValues[index], [field]: value };
        setContent({ ...content, coreValues: newCoreValues });
    };

    const handleDeleteCoreValue = (index: number) => {
        if (!content) return;
        if (window.confirm('Are you sure you want to delete this core value?')) {
            const newCoreValues = content.coreValues.filter((_, i) => i !== index);
            setContent({ ...content, coreValues: newCoreValues });
        }
    };

    const handleAddCoreValue = () => {
        if (!content) return;
        const newCoreValues = [...content.coreValues, { title: '', description: '' }];
        setContent({ ...content, coreValues: newCoreValues });
    };
    
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content) return;
        
        setIsSaving(true);
        setUploadProgress(0);
        let updatedContent = { ...content };

        if (imageFile) {
            const newImageUrl = await uploadImage(imageFile, setUploadProgress);
            updatedContent.principalWelcome.imageUrl = newImageUrl;
        }

        await updateAboutPageContent(updatedContent);
        setIsSaving(false);
        alert('Page content updated successfully!');
        fetchContent();
    };

    if (isLoading) {
        return <p className="dark:text-gray-300">Loading page content...</p>;
    }
    
    if (!content) {
        return <p className="dark:text-gray-300">Could not load content.</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Edit 'About Us' Page</h1>
            
            <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-8">
                {/* Vision & Mission */}
                <div className="border-b dark:border-gray-700 pb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-emerald-green dark:text-emerald-400">Visi & Misi</h2>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Visi</label>
                        <textarea name="vision" value={content.vision} onChange={handleInputChange} className="w-full p-2 border rounded h-24 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                     <div className="mt-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Misi</label>
                        <textarea name="mission" value={content.mission} onChange={handleInputChange} className="w-full p-2 border rounded h-32 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                </div>

                {/* Principal's Welcome */}
                 <div className="border-b dark:border-gray-700 pb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-emerald-green dark:text-emerald-400">Sambutan Kepala Sekolah</h2>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Nama Kepala Sekolah</label>
                        <input type="text" name="name" value={content.principalWelcome.name} onChange={handlePrincipalChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Jabatan</label>
                        <input type="text" name="title" value={content.principalWelcome.title} onChange={handlePrincipalChange} className="w-full p-2 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Teks Sambutan</label>
                        <textarea name="text" value={content.principalWelcome.text} onChange={handlePrincipalChange} className="w-full p-2 border rounded h-40 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Foto Kepala Sekolah</label>
                         <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 dark:file:bg-gray-700 dark:file:text-emerald-400 dark:hover:file:bg-gray-600"/>
                        {previewUrl && (
                             <div className="mt-4">
                                <img src={previewUrl} alt="Image Preview" className="w-32 h-32 object-cover rounded-full" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Core Values */}
                <div className="border-b dark:border-gray-700 pb-8">
                     <h2 className="text-2xl font-semibold mb-4 text-emerald-green dark:text-emerald-400">Nilai-Nilai Inti</h2>
                     <div className="space-y-4">
                        {content.coreValues.map((value, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600 flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                                    <input 
                                        type="text" 
                                        value={value.title} 
                                        onChange={(e) => handleCoreValueChange(index, 'title', e.target.value)}
                                        className="w-full p-2 border rounded mt-1 bg-white text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                </div>
                                 <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                    <textarea 
                                        value={value.description} 
                                        onChange={(e) => handleCoreValueChange(index, 'description', e.target.value)}
                                        className="w-full p-2 border rounded mt-1 h-20 bg-white text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button 
                                        type="button" 
                                        onClick={() => handleDeleteCoreValue(index)} 
                                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 h-fit"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                     </div>
                     <button 
                        type="button" 
                        onClick={handleAddCoreValue}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        + Add New Value
                    </button>
                </div>
                
                <div className="flex justify-end items-center gap-4">
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

export default AdminAboutPage;