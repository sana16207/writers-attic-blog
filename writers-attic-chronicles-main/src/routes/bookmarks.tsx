import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { StoryCard } from "@/components/StoryCard";
import { SAMPLE_STORIES } from "@/lib/sample-data";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({ meta: [{ title: "Bookmarks — Writers Attic" }] }),
  component: () => <ProtectedRoute><Bookmarks /></ProtectedRoute>,
});

function Bookmarks() {
  const saved = SAMPLE_STORIES.slice(0, 2);
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="font-type text-xs uppercase tracking-[0.3em] text-coffee/60">Kept for later</p>
        <h1 className="mt-2 font-serif text-4xl text-coffee">Bookmarks</h1>
        <p className="mt-3 font-body text-[16px] text-ink/75">Stories you've tucked between the pages.</p>

        <div className="mt-10 space-y-8">
          {saved.map((s, i) => <StoryCard key={s.id} story={{ ...s, bookmarked: true }} index={i} />)}
        </div>
      </div>
    </PageShell>
  );
}
