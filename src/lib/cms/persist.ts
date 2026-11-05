import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CMS_SEED } from "./seed";
import type { CmsStore } from "./types";

const storeSchema = z.object({
  version: z.number(),
  settings: z.record(z.any()),
  sections: z.array(z.any()),
  pages: z.array(z.any()),
}) as z.ZodType<CmsStore>;

async function readStoreFile(): Promise<CmsStore | null> {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = path.join(process.cwd(), ".data", "cms-store.json");
    const raw = await fs.readFile(file, "utf8");
    return storeSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeStoreFile(store: CmsStore) {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "cms-store.json"), JSON.stringify(store, null, 2), "utf8");
}

export const loadCmsStore = createServerFn({ method: "GET" }).handler(async () => {
  const fromDisk = await readStoreFile();
  return fromDisk ?? CMS_SEED;
});

export const saveCmsStore = createServerFn({ method: "POST" })
  .validator(storeSchema)
  .handler(async ({ data }) => {
    await writeStoreFile(data);
    return { ok: true as const };
  });

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string().min(1) }))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || "SolalaAdmin!";
    return { ok: data.password === expected };
  });
