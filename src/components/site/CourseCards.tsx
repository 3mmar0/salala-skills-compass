import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { CourseBranch, CourseCategory, CourseProgram } from "@/data/courses";

function imgSrc(image: CourseCategory["image"]) {
  return typeof image === "string" ? image : image.src;
}

export function CategoryCard({
  category,
  featured = false,
}: {
  category: CourseCategory;
  featured?: boolean;
}) {
  return (
    <div
      className={`card-fx reveal flex flex-col items-center rounded-3xl bg-card/95 p-5 text-center shadow-soft backdrop-blur ${
        featured ? "border-2 border-gold p-7 md:p-7" : "border"
      }`}
    >
      <img
        src={imgSrc(category.image)}
        alt={category.shortTitle ?? category.title}
        loading="lazy"
        width={featured ? 144 : 96}
        height={featured ? 144 : 96}
        className={`img-ring object-cover transition duration-500 hover:scale-110 ${featured ? "h-36 w-36" : "h-24 w-24"}`}
      />
      <h3 className={`mt-4 font-bold text-primary ${featured ? "text-xl md:text-2xl" : "text-lg"}`}>
        {category.shortTitle ?? category.title}
      </h3>
      {category.description && (
        <p className={`mt-3 leading-7 text-muted-foreground ${featured ? "text-sm" : "text-xs"}`}>
          {category.description}
        </p>
      )}
      <Link
        to={category.path}
        className={
          featured
            ? "btn-primary mt-6 w-full justify-center"
            : "mt-4 flex w-full items-center justify-center gap-1 rounded-full bg-muted py-2 text-xs font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground"
        }
      >
        عرض التفاصيل <ArrowLeft className={featured ? "h-4 w-4" : "h-3 w-3"} />
      </Link>
    </div>
  );
}

const branchRoutes = {
  animal: "/courses/animal-livestock/animal",
  poultry: "/courses/animal-livestock/poultry",
  fish: "/courses/animal-livestock/fish",
} as const;

export function BranchCard({ branch }: { branch: CourseBranch; parentPath?: string }) {
  const to = branchRoutes[branch.slug as keyof typeof branchRoutes] ?? "/courses";
  return (
    <div className="card-fx reveal flex flex-col overflow-hidden rounded-3xl border bg-card shadow-soft">
      <img
        src={imgSrc(branch.image)}
        alt={branch.title}
        loading="lazy"
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-forest">{branch.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{branch.description}</p>
        <Link to={to} className="btn-primary mt-6 w-full justify-center">
          دخول قسم {branch.title} <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function ProgramCard({ program }: { program: CourseProgram }) {
  return (
    <article
      id={program.id}
      className="card-fx reveal overflow-hidden rounded-3xl border bg-card shadow-soft"
    >
      <div className="grid md:grid-cols-[280px_1fr]">
        <img
          src={imgSrc(program.image)}
          alt={program.title}
          loading="lazy"
          className="h-52 w-full object-cover md:h-full"
        />
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-secondary px-3 py-1 text-primary">
              {program.orderLabel}
            </span>
            <span className="rounded-full bg-gold/20 px-3 py-1 text-gold-dark">
              {program.badge}
            </span>
            <span className="rounded-full border px-3 py-1 text-muted-foreground">
              {program.format}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-forest">{program.title}</h3>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">اسم المدرب / الاستشاري</dt>
              <dd className="font-semibold text-forest">{program.trainer}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">عدد الساعات المعتمدة</dt>
              <dd className="font-semibold text-forest">{program.hours}</dd>
            </div>
          </dl>
          <h4 className="mt-6 text-sm font-bold text-primary">محاور الكورس الرئيسية (4 محاور):</h4>
          <ol className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {program.modules.map((m, i) => (
              <li key={m}>
                <span className="font-semibold text-forest">المحور {i + 1}:</span> {m}
              </li>
            ))}
          </ol>
          <a href="#registration-form" className="btn-gold mt-6 inline-flex">
            سجّل الآن في هذا الكورس <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
