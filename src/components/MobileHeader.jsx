import { BookOpen, GraduationCap, Sparkles } from "lucide-react";

export default function MobileHeader({ onStudyClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-white/70 px-4 py-4 shadow-sm shadow-pink-100/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-200 to-blue-200 shadow-lg shadow-pink-200/60">
            <BookOpen className="h-6 w-6 text-slate-700" />
          </div>

          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-black tracking-tight text-slate-800">
                FlashCards
              </h1>
              <Sparkles className="h-4 w-4 text-pink-400" />
            </div>

            <p className="text-xs font-medium text-slate-500">
              Learn words beautifully
            </p>
          </div>
        </div>

        <button
          onClick={onStudyClick}
          className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-200 to-pink-200 text-slate-700 shadow-lg shadow-blue-200/60 transition hover:scale-105 active:scale-95"
          title="Study 5 random cards"
        >
          <GraduationCap className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}