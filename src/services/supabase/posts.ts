import { supabase } from '../../integrations/supabase/client';
import type { Post } from '../../types';

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
    
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
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