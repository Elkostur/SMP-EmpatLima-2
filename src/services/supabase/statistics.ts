import { supabase } from '../../integrations/supabase/client';
import type { Statistic } from '../../../types'; // Jalur diperbarui

export const getStatistics = async (): Promise<Statistic[]> => {
    const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .order('id', { ascending: true });

    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        value: item.value,
        label: item.label,
    }));
};

export const updateStatistics = async (clientStats: Omit<Statistic, 'id'>[]): Promise<Statistic[]> => {
    // First, delete all existing statistics
    const { error: deleteError } = await supabase
        .from('statistics')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows (using a dummy ID to ensure it's not empty)

    if (deleteError) throw new Error(`Failed to clear existing statistics: ${deleteError.message}`);

    // Then, insert all current statistics from the client
    const insertData = clientStats.map(stat => ({
        value: stat.value,
        label: stat.label,
    }));

    const { data, error: insertError } = await supabase
        .from('statistics')
        .insert(insertData)
        .select('*');

    if (insertError) throw new Error(`Failed to insert new statistics: ${insertError.message}`);

    return data.map(item => ({
        id: item.id,
        value: item.value,
        label: item.label,
    }));
};