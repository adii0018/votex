import { useState } from 'react';
import useSWR from 'swr';
import { fetchGlossary } from '../api';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const categoryColors = {
  'Technology': '#4F46E5',
  'Institution': '#F59E0B',
  'Documents': '#10b981',
  'Structure': '#8b5cf6',
  'Process': '#06b6d4',
  'Campaigns': '#f43f5e',
  'Results': '#22c55e',
  'Officials': '#f97316',
  'Regulations': '#ec4899',
  'Legal': '#84cc16',
  'System': '#a78bfa',
};

function GlossaryCard({ term }) {
  const [expanded, setExpanded] = useState(false);
  const color = categoryColors[term.category] || '#4F46E5';

  return (
    <article
      className="glossary-card"
      aria-label={`Glossary term: ${term.term}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-display text-lg font-bold text-white">{term.term}</h3>
            {term.category && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: `${color}20`, color }}
              >
                {term.category}
              </span>
            )}
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.6 }}>
            {term.definition}
          </p>
        </div>

        {term.example && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: 'none', cursor: 'pointer' }}
            aria-expanded={expanded}
            aria-controls={`example-${term.id}`}
            aria-label={`${expanded ? 'Hide' : 'Show'} example for ${term.term}`}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>

      {expanded && term.example && (
        <div
          id={`example-${term.id}`}
          className="mt-3 p-3 rounded-lg animate-fade-in"
          style={{ background: `${color}08`, border: `1px solid ${color}22` }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color }}>Example</p>
          <p className="text-sm" style={{ color: '#94a3b8', lineHeight: 1.6, fontStyle: 'italic' }}>
            "{term.example}"
          </p>
        </div>
      )}
    </article>
  );
}

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const { data, isLoading, error } = useSWR(
    ['glossary', search],
    () => fetchGlossary(search),
    { revalidateOnFocus: false, debounce: 300 }
  );

  const terms = data?.results || [];
  const categories = ['All', ...new Set(terms.map(t => t.category).filter(Boolean))];
  const filtered = activeCategory === 'All' ? terms : terms.filter(t => t.category === activeCategory);

  return (
    <main style={{ paddingTop: '5rem' }}>
      <div className="container-xl" style={{ padding: '3rem 1.5rem 6rem' }}>
        {/* Header */}
        <div className="mb-10">
          <div className="section-tag">Election Glossary</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Decode Election{' '}
            <span className="gradient-text">Terminology</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '520px' }}>
            From EVM to Constituency — every election term explained in plain language.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', maxWidth: '520px', marginBottom: '1.5rem' }}>
          <Search
            size={18}
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search glossary terms..."
            className="form-input"
            style={{ paddingLeft: '2.75rem' }}
            aria-label="Search election glossary"
          />
        </div>

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter by category"
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs font-semibold px-4 py-2 rounded-full transition-all"
              style={{
                background: activeCategory === cat ? '#4F46E5' : 'rgba(255,255,255,0.06)',
                color: activeCategory === cat ? 'white' : '#94a3b8',
                border: activeCategory === cat ? '1px solid #4F46E5' : '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {!isLoading && (
          <p className="text-sm mb-6" style={{ color: '#64748b' }}>
            {filtered.length} term{filtered.length !== 1 ? 's' : ''} found
            {search && ` for "${search}"`}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>
        )}

        {/* Terms Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: '120px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px' }} />
            ))}
          </div>
        ) : error ? (
          <p style={{ color: '#f43f5e' }}>Failed to load glossary. Please try again.</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl mb-3" aria-hidden="true">🔍</p>
            <p className="font-display text-xl text-white mb-2">No terms found</p>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Try a different search term or category filter.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(term => (
              <GlossaryCard key={term.id} term={term} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
