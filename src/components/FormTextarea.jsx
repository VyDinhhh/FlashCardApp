export default function FormTextarea({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-500">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-2xl border border-blue-100 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-pink-200 focus:ring-4 focus:ring-pink-100"
      />
    </label>
  );
}