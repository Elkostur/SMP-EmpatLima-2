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