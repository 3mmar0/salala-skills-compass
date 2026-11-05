import { createServerFn } from "@tanstack/react-start";
import { courseRegistrationSchema } from "@/lib/course-registration-schema";

export const submitCourseRegistration = createServerFn({ method: "POST" })
  .validator(courseRegistrationSchema)
  .handler(async ({ data }) => {
    const record = { ...data, receivedAt: new Date().toISOString() };
    const webhook = process.env.REGISTRATION_WEBHOOK_URL;

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        throw new Error(`Registration webhook failed with status ${res.status}`);
      }
      return { ok: true as const };
    }

    // Local/Node fallback — not available on Cloudflare Workers.
    try {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      const dir = path.join(process.cwd(), ".data");
      await fs.mkdir(dir, { recursive: true });
      await fs.appendFile(
        path.join(dir, "course-registrations.jsonl"),
        `${JSON.stringify(record)}\n`,
        "utf8",
      );
      return { ok: true as const };
    } catch {
      throw new Error(
        "No registration storage backend is configured (set REGISTRATION_WEBHOOK_URL or use a Node host).",
      );
    }
  });
