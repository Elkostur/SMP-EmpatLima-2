import React, { useState, useEffect, useRef } from 'react';
import { getStaff } from '../../../src/services/supabase/staff';
import type { StaffMember } from '../../../types'; // Jalur diperbarui
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../../src/hooks/useIntersectionObserver'; // Import hook

const TeamSection: React.FC = () => {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);

    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const fetchedStaff = await getStaff();
                setStaff(fetchedStaff.slice(0, 3)); // Show first 3
            } catch (error) {
                console.error("Error fetching staff:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);

    return (
        <section 
            id="team" 
            className="py-16 bg-white dark:bg-gray-900"
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">Temui Guru Kami</h2>
                {loading ? (
                    <p className="text-center">Memuat tim...</p>
                ) : (
                    <div 
                        ref={sectionRef}
                        className={`grid md:grid-cols-3 gap-8 mb-12 ${isVisible ? 'opacity-100 translate-y-0 animate-fadeInUp' : 'opacity-0 translate-y-[20px]'}`}
                    >
                        {staff.map(member => (
                            <div key={member.id} className="text-center">
                                <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-emerald-200 dark:ring-emerald-700" />
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{member.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{member.position}</p>
                            </div>
                        ))}
                    </div>
                )}
                 <div className="text-center">
                    <Link to="/staff" className="bg-emerald-green text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition-colors duration-300">
                        Lihat Semua Guru
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;