import React, { useState, useEffect } from 'react';
import { getStatistics } from '../../../src/services/supabase/statistics'; // Jalur diperbarui
import type { Statistic } from '../../types';

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="text-4xl md:text-5xl font-extrabold text-golden-yellow">{value}</p>
        <p className="text-lg text-emerald-100 mt-2">{label}</p>
    </div>
);

const LoadingStatItem: React.FC = () => (
     <div className="text-center animate-pulse">
        <div className="h-12 bg-emerald-400/50 rounded-md w-24 mx-auto"></div>
        <div className="h-6 bg-emerald-400/50 rounded-md w-32 mx-auto mt-2"></div>
    </div>
)

const Statistics: React.FC = () => {
    const [stats, setStats] = useState<Statistic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStatistics();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch statistics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);


    return (
        <section id="stats" className="bg-emerald-green py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {loading ? (
                        <>
                           <LoadingStatItem />
                           <LoadingStatItem />
                           <LoadingStatItem />
                           <LoadingStatItem />
                        </>
                    ) : (
                        stats.map(stat => <StatItem key={stat.id} value={stat.value} label={stat.label} />)
                    )}
                </div>
            </div>
        </section>
    );
};

export default Statistics;