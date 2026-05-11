import { useMemo, useState } from "react";

import MobileHeader from "./components/MobileHeader";
import CategoryNavbar from "./components/CategoryNavbar";
import SearchBar from "./components/SearchBar";
import FlashCard from "./components/FlashCard";
import EmptyState from "./components/EmptyState";
import CardModal from "./modals/CardModal";
import StudyPage from "./pages/StudyPage";

import { initialCards } from "./data/initialCards";

function getRandomCards(cards, count = 5) {
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
  return shuffledCards.slice(0, count);
}

export default function App() {
  const [activeTab, setActiveTab] = useState("vocabulary");
  const [activePage, setActivePage] = useState("home");
  const [cards, setCards] = useState(initialCards);
  const [studyCards, setStudyCards] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesTab = card.category === activeTab;

      const searchableText = `
        ${card.term}
        ${card.meaning}
        ${card.vietnameseMeaning}
        ${card.example}
        ${card.note}
      `.toLowerCase();

      const matchesSearch = searchableText.includes(searchText.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [cards, activeTab, searchText]);

  const currentCount = cards.filter(
    (card) => card.category === activeTab
  ).length;

  function handleSave(cardData) {
    if (editingCard) {
      setCards((previousCards) =>
        previousCards.map((card) =>
          card.id === editingCard.id ? { ...card, ...cardData } : card
        )
      );

      setStudyCards((previousStudyCards) =>
        previousStudyCards.map((card) =>
          card.id === editingCard.id ? { ...card, ...cardData } : card
        )
      );
    } else {
      setCards((previousCards) => [
        {
          id: crypto.randomUUID(),
          ...cardData,
        },
        ...previousCards,
      ]);
    }

    setEditingCard(null);
    setIsModalOpen(false);
  }

  function handleDelete(cardId) {
    const shouldDelete = window.confirm("Delete this card?");

    if (!shouldDelete) return;

    setCards((previousCards) =>
      previousCards.filter((card) => card.id !== cardId)
    );

    setStudyCards((previousStudyCards) =>
      previousStudyCards.filter((card) => card.id !== cardId)
    );
  }

  function openAddModal() {
    setEditingCard(null);
    setIsModalOpen(true);
  }

  function openEditModal(card) {
    setEditingCard(card);
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditingCard(null);
    setIsModalOpen(false);
  }

  function openStudyPage() {
    setStudyCards(getRandomCards(cards, 5));
    setActivePage("study");
  }

  function shuffleStudyCards() {
    setStudyCards(getRandomCards(cards, 5));
  }

  function backToHome() {
    setActivePage("home");
  }

  return (
    <div className="min-h-screen text-slate-800">
      <MobileHeader onStudyClick={openStudyPage} />

      {activePage === "study" ? (
        <StudyPage
          studyCards={studyCards}
          onBack={backToHome}
          onShuffle={shuffleStudyCards}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      ) : (
        <main className="mx-auto max-w-4xl px-4 pb-28 pt-5 sm:px-6">
          <section className="rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-xl shadow-pink-100/60 backdrop-blur-md sm:p-6">
            <CategoryNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-400">
                  {activeTab === "vocabulary"
                    ? "Vocabulary Bank"
                    : "Personal Glossary"}
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">
                  {activeTab === "vocabulary"
                    ? "Study your words"
                    : "Review your terms"}
                </h2>
              </div>

              <div className="rounded-2xl bg-blue-100/80 px-4 py-3 text-center shadow-sm">
                <p className="text-xl font-black text-blue-600">
                  {currentCount}
                </p>

                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                  Cards
                </p>
              </div>
            </div>

            <SearchBar
              searchText={searchText}
              setSearchText={setSearchText}
              activeTab={activeTab}
              onAdd={openAddModal}
            />
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2">
            {filteredCards.map((card) => (
              <FlashCard
                key={card.id}
                card={card}
                onEdit={() => openEditModal(card)}
                onDelete={() => handleDelete(card.id)}
              />
            ))}
          </section>

          {filteredCards.length === 0 && (
            <EmptyState activeTab={activeTab} onAdd={openAddModal} />
          )}
        </main>
      )}

      {isModalOpen && (
        <CardModal
          activeTab={activeTab}
          existingCard={editingCard}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}