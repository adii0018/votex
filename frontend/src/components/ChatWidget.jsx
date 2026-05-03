import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { fetchFAQ } from '../api';

const GREETING = {
  id: 'greeting',
  type: 'bot',
  text: "Hello! I'm VoteX Assistant 🗳️ Ask me anything about Indian elections — voter registration, EVMs, polling booths, eligibility, and more!",
};

const SUGGESTIONS = [
  'How do I register to vote?',
  'What is EVM?',
  'What is VVPAT?',
  'When can I vote?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async (text) => {
    const query = (text || input).trim();
    if (!query) return;

    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: query }]);
    setTyping(true);

    try {
      await new Promise(r => setTimeout(r, 600));
      const data = await fetchFAQ(query);
      const results = data.results;

      let reply;
      if (results && results.length > 0) {
        const best = results[0];
        reply = best.answer;
      } else {
        reply = `I don't have a specific answer for "${query}" in my knowledge base. For official election information, please visit voters.eci.gov.in or call the Voter Helpline at 1950.`;
      }

      setTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: reply,
      }]);
    } catch {
      setTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Sorry, I\'m having trouble connecting. Please try again in a moment.',
      }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        className="chat-widget-fab"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat assistant' : 'Open election assistant chat'}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {open ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="VoteX Election Assistant"
          aria-modal="true"
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '2rem',
            width: '360px',
            maxHeight: '520px',
            background: 'rgba(10, 22, 40, 0.97)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
            zIndex: 999,
            animation: 'fadeInUp 0.25s ease',
          }}
        >
          {/* Header */}
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(135deg, rgba(79,70,229,0.2), rgba(245,158,11,0.1))' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #F59E0B)' }}>
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-white">VoteX Assistant</h3>
                <p className="text-xs" style={{ color: '#22c55e' }}>● Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 items-start ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'bot' && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(79,70,229,0.3)' }}>
                    <Bot size={14} style={{ color: '#818cf8' }} />
                  </div>
                )}
                <div className={`chat-message ${msg.type}`}>
                  {msg.text}
                </div>
                {msg.type === 'user' && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(245,158,11,0.3)' }}>
                    <User size={14} style={{ color: '#fbbf24' }} />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 items-start">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(79,70,229,0.3)' }}>
                  <Bot size={14} style={{ color: '#818cf8' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', borderBottomLeftRadius: '4px', padding: '0.75rem 1rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs rounded-full px-3 py-1 transition-all hover:bg-indigo-600"
                  style={{ background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', color: '#a5b4fc', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '0.5rem' }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about elections..."
              aria-label="Chat message input"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '0.6rem 0.875rem',
                color: 'white',
                fontSize: '0.875rem',
                fontFamily: "'DM Sans', sans-serif",
                outline: 'none',
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              aria-label="Send message"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: input.trim() ? '#4F46E5' : 'rgba(79,70,229,0.3)',
                border: 'none',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
