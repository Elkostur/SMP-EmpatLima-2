import React, { useState, useEffect } from 'react';
import { getGalleries } from '../../../src/services/supabase/galleries';
import type { GalleryItem } from '../../../types'; // Jalur diperbarui
import { Link } from 'react-router-dom';

const GallerySection: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getGalleries();
                setItems(fetchedItems.slice(0, 6)); // Show latest 6
            } catch (error) {
                console.error("Error fetching gallery items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <section 
            id="gallery" 
            className="py-16 bg-white dark:bg-gray-900"
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">Galeri Kami</h2>
                 {loading ? (
                    <p className="text-center dark:text-gray-300">Memuat galeri...</p>
                ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {items.map((item, index) => (
                        <div key={item.id} className={`overflow-hidden rounded-lg shadow-md ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                        </div>
                    ))}
                </div>
                 )}
                 <div className="text-center">
                    <Link to="/galleries" className="bg-emerald-green text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition-colors duration-300">
                        Lihat Galeri Lengkap
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;