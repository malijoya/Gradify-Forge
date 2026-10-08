import "server-only";
import { lookup } from "dns/promises";
import net from "net";
import { MAX_IMAGE_BYTES } from "./uploads";

export type LinkPreview = {
    title?: string;
    description?: string;
    image?: string;
};

const UA = "Mozilla/5.0 (compatible; GradifyForgeBot/1.0; +link-preview)";

function isPrivateIp(ip: string) {
    if (net.isIPv6(ip)) {
        const v = ip.toLowerCase();
        if (v.startsWith("::ffff:")) return isPrivateIp(v.slice(7));
        return v === "::1" || v === "::" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80");
    }
    const [a, b] = ip.split(".").map(Number);
    return (
        a === 10 || a === 127 || a === 0 ||
        (a === 169 && b === 254) ||
        (a === 172 && b >= 16 && b <= 31) ||
        (a === 192 && b === 168) ||
        (a === 100 && b >= 64 && b <= 127)
    );
}

/** Only allow public http(s) URLs so the preview fetcher can't be pointed at internal services. */
export async function assertPublicUrl(raw: string) {
    let url: URL;
    try {
        url = new URL(raw);
    } catch {
        throw new Error("That doesn't look like a valid URL.");
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Only http(s) links are supported.");
    const addrs = await lookup(url.hostname, { all: true }).catch(() => {
        throw new Error(`Couldn't resolve ${url.hostname}.`);
    });
    if (addrs.some((a) => isPrivateIp(a.address))) throw new Error("Private / local addresses aren't allowed.");
    return url;
}

async function get(url: string, timeoutMs = 10000) {
    // Follow redirects manually so every hop is re-checked against assertPublicUrl.
    let current = url;
    for (let hop = 0; hop < 5; hop++) {
        await assertPublicUrl(current);
        const res = await fetch(current, {
            redirect: "manual",
            headers: { "user-agent": UA, accept: "text/html,image/*,*/*;q=0.8" },
            signal: AbortSignal.timeout(timeoutMs),
        });
        const location = res.headers.get("location");
        if (res.status >= 300 && res.status < 400 && location) {
            current = new URL(location, current).toString();
            continue;
        }
        return { res, finalUrl: current };
    }
    throw new Error("Too many redirects.");
}

async function readCapped(res: Response, cap: number) {
    const reader = res.body?.getReader();
    if (!reader) return Buffer.alloc(0);
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.length;
        if (total > cap) {
            await reader.cancel();
            throw new Error("Response too large.");
        }
        chunks.push(value);
    }
    return Buffer.concat(chunks);
}

const decode = (s: string) =>
    s
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#0?39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim();

function meta(html: string, keys: string[]) {
    for (const key of keys) {
        const tag = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`, "i"))?.[0];
        const content = tag?.match(/content=["']([^"']*)["']/i)?.[1];
        if (content) return decode(content);
    }
}

/** Read the page's title, description and og:image so the admin form can prefill itself. */
export async function fetchLinkPreview(rawUrl: string): Promise<LinkPreview> {
    const { res, finalUrl } = await get(rawUrl);
    if (!res.ok) throw new Error(`The site responded with ${res.status}.`);
    // Only the <head> matters; cap at 1.5 MB.
    const html = (await readCapped(res, 1.5 * 1024 * 1024).catch(() => Buffer.alloc(0))).toString("utf8");

    const image = meta(html, ["og:image", "og:image:url", "twitter:image", "twitter:image:src"]);
    return {
        title: meta(html, ["og:title", "twitter:title"]) ?? (decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "") || undefined),
        description: meta(html, ["og:description", "twitter:description", "description"]),
        image: image ? new URL(image, finalUrl).toString() : undefined,
    };
}

export async function downloadImage(url: string) {
    const { res } = await get(url, 20000);
    if (!res.ok) throw new Error(`Image download failed (${res.status}).`);
    return readCapped(res, MAX_IMAGE_BYTES);
}
