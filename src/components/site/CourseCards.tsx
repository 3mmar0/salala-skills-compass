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
    <article className="card-fx reveal overflow-hidden rounded-[1.75rem] border border-gold/45 bg-card shadow-soft">
      <div className="relative">
        <img
          src={image}
          alt={course.title}
          loading="lazy"
          width={1200}
          height={640}
          className="h-64 w-full object-cover md:h-80"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
          {orderLabel}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {course.badge ? (
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              {course.badge}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark">
            <Star className="h-4 w-4 fill-gold text-gold" />
            {course.format || "تدريب معتمد + حقل"}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-bold leading-relaxed text-forest md:text-[1.75rem]">
          {course.title}
        </h3>

        <div className="mt-5 grid gap-4 rounded-2xl border border-gold/40 bg-[#faf6ee] p-4 sm:grid-cols-2 sm:gap-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">اسم المدرب / الاستشاري:</p>
              <p className="mt-1 font-bold text-forest">{course.trainer || "يُعلن لاحقًا"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">عدد الساعات المعتمدة:</p>
              <p className="mt-1 font-bold text-forest">{course.duration || "يُعلن لاحقًا"}</p>
            </div>
          </div>
        </div>

        {modules.length > 0 && (
          <>
            <h4 className="mt-6 text-base font-bold text-primary">
              محاور الكورس الرئيسية ({modules.length} محاور):
            </h4>
            <ul className="mt-3 space-y-3">
              {modules.map((module, index) => (
                <li key={`${index}-${module}`} className="flex items-start gap-2.5 text-sm leading-7 text-muted-foreground">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <strong className="font-semibold text-forest">المحور {index + 1}:</strong> {module}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-7 border-t border-border/80 pt-6">
          <a
            href="#registration-form"
            onClick={onRegister}
            className="btn-primary w-full justify-center rounded-full py-3.5 text-base"
          >
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
