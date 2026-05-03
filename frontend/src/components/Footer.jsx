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
    <footer 
      role="contentinfo" 
      style={{ 
        background: 'rgba(5, 12, 25, 0.95)', 
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: 'auto'
      }}
    >
      <div className="container-xl" style={{ padding: '4rem 1.5rem 2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link 
              to="/" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '1rem',
                textDecoration: 'none' 
              }}
            >
              <div 
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #4F46E5, #F59E0B)'
                }}
              >
                <Vote size={20} style={{ color: 'white' }} />
              </div>
              <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
                Vote<span style={{ color: '#F59E0B' }}>X</span>
              </span>
            </Link>
            <p style={{ 
              fontSize: '0.875rem', 
              lineHeight: '1.6', 
              marginBottom: '1.5rem',
              color: '#94a3b8',
              maxWidth: '280px'
            }}>
              Empowering citizens with knowledge. Understand the complete election process — from registration to results.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#94a3b8',
                  transition: 'all 0.2s',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                aria-label="Twitter"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(79,70,229,0.2)';
                  e.currentTarget.style.color = '#818cf8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <MessageSquare size={16} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#94a3b8',
                  transition: 'all 0.2s',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                aria-label="GitHub"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(79,70,229,0.2)';
                  e.currentTarget.style.color = '#818cf8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Code size={16} />
              </a>
              <a 
                href="https://eci.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#94a3b8',
                  transition: 'all 0.2s',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
                aria-label="Election Commission of India"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(79,70,229,0.2)';
                  e.currentTarget.style.color = '#818cf8';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(group => (
            <div key={group.group}>
              <h3 style={{ 
                fontSize: '0.75rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#F59E0B',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                {group.group}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {group.links.map(link => (
                  <li key={link.to}>
                    <Link 
                      to={link.to}
                      style={{ 
                        fontSize: '0.875rem',
                        color: '#94a3b8',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#e2e8f0'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <p style={{ 
              fontSize: '0.75rem',
              textAlign: 'center',
              color: '#64748b',
              margin: 0
            }}>
              © {new Date().getFullYear()} VoteX. Built for civic education. All rights reserved.
            </p>
            <p style={{ 
              fontSize: '0.75rem',
              textAlign: 'center',
              color: '#64748b',
              maxWidth: '600px',
              margin: 0,
              lineHeight: '1.5'
            }}>
              ⚠️ VoteX is an educational platform. For official election information, visit{' '}
              <a 
                href="https://eci.gov.in" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: '#94a3b8',
                  textDecoration: 'underline',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                Election Commission of India
              </a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
