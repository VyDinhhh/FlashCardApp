export default function InfoBlock({ label, value }) {
  if (!value) return null;

  return (
    <div className="rounded-2xl bg-white/70 p-3 shadow-sm shadow-blue-50">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium leading-6 text-slate-700">
        {value}
      </p>
    </div>
  );
}