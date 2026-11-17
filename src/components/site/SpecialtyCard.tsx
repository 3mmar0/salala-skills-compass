import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

type Props = {
  categorySlug: string;
  specialtySlug: string;
  title: string;
  description: string;
  image?: string;
  ctaLabel?: string;
};

export function SpecialtyCard({
  categorySlug,
  specialtySlug,
  title,
  description,
  image,
  ctaLabel = "دخول القسم",
}: Props) {
  return (
    <Link
      to="/courses/$category/$specialty"
      params={{ category: categorySlug, specialty: specialtySlug }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-forest/10 bg-card shadow-soft transition hover:-translate-y-1 hover:border-gold/50"
    >
      <span className="block h-1.5 w-full bg-gradient-to-l from-gold via-gold-light to-gold" />
      <div className="flex flex-1 flex-col p-7 pt-8 text-center">
        <div className="mx-auto grid h-28 w-28 place-items-center overflow-hidden rounded-full border-[3px] border-gold bg-muted shadow-[0_10px_28px_rgba(16,60,43,.12)]">
          {image ? (
            <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          ) : (
            <span className="text-2xl font-bold text-forest/40">{title.slice(0, 1)}</span>
          )}
        </div>
        <h3 className="mt-6 text-xl font-bold text-forest">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{description}</p>
        <span className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-forest-foreground transition group-hover:bg-primary">
          {ctaLabel.includes(title) ? ctaLabel : `${ctaLabel} ${title}`}
          <ArrowLeft className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
