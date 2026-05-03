import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Vote, CheckSquare } from 'lucide-react';

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
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

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

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
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
