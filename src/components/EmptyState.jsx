import { Plus, Sparkles } from "lucide-react";

export default function EmptyState({ activeTab, onAdd }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-white/80 bg-white/70 p-8 text-center shadow-xl shadow-blue-100/50 backdrop-blur-md">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-pink-200 to-blue-200 shadow-lg shadow-pink-100">
        <Sparkles className="h-7 w-7 text-white" />
      </div>

      <h2 className="text-xl font-black text-slate-800">No cards found</h2>

      <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-6 text-slate-500">
        Add your first{" "}
        {activeTab === "vocabulary" ? "vocabulary" : "glossary"} card and start
        studying.
      </p>

      <button
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-300 to-blue-300 px-5 py-3 text-sm font-black text-white shadow-lg shadow-pink-200/70 active:scale-95"
      >
        <Plus className="h-4 w-4" />
        Add Card
      </button>
    </section>
  );
}