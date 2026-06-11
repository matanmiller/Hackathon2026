import appIcon from '../assets/app-icon.png';

export default function Header() {
  return (
    <header className="relative z-10 flex shrink-0 items-center justify-center border-b border-slate-200 bg-gradient-to-l from-emerald-50 via-white to-sky-50 px-4 py-3.5 shadow-sm shadow-slate-200/60 backdrop-blur">
      <div className="absolute left-4 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm shadow-emerald-200/60">
        <img src={appIcon} alt="" className="h-full w-full object-cover" />
      </div>
      <h1 className="text-base font-extrabold leading-tight text-slate-900">Emergency Response</h1>
    </header>
  );
}
