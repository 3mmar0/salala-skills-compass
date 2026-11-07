import { adminApi } from "@/lib/cms/client-store";

export type PublicCourse = { id:number; slug:string; title:string; summary:string; trainer:string; duration:string; badge:string; format:string; image?:string; modules:string[]; categorySlug?:string; categoryTitle?:string; specialtySlug?:string; specialtyTitle?:string };
export type PublicSpecialty = { id:number; slug:string; title:string; description:string; heroTitle:string; heroSubtitle:string; image?:string; courses:PublicCourse[] };
export type PublicCategory = { id:number; slug:string; title:string; description:string; image?:string; specialties:PublicSpecialty[] };
export async function getCatalog(){ return adminApi<{categories:PublicCategory[]}>("/courses/catalog"); }
export async function getCourse(category:string,specialty:string,course:string){ return adminApi<PublicCourse>(`/courses/${category}/${specialty}/${course}`); }
