import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getExtracurriculars } from '../../services/supabase/extracurriculars'; // Diperbarui untuk menggunakan Supabase
import type { Extracurricular } from '../../types';
import useTitle from '../../hooks/useTitle';


const ExtracurricularDetailModal: React.FC<{ item: Extracurricular; onClose: () => void; }> = ({ item, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-3xl font-bold">&times;</button>
                
                <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover rounded-t-lg" />

                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{item.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.description}</p>
                </div>
            </div>
        </div>
    );
};


const ExtracurricularCard: React.FC<{ item: Extracurricular; onClick: () => void; }> = ({ item, onClick }) => (
    <div onClick={onClick} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer group">
        <div className="relative h-56">
             <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{item.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow text-sm">{item.description.substring(0, 120)}...</p>
            <span className="text-emerald-green dark:text-emerald-400 font-semibold mt-4 inline-block self-start">Lihat Detail &rarr;</span>
        </div>
    </div>
);

const AllExtracurricularsPage: React.FC = () => {
    const [items, setItems] = useState<Extracurricular[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<Extracurricular | null>(null);
    useTitle('Ekstrakurikuler | SMP "Empat Lima" 2 Kedungprin');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getExtracurriculars();
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching extracurriculars:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const openModal = (item: Extracurricular) => setSelectedItem(item);
    const closeModal = () => setSelectedItem(null);
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />
            <main className="flex-grow">
                <div className="py-16 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold text-center mb-12 text-emerald-green dark:text-emerald-400">Ekstrakurikuler</h1>
                        {loading ? (
                            <p className="text-center dark:text-gray-300">Loading extracurriculars...</p>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {items.map(item => <ExtracurricularCard key={item.id} item={item} onClick={() => openModal(item)} />)}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />

            {selectedItem && <ExtracurricularDetailModal item={selectedItem} onClose={closeModal} />}
        </div>
    );
};

export default AllExtracurricularsPage;