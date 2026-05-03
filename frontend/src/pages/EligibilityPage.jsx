import { useState, lazy, Suspense } from 'react';
import { checkEligibility } from '../api';
import { CheckCircle, XCircle, AlertCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReactConfetti = lazy(() => import('react-confetti'));

const initialForm = {
  age: '',
  citizenship: '',
  residency_years: '',
  state: '',
};

export default function EligibilityPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const validate = () => {
    const e = {};
    const age = parseInt(form.age);
    if (!form.age || isNaN(age) || age < 0 || age > 150) e.age = 'Please enter a valid age (0–150).';
    if (!form.citizenship) e.citizenship = 'Please select your citizenship status.';
    const res = parseFloat(form.residency_years);
    if (form.residency_years === '' || isNaN(res) || res < 0 || res > 100) e.residency_years = 'Please enter valid residency years (0–100).';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setResult(null);

    try {
      const data = await checkEligibility({
        age: parseInt(form.age),
        citizenship: form.citizenship,
        residency_years: parseFloat(form.residency_years),
        state: form.state,
      });
      setResult(data);
      if (data.eligible) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (err) {
      setResult({ error: true, message: 'Failed to check eligibility. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setErrors({});
    setShowConfetti(false);
  };

  return (
    <main style={{ paddingTop: '5rem' }}>
      {showConfetti && (
        <Suspense fallback={null}>
          <ReactConfetti
            recycle={false}
            numberOfPieces={250}
            colors={['#4F46E5', '#F59E0B', '#22c55e', '#ffffff']}
          />
        </Suspense>
      )}

      <div className="container-xl" style={{ padding: '3rem 1.5rem 6rem' }}>
        {/* Header */}
        <div className="mb-10">
          <div className="section-tag">Eligibility Checker</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Are You Eligible{' '}
            <span className="gradient-text">to Vote?</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '520px' }}>
            Answer three quick questions to find out if you meet Indian voter eligibility requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} noValidate aria-label="Voter eligibility checker">
              {/* Age */}
              <div className="form-group">
                <label className="form-label" htmlFor="age">
                  Your Current Age *
                </label>
                <input
                  id="age"
                  type="number"
                  className="form-input"
                  value={form.age}
                  onChange={handleChange('age')}
                  placeholder="e.g. 22"
                  min={0}
                  max={150}
                  aria-describedby={errors.age ? 'age-error' : undefined}
                  aria-invalid={!!errors.age}
                  required
                />
                {errors.age && (
                  <p id="age-error" className="text-sm mt-1" style={{ color: '#f43f5e' }} role="alert">
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Citizenship */}
              <div className="form-group">
                <label className="form-label" htmlFor="citizenship">
                  Citizenship Status *
                </label>
                <select
                  id="citizenship"
                  className="form-input"
                  value={form.citizenship}
                  onChange={handleChange('citizenship')}
                  aria-describedby={errors.citizenship ? 'citizenship-error' : undefined}
                  aria-invalid={!!errors.citizenship}
                  required
                >
                  <option value="">Select your citizenship</option>
                  <option value="citizen">Indian Citizen</option>
                  <option value="permanent_resident">Permanent Resident (Non-Citizen)</option>
                  <option value="other">Other / Not Sure</option>
                </select>
                {errors.citizenship && (
                  <p id="citizenship-error" className="text-sm mt-1" style={{ color: '#f43f5e' }} role="alert">
                    {errors.citizenship}
                  </p>
                )}
              </div>

              {/* Residency */}
              <div className="form-group">
                <label className="form-label" htmlFor="residency">
                  Residency in Current Constituency (years) *
                </label>
                <input
                  id="residency"
                  type="number"
                  className="form-input"
                  value={form.residency_years}
                  onChange={handleChange('residency_years')}
                  placeholder="e.g. 2.5"
                  min={0}
                  max={100}
                  step={0.1}
                  aria-describedby={errors.residency_years ? 'residency-error' : 'residency-hint'}
                  aria-invalid={!!errors.residency_years}
                  required
                />
                <p id="residency-hint" className="text-xs mt-1" style={{ color: '#64748b' }}>
                  How long have you lived at your current address? (0.5 = 6 months)
                </p>
                {errors.residency_years && (
                  <p id="residency-error" className="text-sm mt-1" style={{ color: '#f43f5e' }} role="alert">
                    {errors.residency_years}
                  </p>
                )}
              </div>

              {/* State (Optional) */}
              <div className="form-group">
                <label className="form-label" htmlFor="state">
                  State / UT <span style={{ color: '#64748b', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  id="state"
                  type="text"
                  className="form-input"
                  value={form.state}
                  onChange={handleChange('state')}
                  placeholder="e.g. Maharashtra"
                  maxLength={100}
                />
              </div>

              <button
                type="submit"
                className="btn-gold w-full justify-center text-base"
                disabled={loading}
                aria-label="Check voter eligibility"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(0,0,0,0.3)', borderTop: '2px solid #0A1628', borderRadius: '50%' }} />
                    Checking...
                  </span>
                ) : (
                  <>
                    Check My Eligibility
                    <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Panel */}
          <div>
            {result ? (
              <div
                className="card animate-fade-in"
                style={{
                  borderColor: result.error ? 'rgba(239,68,68,0.3)' : result.eligible ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)',
                  background: result.eligible
                    ? 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(10,22,40,0.6))'
                    : result.error
                    ? 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(10,22,40,0.6))'
                    : 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(10,22,40,0.6))',
                }}
                role="region"
                aria-label="Eligibility result"
                aria-live="polite"
              >
                {/* Icon */}
                <div className="flex items-center gap-3 mb-4">
                  {result.error ? (
                    <AlertCircle size={32} style={{ color: '#f43f5e' }} aria-hidden="true" />
                  ) : result.eligible ? (
                    <CheckCircle size={32} style={{ color: '#22c55e' }} aria-hidden="true" />
                  ) : (
                    <XCircle size={32} style={{ color: '#f43f5e' }} aria-hidden="true" />
                  )}
                  <h2 className="font-display text-xl font-bold text-white">
                    {result.error ? 'Error' : result.eligible ? 'You Are Eligible! 🎉' : 'Not Currently Eligible'}
                  </h2>
                </div>

                <p className="text-sm mb-5" style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                  {result.message}
                </p>

                {/* Issues */}
                {result.issues && result.issues.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-white mb-3">Issues Found:</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {result.issues.map((issue, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg"
                          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
                        >
                          <p className="text-sm font-semibold mb-1" style={{ color: '#fca5a5' }}>{issue.message}</p>
                          {issue.fix && (
                            <p className="text-xs" style={{ color: '#94a3b8' }}>💡 {issue.fix}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                {result.next_steps && (
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold text-white mb-3">Next Steps:</h3>
                    <ol style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {result.next_steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#94a3b8' }}>
                          <span
                            style={{
                              flexShrink: 0,
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: result.eligible ? 'rgba(34,197,94,0.2)' : 'rgba(79,70,229,0.2)',
                              color: result.eligible ? '#22c55e' : '#818cf8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              marginTop: '1px',
                            }}
                          >
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-4">
                  {result.eligible && (
                    <Link to="/guide" className="btn-primary justify-center">
                      Start Voting Guide
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  )}
                  <button onClick={handleReset} className="btn-outline justify-center">
                    <RotateCcw size={16} aria-hidden="true" />
                    Check Again
                  </button>
                </div>
              </div>
            ) : (
              /* Info Panel (before submit) */
              <div className="card" style={{ background: 'rgba(79,70,229,0.06)', borderColor: 'rgba(79,70,229,0.15)' }}>
                <h2 className="font-display text-lg font-bold text-white mb-4">
                  Eligibility Requirements
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { icon: '🎂', title: 'Age Requirement', desc: 'Must be at least 18 years old on the qualifying date (January 1st of the revision year).' },
                    { icon: '🇮🇳', title: 'Citizenship', desc: 'Must be an Indian citizen. NRIs are not eligible to vote unless they are residing in India.' },
                    { icon: '🏠', title: 'Residency', desc: 'Must have resided in your constituency for at least 6 months before the date of registration.' },
                    { icon: '🧠', title: 'Soundness of Mind', desc: 'Must not have been disqualified under the Representation of the People Act.' },
                  ].map(req => (
                    <div key={req.title} className="flex items-start gap-3">
                      <span style={{ fontSize: '1.25rem', flexShrink: 0 }} aria-hidden="true">{req.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-white mb-0.5">{req.title}</p>
                        <p className="text-xs" style={{ color: '#64748b', lineHeight: 1.5 }}>{req.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
