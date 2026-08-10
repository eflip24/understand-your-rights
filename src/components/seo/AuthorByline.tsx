import { UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { getEditorialRole, getDefaultAuthor } from "@/data/editorialTeam";
import { useLocalizedPath } from "@/i18n/paths";

interface AuthorBylineProps {
  /** Editorial role id from editorialTeam.ts. Falls back to the default team byline. */
  authorId?: string;
  /** ISO date string of the last review/update. */
  reviewedAt?: string;
  className?: string;
  /** Compact inline byline vs. boxed author card. */
  compact?: boolean;
}

export default function AuthorByline({
  authorId,
  reviewedAt,
  className = "",
  compact = false,
}: AuthorBylineProps) {
  const lp = useLocalizedPath();
  const author = getEditorialRole(authorId) || getDefaultAuthor();
  const dateText = reviewedAt
    ? new Date(reviewedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  if (compact) {
    return (
      <p className={`text-xs text-muted-foreground ${className}`}>
        Reviewed by{" "}
        <Link to={lp("/about")} className="font-medium text-foreground hover:underline">
          {author.name}
        </Link>
        {dateText ? ` · Last updated ${dateText}` : null} ·{" "}
        <Link to={lp("/editorial-standards")} className="hover:underline">
          Editorial standards
        </Link>
      </p>
    );
  }

  return (
    <aside
      className={`flex items-start gap-3 rounded-lg border bg-muted/30 p-3 ${className}`}
      aria-label="Author information"
    >
      <UserCircle className="h-10 w-10 text-accent shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          <Link to={lp("/about")} className="hover:underline">
            {author.name}
          </Link>
          <span className="text-xs font-normal text-muted-foreground ml-2">
            {author.role}
          </span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">{author.bio}</p>
        {dateText && (
          <p className="text-xs text-muted-foreground mt-1">
            Last reviewed {dateText}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          <Link to={lp("/editorial-standards")} className="text-accent hover:underline">
            How we review content
          </Link>
          {" · "}
          <Link to={lp("/about")} className="text-accent hover:underline">
            About LegallySpoken
          </Link>
        </p>
      </div>
    </aside>
  );
}
