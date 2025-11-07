import React, { useState, useEffect, useRef } from 'react';
import { getFacilities } from '../../../src/services/supabase/facilities';
import type { Facility } from '../../../types'; // Jalur diperbarui
import useIntersectionObserver from '../../../src/hooks/useIntersectionObserver'; // Import hook

const FacilityCard: React.FC<{ item: Facility }> = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
        <div className="relative h-56">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{item.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">{item.description}</p>
        </div>
    </div>
);

const FacilitiesSection: React.FC = () => {
    const [items, setItems] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getFacilities();
                setItems(fetchedItems.slice(0, 4)); // Show first 4
            } catch (error) {
                console.error("Error fetching facilities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <section 
            id="facilities" 
            className="py-16 bg-gray-100 dark:bg-gray-900"
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">Fasilitas Sekolah</h2>
                {loading ? (
                    <p className="text-center dark:text-gray-300">Loading facilities...</p>
                ) : (
                    <div 
                        ref={sectionRef}
                        className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'}`}
                    >
                        {items.map(item => <FacilityCard key={item.id} item={item} />)}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FacilitiesSection;