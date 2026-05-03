import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Vote, CheckSquare, User, LogIn, UserPlus, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const navLinks = [
  { to: '/guide', label: 'Voting Guide' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/glossary', label: 'Glossary' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { language, changeLanguage, availableLanguages, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    // Prevent body scroll when mobile menu is open
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [location, mobileOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container-xl flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white no-underline" aria-label="VoteX Home">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #4F46E5, #F59E0B)' }}>
            <Vote size={20} className="text-white" aria-hidden="true" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Vote<span style={{ color: '#F59E0B' }}>X</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color: location.pathname === link.to ? '#F59E0B' : '#cbd5e1',
                textDecoration: 'none',
              }}
              aria-current={location.pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Auth + Language + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="hidden md:flex items-center gap-1 text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Change language"
            >
              <Globe size={18} />
              <span className="text-xs font-medium uppercase">{language}</span>
            </button>
            {langMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '0.5rem',
                minWidth: '150px',
                zIndex: 50
              }}>
                {availableLanguages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      background: language === lang.code ? '#4F46E5' : 'transparent',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <Link to="/profile" className="hidden md:flex items-center gap-2 text-white text-sm font-medium hover:text-amber-400 transition-colors" style={{ textDecoration: 'none' }}>
              <User size={18} />
              {user?.username}
            </Link>
          ) : (
            <>
              <Link to="/login" className="hidden md:flex items-center gap-1 text-white text-sm font-medium hover:text-amber-400 transition-colors" style={{ textDecoration: 'none' }}>
                <LogIn size={18} />
                {t('nav.login')}
              </Link>
              <Link to="/register" className="hidden md:inline-flex btn-gold text-sm py-2 px-4">
                <UserPlus size={16} />
                {t('nav.register')}
              </Link>
            </>
          )}
          
          <Link to="/check" className="btn-gold hidden md:inline-flex text-sm py-2 px-4">
            <CheckSquare size={16} aria-hidden="true" />
            Check Eligibility
          </Link>
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden"
          style={{
            background: 'rgba(10, 22, 40, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '1rem 1.5rem 1.5rem',
            animation: 'fadeInUp 0.2s ease',
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-3 px-4 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: location.pathname === link.to ? '#F59E0B' : '#cbd5e1',
                  textDecoration: 'none',
                  background: location.pathname === link.to ? 'rgba(79,70,229,0.1)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth Links */}
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-white" style={{ textDecoration: 'none', background: 'rgba(79,70,229,0.2)' }}>
                <User size={18} />
                {t('nav.profile')}
              </Link>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-white" style={{ textDecoration: 'none' }}>
                  <LogIn size={18} />
                  {t('nav.login')}
                </Link>
                <Link to="/register" className="flex items-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-white" style={{ textDecoration: 'none', background: 'rgba(245,158,11,0.2)' }}>
                  <UserPlus size={18} />
                  {t('nav.register')}
                </Link>
              </>
            )}
            
            {/* Mobile Language Switcher */}
            <div style={{ marginTop: '0.5rem', padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Language</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {availableLanguages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      background: language === lang.code ? '#4F46E5' : '#334155',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    {lang.nativeName}
                  </button>
                ))}
              </div>
            </div>
            
            <Link to="/check" className="btn-gold mt-3 justify-center">
              <CheckSquare size={16} aria-hidden="true" />
              Check Eligibility
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
