// Commit portfolio changes (content/ and public/uploads/) and push them so Vercel redeploys.
// Usage: npm run publish
import { execFileSync } from "child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const paths = ["content", "public/uploads"];

const changes = git("status", "--porcelain", "--", ...paths);
if (!changes) {
    console.log("✓ Nothing new to publish. Your live site already has the latest portfolio.");
    process.exit(0);
}

// Work out which projects were added, edited or removed by comparing with the last commit.
const titles = (json) => new Map(JSON.parse(json || "[]").map((p) => [p.id, p]));
let before = new Map();
try {
    before = titles(git("show", "HEAD:content/projects.json"));
} catch {
    // File didn't exist in the last commit.
}
const { readFileSync } = await import("fs");
const after = titles(readFileSync("content/projects.json", "utf8"));

const summary = [];
for (const [id, p] of after) {
    const old = before.get(id);
    if (!old) summary.push(`Added: ${p.title}`);
    else if (JSON.stringify(old) !== JSON.stringify(p)) summary.push(`Updated: ${p.title}`);
}
for (const [id, p] of before) if (!after.has(id)) summary.push(`Removed: ${p.title}`);

const subject = summary.length === 1 ? `Portfolio: ${summary[0]}` : `Update portfolio (${summary.length || "image"} changes)`;
console.log("Publishing:\n" + (summary.map((s) => "  • " + s).join("\n") || "  • thumbnail changes"));
if (process.argv.includes("--dry-run")) {
    console.log(`\n(dry run) Would commit "${subject}" and push. Nothing was changed.`);
    process.exit(0);
}

git("add", "--", ...paths);
execFileSync("git", ["commit", "-q", "-m", subject, ...(summary.length > 1 ? ["-m", summary.join("\n")] : [])], { stdio: "inherit" });
execFileSync("git", ["push"], { stdio: "inherit" });
console.log("\n✓ Pushed to GitHub. Vercel will update your live site in about a minute.");
