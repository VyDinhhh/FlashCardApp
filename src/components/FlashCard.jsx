import { useState } from "react";
import { Edit3, RotateCcw, Trash2 } from "lucide-react";
import InfoBlock from "./InfoBlock";

export default function FlashCard({ card, onEdit, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  const categoryColor =
    card.category === "vocabulary"
      ? "bg-pink-100 text-pink-600"
      : "bg-blue-100 text-blue-600";

  return (
    <article className="group rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-xl shadow-blue-100/50 backdrop-blur-md transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-100/80">
      <button onClick={() => setFlipped(!flipped)} className="w-full text-left">
        {!flipped ? (
          <div className="flex min-h-56 flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-white to-blue-50/70 p-4">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-black capitalize ${categoryColor}`}
              >
                {card.category}
              </span>

              {card.wordType && (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 shadow-sm">
                  {card.wordType}
                </span>
              )}
            </div>

            <div className="py-6">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-pink-300">
                Term
              </p>

              <h2 className="mt-2 text-3xl font-black capitalize tracking-tight text-slate-800">
                {card.term}
              </h2>

              {card.category === "vocabulary" && card.vietnameseMeaning && (
                <p className="mt-3 inline-flex rounded-2xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-500">
                  {card.vietnameseMeaning}
                </p>
              )}
            </div>

            <p className="rounded-2xl bg-pink-50 px-4 py-3 text-center text-sm font-bold text-pink-500">
              Tap to reveal answer
            </p>
          </div>
        ) : (
          <div className="min-h-56 space-y-3 rounded-[1.5rem] bg-gradient-to-br from-pink-50/90 to-blue-50/90 p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-400">
                  Answer
                </p>

                <h2 className="mt-1 text-2xl font-black capitalize text-slate-800">
                  {card.term}
                </h2>
              </div>

              <RotateCcw className="h-5 w-5 text-pink-300" />
            </div>

            <InfoBlock label="Meaning" value={card.meaning} />

            {card.category === "vocabulary" && (
              <InfoBlock
                label="Vietnamese Meaning"
                value={card.vietnameseMeaning}
              />
            )}

            {card.synonyms?.length > 0 && (
              <InfoBlock label="Synonyms" value={card.synonyms.join(", ")} />
            )}

            <InfoBlock label="Example" value={card.example} />
            <InfoBlock label="My Note" value={card.note} />
          </div>
        )}
      </button>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-2 text-xs font-black text-slate-500 shadow-sm transition hover:bg-pink-50 hover:text-pink-500 active:scale-95"
        >
          <Edit3 className="h-3.5 w-3.5" />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-2 text-xs font-black text-red-400 shadow-sm transition hover:bg-red-100 hover:text-red-500 active:scale-95"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </article>
  );
}