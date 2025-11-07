import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getPosts } from '../../src/services/supabase/posts'; // Jalur diperbarui
import { getGalleries } from '../../src/services/supabase/galleries'; // Jalur diperbarui
import { getStaff } from '../../src/services/supabase/staff'; // Jalur diperbarui
import useTitle from '../../hooks/useTitle';

const StatCard: React.FC<{ title: string; value: string | number; icon: string; isLoading: boolean }> = ({ title, value, icon, isLoading }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center min-h-[100px]">
        <div className="text-3xl text-emerald-green mr-4">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1"></div>
            ) : (
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
            )}
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ posts: 0, galleries: 0, staff: 0 });
    const [isLoading, setIsLoading] = useState(true);
    useTitle('Dashboard | Admin Panel');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                const [postsData, galleriesData, staffData] = await Promise.all([
                    getPosts(),
                    getGalleries(),
                    getStaff(),
                ]);
                setStats({
                    posts: postsData.length,
                    galleries: galleriesData.length,
                    staff: staffData.length,
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Welcome, {user?.email}!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Here's a quick overview of your site.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Posts" value={stats.posts} icon="📝" isLoading={isLoading} />
                <StatCard title="Gallery Images" value={stats.galleries} icon="🖼️" isLoading={isLoading} />
                <StatCard title="Staff Members" value={stats.staff} icon="👥" isLoading={isLoading} />
                <StatCard title="Site Visits (30d)" value="1,234" icon="📈" isLoading={false} />
            </div>

            <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                        Create New Post
                    </button>
                     <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                        Upload Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;