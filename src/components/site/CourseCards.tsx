import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, Star, User } from "lucide-react";
import type { CourseBranch, CourseCategory, CourseProgram } from "@/data/courses";
import type { PublicCourse } from "@/lib/course-catalog";

function imgSrc(image: CourseCategory["image"] | string | undefined) {
  if (!image) return "";
  return typeof image === "string" ? image : image.src;
}

const ORDER_LABELS = [
  "الكورس الأول",
  "الكورس الثاني",
  "الكورس الثالث",
  "الكورس الرابع",
  "الكورس الخامس",
  "الكورس السادس",
];

export function courseOrderLabel(index: number) {
  return ORDER_LABELS[index] ?? `الكورس ${index + 1}`;
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

type CourseCardContent = {
  title: string;
  badge?: string;
  format?: string;
  trainer?: string;
  duration?: string;
  modules: string[];
  image?: string;
};

function CourseProgramLayout({
  course,
  orderLabel,
  image,
  onRegister,
}: {
  course: CourseCardContent;
  orderLabel: string;
  image: string;
  onRegister?: () => void;
}) {
  const modules = course.modules ?? [];
  return (
    <article className="card-fx reveal overflow-hidden rounded-3xl border border-forest/10 bg-card shadow-soft">
      <div className="grid md:grid-cols-[280px_1fr]">
        <div className="relative min-h-52 md:min-h-full">
          <img
            src={image}
            alt={course.title}
            loading="lazy"
            width={560}
            height={720}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest shadow-sm md:hidden">
            {orderLabel}
          </span>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-secondary px-3 py-1 text-primary">{orderLabel}</span>
            {course.badge ? (
              <span className="rounded-full bg-gold/20 px-3 py-1 text-gold-dark">{course.badge}</span>
            ) : null}
            <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              {course.format || "تدريب معتمد + حقل"}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold leading-relaxed text-forest">{course.title}</h3>

          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <User className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <dt className="text-muted-foreground">اسم المدرب / الاستشاري</dt>
                <dd className="font-semibold text-forest">{course.trainer || "يُعلن لاحقًا"}</dd>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <dt className="text-muted-foreground">عدد الساعات المعتمدة</dt>
                <dd className="font-semibold text-forest">{course.duration || "يُعلن لاحقًا"}</dd>
              </div>
            </div>
          </dl>

          {modules.length > 0 && (
            <>
              <h4 className="mt-6 text-sm font-bold text-primary">
                محاور الكورس الرئيسية ({modules.length} محاور):
              </h4>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                {modules.map((module, index) => (
                  <li key={`${index}-${module}`} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <strong className="font-semibold text-forest">المحور {index + 1}:</strong> {module}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <a href="#registration-form" onClick={onRegister} className="btn-gold mt-6 inline-flex">
            سجّل الآن في هذا الكورس <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProgramCard({ program }: { program: CourseProgram }) {
  return (
    <CourseProgramLayout
      course={program}
      orderLabel={program.orderLabel}
      image={imgSrc(program.image)}
    />
  );
}

export function CatalogCourseCard({
  course,
  orderLabel,
  fallbackImage,
  onRegister,
}: {
  course: PublicCourse;
  orderLabel: string;
  fallbackImage: string;
  onRegister?: () => void;
}) {
  return (
    <CourseProgramLayout
      course={{
        title: course.title,
        badge: course.badge,
        format: course.format,
        trainer: course.trainer,
        duration: course.duration,
        modules: course.modules,
        image: course.image,
      }}
      orderLabel={orderLabel}
      image={course.image || fallbackImage}
      onRegister={onRegister}
    />
  );
}
