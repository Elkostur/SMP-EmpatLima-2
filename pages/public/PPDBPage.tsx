import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useTitle from '../../hooks/useTitle';
import RegistrationForm from '../../src/components/RegistrationForm'; // Mengimpor komponen formulir yang baru

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
                  <RegistrationForm /> {/* Menggunakan komponen formulir yang baru */}
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