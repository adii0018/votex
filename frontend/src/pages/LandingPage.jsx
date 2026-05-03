import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, BookOpen, Award, Zap, Calendar, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import './LandingPage.css';

// Dummy upcoming dates
const DUMMY_DATES = [
  {
    id: 1,
    event_name: 'Voter Registration Deadline',
    date: '2026-06-15',
    description: 'Last date to register as a new voter or update your details in the electoral roll.',
    days_until: 43
  },
  {
    id: 2,
    event_name: 'Nomination Filing Begins',
    date: '2026-07-01',
    description: 'Candidates can start filing their nomination papers with the Returning Officer.',
    days_until: 59
  },
  {
    id: 3,
    event_name: 'First Phase Polling',
    date: '2026-08-10',
    description: 'First phase of voting begins across designated constituencies.',
    days_until: 99
  }
];

// Animated Rays Background Component
function AnimatedRays() {
  return (
    <div className="rays-container">
      <div className="ray ray-1"></div>
      <div className="ray ray-2"></div>
      <div className="ray ray-3"></div>
      <div className="ray ray-4"></div>
      <div className="ray ray-5"></div>
      <div className="ray ray-6"></div>
      <div className="ray ray-7"></div>
      <div className="ray ray-8"></div>
    </div>
  );
}

// Floating Particles
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 3,
  }));

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
}

const features = [
  {
    icon: <BookOpen size={28} strokeWidth={1.5} />,
    title: 'Complete Voting Guide',
    description: 'Step-by-step walkthrough from registration to casting your vote with confidence.',
    link: '/guide',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Calendar size={28} strokeWidth={1.5} />,
    title: 'Interactive Timeline',
    description: 'Visualize the entire election journey with our dynamic timeline interface.',
    link: '/timeline',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: <Award size={28} strokeWidth={1.5} />,
    title: 'Knowledge Quiz',
    description: 'Test your election knowledge and earn achievement badges along the way.',
    link: '/quiz',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Shield size={28} strokeWidth={1.5} />,
    title: 'Eligibility Checker',
    description: 'Instantly verify if you can vote and get personalized guidance.',
    link: '/check',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Sparkles size={28} strokeWidth={1.5} />,
    title: 'Election Glossary',
    description: 'Understand complex election terms explained in simple language.',
    link: '/glossary',
    gradient: 'from-rose-500 to-red-500',
  },
  {
    icon: <Zap size={28} strokeWidth={1.5} />,
    title: 'AI Assistant',
    description: 'Get instant answers powered by artificial intelligence.',
    link: '/',
    gradient: 'from-indigo-500 to-violet-500',
  },
];

const stats = [
  { icon: <Users size={24} />, value: '900M+', label: 'Eligible Voters' },
  { icon: <TrendingUp size={24} />, value: '543', label: 'Constituencies' },
  { icon: <CheckCircle2 size={24} />, value: '18+', label: 'Voting Age' },
  { icon: <Shield size={24} />, value: '1950', label: 'Helpline' },
];

export default function LandingPage() {
  const upcomingDates = DUMMY_DATES;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="landing-page">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION WITH RAYS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="hero-section">
        <AnimatedRays />
        <FloatingParticles />
        
        {/* Gradient Overlay */}
        <div className="hero-gradient-overlay" />

        <div className="container-xl hero-content">
          <div className={`hero-inner ${isVisible ? 'visible' : ''}`}>
            {/* Badge */}
            <div className="hero-badge">
              <Sparkles size={16} />
              <span>India's Most Advanced Election Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="hero-title">
              <span className="hero-title-line">Empower Your</span>
              <span className="hero-title-highlight">Democratic Voice</span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle">
              Navigate the complete election journey with confidence. From voter registration 
              to understanding results — we've got you covered with interactive tools and expert guidance.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <Link to="/guide" className="cta-primary">
                <span>Get Started</span>
                <ArrowRight size={20} />
              </Link>
              <Link to="/quiz" className="cta-secondary">
                <Sparkles size={20} />
                <span>Take Quiz</span>
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="stats-bar">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="hero-bottom-fade" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FEATURES SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="features-section">
        <div className="container-xl">
          {/* Section Header */}
          <div className="section-header">
            <div className="section-badge">
              <Zap size={14} />
              <span>Powerful Features</span>
            </div>
            <h2 className="section-title">
              Everything You Need to <span className="text-gradient">Vote Smart</span>
            </h2>
            <p className="section-description">
              Comprehensive tools designed to make you an informed and confident voter
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((feature, i) => (
              <Link
                key={i}
                to={feature.link}
                className="feature-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`feature-icon bg-gradient-to-br ${feature.gradient}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-link">
                  <span>Explore</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* UPCOMING DATES SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {upcomingDates.length > 0 && (
        <section className="dates-section">
          <div className="container-xl">
            <div className="section-header">
              <div className="section-badge">
                <Calendar size={14} />
                <span>Stay Updated</span>
              </div>
              <h2 className="section-title">
                Important <span className="text-gradient">Election Dates</span>
              </h2>
              <p className="section-description">
                Never miss a crucial milestone in the election process
              </p>
            </div>

            <div className="dates-grid">
              {upcomingDates.map((date, i) => (
                <div
                  key={date.id}
                  className="date-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="date-badge">
                    {date.days_until <= 0 ? (
                      <span className="badge-today">TODAY</span>
                    ) : date.days_until <= 7 ? (
                      <span className="badge-soon">This Week</span>
                    ) : (
                      <span className="badge-upcoming">{date.days_until} days</span>
                    )}
                  </div>
                  <h3 className="date-title">{date.event_name}</h3>
                  <p className="date-date">
                    {new Date(date.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="date-description">{date.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CTA SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="cta-rays">
          <AnimatedRays />
        </div>
        <div className="container-xl">
          <div className="cta-content">
            <div className="cta-icon">
              <Sparkles size={48} />
            </div>
            <h2 className="cta-title">
              Ready to Make Your <span className="text-gradient">Vote Count?</span>
            </h2>
            <p className="cta-description">
              Join thousands of informed voters. Start your journey to confident 
              civic participation today.
            </p>
            <div className="cta-buttons">
              <Link to="/check" className="cta-primary large">
                <span>Check Eligibility</span>
                <ArrowRight size={22} />
              </Link>
              <Link to="/guide" className="cta-secondary large">
                <BookOpen size={22} />
                <span>View Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
