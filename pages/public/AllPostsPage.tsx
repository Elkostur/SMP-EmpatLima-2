
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getPosts } from '../../services/firebase';
import type { Post } from '../../types';
import useTitle from '../../hooks/useTitle';

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
        <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" loading="lazy" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{post.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{new Date(post.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">{post.content.substring(0, 150)}...</p>
            <Link to={`/posts/${post.id}`} className="text-emerald-green dark:text-emerald-400 font-semibold mt-4 inline-block hover:underline self-start">Read More &rarr;</Link>
        </div>
    </div>
);

const Pagination: React.FC<{totalPages: number, currentPage: number, onPageChange: (page: number) => void}> = ({totalPages, currentPage, onPageChange}) => {
    const pageNumbers = [];
    for(let i=1; i<=totalPages; i++){
        pageNumbers.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <nav className="flex justify-center items-center gap-4 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 border rounded-md disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
                Previous
            </button>
            <div className="flex gap-2">
                 {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`px-4 py-2 border rounded-md transition-colors ${currentPage === number ? 'bg-emerald-green text-white border-emerald-green dark:bg-emerald-500 dark:border-emerald-500' : 'bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                    >
                        {number}
                    </button>
                 ))}
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 border rounded-md disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
                Next
            </button>
        </nav>
    )
}

const AllPostsPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    useTitle('Semua Berita | SMP "Empat Lima" 2 Kedungprin');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />
            <main className="flex-grow">
                <div className="py-16 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl font-bold text-center mb-12 text-emerald-green dark:text-emerald-400">Semua Berita</h1>
                        {loading ? (
                            <p className="text-center">Loading news...</p>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {currentPosts.map(post => <PostCard key={post.id} post={post} />)}
                                </div>
                                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AllPostsPage;