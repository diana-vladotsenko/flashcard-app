import { getCards } from "./actions";
import Flashcard from "./components/Flashcard";

export default async function Home() {
  const cards = await getCards();

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
