'use client';
import { useEffect, useState } from 'react';

type Review = {
  author: string;
  rating: number;
  text: string;
  time: string;
  photo_url: string | null;
};

type ReviewsData = {
  place_name: string;
  rating: number;
  total_ratings: number;
  reviews: Review[];
  place_url: string;
};

const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

function Stars({ n, size = 'sm' }: { n: number; size?: 'sm' | 'lg' }) {
  const sz = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`${sz} ${i <= n ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, photo }: { name: string; photo: string | null }) {
  if (photo) {
    return <img src={photo} alt={name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />;
  }
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
      <span className="text-white font-black text-sm">{name.charAt(0).toUpperCase()}</span>
    </div>
  );
}

export default function GoogleReviews() {
  const [data, setData] = useState<ReviewsData | null>(null);

  useEffect(() => {
    fetch(`${BASE}/api/public/reviews`, { headers: { Accept: 'application/json' } })
      .then(r => r.json())
      .then(j => setData(j.data))
      .catch(() => null);
  }, []);

  if (!data || data.reviews.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/* Google G logo */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Google Reviews</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-slate-900">{data.rating.toFixed(1)}</span>
              <div>
                <Stars n={Math.round(data.rating)} size="lg" />
                {data.total_ratings > 0 && (
                  <p className="text-xs text-slate-400 mt-0.5">{data.total_ratings.toLocaleString()} reviews</p>
                )}
              </div>
            </div>
          </div>
          <a href={data.place_url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-slate-200 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors self-start sm:self-auto">
            See all reviews on Google
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
            </svg>
          </a>
        </div>

        {/* Review cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.reviews.slice(0, 6).map((r, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-5 flex flex-col gap-3 border border-slate-100">
              <div className="flex items-center gap-3">
                <Avatar name={r.author} photo={r.photo_url} />
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{r.author}</p>
                  <p className="text-xs text-slate-400">{r.time}</p>
                </div>
              </div>
              <Stars n={r.rating} />
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
