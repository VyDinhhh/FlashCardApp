import { Search, Plus } from "lucide-react";

export default function SearchBar({
  searchText,
  setSearchText,
  activeTab,
  onAdd,
}) {
  return (
    <section className="mt-5 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-pink-300" />

        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder={`Search ${
            activeTab === "vocabulary" ? "vocabulary" : "glossary"
          }...`}
          className="w-full rounded-[1.4rem] border border-white/80 bg-white/90 py-4 pl-12 pr-4 text-sm font-semibold text-slate-700 shadow-lg shadow-blue-100/50 outline-none transition focus:border-pink-200 focus:ring-4 focus:ring-pink-100"
        />
      </div>

      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-[1.4rem] bg-gradient-to-r from-pink-300 to-blue-300 px-5 py-4 text-sm font-black text-black shadow-lg shadow-pink-200/70 transition active:scale-95"
      >
        <Plus className="h-5 w-5" />
        Add Card
      </button>
    </section>
  );
}