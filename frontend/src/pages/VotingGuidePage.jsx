import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, IdCard, MapPin, Droplets, ClipboardList, MonitorSmartphone, FileCheck } from 'lucide-react';

const steps = [
  {
    icon: <IdCard size={22} />,
    title: 'Carry Your Voter ID',
    summary: 'Bring a valid photo identity document to the polling booth.',
    details: `Your primary document should be the EPIC (Voter ID Card). However, you can also carry any of these alternatives:
    
• Aadhaar Card
• Passport
• Driving License  
• PAN Card
• MNREGA Job Card
• Passbook with photograph from Bank/Post Office
• Smart Card issued by RGI

Make sure the document is original (not a photocopy). One document is sufficient.`,
    tip: 'Pro Tip: Check the Election Commission website for the complete list of accepted IDs before election day.',
    color: '#4F46E5',
  },
  {
    icon: <MapPin size={22} />,
    title: 'Go to Your Assigned Polling Booth',
    summary: 'Locate your designated polling station using your voter slip or the online portal.',
    details: `Every voter is assigned to a specific polling booth based on their registered address. To find yours:

• Check the voter slip received by post
• Visit voters.eci.gov.in and enter your details
• Use the Voter Helpline App on your phone
• Call 1950 (National Voter Helpline)

Polling booths are open from 7:00 AM to 6:00 PM on election day (timings may vary by constituency). Arrive early to avoid long queues.`,
    tip: 'Pro Tip: Download your Voter Slip from the NVSP portal the night before to save time.',
    color: '#F59E0B',
  },
  {
    icon: <Droplets size={22} />,
    title: 'Get Your Finger Inked',
    summary: 'Your left index finger will be marked with indelible ink to prevent double voting.',
    details: `After verification, a Polling Officer will apply indelible ink to your left index finger (or another finger if that one is already marked or missing).

Key facts about the ink:
• It is specially formulated to last 3-4 weeks
• Applied before you cast your vote
• Cannot be removed with soap, water, or chemicals
• Visible under ultraviolet light even when faded
• Made at the Mysore Paints and Varnish Ltd. (a government facility)

This prevents any voter from casting more than one vote.`,
    tip: 'Pro Tip: The ink is harmless and non-toxic. Do not try to remove it — it is an offense to tamper with the ink mark.',
    color: '#10b981',
  },
  {
    icon: <ClipboardList size={22} />,
    title: 'Verify Your Name on the List',
    summary: 'A Polling Officer will verify your name and details on the electoral roll.',
    details: `Upon entering the polling booth, you will go through a verification process:

1. Present your voter ID to the First Polling Officer
2. They will find your name in the electoral roll
3. Your name, serial number, and photo are checked
4. You sign or put your thumb impression in the register
5. You receive a slip with your serial number

If your name is not found, you can:
• Show Form 7 if you received it
• Request the Presiding Officer to check the supplementary list
• Contact the sector magistrate posted nearby`,
    tip: 'Pro Tip: You can check your name on the electoral roll before election day at voters.eci.gov.in.',
    color: '#8b5cf6',
  },
  {
    icon: <MonitorSmartphone size={22} />,
    title: 'Cast Your Vote on EVM',
    summary: 'Press the button next to your chosen candidate on the Electronic Voting Machine.',
    details: `You will be directed to the voting compartment for privacy. Here's what to do:

1. Look at the Balloting Unit — it displays candidate names, party symbols, and serial numbers
2. Press the blue button next to your chosen candidate
3. A beep sound confirms your vote has been recorded
4. The button for your candidate will glow red

Important rules:
• The voting compartment is completely private — no one can see your choice
• You have the right to NOTA (None Of The Above) — the last button on the EVM
• Deliberately damaging the EVM is a punishable offense
• You cannot take photos inside the voting compartment`,
    tip: 'Pro Tip: The EVM is tamper-proof and your vote is completely secret. No one — not even the Presiding Officer — can know how you voted.',
    color: '#f43f5e',
  },
  {
    icon: <FileCheck size={22} />,
    title: 'Collect VVPAT Slip Confirmation',
    summary: 'Verify your vote on the VVPAT screen — a paper slip will appear confirming your choice.',
    details: `After pressing the button on the EVM, look at the VVPAT (Voter Verifiable Paper Audit Trail) machine:

1. A paper slip with the candidate's name, serial number, and party symbol appears
2. It is visible for 7 seconds through a transparent window
3. The slip automatically falls into a sealed VVPAT box
4. You should NOT attempt to touch or remove the slip

The VVPAT slip:
• Is a physical paper record of your vote
• Can be used for verification in case of disputes
• Is counted separately in case of recounting orders by the court

Your vote is now cast. Leave the booth and share the ink mark proudly!`,
    tip: 'Pro Tip: If the VVPAT slip shows a different candidate than you chose, immediately inform the Presiding Officer. You may be allowed to cast a test vote.',
    color: '#06b6d4',
  },
];

function StepItem({ step, index, completed, onToggleComplete, expanded, onToggleExpand }) {
  return (
    <article
      className={`step-item ${completed ? 'completed' : ''}`}
      aria-label={`Step ${index + 1}: ${step.title}`}
    >
      {/* Step Number */}
      <div
        className="step-number"
        aria-hidden="true"
        style={completed ? { background: step.color, borderColor: step.color } : undefined}
      >
        {completed ? <CheckCircle size={16} className="text-white" /> : index + 1}
      </div>

      {/* Content */}
      <div className="card" style={{ borderLeft: `3px solid ${step.color}22` }}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${step.color}22`, color: step.color }}
              aria-hidden="true"
            >
              {step.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-white mb-1">{step.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{step.summary}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mark Understood */}
            <button
              onClick={() => onToggleComplete(index)}
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
              style={{
                background: completed ? `${step.color}33` : 'rgba(255,255,255,0.06)',
                color: completed ? step.color : '#64748b',
                border: `1px solid ${completed ? step.color + '44' : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: 'nowrap',
              }}
              aria-pressed={completed}
              aria-label={`Mark step ${index + 1} as ${completed ? 'not understood' : 'understood'}`}
            >
              {completed ? '✓ Got it' : 'Mark as done'}
            </button>

            {/* Expand Toggle */}
            <button
              onClick={() => onToggleExpand(index)}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', cursor: 'pointer', border: 'none' }}
              aria-expanded={expanded}
              aria-controls={`step-details-${index}`}
              aria-label={`${expanded ? 'Collapse' : 'Expand'} details for step ${index + 1}`}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <div
            id={`step-details-${index}`}
            style={{
              marginTop: '1.25rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              animation: 'fadeInUp 0.3s ease',
            }}
          >
            <pre style={{
              whiteSpace: 'pre-wrap',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.875rem',
              color: '#94a3b8',
              lineHeight: 1.7,
              margin: 0,
            }}>
              {step.details}
            </pre>
            <div
              className="mt-4 p-3 rounded-lg"
              style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <p className="text-sm" style={{ color: '#fbbf24' }}>{step.tip}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function VotingGuidePage() {
  const [completed, setCompleted] = useState(new Set());
  const [expanded, setExpanded] = useState(new Set([0]));

  const toggleComplete = (idx) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const toggleExpand = (idx) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const progress = (completed.size / steps.length) * 100;

  return (
    <main style={{ paddingTop: '5rem' }}>
      <div className="container-xl" style={{ padding: '3rem 1.5rem 6rem' }}>
        {/* Header */}
        <div className="mb-10">
          <div className="section-tag">Step-by-Step Voting Guide</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            How to Vote on{' '}
            <span className="gradient-text">Election Day</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '540px' }}>
            Follow these 6 steps to cast your vote confidently. Mark each step as "understood" to track your progress.
          </p>
        </div>

        {/* Progress Tracker */}
        <div
          className="card mb-10"
          style={{ background: 'rgba(79,70,229,0.08)', borderColor: 'rgba(79,70,229,0.2)' }}
          role="progressbar"
          aria-valuenow={completed.size}
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-label={`Progress: ${completed.size} of ${steps.length} steps understood`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ color: '#818cf8' }}>
              Your Progress
            </span>
            <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>
              {completed.size} / {steps.length} steps understood
            </span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              className="progress-bar"
              style={{ width: `${progress}%`, height: '100%' }}
            />
          </div>
          {completed.size === steps.length && (
            <p className="text-sm mt-3 text-center animate-fade-in" style={{ color: '#22c55e' }}>
              🎉 Congratulations! You understand the complete voting process. You're ready to vote!
            </p>
          )}
        </div>

        {/* Steps */}
        <div role="list" aria-label="Voting steps">
          {steps.map((step, i) => (
            <div key={i} role="listitem">
              <StepItem
                step={step}
                index={i}
                completed={completed.has(i)}
                onToggleComplete={toggleComplete}
                expanded={expanded.has(i)}
                onToggleExpand={toggleExpand}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
