import { adminApi } from "@/lib/cms/client-store";

export type AdminCourse = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  trainer: string;
  duration: string;
  badge: string;
  format: string;
  image?: string | null;
  position: number;
  published: boolean;
  modules: string[];
};

export type AdminSpecialty = {
  id: number;
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  image?: string | null;
  position: number;
  published: boolean;
  courses: AdminCourse[];
};

export type AdminCategory = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  position: number;
  published: boolean;
  specialties: AdminSpecialty[];
};

/** URL-friendly slug that keeps Arabic letters (the server accepts any letters, digits, - and _). */
export function makeSlug(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export const coursesApi = {
  list: () => adminApi<{ categories: AdminCategory[] }>("/admin/courses"),

  createCategory: (data: { title: string; slug: string; description: string; image: string | null; published: boolean }) =>
    adminApi("/admin/course-categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id: number, data: { title: string; slug: string; description: string; image: string | null; published: boolean; position: number }) =>
    adminApi(`/admin/course-categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategory: (id: number) => adminApi(`/admin/course-categories/${id}`, { method: "DELETE" }),

  createSpecialty: (data: { categoryId: number; title: string; slug: string; description: string; heroTitle: string; heroSubtitle: string; image: string | null; published: boolean }) =>
    adminApi("/admin/course-specialties", { method: "POST", body: JSON.stringify(data) }),
  updateSpecialty: (
    id: number,
    data: { categoryId: number; title: string; slug: string; description: string; heroTitle: string; heroSubtitle: string; image: string | null; published: boolean; position: number },
  ) => adminApi(`/admin/course-specialties/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSpecialty: (id: number) => adminApi(`/admin/course-specialties/${id}`, { method: "DELETE" }),

  createCourse: (data: Omit<AdminCourse, "id" | "position"> & { specialtyId: number }) =>
    adminApi<AdminCourse>("/admin/courses", { method: "POST", body: JSON.stringify(data) }),
  updateCourse: (id: number, data: Omit<AdminCourse, "id"> & { specialtyId: number }) =>
    adminApi<AdminCourse>(`/admin/courses/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCourse: (id: number) => adminApi(`/admin/courses/${id}`, { method: "DELETE" }),
};
