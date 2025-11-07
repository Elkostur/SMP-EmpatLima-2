import React from 'react';

const ProgramCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md text-center hover:shadow-xl transition-shadow duration-300">
        <div className="text-emerald-green text-5xl mb-4 inline-block">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
);

const FeaturedPrograms: React.FC = () => {
    return (
        <section id="programs" className="py-16 bg-gray-100 dark:bg-black">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">Programs Unggulan</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <ProgramCard 
                        title="Tech Innovators" 
                        description="Fostering the next generation of tech leaders through mentorship and hands-on projects." 
                        icon="💡" 
                    />
                    <ProgramCard 
                        title="Community Build" 
                        description="Engaging with local communities to build sustainable and impactful solutions together." 
                        icon="🤝" 
                    />
                    <ProgramCard 
                        title="Green Future" 
                        description="Dedicated to developing and promoting technologies that protect our planet." 
                        icon="🌱" 
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturedPrograms;