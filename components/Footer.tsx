import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getContactInfo } from '../src/services/supabase/contactInfo';
import type { ContactInfo } from '../types';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const info = await getContactInfo();
        setContactInfo(info);
      } catch (error) {
        console.error("Failed to fetch contact info for footer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  return (
    <footer className="bg-gray-800 dark:bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 dark:border-gray-700 pb-8 mb-8">
          {/* Section 1: School Name / Branding */}
          <div>
            <h3 className="text-xl font-bold text-emerald-green dark:text-emerald-400 mb-4">
              SMP "Empat Lima" 2 Kedungpring
            </h3>
            <p className="text-gray-400 text-sm">
              Membangun masa depan bangsa dengan pondasi iman, ilmu, dan amal.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/posts" className="hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">Berita</Link></li>
              <li><Link to="/galleries" className="hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">Galeri</Link></li>
              <li><Link to="/staff" className="hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">Staf</Link></li>
              <li><Link to="/ppdb" className="hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">PPDB</Link></li>
              <li><Link to="/about" className="hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            {loading ? (
              <div className="space-y-2 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
              </div>
            ) : (
              <div className="space-y-2 text-gray-400">
                {contactInfo?.address && (
                  <p className="flex items-start gap-2">
                    <MapPin size={18} className="flex-shrink-0 mt-1" />
                    <span>{contactInfo.address}</span>
                  </p>
                )}
                {contactInfo?.phone && (
                  <p className="flex items-center gap-2">
                    <Phone size={18} className="flex-shrink-0" />
                    <span>{contactInfo.phone}</span>
                  </p>
                )}
                {contactInfo?.email && (
                  <p className="flex items-center gap-2">
                    <Mail size={18} className="flex-shrink-0" />
                    <span>{contactInfo.email}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Section 4: Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-emerald-green dark:hover:text-emerald-400 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} SMP "Empat Lima" 2 Kedungpring. All Rights Reserved.</p>
          <p className="mt-1">A Modern Scaffolding Project</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;