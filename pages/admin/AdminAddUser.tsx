import React, { useState } from 'react';
import { supabase } from '../../src/integrations/supabase/client';
import useTitle from '../../hooks/useTitle';
import { useNavigate } from 'react-router-dom';

const AdminAddUser: React.FC = () => {
    useTitle('Add Admin User | Admin Panel');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        // You can add additional user metadata here if needed, e.g., role
                        // For now, we rely on the handle_new_user trigger for profile creation
                    }
                }
            });

            if (signUpError) {
                throw signUpError;
            }

            if (data.user) {
                setSuccess(`Admin user "${email}" created successfully! A confirmation email has been sent.`);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setError('User creation failed unexpectedly.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create user.');
            console.error("Error creating admin user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Add New Admin User</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
                Create a new user account with admin privileges. The user will receive a confirmation email.
            </p>

            {success && (
                <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 p-4 rounded-md mb-4">
                    {success}
                </div>
            )}
            {error && (
                <div className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 p-4 rounded-md mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 dark:text-gray-200 font-bold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin')}
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 font-bold"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-emerald-green text-white px-6 py-3 rounded-md hover:bg-emerald-600 disabled:bg-gray-400 font-bold"
                    >
                        {loading ? 'Creating User...' : 'Create User'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminAddUser;