import { Vote, Shield, BookOpen, Users, Target, ExternalLink } from 'lucide-react';

const team = [
  { name: 'Election Commission of India', role: 'Primary Data Source', icon: Shield },
  { name: 'National Voter Service Portal', role: 'Registration Platform', icon: BookOpen },
  { name: 'Voter Helpline 1950', role: 'Official Helpline', icon: Users },
];

const values = [
  { icon: '🎯', title: 'Accuracy', desc: 'All information is verified against official Election Commission of India publications.' },
  { icon: '♿', title: 'Accessibility', desc: 'Designed for every citizen — keyboard navigable, screen-reader friendly, and WCAG AA compliant.' },
  { icon: '🔒', title: 'Privacy', desc: 'We don\'t collect or store personal voter data. Your eligibility check is completely private.' },
  { icon: '🌐', title: 'Neutral', desc: 'VoteX is non-partisan. We educate citizens on the process, not on who to vote for.' },
];

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '5rem' }}>
      <div className="container-xl" style={{ padding: '3rem 1.5rem 6rem' }}>
        {/* Header */}
        <div className="mb-16" style={{ maxWidth: '680px' }}>
          <div className="section-tag">About VoteX</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Empowering Citizens Through{' '}
            <span className="gradient-text">Election Knowledge</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1rem' }}>
            VoteX was built with one mission: to make the Indian election process understandable, accessible, and approachable for every citizen — especially first-time voters.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.8 }}>
            We believe that an informed voter is the cornerstone of a healthy democracy. Through interactive guides, quizzes, and AI-powered tools, we help you navigate every step — from checking eligibility to casting your vote with confidence.
          </p>
        </div>

        {/* Mission Statement */}
        <div
          className="card mb-16"
          style={{
            background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(245,158,11,0.06))',
            border: '1px solid rgba(79,70,229,0.25)',
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #F59E0B)' }}>
              <Vote size={28} className="text-white" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Our Mission</h2>
          <p className="text-lg" style={{ color: '#94a3b8', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontStyle: 'italic' }}>
            "To democratize election education — making civic knowledge free, interactive, and available to every Indian citizen, regardless of literacy level or background."
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map(v => (
              <div key={v.title} className="card flex items-start gap-4">
                <span style={{ fontSize: '2rem' }} aria-hidden="true">{v.icon}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Resources */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-3">Official Resources</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>
            VoteX is an educational platform. For official voter registration and election information, always refer to these authoritative sources:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Election Commission of India', url: 'https://eci.gov.in', desc: 'Official ECI website' },
              { name: 'National Voter Service Portal', url: 'https://voters.eci.gov.in', desc: 'Voter registration & services' },
              { name: 'Voter Helpline', url: 'tel:1950', desc: 'Call 1950 for assistance' },
            ].map(r => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-start gap-3 group"
                style={{ textDecoration: 'none' }}
                aria-label={`Visit ${r.name} (opens in new tab)`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(79,70,229,0.15)', color: '#818cf8' }}>
                  <ExternalLink size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">{r.name}</p>
                  <p style={{ color: '#64748b', fontSize: '0.8rem' }}>{r.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="p-6 rounded-xl"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
          role="note"
          aria-label="Important disclaimer"
        >
          <h3 className="font-display font-bold text-white mb-2 flex items-center gap-2">
            <span aria-hidden="true">⚠️</span>
            Important Disclaimer
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7 }}>
            VoteX is an independent educational platform created to help citizens understand the election process. We are not affiliated with the Election Commission of India or any political party. All information is provided for educational purposes only. For official and legally binding information about elections, voter registration, and electoral procedures, please visit the official Election Commission of India website at{' '}
            <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: '#F59E0B', textDecoration: 'underline' }}>
              eci.gov.in
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
