import React, { useState } from 'react';
import type { FaqItem } from '../../../../types';
import { addFaq, updateFaq } from '../../../services/supabase/faqs';

interface FaqFormProps {
    item: FaqItem | null; 
    onSave: (data: { question: string; answer: string }) => Promise<void>; 
    onCancel: () => void; 
}

const FaqForm: React.FC<FaqFormProps> = ({ item, onSave, onCancel }) => {
    const [question, setQuestion] = useState(item?.question || '');
    const [answer, setAnswer] = useState(item?.answer || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        const faqData = { question, answer };

        if (item) {
            await updateFaq(item.id, faqData);
        } else {
            await addFaq(faqData);
        }
        
        setIsSaving(false);
        onSave(faqData);
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

export default FaqForm;