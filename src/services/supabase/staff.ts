import { supabase } from '../../integrations/supabase/client';
import type { StaffMember } from '../../../types'; // Jalur diperbarui

export const getStaff = async (): Promise<StaffMember[]> => {
    const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('name', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        name: item.name,
        position: item.position,
        bio: item.bio,
        imageUrl: item.image_url,
        nuptk: item.nuptk,
        address: item.address,
        religion: item.religion,
        email: item.email,
        phone: item.phone,
    }));
};

export const addStaffMember = async (staffData: Omit<StaffMember, 'id'>): Promise<StaffMember> => {
    const { data, error } = await supabase
        .from('staff')
        .insert({
            name: staffData.name,
            position: staffData.position,
            bio: staffData.bio,
            image_url: staffData.imageUrl,
            nuptk: staffData.nuptk,
            address: staffData.address,
            religion: staffData.religion,
            email: staffData.email,
            phone: staffData.phone,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: data.id,
        name: data.name,
        position: data.position,
        bio: data.bio,
        imageUrl: data.image_url,
        nuptk: data.nuptk,
        address: data.address,
        religion: data.religion,
        email: data.email,
        phone: data.phone,
    };
};

export const updateStaffMember = async (staffId: string, staffData: Partial<Omit<StaffMember, 'id'>>): Promise<StaffMember> => {
    const { data, error } = await supabase
        .from('staff')
        .update({
            name: staffData.name,
            position: staffData.position,
            bio: staffData.bio,
            image_url: staffData.imageUrl,
            nuptk: staffData.nuptk,
            address: staffData.address,
            religion: staffData.religion,
            email: staffData.email,
            phone: staffData.phone,
        })
        .eq('id', staffId)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: data.id,
        name: data.name,
        position: data.position,
        bio: data.bio,
        imageUrl: data.image_url,
        nuptk: data.nuptk,
        address: data.address,
        religion: data.religion,
        email: data.email,
        phone: data.phone,
    };
};

export const deleteStaffMember = async (staffId: string): Promise<void> => {
    const { error } = await supabase
        .from('staff')
        .delete()
        .eq('id', staffId);
    
    if (error) throw new Error(error.message);
};