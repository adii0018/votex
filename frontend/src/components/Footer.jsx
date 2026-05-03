import { Link } from 'react-router-dom';
import { Vote, Code, MessageSquare, ExternalLink } from 'lucide-react';

const footerLinks = [
  { group: 'Learn', links: [
    { to: '/guide', label: 'Voting Guide' },
    { to: '/timeline', label: 'Election Timeline' },
    { to: '/glossary', label: 'Glossary' },
  ]},
  { group: 'Tools', links: [
    { to: '/quiz', label: 'Knowledge Quiz' },
    { to: '/check', label: 'Eligibility Checker' },
  ]},
  { group: 'About', links: [
    { to: '/about', label: 'About VoteX' },
  ]},
];

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: 'rgba(5, 12, 25, 0.8)', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4" style={{ textDecoration: 'none' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #4F46E5, #F59E0B)' }}>
                <Vote size={20} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Vote<span style={{ color: '#F59E0B' }}>X</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
              Empowering citizens with knowledge. Understand the complete election process — from registration to results.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                 style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}
                 aria-label="Twitter">
                <MessageSquare size={15} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                 style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}
                 aria-label="GitHub">
                <Code size={15} />
              </a>
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                 style={{ background: 'rgba(255,255,255,0.07)', color: '#94a3b8' }}
                 aria-label="Election Commission of India">
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(group => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: '#F59E0B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {group.group}
              </h3>
              <ul className="space-y-2" style={{ listStyle: 'none' }}>
                {group.links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm transition-colors hover:text-white"
                          style={{ color: '#94a3b8', textDecoration: 'none' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-center md:text-left" style={{ color: '#64748b' }}>
              © 2024 VoteX. Built for civic education.
            </p>
            <p className="text-xs text-center" style={{ color: '#64748b', maxWidth: '480px' }}>
              ⚠️ VoteX is an educational platform. For official election information, visit your national{' '}
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer"
                 className="hover:text-white transition-colors" style={{ color: '#94a3b8' }}>
                Election Commission website
              </a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
