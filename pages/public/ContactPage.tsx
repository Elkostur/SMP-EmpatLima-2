import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useTitle from '../../hooks/useTitle';
import { addContactMessage } from '../../src/services/supabase/contactMessages'; // Jalur diperbarui
import { getContactInfo } from '../../src/services/supabase/contactInfo'; // Jalur diperbarui
import type { ContactInfo } from '../../types';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            await addContactMessage(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError('Gagal mengirim pesan. Silakan coba lagi.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="text-center p-8 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg">
                <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">Pesan Terkirim!</h2>
                <p className="text-gray-600 dark:text-gray-300">Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.</p>
                <button onClick={() => setSuccess(false)} className="mt-6 bg-emerald-green text-white font-bold py-2 px-6 rounded-full hover:bg-emerald-600 transition-colors duration-300">
                    Kirim Pesan Lagi
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subjek</label>
                <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pesan</label>
                <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600"></textarea>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div className="text-left">
                <button type="submit" disabled={loading} className="w-full md:w-auto bg-emerald-green text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition-colors duration-300 inline-block disabled:bg-gray-400">
                    {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
            </div>
        </form>
    );
};

const ContactInfoSection: React.FC = () => {
    const [info, setInfo] = useState<ContactInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const data = await getContactInfo();
                setInfo(data);
            } catch (err) {
                console.error("Failed to load contact info", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, []);

    if (loading) {
        return (
             <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded p-6"></div>
                    <div className="w-full h-64 bg-gray-200 dark:bg-gray-700"></div>
                 </div>
            </div>
        );
    }
    
    if (!info) return null;

    return (
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Informasi Kontak</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p><strong>Alamat:</strong> {info.address}</p>
                    <p><strong>Telepon:</strong> {info.phone}</p>
                    <p><strong>Email:</strong> {info.email}</p>
                </div>
            </div>
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 p-6">Peta Lokasi</h2>
                <img src={info.mapImageUrl} alt="Peta Lokasi Sekolah" className="w-full h-64 object-cover" />
             </div>
        </div>
    );
};

const ContactPage: React.FC = () => {
    useTitle('Kontak | SMP "Empat Lima" 2 Kedungpring');
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />
            <main className="flex-grow animate-fadeInUp">
                <div className="py-16 bg-white dark:bg-gray-900">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold text-center mb-4 text-emerald-green dark:text-emerald-400">Hubungi Kami</h1>
                        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">Kami siap membantu Anda. Silakan hubungi kami melalui informasi di bawah ini atau kirimkan pesan melalui formulir.</p>
                        
                        <div className="grid lg:grid-cols-5 gap-12">
                            <ContactInfoSection />

                            <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b-2 border-emerald-green dark:border-emerald-500 pb-2">Kirim Pesan</h2>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;