import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, Shield, BookOpen, CheckCircle, Zap, Award } from 'lucide-react';
import useSWR from 'swr';
import { fetchDates } from '../api';
import ShapeGrid from '../components/ShapeGrid';

// Animated particle background
function ParticleBackground() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 12 + 8,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            bottom: '-10px',
            background: p.id % 3 === 0 ? '#F59E0B' : p.id % 3 === 1 ? '#4F46E5' : '#818cf8',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// Wave decoration at bottom of hero
function WaveDecoration() {
  return (
    <div className="wave-container">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill="rgba(10,22,40,1)"
        />
      </svg>
    </div>
  );
}

const features = [
  {
    icon: <BookOpen size={22} />,
    title: 'Step-by-Step Guide',
    description: 'Navigate every stage of the voting process with clear, actionable instructions.',
    link: '/guide',
    color: '#4F46E5',
  },
  {
    icon: <Zap size={22} />,
    title: 'Interactive Timeline',
    description: 'Explore the complete election cycle from announcement to oath-taking.',
    link: '/timeline',
    color: '#F59E0B',
  },
  {
    icon: <Award size={22} />,
    title: 'Knowledge Quiz',
    description: 'Test your election knowledge and earn your "Election Ready" badge.',
    link: '/quiz',
    color: '#10b981',
  },
  {
    icon: <Shield size={22} />,
    title: 'Eligibility Checker',
    description: 'Find out instantly if you qualify to vote and what steps to take next.',
    link: '/check',
    color: '#f43f5e',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Election Glossary',
    description: 'Decode election jargon — from EVM to Constituency, explained simply.',
    link: '/glossary',
    color: '#8b5cf6',
  },
  {
    icon: <CheckCircle size={22} />,
    title: 'AI Assistant',
    description: 'Get instant answers to any election question from our smart assistant.',
    link: '/',
    color: '#06b6d4',
  },
];

const stats = [
  { value: '900M+', label: 'Eligible Voters in India' },
  { value: '543', label: 'Lok Sabha Constituencies' },
  { value: '18', label: 'Minimum Voting Age' },
  { value: '1950', label: 'Voter Helpline Number' },
];

export default function LandingPage() {
  const { data: datesData } = useSWR('dates', fetchDates, { revalidateOnFocus: false });
  const upcomingDates = datesData?.results?.slice(0, 3) || [];
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      {/* ─── Hero Section ─── */}
      <section
        aria-label="Hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(180deg, #0A1628 0%, #0f2040 100%)',
          paddingTop: '5rem',
          paddingBottom: '8rem',
          overflow: 'hidden',
        }}
      >
        {/* ShapeGrid Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        >
          <ShapeGrid
            speed={0.69}
            squareSize={40}
            direction="diagonal"
            borderColor="#2F293A"
            hoverFillColor="#222"
            shape="hexagon"
            hoverTrailAmount={0}
            hoverColor="#10B981"
          />
        </div>

        <ParticleBackground />

        <div className="container-xl" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            {/* Tag */}
            <div
              className="section-tag"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <span>🗳️</span>
              India's #1 Election Education Platform
            </div>

            {/* Heading */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease 0.1s',
              }}
            >
              Know Your Vote.{' '}
              <span className="gradient-text">Own Your Democracy.</span>
            </h1>

            {/* Subheading */}
            <p
              style={{
                fontSize: '1.15rem',
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                maxWidth: '520px',
                margin: '0 auto 2.5rem',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease 0.2s',
              }}
            >
              VoteX guides you through every step of the election process — from registration to results. Interactive, accessible, and built for every citizen.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease 0.3s',
                justifyContent: 'center',
              }}
            >
              <Link to="/guide" className="btn-primary text-base">
                Start the Guide
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/quiz" className="btn-outline text-base">
                <PlayCircle size={18} aria-hidden="true" />
                Take the Quiz
              </Link>
            </div>

            {/* Stats Row */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s ease 0.5s',
                maxWidth: '800px',
                margin: '4rem auto 0',
              }}
            >
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold" style={{ color: '#F59E0B' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#64748b', lineHeight: 1.4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative orb */}
        <div
          className="animate-float"
          style={{
            position: 'absolute',
            right: '-100px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(79,70,229,0.03) 60%, transparent 80%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <WaveDecoration />
      </section>

      {/* ─── Features Grid ─── */}
      <section aria-labelledby="features-heading" style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #0A1628 0%, #0a1f3d 100%)' }}>
        <div className="container-xl">
          <div className="text-center mb-16">
            <div className="section-tag" style={{ justifyContent: 'center', margin: '0 auto 1rem' }}>
              Everything You Need
            </div>
            <h2 id="features-heading" className="font-display text-4xl font-bold text-white mb-4">
              Your Complete Election{' '}
              <span className="gradient-text-indigo">Toolkit</span>
            </h2>
            <p style={{ color: '#94a3b8', maxWidth: '480px', margin: '0 auto', fontSize: '1.05rem' }}>
              Interactive tools, expert knowledge, and step-by-step guidance — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Link
                key={f.title}
                to={f.link}
                className="card group"
                style={{
                  textDecoration: 'none',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${f.color}22`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{f.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.description}</p>
                <div className="flex items-center gap-2 mt-4 text-sm font-medium transition-all group-hover:gap-3" style={{ color: f.color }}>
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Upcoming Dates Banner ─── */}
      {upcomingDates.length > 0 && (
        <section aria-labelledby="dates-heading" style={{ padding: '4rem 0', background: 'rgba(79,70,229,0.06)', borderTop: '1px solid rgba(79,70,229,0.12)', borderBottom: '1px solid rgba(79,70,229,0.12)' }}>
          <div className="container-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="section-tag" style={{ margin: 0 }}>📅 Important Dates</div>
            </div>
            <h2 id="dates-heading" className="font-display text-2xl font-bold text-white mb-6">
              Upcoming Election Milestones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingDates.map(d => (
                <div key={d.id} className="card" style={{ borderColor: d.days_until <= 30 ? 'rgba(245,158,11,0.3)' : undefined }}>
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="text-xs font-semibold px-2 py-1 rounded"
                      style={{
                        background: d.days_until <= 0 ? 'rgba(245,158,11,0.2)' : 'rgba(79,70,229,0.2)',
                        color: d.days_until <= 0 ? '#F59E0B' : '#818cf8',
                      }}
                    >
                      {d.days_until <= 0 ? 'TODAY' : d.days_until <= 7 ? 'This Week' : `In ${d.days_until} days`}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white mb-1">{d.event_name}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
                    {new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>{d.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA Section ─── */}
      <section aria-label="Call to action" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container-xl">
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.2) 0%, rgba(245,158,11,0.1) 100%)',
              border: '1px solid rgba(79,70,229,0.25)',
              borderRadius: '24px',
              padding: '4rem 2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div aria-hidden="true" style={{ position: 'absolute', top: '-60px', right: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.1), transparent)', pointerEvents: 'none' }} />
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Ready to Become an{' '}
              <span className="gradient-text">Informed Voter?</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
              Every vote matters. Start with knowledge. Begin your journey to confident civic participation today.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Link to="/check" className="btn-gold text-base">
                Check My Eligibility
                <ArrowRight size={18} />
              </Link>
              <Link to="/guide" className="btn-outline text-base">
                Explore Voting Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
