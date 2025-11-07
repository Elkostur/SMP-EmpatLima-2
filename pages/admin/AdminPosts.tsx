import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Post } from '../../types';
import { getPosts, deletePost } from '../../src/services/supabase/posts'; // Jalur diperbarui
import ConfirmationModal from '../../components/ConfirmationModal';
import useTitle from '../../hooks/useTitle';
import { useAdminUI } from '../../src/hooks/useAdminUI'; // Import useAdminUI
import SkeletonTable from '../../src/components/admin/SkeletonTable'; // Import SkeletonTable

const AdminPosts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<Post | null>(null);
    const [searchQuery, setSearchQuery] = useState(''); // Deklarasi searchQuery
    useTitle('Manage Posts | Admin Panel');
    const { openForm } = useAdminUI(); // Use useAdminUI hook
    
    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        const data = await getPosts();
        setPosts(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleItemSaved = useCallback((savedItem: Post, originalItem?: Post) => {
        // Instead of directly manipulating state, re-fetch all items to ensure consistency
        fetchPosts();
    }, [fetchPosts]);

    const handleDeleteClick = (post: Post) => {
        setItemToDelete(post);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (itemToDelete) {
            await deletePost(itemToDelete.id);
            fetchPosts(); // Re-fetch after deletion
        }
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
    };
    
    const handleCloseModal = () => {
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
    };

    const filteredPosts = useMemo(() => {
        return posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [posts, searchQuery]);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Posts</h1>
                <button onClick={() => openForm('post', null, handleItemSaved)} className="bg-emerald-green text-white px-4 py-2 rounded-md hover:bg-emerald-600">
                    + Create New Post
                </button>
            </div>
            
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search posts by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
            </div>

            {isLoading ? <SkeletonTable columns={3} /> : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-4">Title</th>
                                <th className="p-4">Created At</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPosts.map(post => (
                                <tr key={post.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="p-4">{post.title}</td>
                                    <td className="p-4">{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => openForm('post', post, handleItemSaved)} className="text-blue-500 hover:underline text-sm">Edit</button>
                                        <button onClick={() => handleDeleteClick(post)} className="text-red-500 hover:underline text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredPosts.length === 0 && (
                        <p className="text-center text-gray-500 py-8">No posts found matching your search.</p>
                    )}
                </div>
            )}
        
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the post titled "${itemToDelete?.title}"? This action cannot be undone.`}
            />
        </div>
    );
};

export default AdminPosts;