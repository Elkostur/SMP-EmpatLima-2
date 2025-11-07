import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AdminUIProvider } from '../../src/hooks/useAdminUI'; // Import AdminUIProvider

const AdminLayout: React.FC = () => {
    const { user, isLoading, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [sidebarOpen]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    
    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
    }
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const navLinkClasses = "flex items-center px-4 py-2 text-gray-100 dark:text-gray-300 hover:bg-emerald-700 dark:hover:bg-emerald-600 rounded-md transition-colors duration-200";
    const activeNavLinkClasses = "bg-emerald-700 dark:bg-emerald-600";

    const SidebarContent = () => (
      <>
        <div className="h-16 flex items-center justify-center text-2xl font-bold text-emerald-green dark:text-emerald-400 border-b border-gray-700">
            Admin Panel
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <NavLink to="/admin" end onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Dashboard</NavLink>
            <NavLink to="/admin/hero" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Hero Section</NavLink>
            <NavLink to="/admin/posts" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Posts</NavLink>
            <NavLink to="/admin/achievements" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Prestasi</NavLink>
            <NavLink to="/admin/galleries" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Galleries</NavLink>
            <NavLink to="/admin/staff" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Staff</NavLink>
            <NavLink to="/admin/extracurriculars" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Ekstrakurikuler</NavLink>
            <NavLink to="/admin/facilities" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Fasilitas</NavLink>
            <NavLink to="/admin/statistics" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Statistik</NavLink>
            <NavLink to="/admin/faqs" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>FAQ</NavLink>
            <NavLink to="/admin/registrations" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Pendaftaran PPDB</NavLink>
            <NavLink to="/admin/messages" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Pesan Kontak</NavLink>
            <NavLink to="/admin/contact-info" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Info Kontak</NavLink>
            <NavLink to="/admin/about" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Edit Halaman Tentang</NavLink>
            <NavLink to="/admin/add-user" onClick={() => setSidebarOpen(false)} className={({isActive}) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Add Admin User</NavLink> {/* New link */}
        </nav>
        <div className="p-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold truncate">{user.email}</p>
            <button onClick={handleLogout} className="w-full mt-4 bg-golden-yellow text-gray-800 font-bold py-2 px-4 rounded hover:bg-yellow-300 transition-colors">
                Logout
            </button>
        </div>
      </>
    );

    return (
        <div className="relative min-h-screen md:flex bg-gray-100 dark:bg-gray-900">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
            
            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 bg-gray-800 dark:bg-gray-700 text-white w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col`}
            >
                <SidebarContent />
            </aside>
            
            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-600 dark:text-gray-300 focus:outline-none"
                        aria-label="Open sidebar"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <div className="flex-1 text-center text-xl font-bold text-emerald-green dark:text-emerald-400">
                        Admin Menu
                    </div>
                    <div className="w-6"></div> {/* Spacer for centering title */}
                </header>
                
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                        <AdminUIProvider>
                            <Outlet />
                        </AdminUIProvider>
                    </main>
                    <footer className="bg-gray-100 dark:bg-gray-900 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Admin Panel | SMP "Empat Lima" 2 Kedungpring
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;