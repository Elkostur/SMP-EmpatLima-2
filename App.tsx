import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminGalleries from './pages/admin/AdminGalleries';
import AdminStaff from './pages/admin/AdminStaff';
import AllPostsPage from './pages/public/AllPostsPage';
import AllGalleriesPage from './pages/public/AllGalleriesPage';
import AllStaffPage from './pages/public/AllStaffPage';
import PPDBPage from './pages/public/PPDBPage';
import AboutPage from './pages/public/AboutPage';
import PostDetailPage from './pages/public/PostDetailPage';
import AllExtracurricularsPage from './pages/public/AllExtracurricularsPage';
import AdminExtracurriculars from './pages/admin/AdminExtracurriculars';
import AdminAboutPage from './pages/admin/AdminAboutPage';
import AdminHero from './pages/admin/AdminHero';
import AdminStatistics from './pages/admin/AdminStatistics';
import AdminFacilities from './pages/admin/AdminFacilities';
import AdminFaqs from './pages/admin/AdminFaqs';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import ContactPage from './pages/public/ContactPage';
import AdminContactMessages from './pages/admin/AdminContactMessages';
import AllAchievementsPage from './pages/public/AllAchievementsPage';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminContactInfo from './pages/admin/AdminContactInfo';
import AdminAddUser from './pages/admin/AdminAddUser';
import ScrollToTop from './src/components/ScrollToTop'; // Import the new component

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <ScrollToTop /> {/* Add ScrollToTop component here */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<AllPostsPage />} />
            <Route path="/posts/:postId" element={<PostDetailPage />} />
            <Route path="/galleries" element={<AllGalleriesPage />} />
            <Route path="/staff" element={<AllStaffPage />} />
            <Route path="/extracurriculars" element={<AllExtracurricularsPage />} />
            <Route path="/achievements" element={<AllAchievementsPage />} />
            <Route path="/ppdb" element={<PPDBPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="galleries" element={<AdminGalleries />} />
              <Route path="staff" element={<AdminStaff />} />
              <Route path="extracurriculars" element={<AdminExtracurriculars />} />
              <Route path="achievements" element={<AdminAchievements />} />
              <Route path="about" element={<AdminAboutPage />} />
              <Route path="hero" element={<AdminHero />} />
              <Route path="statistics" element={<AdminStatistics />} />
              <Route path="facilities" element={<AdminFacilities />} />
              <Route path="faqs" element={<AdminFaqs />} />
              <Route path="registrations" element={<AdminRegistrations />} />
              <Route path="messages" element={<AdminContactMessages />} />
              <Route path="contact-info" element={<AdminContactInfo />} />
              <Route path="add-user" element={<AdminAddUser />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;