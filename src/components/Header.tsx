import { CrossIcon } from './icons';

export default function Header() {
  return (
    <header className="z-10 flex shrink-0 items-center justify-between border-b border-slate-800/80 bg-slate-900/95 px-4 py-3.5 shadow-lg shadow-black/20 backdrop-blur">
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
          <CrossIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-base font-extrabold leading-tight text-slate-50">עזרה ראשונה AI</h1>
          <p className="text-[11px] font-medium leading-tight text-slate-400">אימון והכוונה בזמן אמת</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1.5 ring-1 ring-inset ring-red-500/40">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <span className="text-[11px] font-bold tracking-tight text-red-400">חירום זמין</span>
      </div>
    </header>
  );
}
