import React, { useState, useEffect, useRef } from 'react';
import { getAchievements } from '../../../src/services/supabase/achievements';
import type { Achievement } from '../../../types'; // Jalur diperbarui
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../../src/hooks/useIntersectionObserver'; // Import hook

const AchievementCard: React.FC<{ item: Achievement }> = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" loading="lazy" />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{item.title}</h3>
            <p className="text-golden-yellow dark:text-yellow-400 font-semibold text-sm mb-4">
                 {new Date(item.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description.substring(0, 100)}...</p>
            <Link to={`/achievements/${item.id}`} className="text-emerald-green dark:text-emerald-400 font-semibold mt-4 inline-block hover:underline">Read More &rarr;</Link>
        </div>
    </div>
);

const LatestAchievements: React.FC = () => {
    const [items, setItems] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);

    const sectionRef = useRef<HTMLDivElement>(null);
    const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getAchievements();
                setItems(fetchedItems.slice(0, 3)); // Show latest 3
            } catch (error) {
                console.error("Error fetching achievements:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    if (items.length === 0 && !loading) return null;

    return (
        <section 
            id="achievements" 
            className="py-16 bg-white dark:bg-gray-900"
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">Prestasi Terbaru</h2>
                {loading ? (
                    <p className="text-center dark:text-gray-300">Loading achievements...</p>
                ) : (
                    <div 
                        ref={sectionRef}
                        className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transform transition-all duration-700 ease-out ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
                    >
                        {items.map(item => <AchievementCard key={item.id} item={item} />)}
                    </div>
                )}
                 <div className="text-center">
                    <Link to="/achievements" className="bg-emerald-green text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition-colors duration-300">
                        Lihat Semua Prestasi
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestAchievements;