import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAboutPageContent } from '../../../src/services/supabase/aboutPageContent';
import type { AboutPageContent } from '../../../types';

const PrincipalWelcome: React.FC = () => {
  const [content, setContent] = useState<AboutPageContent['principalWelcome'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getAboutPageContent();
        setContent(data?.principalWelcome || null);
      } catch (error) {
        console.error("Failed to fetch principal's welcome content", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
        <section className="relative py-16 mt-[-10rem] md:mt-[-12rem] lg:mt-[-10rem] z-10">
             <div className="container mx-auto px-6">
                 <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl">
                    <div className="animate-pulse flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
                        <div className="flex-1 w-full">
                            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                             <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 mt-4"></div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
  }

  if (!content) {
    return null;
  }

  const fullText = content.text;
  let truncatedText = fullText;
  if (fullText.length > 300) {
      const lastSpaceIndex = fullText.substring(0, 300).lastIndexOf(' ');
      truncatedText = fullText.substring(0, lastSpaceIndex) + '...';
  }

  return (
    <section 
      className="relative py-16 mt-[-10rem] md:mt-[-12rem] lg:mt-[-10rem] z-10"
    >
      <div className="container mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img 
                src={content.imageUrl} 
                alt={content.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-offset-4 ring-emerald-green dark:ring-offset-gray-800 flex-shrink-0"
              />
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sambutan Kepala Sekolah</h2>
                <p className="text-gray-600 dark:text-gray-300 italic mb-4 whitespace-pre-line">{truncatedText}</p>
                <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100 mt-2">{content.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{content.title}</p>
                </div>
                <Link to="/about" className="inline-block mt-4 text-emerald-green dark:text-emerald-400 font-semibold hover:underline">
                    Selengkapnya &rarr;
                </Link>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalWelcome;