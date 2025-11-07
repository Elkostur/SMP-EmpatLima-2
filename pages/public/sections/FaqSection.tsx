import React, { useState, useEffect, useRef } from 'react';
import { getFaqs } from '../../../src/services/supabase/faqs';
import type { FaqItem } from '../../../types'; // Jalur diperbarui
import useIntersectionObserver from '../../../src/hooks/useIntersectionObserver'; // Import hook

const AccordionItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{item.question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <p className="px-6 pb-5 text-gray-600 dark:text-gray-300">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FaqSection: React.FC = () => {
    const [items, setItems] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await getFaqs();
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleAccordionClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section 
            id="faq" 
            className="py-16 bg-white dark:bg-gray-900"
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">Pertanyaan yang Sering Diajukan</h2>
                {loading ? (
                    <p className="text-center dark:text-gray-300">Memuat FAQ...</p>
                ) : (
                    <div 
                        ref={sectionRef}
                        className={`max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-4'}`}
                    >
                        {items.map((item, index) => (
                            <AccordionItem 
                                key={item.id}
                                item={item}
                                isOpen={openIndex === index}
                                onClick={() => handleAccordionClick(index)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FaqSection;