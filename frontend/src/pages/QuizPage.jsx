import { useState, lazy, Suspense } from 'react';
import { Trophy, RotateCcw, Share2, ChevronRight } from 'lucide-react';

const ReactConfetti = lazy(() => import('react-confetti'));

// Dummy quiz data
const DUMMY_QUESTIONS = [
  {
    id: 1,
    question: 'What is the minimum age to vote in India?',
    options: ['16 years', '18 years', '21 years', '25 years'],
    correct_answer: '18 years',
    explanation: 'The minimum voting age in India is 18 years as per the 61st Constitutional Amendment Act, 1988.',
    difficulty: 'easy'
  },
  {
    id: 2,
    question: 'What does EVM stand for?',
    options: ['Electronic Voting Machine', 'Electoral Vote Manager', 'Election Verification Module', 'Electronic Vote Monitor'],
    correct_answer: 'Electronic Voting Machine',
    explanation: 'EVM stands for Electronic Voting Machine, which is used for recording votes in Indian elections.',
    difficulty: 'easy'
  },
  {
    id: 3,
    question: 'How many Lok Sabha constituencies are there in India?',
    options: ['500', '543', '552', '600'],
    correct_answer: '543',
    explanation: 'There are 543 Lok Sabha constituencies in India, with 2 additional nominated members from the Anglo-Indian community.',
    difficulty: 'medium'
  },
  {
    id: 4,
    question: 'What is VVPAT?',
    options: ['Voter Verified Paper Audit Trail', 'Virtual Voting Paper Authentication Tool', 'Verified Vote Processing and Tracking', 'Voter Validation Paper Authentication Technology'],
    correct_answer: 'Voter Verified Paper Audit Trail',
    explanation: 'VVPAT is a Voter Verified Paper Audit Trail that allows voters to verify that their vote was cast correctly.',
    difficulty: 'medium'
  },
  {
    id: 5,
    question: 'What is the Model Code of Conduct?',
    options: ['A dress code for voters', 'Guidelines for political parties during elections', 'Rules for election officials', 'A code for EVM manufacturers'],
    correct_answer: 'Guidelines for political parties during elections',
    explanation: 'The Model Code of Conduct is a set of guidelines issued by the Election Commission to regulate political parties and candidates during elections.',
    difficulty: 'medium'
  },
  {
    id: 6,
    question: 'Who is the constitutional head of the Election Commission of India?',
    options: ['Prime Minister', 'President', 'Chief Election Commissioner', 'Chief Justice of India'],
    correct_answer: 'Chief Election Commissioner',
    explanation: 'The Chief Election Commissioner is the constitutional head of the Election Commission of India.',
    difficulty: 'hard'
  },
  {
    id: 7,
    question: 'What is NOTA?',
    options: ['Notice of Total Absence', 'None of the Above', 'National Online Tracking Application', 'New Official Tracking Algorithm'],
    correct_answer: 'None of the Above',
    explanation: 'NOTA stands for "None of the Above" and allows voters to reject all candidates in an election.',
    difficulty: 'easy'
  },
  {
    id: 8,
    question: 'What is the term duration of Lok Sabha?',
    options: ['4 years', '5 years', '6 years', '7 years'],
    correct_answer: '5 years',
    explanation: 'The Lok Sabha has a term of 5 years from the date of its first meeting, unless dissolved earlier.',
    difficulty: 'easy'
  },
  {
    id: 9,
    question: 'What is the security deposit for a Lok Sabha candidate?',
    options: ['₹10,000', '₹25,000', '₹50,000', '₹1,00,000'],
    correct_answer: '₹25,000',
    explanation: 'A Lok Sabha candidate must deposit ₹25,000 as security, which is forfeited if they get less than 1/6th of valid votes.',
    difficulty: 'hard'
  },
  {
    id: 10,
    question: 'How long before polling day does the campaign silence period begin?',
    options: ['24 hours', '48 hours', '72 hours', '96 hours'],
    correct_answer: '48 hours',
    explanation: 'The campaign silence period begins 48 hours before polling day, during which no campaigning is allowed.',
    difficulty: 'medium'
  }
];

export default function QuizPage() {
  const [questions] = useState(DUMMY_QUESTIONS);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const question = questions[current];

  const handleSelect = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === question.correct_answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      if (score + (selected === question?.correct_answer ? 1 : 0) >= Math.ceil(questions.length * 0.6)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setShowConfetti(false);
  };

  const finalScore = finished ? score : (score + (selected === question?.correct_answer ? 1 : 0));
  const percentage = Math.round((finalScore / questions.length) * 100);

  const getScoreLabel = () => {
    if (percentage >= 80) return { label: 'Election Expert! 🏆', color: '#F59E0B' };
    if (percentage >= 60) return { label: 'Election Ready! 🗳️', color: '#22c55e' };
    if (percentage >= 40) return { label: 'Good Start! Keep Learning 📚', color: '#4F46E5' };
    return { label: 'Keep Practicing! 💪', color: '#f43f5e' };
  };

  return (
    <main style={{ paddingTop: '5rem' }}>
      {showConfetti && (
        <Suspense fallback={null}>
          <ReactConfetti
            recycle={false}
            numberOfPieces={300}
            colors={['#4F46E5', '#F59E0B', '#22c55e', '#ffffff']}
          />
        </Suspense>
      )}

      <div className="container-xl" style={{ padding: '3rem 1.5rem 6rem' }}>
        {/* Header */}
        <div className="mb-10">
          <div className="section-tag">Knowledge Quiz</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Test Your Election{' '}
            <span className="gradient-text">Knowledge</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            {questions.length} questions · Multiple choice · Instant feedback
          </p>
        </div>

        {!finished ? (
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            {/* Progress */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>
                Question {current + 1} of {questions.length}
              </span>
              <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>
                Score: {score}
              </span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginBottom: '2rem', overflow: 'hidden' }}>
              <div
                className="progress-bar"
                style={{ width: `${((current) / questions.length) * 100}%`, height: '100%' }}
              />
            </div>

            {question && (
              <div
                className="card"
                style={{ animation: 'fadeInUp 0.35s ease' }}
                key={current}
              >
                {/* Difficulty badge */}
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded mb-4 inline-block"
                  style={{
                    background: question.difficulty === 'easy' ? 'rgba(34,197,94,0.15)' : question.difficulty === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                    color: question.difficulty === 'easy' ? '#22c55e' : question.difficulty === 'medium' ? '#F59E0B' : '#ef4444',
                  }}
                >
                  {question.difficulty?.charAt(0).toUpperCase() + question.difficulty?.slice(1)}
                </span>

                <h2 className="font-display text-xl font-bold text-white mb-6">
                  {question.question}
                </h2>

                <div
                  role="radiogroup"
                  aria-label="Answer options"
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  {question.options?.map((option) => {
                    let cls = 'quiz-option';
                    if (answered) {
                      if (option === question.correct_answer) cls += ' correct';
                      else if (option === selected) cls += ' incorrect';
                    } else if (option === selected) {
                      cls += ' selected';
                    }

                    return (
                      <button
                        key={option}
                        className={cls}
                        onClick={() => handleSelect(option)}
                        disabled={answered}
                        role="radio"
                        aria-checked={selected === option}
                        aria-label={`Option: ${option}${answered && option === question.correct_answer ? ' (correct answer)' : answered && option === selected && option !== question.correct_answer ? ' (incorrect)' : ''}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {answered && (
                  <div
                    className="mt-5 p-4 rounded-xl animate-fade-in"
                    style={{
                      background: selected === question.correct_answer ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                      border: `1px solid ${selected === question.correct_answer ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    }}
                  >
                    <p className="text-sm font-semibold mb-1" style={{ color: selected === question.correct_answer ? '#22c55e' : '#ef4444' }}>
                      {selected === question.correct_answer ? '✓ Correct!' : '✗ Incorrect'}
                    </p>
                    <p className="text-sm" style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                      {question.explanation}
                    </p>
                  </div>
                )}

                {/* Next Button */}
                {answered && (
                  <button
                    className="btn-primary w-full justify-center mt-5 animate-fade-in"
                    onClick={handleNext}
                    aria-label={current + 1 >= questions.length ? 'See final score' : 'Next question'}
                  >
                    {current + 1 >= questions.length ? 'See My Score' : 'Next Question'}
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Results Screen */
          <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center', animation: 'fadeInUp 0.4s ease' }}>
            <div className="score-badge mb-6">
              <Trophy size={32} className="text-white mb-1" />
              <span className="font-display text-3xl font-bold text-white">{finalScore}/{questions.length}</span>
            </div>

            <h2 className="font-display text-3xl font-bold text-white mb-2">
              {getScoreLabel().label}
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>
              You scored <span style={{ color: getScoreLabel().color, fontWeight: 700 }}>{percentage}%</span> on the election knowledge quiz.
            </p>

            <div
              className="card mt-8 mb-6 text-left"
              style={{
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.15)',
              }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: '#F59E0B' }}>🏆 Your Achievement Badge</p>
              <p className="text-lg font-display font-bold text-white">"{getScoreLabel().label}"</p>
              <p className="text-xs mt-2" style={{ color: '#64748b' }}>Scored {finalScore} out of {questions.length} on VoteX Election Quiz</p>
            </div>

            <div className="flex flex-col gap-3">
              <button className="btn-gold justify-center" onClick={handleRestart}>
                <RotateCcw size={16} aria-hidden="true" />
                Try Again with New Questions
              </button>
              <button
                className="btn-outline justify-center"
                onClick={() => {
                  const text = `I scored ${finalScore}/${questions.length} on the VoteX Election Quiz! ${getScoreLabel().label} 🗳️ Test your election knowledge at VoteX!`;
                  if (navigator.share) {
                    navigator.share({ title: 'VoteX Quiz Result', text });
                  } else {
                    navigator.clipboard.writeText(text);
                    alert('Result copied to clipboard!');
                  }
                }}
                aria-label="Share your quiz result"
              >
                <Share2 size={16} aria-hidden="true" />
                Share My Result
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
