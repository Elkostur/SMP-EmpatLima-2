import React, { useState, useEffect, useCallback } from 'react';
import type { Statistic } from '../../types';
import { getStatistics, updateStatistics } from '../src/services/supabase/statistics'; // Jalur diperbarui
import useTitle from '../../hooks/useTitle';

const AdminStatistics: React.FC = () => {
    const [stats, setStats] = useState<Statistic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    useTitle('Manage Statistics | Admin Panel');

    const fetchStats = useCallback(async () => {
        setIsLoading(true);
        const data = await getStatistics();
        setStats(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleInputChange = (index: number, field: 'value' | 'label', value: string) => {
        const newStats = [...stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setStats(newStats);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await updateStatistics(stats);
        setIsSaving(false);
        alert('Statistics updated successfully!');
        fetchStats();
    };
    
    if (isLoading) {
        return <p className="dark:text-gray-300">Loading statistics...</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Manage Statistics</h1>
            
            <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stats.map((stat, index) => (
                        <div key={stat.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Statistic Item {index + 1}</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value</label>
                                <input 
                                    type="text" 
                                    value={stat.value} 
                                    onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                    className="w-full p-2 border rounded mt-1 bg-white text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Label</label>
                                <input 
                                    type="text" 
                                    value={stat.label} 
                                    onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                                    className="w-full p-2 border rounded mt-1 bg-white text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="flex justify-end mt-8">
                    <button type="submit" disabled={isSaving} className="bg-emerald-green text-white px-6 py-3 rounded-md hover:bg-emerald-600 disabled:bg-gray-400 font-bold">
                        {isSaving ? 'Saving...' : 'Save All Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminStatistics;