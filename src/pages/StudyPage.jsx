import { ArrowLeft, RefreshCw, Sparkles } from "lucide-react";
import FlashCard from "../components/FlashCard";

export default function StudyPage({
  studyCards,
  onBack,
  onShuffle,
  onEdit,
  onDelete,
}) {
  return (
    <div className="min-h-screen text-slate-800">
      <main className="mx-auto max-w-4xl px-4 pb-28 pt-5 sm:px-6">
        <section className="rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-xl shadow-pink-100/60 backdrop-blur-md sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 text-sm font-black text-slate-600 shadow-sm transition hover:bg-blue-50 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <button
              onClick={onShuffle}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-300 to-blue-300 px-4 py-3 text-sm font-black text-white shadow-lg shadow-pink-200/70 transition active:scale-95"
            >
              <RefreshCw className="h-4 w-4" />
              Shuffle
            </button>
          </div>

          <div className="mt-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-pink-200 to-blue-200 shadow-lg shadow-pink-100">
              <Sparkles className="h-7 w-7 text-white" />
            </div>

            <p className="text-xs font-black uppercase tracking-[0.25em] text-pink-400">
              Study Mode
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-800">
              Learn 5 Random Cards
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
              Tap each card to reveal the answer. Use Shuffle to get another
              random set.
            </p>
          </div>
        </section>

        {studyCards.length > 0 ? (
          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            {studyCards.map((card) => (
              <FlashCard
                key={card.id}
                card={card}
                onEdit={() => onEdit(card)}
                onDelete={() => onDelete(card.id)}
              />
            ))}
          </section>
        ) : (
          <section className="mt-10 rounded-[2rem] border border-white/80 bg-white/70 p-8 text-center shadow-xl shadow-blue-100/50 backdrop-blur-md">
            <h2 className="text-xl font-black text-slate-800">
              No cards available
            </h2>

            <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-6 text-slate-500">
              Add some vocabulary or glossary cards first, then come back to
              Study Mode.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}