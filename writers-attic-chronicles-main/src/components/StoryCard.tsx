import { Link } from "@tanstack/react-router";
import { Heart, Bookmark } from "lucide-react";
import type { Story } from "@/lib/api";
import { useState } from "react";

function authorName(s: Story) {
  if (s.authorName) return s.authorName;
  if (typeof s.author === "string") return s.author;
  return s.author?.name ?? "Anonymous";
}

function preview(s: string, n = 180) {
  const t = s.replace(/<[^>]+>/g, "").trim();
  return t.length > n ? t.slice(0, n) + "…" : t;
}

function timeAgo(d?: string) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

export function StoryCard({ story, index = 0 }: { story: Story; index?: number }) {
  const [liked, setLiked] = useState(!!story.liked);
  const [bookmarked, setBookmarked] = useState(!!story.bookmarked);
  const [likes, setLikes] = useState(story.likes ?? 0);

  return (
    <article
      className="manuscript warm-glow animate-fade-up p-8 md:p-11"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="relative">
        <div className="flex items-center gap-3 font-type text-[10px] uppercase tracking-[0.32em] text-coffee/60">
          <span>№ {String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-coffee/30" />
          <span>{authorName(story)}</span>
          <span className="h-px w-6 bg-coffee/30" />
          <span>{timeAgo(story.createdAt)}</span>
        </div>
        <Link to="/story/$id" params={{ id: String(story.id) }} className="mt-4 block">
          <h2 className="font-display text-[2.1rem] md:text-[2.6rem] leading-[1.05] text-coffee transition-colors hover:text-gold-deep">
            {story.title}
          </h2>
        </Link>
        <div className="chapter-rule mt-5">
          <span className="ornament text-xs">❦</span>
        </div>
        <p className="mt-5 font-body text-[17px] leading-[1.85] text-ink/85">
          {preview(story.content)}
        </p>
        <div className="mt-7 flex items-center justify-between border-t border-coffee/15 pt-5">
          <Link
            to="/story/$id"
            params={{ id: String(story.id) }}
            className="font-type text-[11px] uppercase tracking-[0.3em] text-gold-deep hover:text-coffee"
          >
            Continue reading →
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.preventDefault(); setLiked(!liked); setLikes(likes + (liked ? -1 : 1)); }}
              className="flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-coffee/70 transition-colors hover:bg-paper/40 hover:text-gold-deep"
              aria-label="Like"
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-gold text-gold-deep" : ""}`} />
              <span className="font-type text-[11px]">{likes}</span>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setBookmarked(!bookmarked); }}
              className="rounded-sm p-2 text-coffee/70 transition-colors hover:bg-paper/40 hover:text-gold-deep"
              aria-label="Bookmark"
            >
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-gold text-gold-deep" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
