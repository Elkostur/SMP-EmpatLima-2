import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getGalleries } from '../../src/services/supabase/galleries';
import type { GalleryItem } from '../../types';
import useTitle from '../../hooks/useTitle';

const AllGalleriesPage: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    useTitle('Galeri Foto | SMP "Empat Lima" 2 Kedungpring');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getGalleries();
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching gallery items:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const showNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const showPrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };
    
    const selectedItem = items[selectedImageIndex];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />
            <main className="flex-grow">
                 <div className="py-16 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold text-center mb-12 text-emerald-green dark:text-emerald-400">Galeri Foto</h1>
                        {loading ? (
                            <p className="text-center">Loading gallery...</p>
                        ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {items.map((item, index) => (
                                <div key={item.id} onClick={() => openLightbox(index)} className="group cursor-pointer relative overflow-hidden rounded-lg shadow-md aspect-w-1 aspect-h-1 transform active:scale-[0.98] active:shadow-xl transition-all duration-300">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end p-4">
                                        <h3 className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />

            {isLightboxOpen && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300" onClick={closeLightbox}>
                    <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
                         <img src={selectedItem.imageUrl} alt={selectedItem.title} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
                        <p className="text-white text-center mt-2 text-lg">{selectedItem.title}</p>
                    </div>

                    <button onClick={closeLightbox} className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300">&times;</button>
                    
                    <button onClick={(e) => { e.stopPropagation(); showPrevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">&#10094;</button>
                    
                    <button onClick={(e) => { e.stopPropagation(); showNextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">&#10095;</button>
                </div>
            )}
        </div>
    );
};

export default AllGalleriesPage;