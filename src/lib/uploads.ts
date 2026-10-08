import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import sharp from "sharp";

/** Thumbnails live in public/uploads so they're committed to git and served straight from Vercel's CDN. */
export const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/** Largest width a thumbnail is stored at. Cards never display wider than ~800px, so this covers 2x screens. */
const MAX_WIDTH = 1600;

type Format = "png" | "jpg" | "webp" | "gif";

/** Detect the real format from the file's magic bytes (never trust the extension). SVG is rejected on purpose. */
function sniff(buf: Buffer): Format | null {
    if (buf.length < 12) return null;
    if (buf[0] === 0x89 && buf.toString("ascii", 1, 4) === "PNG") return "png";
    if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
    if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return "webp";
    if (buf.toString("ascii", 0, 3) === "GIF") return "gif";
    return null;
}

/** Shrink and convert an image to WebP. Animated GIFs are kept as they are. */
export async function compressImage(buf: Buffer): Promise<{ data: Buffer; ext: "webp" | "gif" }> {
    const format = sniff(buf);
    if (!format) throw new Error("Thumbnail must be a PNG, JPG, WEBP or GIF image.");
    if (format === "gif" && ((await sharp(buf).metadata()).pages ?? 1) > 1) return { data: buf, ext: "gif" };
    const data = await sharp(buf)
        .rotate() // respect EXIF orientation from phone photos
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toBuffer();
    return { data, ext: "webp" };
}

export async function saveImage(buf: Buffer) {
    if (buf.length > MAX_IMAGE_BYTES) throw new Error("Image is larger than 5 MB.");
    const { data, ext } = await compressImage(buf);
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const name = `${randomUUID()}.${ext}`;
    await fs.writeFile(path.join(UPLOAD_DIR, name), data);
    return name;
}

export async function deleteImage(name?: string) {
    if (!name || !isSafeName(name)) return;
    await fs.rm(path.join(UPLOAD_DIR, name), { force: true });
}

export function isSafeName(name: string) {
    return /^[a-f0-9-]{36}\.(png|jpg|webp|gif)$/.test(name);
}
