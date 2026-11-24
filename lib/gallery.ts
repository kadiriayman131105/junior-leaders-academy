import { unstable_noStore as noStore } from "next/cache";
import fs from "fs";
import path from "path";
import type { SchoolPhoto } from "@/lib/photos";

const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

function altFromFile(file: string) {
  const base = file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return base || "Junior Leaders Academy";
}

/** Photos dropped in /public/gallery appear on the site, newest first. */
export function getLocalPhotos(limit = 12): SchoolPhoto[] {
  noStore();
  const dir = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE.test(file) && !file.startsWith("."))
    .map((file) => ({
      file,
      mtime: fs.statSync(path.join(dir, file)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, limit)
    .map(({ file }) => ({
      src: `/gallery/${file}`,
      alt: altFromFile(file),
      source: "gallery" as const,
    }));
}
