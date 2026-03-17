import { FormEvent, useMemo, useState } from 'react';

type Category = 'general' | 'work' | 'relationships' | 'money' | 'health';
type Mood = 'relieved' | 'anxious' | 'hopeful' | 'guilty' | 'grateful';

type Confession = {
  id: string;
  message: string;
  category: Category;
  mood: Mood;
  createdAt: string;
};

const categories: Category[] = ['general', 'work', 'relationships', 'money', 'health'];
const moods: Mood[] = ['relieved', 'anxious', 'hopeful', 'guilty', 'grateful'];

const storageKey = 'confessions-data-v1';

function loadConfessions(): Confession[] {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Confession[];
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item) =>
      typeof item?.id === 'string' &&
      typeof item?.message === 'string' &&
      categories.includes(item?.category as Category) &&
      moods.includes(item?.mood as Mood) &&
      typeof item?.createdAt === 'string',
    );
  } catch {
    return [];
  }
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export default function App() {
  const [confessions, setConfessions] = useState<Confession[]>(() => loadConfessions());
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<Category>('general');
  const [mood, setMood] = useState<Mood>('relieved');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return confessions;

    return confessions.filter(
      (c) =>
        c.message.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.mood.toLowerCase().includes(q),
    );
  }, [confessions, query]);

  const hasDraft = message.trim().length > 0;

  const save = (next: Confession[]) => {
    setConfessions(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleaned = message.trim();
    if (cleaned.length < 8) return;

    const next: Confession = {
      id: crypto.randomUUID(),
      message: cleaned,
      category,
      mood,
      createdAt: new Date().toISOString(),
    };

    save([next, ...confessions]);
    setMessage('');
    setCategory('general');
    setMood('relieved');
  };

  const clearAll = () => {
    save([]);
  };

  return (
    <div className="container">
      <header>
        <h1>Confessions</h1>
        <p>Share what is on your mind anonymously. Your data stays on this device.</p>
      </header>

      <section className="panel">
        <h2>Write a confession</h2>
        <form onSubmit={onSubmit} className="form">
          <label>
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I need to get this off my chest..."
              rows={5}
              maxLength={400}
              required
            />
          </label>

          <div className="grid">
            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Mood
              <select value={mood} onChange={(e) => setMood(e.target.value as Mood)}>
                {moods.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="actions">
            <small>{message.trim().length}/400 characters</small>
            <button type="submit" disabled={message.trim().length < 8}>
              Post confession
            </button>
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="toolbar">
          <h2>Recent confessions ({filtered.length})</h2>
          <button type="button" className="ghost" onClick={clearAll} disabled={confessions.length === 0}>
            Clear all
          </button>
        </div>

        <label>
          Search
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by text, category, or mood"
          />
        </label>

        {filtered.length === 0 ? (
          <p className="empty">{hasDraft ? 'No matching confessions yet.' : 'No confessions posted yet.'}</p>
        ) : (
          <ul className="list">
            {filtered.map((confession) => (
              <li key={confession.id}>
                <p>{confession.message}</p>
                <div className="meta">
                  <span>{confession.category}</span>
                  <span>{confession.mood}</span>
                  <time dateTime={confession.createdAt}>{formatDate(confession.createdAt)}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
