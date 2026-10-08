/**
 * Fixed, decorative page background: aurora glows, a top spotlight and a fading grid.
 * Kept static and to two layers (gradients are painted once, no blur filters or blend modes)
 * so scrolling only has to move pixels, not repaint them.
 */
export default function Background() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#06060c]">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: [
                        // Vignette so content near the edges stays readable
                        "radial-gradient(ellipse at center, transparent 40%, rgba(6,6,12,0.85) 100%)",
                        // Spotlight from the top
                        "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(167,139,250,0.16), transparent 70%)",
                        // Aurora glows
                        "radial-gradient(38rem 38rem at 10% 5%, rgba(124,58,237,0.22), transparent 70%)",
                        "radial-gradient(34rem 34rem at 92% 22%, rgba(192,38,211,0.14), transparent 70%)",
                        "radial-gradient(30rem 30rem at 48% 70%, rgba(14,165,233,0.09), transparent 70%)",
                    ].join(","),
                }}
            />
            <div className="bg-grid absolute inset-0" />
        </div>
    );
}
