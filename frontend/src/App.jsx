import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Lazy-loaded pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const VotingGuidePage = lazy(() => import('./pages/VotingGuidePage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const EligibilityPage = lazy(() => import('./pages/EligibilityPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
      role="status"
      aria-label="Loading page"
    >
      <div
        className="animate-spin-slow"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '3px solid rgba(79,70,229,0.3)',
          borderTop: '3px solid #4F46E5',
        }}
        aria-hidden="true"
      />
      <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Loading...</p>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only"
              style={{
                position: 'fixed',
                top: '1rem',
                left: '1rem',
                zIndex: 9999,
                background: '#4F46E5',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Skip to main content
            </a>

            <Navbar />

            <div id="main-content" style={{ flex: 1, minHeight: '100vh' }}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/guide" element={<VotingGuidePage />} />
                  <Route path="/timeline" element={<TimelinePage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/glossary" element={<GlossaryPage />} />
                  <Route path="/check" element={<EligibilityPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={
                    <div className="container-xl text-center" style={{ paddingTop: '8rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                      <h1 className="font-display text-4xl font-bold text-white mb-4">404 — Page Not Found</h1>
                      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn-primary">Go Back Home</a>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </div>

            <Footer />
            <ChatWidget />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}
