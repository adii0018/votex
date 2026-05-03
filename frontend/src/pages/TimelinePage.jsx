import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const stages = [
  {
    id: 'announcement',
    icon: '📢',
    title: 'Election Announcement',
    shortDesc: 'Model Code kicks in',
    color: '#4F46E5',
    details: {
      description: 'The Election Commission of India (ECI) officially announces the election schedule. This marks the beginning of the election process and triggers the Model Code of Conduct (MCC).',
      citizenAction: [
        'Stay informed about the election schedule',
        'Check if your name is on the electoral roll',
        'Be aware of the Model Code of Conduct',
      ],
      keyFacts: [
        'MCC is binding on all political parties and candidates',
        'Government cannot announce new schemes after MCC',
        'Typically announced 4–5 weeks before voting day',
      ],
      duration: '1–2 days',
    },
  },
  {
    id: 'registration',
    icon: '📋',
    title: 'Voter Registration',
    shortDesc: 'Enroll to vote',
    color: '#F59E0B',
    details: {
      description: 'Citizens who are eligible but not yet registered can enroll in the voter list. Existing voters can update their details or correct errors.',
      citizenAction: [
        'Check your name at voters.eci.gov.in',
        'Fill Form 6 for new registration',
        'Update your address using Form 8A if you moved',
        'Submit required documents',
      ],
      keyFacts: [
        'Registration closes at least 30 days before polling',
        'You can register online, offline, or via Voter Helpline App',
        'Voter ID (EPIC) is mailed to your registered address',
      ],
      duration: '2–4 weeks before announcement',
    },
  },
  {
    id: 'nomination',
    icon: '📝',
    title: 'Nomination Filing',
    shortDesc: 'Candidates file papers',
    color: '#10b981',
    details: {
      description: 'Candidates who wish to contest elections must file nomination papers with the Returning Officer of their constituency within a specified window.',
      citizenAction: [
        'Review candidate affidavits once nominations are filed',
        'Check candidates\' criminal and financial disclosures',
        'Research party manifestos and candidate backgrounds',
      ],
      keyFacts: [
        'Candidates must submit an affidavit disclosing assets and criminal records',
        'Security deposit required (₹25,000 for Lok Sabha, ₹10,000 for Vidhan Sabha)',
        'Forfeited if candidate gets less than 1/6th of valid votes',
      ],
      duration: '3–5 days',
    },
  },
  {
    id: 'campaigning',
    icon: '📣',
    title: 'Campaigning Period',
    shortDesc: 'Parties rally for votes',
    color: '#8b5cf6',
    details: {
      description: 'Political parties and candidates campaign to earn voter support through rallies, door-to-door visits, advertisements, and social media.',
      citizenAction: [
        'Attend public rallies and listen to candidates',
        'Evaluate party manifestos critically',
        'Watch official debates and interviews',
        'Avoid spreading misinformation',
        'Report campaign violations to ECI',
      ],
      keyFacts: [
        'Campaign spending limits set by ECI',
        'Campaign ends 48 hours before polling (Silence Period)',
        'During silence period, exit polls cannot be broadcast',
      ],
      duration: '2–3 weeks',
    },
  },
  {
    id: 'voting',
    icon: '🗳️',
    title: 'Voting Day',
    shortDesc: 'Cast your ballot',
    color: '#f43f5e',
    details: {
      description: 'The most important day — citizens cast their votes at designated polling booths. Polling is generally conducted from 7 AM to 6 PM.',
      citizenAction: [
        'Carry valid voter ID or accepted alternative',
        'Go to your assigned polling booth',
        'Follow all instructions of Polling Officers',
        'Cast your vote on EVM and verify on VVPAT',
        'Do not photograph inside the voting compartment',
      ],
      keyFacts: [
        'Polling hours: 7 AM to 6 PM (may vary)',
        'It is a paid holiday for employees in India',
        'Reporters and officials are not allowed inside the voting compartment',
      ],
      duration: '1 day (or multiple phases)',
    },
  },
  {
    id: 'counting',
    icon: '🔢',
    title: 'Vote Counting',
    shortDesc: 'Tallying every vote',
    color: '#06b6d4',
    details: {
      description: 'After polling closes, EVMs are sealed and kept under tight security until counting day. Counting happens at centralized venues with candidates\' representatives present.',
      citizenAction: [
        'Follow live election result coverage',
        'Be patient — counting can take many hours',
        'Avoid spreading unverified result claims',
      ],
      keyFacts: [
        'Postal ballots are counted first',
        'Each round counts votes from specific EVMs',
        'Results are updated round-by-round on ECI website',
        'Any party can request VVPAT verification of specific booths',
      ],
      duration: '1–2 days',
    },
  },
  {
    id: 'results',
    icon: '📊',
    title: 'Result Declaration',
    shortDesc: 'Winners are announced',
    color: '#F59E0B',
    details: {
      description: 'The Returning Officer formally declares the winner of each constituency. For general elections, government formation begins after all results are announced.',
      citizenAction: [
        'Monitor official ECI website for results',
        'Congratulate winners and encourage civil discourse',
        'Hold elected representatives accountable',
      ],
      keyFacts: [
        'Winner declared by Returning Officer after all rounds',
        'First Past the Post system — most votes wins',
        'Results can be challenged in the High Court',
        'Defeated candidates get their security deposit back if votes > 1/6th',
      ],
      duration: '1–2 days',
    },
  },
  {
    id: 'oath',
    icon: '🤝',
    title: 'Oath Taking',
    shortDesc: 'New government formed',
    color: '#22c55e',
    details: {
      description: 'Elected members are sworn in by the President (for Parliament) or Governor (for state legislatures). The government is then officially formed.',
      citizenAction: [
        'Watch the swearing-in ceremony',
        'Engage with your newly elected representative',
        'Register feedback or concerns through appropriate channels',
        'Stay engaged in civic life between elections',
      ],
      keyFacts: [
        'Oath administered by President (Lok Sabha) or Governor (Vidhan Sabha)',
        'New PM takes oath within weeks of election results',
        'Cabinet is formed from elected members of ruling party/coalition',
      ],
      duration: '2–4 weeks after results',
    },
  },
];

export default function TimelinePage() {
  const [activeStage, setActiveStage] = useState(null);

  return (
    <main style={{ paddingTop: '5rem' }}>
      <div className="container-xl" style={{ padding: '3rem 1.5rem 6rem' }}>
        {/* Header */}
        <div className="mb-12">
          <div className="section-tag">Election Timeline</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            The Complete{' '}
            <span className="gradient-text">Election Cycle</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '560px' }}>
            From announcement to oath-taking — every stage of an Indian election explained. Click any stage to explore.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div
          role="tablist"
          aria-label="Election stages timeline"
          style={{ overflowX: 'auto', paddingBottom: '1rem', marginBottom: '3rem' }}
        >
          <div style={{ display: 'flex', gap: 0, minWidth: 'max-content', padding: '0.5rem 0' }}>
            {stages.map((stage, i) => (
              <div key={stage.id} style={{ display: 'flex', alignItems: 'flex-start' }}>
                {/* Stage */}
                <button
                  role="tab"
                  aria-selected={activeStage === i}
                  aria-controls={`stage-panel-${i}`}
                  id={`stage-tab-${i}`}
                  onClick={() => setActiveStage(activeStage === i ? null : i)}
                  style={{
                    width: '160px',
                    textAlign: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0 0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {/* Dot */}
                  <div
                    className="timeline-dot"
                    style={{
                      background: activeStage === i ? stage.color : undefined,
                      borderColor: stage.color,
                      boxShadow: activeStage === i ? `0 0 20px ${stage.color}66` : undefined,
                      transform: activeStage === i ? 'scale(1.1)' : undefined,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }} aria-hidden="true">{stage.icon}</span>
                  </div>

                  {/* Label */}
                  <div>
                    <div
                      className="text-xs font-bold"
                      style={{
                        color: activeStage === i ? stage.color : '#cbd5e1',
                        marginBottom: '2px',
                        transition: 'color 0.2s',
                      }}
                    >
                      {stage.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{stage.shortDesc}</div>
                  </div>
                </button>

                {/* Connector */}
                {i < stages.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '28px', paddingBottom: '40px' }}>
                    <div style={{ width: '32px', height: '2px', background: `linear-gradient(90deg, ${stage.color}, ${stages[i + 1].color})` }} />
                    <ChevronRight size={14} style={{ color: '#4F46E5', marginLeft: '-4px' }} aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stage Detail Panel */}
        {activeStage !== null && (
          <div
            id={`stage-panel-${activeStage}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${activeStage}`}
            style={{
              animation: 'fadeInUp 0.35s ease',
              background: `linear-gradient(135deg, ${stages[activeStage].color}10, rgba(10,22,40,0.8))`,
              border: `1px solid ${stages[activeStage].color}33`,
              borderRadius: '20px',
              padding: '2rem',
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span style={{ fontSize: '2.5rem' }} aria-hidden="true">{stages[activeStage].icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: `${stages[activeStage].color}22`, color: stages[activeStage].color }}>
                    Stage {activeStage + 1} of {stages.length}
                  </span>
                  <span className="text-xs" style={{ color: '#64748b' }}>Duration: {stages[activeStage].details.duration}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white">{stages[activeStage].title}</h2>
              </div>
            </div>

            <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {stages[activeStage].details.description}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Citizen Actions */}
              <div>
                <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '1rem' }}>
                  What Should You Do?
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {stages[activeStage].details.citizenAction.map((action, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#94a3b8' }}>
                      <span style={{ color: stages[activeStage].color, flexShrink: 0, marginTop: '2px' }}>✓</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Facts */}
              <div>
                <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '1rem' }}>
                  Key Facts
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {stages[activeStage].details.keyFacts.map((fact, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#94a3b8' }}>
                      <span style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }}>◆</span>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {!activeStage === null || (activeStage === null && (
          <p className="text-center mt-4" style={{ color: '#64748b', fontSize: '0.9rem' }}>
            ← Click any stage above to learn more
          </p>
        ))}

        {activeStage === null && (
          <div className="text-center mt-4">
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>← Scroll and click any stage above to explore it in detail</p>
          </div>
        )}
      </div>
    </main>
  );
}
