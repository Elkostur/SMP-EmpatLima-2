import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const desktopNavLinkClass = "pb-1 text-gray-600 dark:text-gray-300 transition-colors duration-200 border-b-2 border-transparent hover:text-emerald-green hover:border-emerald-green dark:hover:text-emerald-400 dark:hover:border-emerald-400";
  const desktopActiveNavLinkClass = "text-emerald-green border-emerald-green dark:text-emerald-400 dark:border-emerald-400";
  
  const mobileNavLinkClass = "block py-2 px-3 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 hover:text-emerald-green dark:hover:bg-gray-800 dark:hover:text-emerald-400";
  const mobileActiveNavLinkClass = "bg-emerald-100 text-emerald-green dark:bg-gray-800 dark:text-emerald-400";

  return (
    <header className="bg-white dark:bg-black shadow-md sticky top-0 z-50 dark:border-b dark:border-gray-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-emerald-green dark:text-emerald-400" onClick={() => setIsMobileMenuOpen(false)}>
            SMP "Empat Lima" 2 Kedungpring
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>Home</NavLink>
            <NavLink to="/posts" className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>Berita</NavLink>
            <NavLink to="/galleries" className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>Galeri</NavLink>
            <NavLink to="/staff" className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>Guru</NavLink>
            <NavLink to="/extracurriculars" className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>Ekstrakurikuler</NavLink>
            <NavLink to="/achievements" className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>Prestasi</NavLink>
            <NavLink to="/ppdb" className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>PPDB</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>Tentang Kami</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? `${desktopNavLinkClass} ${desktopActiveNavLinkClass}`: desktopNavLinkClass}>Kontak</NavLink>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <Link to="/admin" className="hidden md:block bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors duration-300">
                  Admin Login
              </Link>
               {/* Mobile Menu Button */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-600 dark:text-gray-300 hover:text-emerald-green dark:hover:text-emerald-400 focus:outline-none" aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
          </div>
        </div>

         {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden pt-4`}>
            <div className="flex flex-col space-y-1">
              <NavLink to="/" end className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              <NavLink to="/posts" className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Berita</NavLink>
              <NavLink to="/galleries" className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Galeri</NavLink>
              <NavLink to="/staff" className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Guru</NavLink>
              <NavLink to="/extracurriculars" className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Ekstrakurikuler</NavLink>
              <NavLink to="/achievements" className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Prestasi</NavLink>
              <NavLink to="/ppdb" className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>PPDB</NavLink>
              <NavLink to="/about" className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Tentang Kami</NavLink>
              <NavLink to="/contact" className={({isActive}) => isActive ? `${mobileNavLinkClass} ${mobileActiveNavLinkClass}`: mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Kontak</NavLink>
              <Link to="/admin" className="block text-center mt-2 bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                  Admin Login
              </Link>
            </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;