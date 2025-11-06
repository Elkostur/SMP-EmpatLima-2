import { supabase } from '../../integrations/supabase/client';
import type { AboutPageContent } from '../../types';

export const getAboutPageContent = async (): Promise<AboutPageContent | null> => {
    const { data, error } = await supabase
        .from('about_page_content')
        .select('content')
        .eq('id', 'about_page_singleton')
        .single();

    if (error && error.code !== 'PGRST116') {
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
        const { data: updatedData, error } = await supabase
            .from('about_page_content')
            .update({ content: data })
            .eq('id', 'about_page_singleton')
            .select('content')
            .single();
        if (error) throw new Error(error.message);
        result = updatedData;
    } else {
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