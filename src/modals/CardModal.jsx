import { useState } from "react";
import { Save, Search, X } from "lucide-react";

import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";
import { lookupWordOnline } from "../services/dictionaryApi";

export default function CardModal({ activeTab, existingCard, onClose, onSave }) {
  const [term, setTerm] = useState(existingCard?.term || "");
  const [wordType, setWordType] = useState(existingCard?.wordType || "");
  const [meaning, setMeaning] = useState(existingCard?.meaning || "");
  const [vietnameseMeaning, setVietnameseMeaning] = useState(
    existingCard?.vietnameseMeaning || ""
  );
  const [synonyms, setSynonyms] = useState(
    existingCard?.synonyms?.join(", ") || ""
  );
  const [example, setExample] = useState(existingCard?.example || "");
  const [note, setNote] = useState(existingCard?.note || "");
  const [isLookingUp, setIsLookingUp] = useState(false);

  const category = existingCard?.category || activeTab;
  const isVocabulary = category === "vocabulary";

  async function handleLookup() {
    setIsLookingUp(true);

    const result = await lookupWordOnline(term);

    setIsLookingUp(false);

    if (!result) return;

    setWordType(result.wordType || "");
    setMeaning(result.meaning || "");
    setSynonyms(result.synonyms?.join(", ") || "");
    setExample(result.example || "");
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      term,
      category,
      wordType: isVocabulary ? wordType : "",
      meaning,
      vietnameseMeaning: isVocabulary ? vietnameseMeaning : "",
      synonyms: isVocabulary
        ? synonyms
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      example,
      note,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/30 px-3 backdrop-blur-sm sm:items-center">
      <form
        onSubmit={handleSubmit}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-white/80 bg-gradient-to-br from-white to-blue-50 p-5 shadow-2xl shadow-pink-200/60 sm:rounded-[2rem]"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-pink-400">
              {category}
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-800">
              {existingCard ? "Edit Card" : "Add New Card"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-white/90 p-3 text-slate-500 shadow-sm transition hover:text-pink-500 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <FormInput
            label="Term"
            value={term}
            onChange={setTerm}
            placeholder="Enter word or term"
          />

          {isVocabulary && (
            <button
              type="button"
              onClick={handleLookup}
              disabled={isLookingUp || !term.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-300 to-blue-300 px-4 py-3 text-sm font-black text-white shadow-lg shadow-pink-100 transition disabled:opacity-50 active:scale-95"
            >
              <Search className="h-4 w-4" />
              {isLookingUp ? "Searching..." : "Search Online Meaning"}
            </button>
          )}

          {isVocabulary && (
            <FormInput
              label="Type of Word"
              value={wordType}
              onChange={setWordType}
              placeholder="noun, verb, adjective..."
            />
          )}

          <FormTextarea
            label="Meaning"
            value={meaning}
            onChange={setMeaning}
            placeholder="English definition or explanation"
          />

          {isVocabulary && (
            <FormTextarea
              label="Vietnamese Meaning"
              value={vietnameseMeaning}
              onChange={setVietnameseMeaning}
              placeholder="Nghĩa tiếng Việt của từ này"
            />
          )}

          {isVocabulary && (
            <FormInput
              label="Synonyms"
              value={synonyms}
              onChange={setSynonyms}
              placeholder="Separate with commas"
            />
          )}

          <FormTextarea
            label="Example"
            value={example}
            onChange={setExample}
            placeholder="Example sentence"
          />

          <FormTextarea
            label="My Note"
            value={note}
            onChange={setNote}
            placeholder="Add your own note"
          />
        </div>

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-800 px-4 py-4 font-black text-white shadow-xl shadow-blue-100 transition hover:bg-slate-700 active:scale-95"
        >
          <Save className="h-5 w-5" />
          Save Card
        </button>
      </form>
    </div>
  );
}