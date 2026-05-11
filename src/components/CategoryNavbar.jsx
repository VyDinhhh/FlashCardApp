import { BookOpen, Layers } from "lucide-react";

export default function CategoryNavbar({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "vocabulary",
      label: "Vocabulary",
      icon: BookOpen,
    },
    {
      id: "glossary",
      label: "Glossary",
      icon: Layers,
    },
  ];

  return (
    <nav className="grid grid-cols-2 gap-2 rounded-[1.6rem] bg-blue-50/80 p-1.5 shadow-inner">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 rounded-[1.25rem] px-3 py-3 text-sm font-extrabold transition-all active:scale-95 ${
              isActive
                ? "bg-gradient-to-r from-pink-200 to-blue-200 text-slate-800 shadow-md shadow-pink-100"
                : "text-slate-400 hover:bg-white/60"
            }`}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}