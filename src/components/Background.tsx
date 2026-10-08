/** Fixed, decorative page background: aurora glows, a fading grid, a top spotlight and film grain. */
export default function Background() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#06060c]">
            {/* Aurora glows */}
            <div className="aurora-blob left-[-10%] top-[-15%] h-[38rem] w-[38rem] bg-violet-600/30" />
            <div className="aurora-blob right-[-12%] top-[5%] h-[34rem] w-[34rem] bg-fuchsia-600/20 [animation-delay:-6s]" />
            <div className="aurora-blob left-[30%] top-[45%] h-[30rem] w-[30rem] bg-sky-500/15 [animation-delay:-12s]" />

            {/* Spotlight from the top */}
            <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(167,139,250,0.18),transparent_70%)]" />

            {/* Grid, faded out towards the edges */}
            <div className="bg-grid absolute inset-0" />

            {/* Grain */}
            <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />

            {/* Vignette so content near the bottom stays readable */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,6,12,0.85)_100%)]" />
        </div>
    );
}
