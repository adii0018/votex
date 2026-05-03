import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

// Dummy glossary data
const DUMMY_GLOSSARY = [
  { id: 1, term: 'EVM', definition: 'Electronic Voting Machine used for recording votes in Indian elections. It consists of a Control Unit and a Balloting Unit.', category: 'Technology', example: 'Voters press the button next to their chosen candidate on the EVM.' },
  { id: 2, term: 'VVPAT', definition: 'Voter Verified Paper Audit Trail - a device that allows voters to verify that their vote was cast correctly by printing a paper slip.', category: 'Technology', example: 'After voting, the VVPAT displays your choice for 7 seconds before storing it securely.' },
  { id: 3, term: 'Constituency', definition: 'A geographical area represented by an elected member in the legislature. India has 543 Lok Sabha constituencies.', category: 'Structure', example: 'Mumbai has 6 Lok Sabha constituencies including Mumbai North and Mumbai South.' },
  { id: 4, term: 'NOTA', definition: 'None of the Above - an option that allows voters to reject all candidates in an election.', category: 'Process', example: 'If you don\'t support any candidate, you can choose NOTA on the EVM.' },
  { id: 5, term: 'Model Code of Conduct', definition: 'Guidelines issued by the Election Commission to regulate political parties and candidates during elections.', category: 'Regulations', example: 'During MCC, the government cannot announce new schemes or make policy decisions.' },
  { id: 6, term: 'Returning Officer', definition: 'An official responsible for conducting elections in a constituency, including accepting nominations and declaring results.', category: 'Officials', example: 'The Returning Officer verifies all nomination papers submitted by candidates.' },
  { id: 7, term: 'Voter ID (EPIC)', definition: 'Electors Photo Identity Card issued by the Election Commission to all eligible voters.', category: 'Documents', example: 'Carry your Voter ID card to the polling booth on election day.' },
  { id: 8, term: 'Polling Booth', definition: 'A designated location where voters cast their votes on election day.', category: 'Structure', example: 'Your polling booth address is mentioned on your Voter ID card.' },
  { id: 9, term: 'First Past the Post', definition: 'Electoral system where the candidate with the most votes wins, regardless of whether they have a majority.', category: 'System', example: 'In FPTP, a candidate can win with 35% votes if other candidates get less.' },
  { id: 10, term: 'Affidavit', definition: 'A sworn statement filed by candidates disclosing their assets, liabilities, and criminal records.', category: 'Documents', example: 'All candidates must submit an affidavit with their nomination papers.' },
  { id: 11, term: 'Security Deposit', definition: 'Money deposited by candidates while filing nominations, forfeited if they get less than 1/6th of valid votes.', category: 'Process', example: 'Lok Sabha candidates must deposit ₹25,000 as security deposit.' },
  { id: 12, term: 'Exit Poll', definition: 'Survey conducted after voting to predict election results based on voter responses.', category: 'Campaigns', example: 'Exit polls are broadcast after the last phase of voting ends.' },
  { id: 13, term: 'Hung Assembly', definition: 'Situation where no single party or coalition has a clear majority to form government.', category: 'Results', example: 'In a hung assembly, parties negotiate to form a coalition government.' },
  { id: 14, term: 'By-Election', definition: 'Election held to fill a vacancy that arises between general elections.', category: 'Process', example: 'A by-election is conducted when an MP resigns or passes away.' },
  { id: 15, term: 'Manifesto', definition: 'A public declaration of policies and promises made by a political party before elections.', category: 'Campaigns', example: 'Parties release their manifestos outlining their vision and promises.' },
  { id: 16, term: 'Booth Capturing', definition: 'Illegal practice of taking control of a polling booth to cast fraudulent votes.', category: 'Legal', example: 'Booth capturing is a serious electoral offense punishable by law.' },
  { id: 17, term: 'Postal Ballot', definition: 'Voting method for those unable to vote in person, such as armed forces personnel and senior citizens.', category: 'Process', example: 'Senior citizens above 85 can apply for postal ballot facility.' },
  { id: 18, term: 'Delimitation', definition: 'Process of redrawing constituency boundaries based on population changes.', category: 'Structure', example: 'Delimitation ensures equal representation based on population distribution.' },
  { id: 19, term: 'Chief Election Commissioner', definition: 'Constitutional head of the Election Commission of India responsible for conducting free and fair elections.', category: 'Officials', example: 'The CEC announces election schedules and enforces the Model Code of Conduct.' },
  { id: 20, term: 'Voter Turnout', definition: 'Percentage of eligible voters who actually cast their votes in an election.', category: 'Results', example: 'India achieved a 67% voter turnout in the 2019 Lok Sabha elections.' }
];

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

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    let result = DUMMY_GLOSSARY;
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(term => 
        term.term.toLowerCase().includes(searchLower) || 
        term.definition.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(term => term.category === activeCategory);
    }
    
    return result;
  }, [search, activeCategory]);

  const categories = ['All', ...new Set(DUMMY_GLOSSARY.map(t => t.category).filter(Boolean))];
  const filtered = filteredTerms;

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
        <p className="text-sm mb-6" style={{ color: '#64748b' }}>
          {filtered.length} term{filtered.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
        </p>

        {/* Terms Grid */}
        {filtered.length === 0 ? (
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
