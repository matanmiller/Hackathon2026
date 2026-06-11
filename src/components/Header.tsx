import { CrossIcon } from './icons';

export default function Header() {
  return (
    <header className="relative z-10 flex shrink-0 items-center justify-center border-b border-slate-200 bg-gradient-to-l from-emerald-50 via-white to-sky-50 px-4 py-3.5 shadow-sm shadow-slate-200/60 backdrop-blur">
      <div className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-sm shadow-emerald-200">
        <CrossIcon className="h-5 w-5" />
      </div>
      <h1 className="text-base font-extrabold leading-tight text-slate-900">Emergency Response</h1>
    </header>
  );
}
