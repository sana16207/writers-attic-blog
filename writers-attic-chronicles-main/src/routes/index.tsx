import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { StoryCard } from "@/components/StoryCard";
import { Loader } from "@/components/Loader";
import { api, type Story } from "@/lib/api";
import { SAMPLE_STORIES } from "@/lib/sample-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Writers Attic — The Feed" },
      { name: "description", content: "Stories, essays, and quiet thoughts from the writers of the Attic." },
    ],
  }),
  component: FeedPage,
});

function FeedPage() {
  const [stories, setStories] = useState<Story[] | null>(null);

  useEffect(() => {
    let live = true;
    api.get<Story[]>("/stories")
      .then((r) => { if (live) setStories(Array.isArray(r.data) ? r.data : SAMPLE_STORIES); })
      .catch(() => { if (live) setStories(SAMPLE_STORIES); });
    return () => { live = false; };
  }, []);

  return (
    <PageShell>
      <section className="relative border-b border-border/50">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center animate-ink">
          <p className="font-type text-[11px] uppercase tracking-[0.45em] text-coffee/60">Vol. I · MCMV · Est. by readers, for readers</p>
          <div className="chapter-rule my-6 mx-auto max-w-xs">
            <span className="ornament text-base">❦</span>
          </div>
          <h1 className="font-display text-5xl leading-[1.02] text-coffee md:text-7xl">
            A quiet place <span className="italic text-gold-deep">to write</span>,<br />
            and to be read slowly.
          </h1>
          <p className="mx-auto mt-7 max-w-xl font-body text-lg leading-[1.85] text-ink/80 italic">
            Writers Attic is a digital journal of the unhurried kind — for essays scribbled at midnight, stories worth keeping, and coffee that's gone cold.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href="#feed" className="ink-stamp hover:ink-stamp-hover">Read the feed</a>
            <a href="/signup" className="rounded-sm border border-coffee/40 bg-card/70 px-7 py-3.5 font-type text-[11px] uppercase tracking-[0.3em] text-coffee transition-colors hover:bg-paper/60 hover:text-gold-deep">
              Begin writing
            </a>
          </div>
        </div>
      </section>

      <section id="feed" className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-10 text-center">
          <p className="font-type text-[11px] uppercase tracking-[0.4em] text-coffee/60">Chapter One</p>
          <h2 className="mt-2 font-display text-4xl text-coffee">Latest Dispatches</h2>
          <div className="chapter-rule mt-5 mx-auto max-w-md">
            <span className="ornament text-base">❦ ✦ ❦</span>
          </div>
        </div>

        {stories === null && <Loader />}
        {stories && (
          <div className="space-y-8">
            {stories.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
          </div>
        )}
      </section>
    </PageShell>
  );
}
