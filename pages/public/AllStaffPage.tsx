import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getStaff } from '../../services/supabase/staff'; // Diperbarui untuk menggunakan Supabase
import type { StaffMember } from '../../types';
import useTitle from '../../hooks/useTitle';

const DetailItem: React.FC<{ label: string; value: string; fullWidth?: boolean }> = ({ label, value, fullWidth }) => (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
        <dd className="mt-1 text-md text-gray-900 dark:text-gray-100">{value}</dd>
    </div>
);

const StaffDetailModal: React.FC<{ member: StaffMember; onClose: () => void; }> = ({ member, onClose }) => {
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
                
                <div className="p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-6">
                        <img src={member.imageUrl} alt={member.name} className="w-40 h-40 rounded-full object-cover ring-4 ring-emerald-green flex-shrink-0" />
                        <div className="text-center sm:text-left mt-4 sm:mt-0">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{member.name}</h2>
                            <p className="text-xl text-emerald-600 dark:text-emerald-400 font-semibold">{member.position}</p>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">{member.bio}</p>
                        </div>
                    </div>

                    <div className="border-t dark:border-gray-700 pt-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Data Diri</h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            {member.nuptk && <DetailItem label="NUPTK" value={member.nuptk} />}
                            {member.email && <DetailItem label="Email" value={member.email} />}
                            {member.phone && <DetailItem label="Telepon" value={member.phone} />}
                            {member.religion && <DetailItem label="Agama" value={member.religion} />}
                            {member.address && <DetailItem label="Alamat" value={member.address} fullWidth={true} />}
                        </dl>
                    </div>
                </div>

            </div>
        </div>
    );
};


const StaffCard: React.FC<{ member: StaffMember, onClick: () => void }> = ({ member, onClick }) => (
    <div onClick={onClick} className="bg-white dark:bg-gray-800 rounded-lg shadow-md text-center p-6 transform hover:-translate-y-2 transition-all duration-300 group hover:shadow-xl cursor-pointer">
        <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-gray-200 dark:ring-gray-700 group-hover:ring-emerald-400 transition-all duration-300" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{member.name}</h3>
        <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2">{member.position}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
         <div className="mt-4 flex justify-center gap-4 text-gray-400">
            {/* Placeholder social icons */}
            <a href="#" aria-label={`${member.name} on Twitter`} className="hover:text-emerald-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.28C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.16 2.33,6.94C2.33,8.43 3.1,9.75 4.18,10.53C3.47,10.51 2.82,10.31 2.22,10V10.06C2.22,12.21 3.73,14 5.82,14.43C5.46,14.52 5.08,14.56 4.69,14.56C4.4,14.56 4.12,14.53 3.84,14.48C4.4,16.25 6.04,17.5 7.95,17.54C6.46,18.7 4.59,19.4 2.56,19.4C2.2,19.4 1.85,19.38 1.5,19.33C3.42,20.58 5.7,21.3 8.12,21.3C16,21.3 20.4,14.46 20.4,8.84C20.4,8.66 20.4,8.47 20.39,8.29C21.25,7.66 21.94,6.88 22.46,6Z" /></svg></a>
            <a href="#" aria-label={`${member.name} on LinkedIn`} className="hover:text-emerald-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.43 12.9,11.2V10.13H10.13V18.5H12.9V13.57C12.9,12.8 13.54,12.17 14.31,12.17C15.08,12.17 15.71,12.8 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,6 7.78,5.2 6.88,5.2A1.68,1.68 0 0,0 5.2,6.88C5.2,7.78 6,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" /></svg></a>
         </div>
    </div>
);

const PrincipalCard: React.FC<{ member: StaffMember, onClick: () => void }> = ({ member, onClick }) => (
    <div onClick={onClick} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12 cursor-pointer hover:shadow-2xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-48 h-48 rounded-full object-cover ring-8 ring-emerald-200 dark:ring-emerald-900 flex-shrink-0"
            />
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{member.name}</h2>
                <p className="text-xl text-golden-yellow font-semibold mb-3">{member.position}</p>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{member.bio}</p>
            </div>
        </div>
    </div>
);

const AllStaffPage: React.FC = () => {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [principal, setPrincipal] = useState<StaffMember | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
    useTitle('Staf & Guru | SMP "Empat Lima" 2 Kedungprin');

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const fetchedStaff = await getStaff();
                const principalMember = fetchedStaff.find(s => s.position.toLowerCase().includes('kepala sekolah')) || null;
                const otherStaff = fetchedStaff.filter(s => s.id !== principalMember?.id);
                
                setPrincipal(principalMember);
                setStaff(otherStaff);
            } catch (error) {
                console.error("Error fetching staff:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
    }, []);
    
    const openModal = (member: StaffMember) => setSelectedStaff(member);
    const closeModal = () => setSelectedStaff(null);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />
            <main className="flex-grow">
                <div className="py-16 bg-gray-100 dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-green dark:text-emerald-400">Tim Pendidik Kami</h1>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Berdedikasi untuk memberikan pendidikan terbaik bagi generasi masa depan.</p>
                        </div>

                        {loading ? (
                            <p className="text-center dark:text-gray-300">Loading staff...</p>
                        ) : (
                            <div className="space-y-16">
                                {principal && (
                                    <section>
                                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Pimpinan Sekolah</h2>
                                        <PrincipalCard member={principal} onClick={() => openModal(principal)} />
                                    </section>
                                )}
                                
                                {staff.length > 0 && (
                                    <section>
                                         <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Guru & Staf Pengajar</h2>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {staff.map(member => <StaffCard key={member.id} member={member} onClick={() => openModal(member)} />)}
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
            {selectedStaff && <StaffDetailModal member={selectedStaff} onClose={closeModal} />}
        </div>
    );
};

export default AllStaffPage;