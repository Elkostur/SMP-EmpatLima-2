import React, { useState } from 'react';
import { addRegistration } from '@/src/services/supabase/registrations';
import type { Registration } from '@/types'; // Jalur impor diperbaiki

type RegistrationFormData = Omit<Registration, 'id' | 'createdAt'>;

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    birthDate: '',
    previousSchool: '',
    parentName: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await addRegistration(formData); 
      setSuccess(true);
      setFormData({
        fullName: '', birthDate: '', previousSchool: '',
        parentName: '', phone: '', email: ''
      });
    } catch (err) {
      setError('Pendaftaran gagal. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (success) {
      return (
          <div className="text-center p-8 bg-emerald-50 dark:bg-emerald-900/50 rounded-lg">
              <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">Pendaftaran Berhasil!</h2>
              <p className="text-gray-600 dark:text-gray-300">Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda untuk proses selanjutnya.</p>
              <button onClick={() => setSuccess(false)} className="mt-6 bg-emerald-green text-white font-bold py-2 px-6 rounded-full hover:bg-emerald-600 transition-colors duration-300">
                  Daftar Lagi
              </button>
          </div>
      )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap Siswa</label>
          <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal Lahir</label>
          <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
          <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Asal Sekolah (SD/MI)</label>
          <input type="text" name="previousSchool" id="previousSchool" value={formData.previousSchool} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Orang Tua/Wali</label>
          <input type="text" name="parentName" id="parentName" value={formData.parentName} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor Telepon/WA</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Alamat Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="text-center pt-4">
        <button type="submit" disabled={loading} className="w-full md:w-auto bg-golden-yellow text-gray-800 font-bold py-3 px-12 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-105 duration-300 inline-block disabled:bg-gray-400 disabled:scale-100">
          {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
        </button>
      </div>
    </form>
  )
}

export default RegistrationForm;