import React, { useState } from 'react';
import { addContactMessage } from '@/src/services/supabase/contactMessages';
import type { ContactMessage } from '@/types';

type ContactFormData = Omit<ContactMessage, 'id' | 'createdAt'>;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
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
      setFormData({
        name: '', email: '', subject: '', message: ''
      });
    } catch (err: any) {
      setError(`Gagal mengirim pesan: ${err.message || 'Terjadi kesalahan tidak dikenal.'}`); // Pesan kesalahan yang lebih spesifik
      console.error("Error submitting contact form:", err); // Logging kesalahan untuk debugging
    } finally {
      setLoading(false);
    }
  };
  
  if (success) {
      return (
          <div className="text-center p-8 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg">
              <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">Pesan Terkirim!</h2>
              <p className="text-gray-600 dark:text-gray-300">Terima kasih telah menghubungi kami. Kami akan segera membalas pesan Anda.</p>
              <button onClick={() => setSuccess(false)} className="mt-6 bg-emerald-green text-white font-bold py-2 px-6 rounded-full hover:bg-emerald-600 transition-colors duration-300">
                  Kirim Pesan Lain
              </button>
          </div>
      )
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
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pesan Anda</label>
        <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600"></textarea>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="text-center pt-4">
        <button type="submit" disabled={loading} className="w-full md:w-auto bg-golden-yellow text-gray-800 font-bold py-3 px-12 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-105 duration-300 inline-block disabled:bg-gray-400 disabled:scale-100">
          {loading ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </div>
    </form>
  )
}

export default ContactForm;