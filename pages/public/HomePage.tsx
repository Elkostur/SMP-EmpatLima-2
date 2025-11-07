import React from 'react';
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
import { getHeroImages } from '../../src/services/supabase/heroImages';
import type { HeroImage } from '../../types';
import useTitle from '../../hooks/useTitle';
import PrincipalWelcome from './sections/PrincipalWelcome'; // Import the new component

const HeroSkeleton: React.FC = () => (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
        <div className="text-center text-white p-6">
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-full w-40 mx-auto"></div>
        </div>
    </div>
);

const CarouselHeroSection: React.FC = () => {
  const [images, setImages] = React.useState<HeroImage[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getHeroImages();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch hero images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  
  const goToSlide = (index: number) => {
      setCurrentIndex(index);
  }

  React.useEffect(() => {
    if (images.length > 1) {
      const slideInterval = setInterval(nextSlide, 5000);
      return () => clearInterval(slideInterval);
    }
  }, [images.length, nextSlide]);
  
  if (loading) {
      return <HeroSkeleton />;
  }

  if (images.length === 0) {
      return (
          <div className="relative w-full h-[60vh] md:h-[80vh] bg-emerald-green flex items-center justify-center text-white">
              <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-extrabold">Selamat Datang!</h1>
                  <p className="text-lg md:text-xl mt-4">Situs web kami sedang dalam pengembangan. Silakan kembali lagi nanti.</p>
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

const HomePage: React.FC = () => {
  useTitle('Beranda | SMP "Empat Lima" 2 Kedungpring');
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
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