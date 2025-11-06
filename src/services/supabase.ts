import { supabase } from './../integrations/supabase/client';
import type { Post, GalleryItem, StaffMember, User, Extracurricular, AboutPageContent, HeroImage, Statistic, Facility, FaqItem, Registration, ContactMessage, Achievement, ContactInfo } from '../types';

// --- STORAGE ---
export const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    const filePath = `public/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
        .from('images') // Ganti dengan nama bucket Supabase Storage Anda
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    // Dapatkan URL publik setelah upload berhasil
    const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error('Failed to get public URL for uploaded image.');
    }

    // Simulasi progress karena Supabase Storage tidak menyediakan event progress secara langsung di client-side
    if (onProgress) {
        onProgress(100); // Anggap 100% setelah upload selesai
    }

    return publicUrlData.publicUrl;
};

// --- POSTS CRUD ---

export const getPosts = async (): Promise<Post[]> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        createdAt: new Date(item.created_at),
        imageUrl: item.image_url,
    }));
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error && error.code !== 'PGRST116') throw new Error(error.message); // PGRST116 means no rows found
    if (!data) return undefined;

    return {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: new Date(data.created_at),
        imageUrl: data.image_url,
    };
};

export const addPost = async (postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    const { data, error } = await supabase
        .from('posts')
        .insert({
            title: postData.title,
            content: postData.content,
            image_url: postData.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: new Date(data.created_at),
        imageUrl: data.image_url,
    };
};

export const updatePost = async (postId: string, postData: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<Post> => {
    const { data, error } = await supabase
        .from('posts')
        .update({
            title: postData.title,
            content: postData.content,
            image_url: postData.imageUrl,
        })
        .eq('id', postId)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: new Date(data.created_at),
        imageUrl: data.image_url,
    };
};

export const deletePost = async (postId: string): Promise<void> => {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
    
    if (error) throw new Error(error.message);
};

// --- GALLERIES CRUD ---

export const getGalleries = async (): Promise<GalleryItem[]> => {
    const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        title: item.title,
        imageUrl: item.image_url,
        createdAt: new Date(item.created_at),
    }));
};

export const addGalleryItem = async (itemData: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> => {
    const { data, error } = await supabase
        .from('galleries')
        .insert({
            title: itemData.title,
            image_url: itemData.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        createdAt: new Date(data.created_at),
    };
};

export const updateGalleryItem = async (itemId: string, itemData: Partial<Omit<GalleryItem, 'id' | 'createdAt'>>): Promise<GalleryItem> => {
    const { data, error } = await supabase
        .from('galleries')
        .update({
            title: itemData.title,
            image_url: itemData.imageUrl,
        })
        .eq('id', itemId)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        createdAt: new Date(data.created_at),
    };
};

export const deleteGalleryItem = async (itemId: string): Promise<void> => {
    const { error } = await supabase
        .from('galleries')
        .delete()
        .eq('id', itemId);
    
    if (error) throw new Error(error.message);
};

// --- STAFF CRUD ---

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

// --- EXTRACURRICULARS CRUD ---

export const getExtracurriculars = async (): Promise<Extracurricular[]> => {
    const { data, error } = await supabase
        .from('extracurriculars')
        .select('*')
        .order('name', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrl: item.image_url,
    }));
};

export const addExtracurricular = async (data: Omit<Extracurricular, 'id'>): Promise<Extracurricular> => {
    const { data: newItem, error } = await supabase
        .from('extracurriculars')
        .insert({
            name: data.name,
            description: data.description,
            image_url: data.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        imageUrl: newItem.image_url,
    };
};

export const updateExtracurricular = async (id: string, data: Partial<Omit<Extracurricular, 'id'>>): Promise<Extracurricular> => {
    const { data: updatedItem, error } = await supabase
        .from('extracurriculars')
        .update({
            name: data.name,
            description: data.description,
            image_url: data.imageUrl,
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: updatedItem.id,
        name: updatedItem.name,
        description: updatedItem.description,
        imageUrl: updatedItem.image_url,
    };
};

export const deleteExtracurricular = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('extracurriculars')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};

// --- ABOUT PAGE CONTENT ---

export const getAboutPageContent = async (): Promise<AboutPageContent | null> => {
    const { data, error } = await supabase
        .from('about_page_content')
        .select('content')
        .eq('id', 'about_page_singleton') // Assuming a fixed ID for the single content entry
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error("Error fetching about page content:", error);
        throw new Error(error.message);
    }
    
    if (!data) return null;
    return data.content as AboutPageContent;
};

export const updateAboutPageContent = async (data: AboutPageContent): Promise<AboutPageContent> => {
    const { data: existing, error: fetchError } = await supabase
        .from('about_page_content')
        .select('id')
        .eq('id', 'about_page_singleton')
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Error checking for existing about page content:", fetchError);
        throw new Error(fetchError.message);
    }

    let result;
    if (existing) {
        // Update existing row
        const { data: updatedData, error } = await supabase
            .from('about_page_content')
            .update({ content: data })
            .eq('id', 'about_page_singleton')
            .select('content')
            .single();
        if (error) throw new Error(error.message);
        result = updatedData;
    } else {
        // Insert new row
        const { data: insertedData, error } = await supabase
            .from('about_page_content')
            .insert({ id: 'about_page_singleton', content: data })
            .select('content')
            .single();
        if (error) throw new Error(error.message);
        result = insertedData;
    }
    
    return result.content as AboutPageContent;
};

// --- HERO IMAGES CRUD ---

export const getHeroImages = async (): Promise<HeroImage[]> => {
    const { data, error } = await supabase
        .from('hero_images')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        imageUrl: item.image_url,
    }));
};

export const addHeroImage = async (data: Omit<HeroImage, 'id'>): Promise<HeroImage> => {
    const { data: newItem, error } = await supabase
        .from('hero_images')
        .insert({
            title: data.title,
            subtitle: data.subtitle,
            image_url: data.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        title: newItem.title,
        subtitle: newItem.subtitle,
        imageUrl: newItem.image_url,
    };
};

export const updateHeroImage = async (id: string, data: Partial<Omit<HeroImage, 'id'>>): Promise<HeroImage> => {
    const { data: updatedItem, error } = await supabase
        .from('hero_images')
        .update({
            title: data.title,
            subtitle: data.subtitle,
            image_url: data.imageUrl,
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: updatedItem.id,
        title: updatedItem.title,
        subtitle: updatedItem.subtitle,
        imageUrl: updatedItem.image_url,
    };
};

export const deleteHeroImage = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('hero_images')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};

// --- STATISTICS ---
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

export const updateStatistics = async (updatedStats: Statistic[]): Promise<Statistic[]> => {
    const updates = updatedStats.map(stat =>
        supabase
            .from('statistics')
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

    // Re-fetch to ensure consistency and return the latest state
    return getStatistics();
};

// --- FACILITIES CRUD ---
export const getFacilities = async (): Promise<Facility[]> => {
    const { data, error } = await supabase
        .from('facilities')
        .select('*')
        .order('name', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrl: item.image_url,
    }));
};

export const addFacility = async (data: Omit<Facility, 'id'>): Promise<Facility> => {
    const { data: newItem, error } = await supabase
        .from('facilities')
        .insert({
            name: data.name,
            description: data.description,
            image_url: data.imageUrl,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        imageUrl: newItem.image_url,
    };
};

export const updateFacility = async (id: string, data: Partial<Omit<Facility, 'id'>>): Promise<Facility> => {
    const { data: updatedItem, error } = await supabase
        .from('facilities')
        .update({
            name: data.name,
            description: data.description,
            image_url: data.imageUrl,
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: updatedItem.id,
        name: updatedItem.name,
        description: updatedItem.description,
        imageUrl: updatedItem.image_url,
    };
};

export const deleteFacility = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('facilities')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};

// --- FAQ CRUD ---
export const getFaqs = async (): Promise<FaqItem[]> => {
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data.map(item => ({
        id: item.id,
        question: item.question,
        answer: item.answer,
    }));
};

export const addFaq = async (data: Omit<FaqItem, 'id'>): Promise<FaqItem> => {
    const { data: newItem, error } = await supabase
        .from('faqs')
        .insert({
            question: data.question,
            answer: data.answer,
        })
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: newItem.id,
        question: newItem.question,
        answer: newItem.answer,
    };
};

export const updateFaq = async (id: string, data: Partial<Omit<FaqItem, 'id'>>): Promise<FaqItem> => {
    const { data: updatedItem, error } = await supabase
        .from('faqs')
        .update({
            question: data.question,
            answer: data.answer,
        })
        .eq('id', id)
        .select()
        .single();
    
    if (error) throw new Error(error.message);
    return {
        id: updatedItem.id,
        question: updatedItem.question,
        answer: updatedItem.answer,
    };
};

export const deleteFaq = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
    
    if (error) throw new Error(error.message);
};