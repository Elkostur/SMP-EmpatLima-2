import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAboutPageContent } from '../../src/services/supabase/aboutPageContent'; // Jalur diperbarui
import type { AboutPageContent } from '../../types';
import useTitle from '../../hooks/useTitle';

const AboutPage: React.FC = () => {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  useTitle('Tentang Kami | SMP "Empat Lima" 2 Kedungpring');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getAboutPageContent();
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch about page content", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading content...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!content) {
    return (
       <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Could not load page content.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const { vision, mission, coreValues, principalWelcome } = content;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
      <Header />
      <main className="flex-grow animate-fadeInUp">
        <div className="relative bg-emerald-green text-white py-20 text-center">
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl font-extrabold">Tentang SMP "Empat Lima" 2 Kedungpring</h1>
            <p className="mt-4 text-xl max-w-3xl mx-auto">Membangun masa depan bangsa dengan pondasi iman, ilmu, dan amal.</p>
          </div>
        </div>

        {/* Principal Welcome Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <img 
                src={principalWelcome.imageUrl} 
                alt={principalWelcome.name}
                className="w-48 h-48 rounded-full object-cover ring-4 ring-emerald-green flex-shrink-0"
              />
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sambutan Kepala Sekolah</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4 whitespace-pre-line">{principalWelcome.text}</p>
                <p className="font-bold text-gray-900 dark:text-gray-100 mt-4">{principalWelcome.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{principalWelcome.title}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="prose dark:prose-invert max-w-4xl mx-auto text-gray-700 dark:text-gray-300 text-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Visi & Misi Sekolah</h2>
              <p className="font-semibold text-lg">Visi:</p>
              <p className="italic">"{vision}"</p>
              <p className="font-semibold text-lg mt-6">Misi:</p>
              <p>{mission}</p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">Nilai-Nilai Inti Kami</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreValues.map(value => (
                        <div key={value.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-emerald-green dark:text-emerald-400 mb-2">{value.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;