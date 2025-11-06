import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAchievements } from '../../services/firebase';
import type { Achievement } from '../../types';
import useTitle from '../../hooks/useTitle';

const AchievementCard: React.FC<{ item: Achievement }> = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
        {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" loading="lazy" />}
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{item.title}</h3>
            <p className="text-golden-yellow dark:text-yellow-400 font-semibold text-sm mb-4">
                {new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">{item.description}</p>
        </div>
    </div>
);

const AllAchievementsPage: React.FC = () => {
    const [items, setItems] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);
    useTitle('Prestasi | SMP "Empat Lima" 2 Kedungprin');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getAchievements();
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching achievements:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />
            <main className="flex-grow">
                <div className="py-16 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold text-center mb-12 text-emerald-green dark:text-emerald-400">Prestasi Sekolah</h1>
                        {loading ? (
                            <p className="text-center dark:text-gray-300">Loading achievements...</p>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {items.map(item => <AchievementCard key={item.id} item={item} />)}
                            </div>
                        )}
                         {items.length === 0 && !loading && (
                            <p className="text-center text-gray-500 py-8">Belum ada prestasi yang ditambahkan.</p>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AllAchievementsPage;