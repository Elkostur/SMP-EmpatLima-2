import { supabase } from '../../integrations/supabase/client';
import type { Statistic } from '../../../types'; // Jalur diperbarui

export const getStatistics = async (): Promise<Statistic[]> => {
    const { data, error } = await supabase
        .from('public.statistics')
        .select('*')
        .order('id', { ascending: true });

    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        value: item.value,
        label: item.label,
    }));
};

export const updateStatistics = async (updatedStats: Statistic[]): Promise<Statistic[]> => {
    const updates = updatedStats.map(stat =>
        supabase
            .from('public.statistics')
            .update({ value: stat.value, label: stat.label })
            .eq('id', stat.id)
            .select()
            .single()
    );

    const results = await Promise.all(updates);
    const errors = results.filter(r => r.error).map(r => r.error);
    if (errors.length > 0) {
        throw new Error(`Failed to update some statistics: ${errors.map(e => e.message).join(', ')}`);
    }

    return getStatistics();
};