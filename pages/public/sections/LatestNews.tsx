import React, { useState, useEffect, useRef } from 'react';
import { getPosts } from '../../../src/services/supabase/posts';
import type { Post } from '../../../types'; // Jalur diperbarui
import { Link } from 'react-router-dom';
import useIntersectionObserver from '../../../src/hooks/useIntersectionObserver'; // Import hook

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" loading="lazy" />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.content.substring(0, 100)}...</p>
            <Link to={`/posts/${post.id}`} className="text-emerald-green dark:text-emerald-400 font-semibold mt-4 inline-block hover:underline">Baca Selengkapnya &rarr;</Link>
        </div>
    </div>
);

const LatestNews: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const sectionRef = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts.slice(0, 3)); // Show latest 3
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <section 
            id="news" 
            className="py-16 bg-gray-100 dark:bg-gray-900"
        >
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">Berita Terbaru</h2>
                {loading ? (
                    <p className="text-center dark:text-gray-300">Memuat berita...</p>
                ) : (
                    <div 
                        ref={sectionRef}
                        className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 opacity-0 translate-y-[20px] ${isVisible ? 'animate-fadeInUp' : ''}`}
                    >
                        {posts.map(post => <PostCard key={post.id} post={post} />)}
                    </div>
                )}
                 <div className="text-center">
                    <Link to="/posts" className="bg-emerald-green text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition-colors duration-300">
                        Lihat Semua Berita
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;