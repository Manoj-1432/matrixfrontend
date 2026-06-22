interface Props { step: 1 | 2 | 3; }

const STEPS = [
  { n: 1, label: 'Choose Slot' },
  { n: 2, label: 'Your Details' },
  { n: 3, label: 'Confirmation' },
];

export default function BookingProgress({ step }: Props) {
  return (
    <div className="w-full max-w-sm mx-auto mb-8">
      <div className="flex items-center">
        {STEPS.map((s, i) => {
          const done    = step > s.n;
          const active  = step === s.n;
          return (
            <div key={s.n} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${done ? 'bg-green-500 text-white' : active ? 'text-white' : 'bg-slate-200 text-slate-400'}`}
                  style={active ? { background: 'linear-gradient(135deg,#2563eb,#4f46e5)' } : undefined}>
                  {done
                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    : s.n}
                </div>
                <span className={`text-[10px] font-semibold whitespace-nowrap ${active ? 'text-blue-600' : done ? 'text-green-600' : 'text-slate-400'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-colors ${step > s.n ? 'bg-green-400' : 'bg-slate-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
