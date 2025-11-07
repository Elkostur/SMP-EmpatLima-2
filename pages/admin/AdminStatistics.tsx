import React, { useState, useEffect, useCallback } from 'react';
import type { Statistic } from '../../types';
import { getStatistics, updateStatistics } from '../../src/services/supabase/statistics'; // Jalur diperbarui
import useTitle from '../../hooks/useTitle';
import SkeletonTable from '../../src/components/admin/SkeletonTable'; // Import SkeletonTable

const AdminStatistics: React.FC = () => {
    const [stats, setStats] = useState<Statistic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    useTitle('Manage Statistics | Admin Panel');

    const fetchStats = useCallback(async () => {
        setIsLoading(true);
        const data = await getStatistics();
        if (data.length === 0) {
            // Initialize with 3 empty stats if none exist
            setStats([
                { id: crypto.randomUUID(), value: '', label: '' },
                { id: crypto.randomUUID(), value: '', label: '' },
                { id: crypto.randomUUID(), value: '', label: '' },
            ]);
        } else {
            setStats(data);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleInputChange = (id: string, field: 'value' | 'label', value: string) => {
        setStats(prevStats => 
            prevStats.map(stat => 
                stat.id === id ? { ...stat, [field]: value } : stat
            )
        );
    };

    const handleAddStatistic = () => {
        setStats(prevStats => [...prevStats, { id: crypto.randomUUID(), value: '', label: '' }]);
    };

    const handleRemoveStatistic = (idToRemove: string) => {
        if (window.confirm('Are you sure you want to delete this statistic?')) {
            setStats(prevStats => prevStats.filter(stat => stat.id !== idToRemove));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            // Filter out temporary IDs and map to the format expected by updateStatistics
            const statsToSave = stats.map(({ id, ...rest }) => rest); // Remove 'id' for insert
            await updateStatistics(statsToSave);
            alert('Statistics updated successfully!');
            fetchStats(); // Re-fetch to get real IDs for newly inserted items
        } catch (error) {
            console.error("Failed to save statistics:", error);
            alert('Failed to save statistics. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };
    
    if (isLoading) {
        return (
            <div className="animate-pulse bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600 relative">
                            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                            <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
                            <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                            <div className="absolute top-2 right-2 h-6 w-6 bg-red-200 dark:bg-red-700 rounded-full"></div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-8">
                    <div className="h-12 bg-emerald-200 dark:bg-emerald-700 rounded w-40"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Statistics</h1>
                <button onClick={handleAddStatistic} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Add New Statistic
                </button>
            </div>
            
            <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stats.map((stat, index) => (
                        <div key={stat.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600 relative">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Statistic Item {index + 1}</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value</label>
                                <input 
                                    type="text" 
                                    value={stat.value} 
                                    onChange={(e) => handleInputChange(stat.id, 'value', e.target.value)}
                                    className="w-full p-2 border rounded mt-1 bg-white text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Label</label>
                                <input 
                                    type="text" 
                                    value={stat.label} 
                                    onChange={(e) => handleInputChange(stat.id, 'label', e.target.value)}
                                    className="w-full p-2 border rounded mt-1 bg-white text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                    required
                                />
                            </div>
                            <button 
                                type="button" 
                                onClick={() => handleRemoveStatistic(stat.id)} 
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full"
                                aria-label="Delete statistic"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 4a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                            </button>
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