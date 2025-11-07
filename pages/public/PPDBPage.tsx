import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useTitle from '../../hooks/useTitle';
import { addRegistration } from '../../src/services/supabase/registrations'; // Jalur diperbarui
import type { Registration } from '../../types';

// Menyesuaikan tipe data untuk formulir tanpa documentUrl
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
  // const [documentFile, setDocumentFile] = useState<File | null>(null); // Removed
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB // Removed

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Removed
  //     const file = e.target.files ? e.target.files[0] : null;
  //     setError('');
  //     if (file) {
  //         if (file.size > MAX_FILE_SIZE) {
  //             setError(`File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
  //             e.target.value = ''; // Clear the input
  //             setDocumentFile(null);
  //             return;
  //         }
  //         setDocumentFile(file);
  //     }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      // Mengirim data tanpa file dokumen
      await addRegistration(formData); 
      setSuccess(true);
      setFormData({
        fullName: '', birthDate: '', previousSchool: '',
        parentName: '', phone: '', email: ''
      });
      // setDocumentFile(null); // Removed
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
      {/* Removed document upload field */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div className="text-center pt-4">
        <button type="submit" disabled={loading} className="w-full md:w-auto bg-golden-yellow text-gray-800 font-bold py-3 px-12 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-105 duration-300 inline-block disabled:bg-gray-400 disabled:scale-100">
          {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
        </button>
      </div>
    </form>
  )
}

const PPDBPage: React.FC = () => {
  useTitle('PPDB | SMP "Empat Lima" 2 Kedungpring');
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Header />
      <main className="flex-grow animate-fadeInUp">
        <div className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-center mb-4 text-emerald-green dark:text-emerald-400">Penerimaan Peserta Didik Baru (PPDB)</h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">Bergabunglah dengan komunitas kami dan mulailah perjalanan belajar Anda. Silakan isi formulir di bawah ini untuk mendaftar.</p>
            
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b-2 border-emerald-green dark:border-emerald-500 pb-2">Formulir Pendaftaran</h2>
                  <RegistrationForm />
              </div>

              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Jadwal Penting</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li><strong>Pendaftaran Online:</strong> 1 Juni - 30 Juni</li>
                    <li><strong>Seleksi Berkas:</strong> 1 Juli - 5 Juli</li>
                    <li><strong>Pengumuman Hasil:</strong> 10 Juli</li>
                    <li><strong>Daftar Ulang:</strong> 11 Juli - 15 Juli</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Syarat Pendaftaran</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Scan Ijazah Terakhir</li>
                    <li>Scan Kartu Keluarga</li>
                    <li>Pas Foto 3x4 (2 lembar)</li>
                    <li>Membayar Biaya Pendaftaran</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PPDBPage;