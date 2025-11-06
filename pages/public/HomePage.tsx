import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LatestNews from './sections/LatestNews';
import GallerySection from './sections/GallerySection';
import Statistics from './sections/Statistics';
import TeamSection from './sections/TeamSection';
import FacilitiesSection from './sections/FacilitiesSection';
import FaqSection from './sections/FaqSection';
import LatestAchievements from './sections/LatestAchievements';
import { Link } from 'react-router-dom';
import { getHeroImages } from '../../src/services/supabase/heroImages'; // Jalur diperbarui
import { getAboutPageContent } from '../../src/services/supabase/aboutPageContent'; // Jalur diperbarui
import type { HeroImage, AboutPageContent } from '../../types';
import useTitle from '../../hooks/useTitle';


const CarouselHeroSection: React.FC = () => {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await getHeroImages();
      setImages(data);
    };
    fetchImages();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const goToSlide = (index: number) => {
      setCurrentIndex(index);
  }

  useEffect(() => {
    if (images.length > 1) {
      const slideInterval = setInterval(nextSlide, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [images.length, nextSlide]);
  
  if (images.length === 0) {
      return (
          <div className="relative w-full h-[60vh] md:h-[80vh] bg-emerald-green flex items-center justify-center text-white">
              <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-extrabold">Loading...</h1>
              </div>
          </div>
      );
  }

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={image.imageUrl} alt={image.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">{image.title}</h1>
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">{image.subtitle}</p>
              <Link to="/ppdb" className="bg-golden-yellow text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition-transform transform hover:scale-105 duration-300">
                Pendaftaran
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50">&#10094;</button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50">&#10095;</button>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}></button>
          ))}
      </div>
    </div>
  );
};


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
    return null; // Don't render the section if content fails to load
  }

  // Truncate the welcome text to show more content on the homepage
  const fullText = content.text;
  let truncatedText = fullText;
  if (fullText.length > 300) {
      // Find last space within 300 chars to avoid cutting a word
      const lastSpaceIndex = fullText.substring(0, 300).lastIndexOf(' ');
      truncatedText = fullText.substring(0, lastSpaceIndex) + '...';
  }

  return (
    <section className="relative py-16 mt-[-10rem] md:mt-[-12rem] lg:mt-[-10rem] z-10">
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


const HomePage: React.FC = () => {
  useTitle('Beranda | SMP "Empat Lima" 2 Kedungprin');
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CarouselHeroSection />
        <PrincipalWelcome />
        <FacilitiesSection /> 
        <TeamSection />
        <LatestAchievements />
        <LatestNews />
        <GallerySection />
        <Statistics />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;