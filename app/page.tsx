import { getCards, getCategories } from "./actions";
import Flashcard from "./components/Flashcard";
import UpdateModal from "./components/UpdateModal";

export default async function Home() {
  const cards = await getCards();
  const categories = await getCategories();

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-5">
        <h2 className="font-medium text-2xl mb-6">Flashcards</h2>

        {!cards?.length && (
          <div className="rounded-2xl border border-border bg-muted/30 text-muted-foreground p-8 text-center">
            No cards yet.
          </div>
        )}

        {!!cards?.length && (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <li key={c.id}>
                <div className="flex items-center justify-between mb-2">
                  <UpdateModal
                    id={c.id}
                    currentQuestion={c.question}
                    currentAnswer={c.answer}
                    currentCategory={c.category?.name}
                    categories={categories}
                  />
                  {/* <button
                    onClick={handleDelete}
                    className="text-sx red-400 bg-white px-3 py-1 text-xs font-medium text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button> */}
                </div>

                <Flashcard
                  question={c.question}
                  answer={c.answer}
                  category={c.category?.name}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
