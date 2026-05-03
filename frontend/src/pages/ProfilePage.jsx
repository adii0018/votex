import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Mail, Phone, MapPin, Award, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const { t, language, changeLanguage, availableLanguages } = useLanguage();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [quizStats, setQuizStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    state: '',
    constituency: '',
    preferred_language: 'en',
    email_notifications: true
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.profile?.phone_number || '',
        state: user.profile?.state || '',
        constituency: user.profile?.constituency || '',
        preferred_language: user.profile?.preferred_language || 'en',
        email_notifications: user.profile?.email_notifications ?? true
      });
    }

    fetchQuizStats();
    fetchNotifications();
  }, [user, isAuthenticated, navigate]);

  const fetchQuizStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/quiz/history/');
      setQuizStats(response.data.statistics);
    } catch (error) {
      console.error('Failed to fetch quiz stats:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications/?unread=true');
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      setEditing(false);
      if (formData.preferred_language !== language) {
        changeLanguage(formData.preferred_language);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>{t('common.loading')}</div>;
  }

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 1.5rem', background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}>
      <div className="container-xl" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {user.first_name} {user.last_name} {!user.first_name && user.username}
              </h1>
              <p style={{ opacity: 0.9 }}>@{user.username}</p>
            </div>
            <button
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: '600' }}
            >
              <LogOut size={20} />
              {t('nav.logout')}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Profile Information */}
          <div style={{ background: '#1e293b', borderRadius: '16px', padding: '2rem', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Profile Information</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                {editing ? t('common.cancel') : t('common.edit')}
              </button>
            </div>

            {editing ? (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {t('auth.firstName')}
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {t('auth.lastName')}
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {t('auth.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Constituency
                    </label>
                    <input
                      type="text"
                      name="constituency"
                      value={formData.constituency}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Preferred Language
                    </label>
                    <select
                      name="preferred_language"
                      value={formData.preferred_language}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: 'white' }}
                    >
                      {availableLanguages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.nativeName}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      id="email_notifications"
                      name="email_notifications"
                      checked={formData.email_notifications}
                      onChange={handleChange}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <label htmlFor="email_notifications" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                      Enable email notifications
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                  {t('common.save')}
                </button>
              </form>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                <InfoItem icon={<Mail size={20} />} label="Email" value={user.email} />
                <InfoItem icon={<Phone size={20} />} label="Phone" value={user.profile?.phone_number || 'Not set'} />
                <InfoItem icon={<MapPin size={20} />} label="State" value={user.profile?.state || 'Not set'} />
                <InfoItem icon={<MapPin size={20} />} label="Constituency" value={user.profile?.constituency || 'Not set'} />
              </div>
            )}
          </div>

          {/* Quiz Statistics */}
          <div style={{ background: '#1e293b', borderRadius: '16px', padding: '2rem', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={24} color="#4F46E5" />
              Quiz Statistics
            </h2>
            {quizStats ? (
              <div style={{ display: 'grid', gap: '1rem' }}>
                <StatCard label="Total Attempts" value={quizStats.total_attempts} />
                <StatCard label="Average Score" value={`${quizStats.average_score}%`} />
                <StatCard label="Best Score" value={`${quizStats.best_score}%`} />
              </div>
            ) : (
              <p style={{ color: '#94a3b8' }}>No quiz attempts yet. Take a quiz to see your stats!</p>
            )}
          </div>

          {/* Notifications */}
          <div style={{ background: '#1e293b', borderRadius: '16px', padding: '2rem', border: '1px solid #334155' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={24} color="#4F46E5" />
              Recent Notifications
            </h2>
            {notifications.length > 0 ? (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {notifications.slice(0, 5).map(notif => (
                  <div key={notif.id} style={{ padding: '1rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
                    <h3 style={{ color: 'white', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{notif.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{notif.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#94a3b8' }}>No new notifications</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#0f172a', borderRadius: '8px' }}>
      <div style={{ color: '#4F46E5' }}>{icon}</div>
      <div>
        <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{label}</p>
        <p style={{ color: 'white', fontWeight: '600' }}>{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', textAlign: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{label}</p>
      <p style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}
