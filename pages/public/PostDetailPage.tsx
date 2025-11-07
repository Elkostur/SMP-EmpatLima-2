import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getPostById } from '../../src/services/supabase/posts'; // Jalur diperbarui
import type { Post } from '../../types';
import useTitle from '../../hooks/useTitle';

const PostDetailPage: React.FC = () => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const { postId } = useParams<{ postId: string }>();
    
    useTitle(post ? `${post.title} | SMP "Empat Lima" 2 Kedungpring` : 'Detail Berita');

    useEffect(() => {
        const fetchPost = async () => {
            if (!postId) {
                setLoading(false);
                return;
            }
            try {
                const fetchedPost = await getPostById(postId);
                setPost(fetchedPost || null);
            } catch (error) {
                console.error("Error fetching post:", error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [postId]);

    const renderContent = () => {
        if (loading) {
            return <p className="text-center text-lg dark:text-gray-300">Loading post...</p>;
        }

        if (!post) {
            return (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Post not found</h2>
                    <p className="mb-6 dark:text-gray-300">Sorry, we couldn't find the post you're looking for.</p>
                    <Link to="/posts" className="bg-emerald-green text-white font-bold py-2 px-6 rounded-md hover:bg-emerald-600 transition-colors">
                        Back to News
                    </Link>
                </div>
            );
        }

        return (
            <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
                <div className="p-6 md:p-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">{post.title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                        Published on {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                     <div className="mt-10 border-t dark:border-gray-700 pt-6">
                        <Link to="/posts" className="text-emerald-green dark:text-emerald-400 font-semibold hover:underline">
                            &larr; Back to All News
                        </Link>
                    </div>
                </div>
            </article>
        );
    }


    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />
            <main className="flex-grow py-12 md:py-16">
                <div className="container mx-auto px-6">
                    {renderContent()}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PostDetailPage;