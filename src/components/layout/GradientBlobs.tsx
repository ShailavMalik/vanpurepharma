/** Fixed ambient background: three drifting aurora blobs and a faint grid. Rendered once in Layout. */
export function GradientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -left-[10vw] -top-[10vh] size-[60vw] max-w-[900px] rounded-full bg-violet/30 blur-[40px] will-change-transform motion-safe:animate-blob-a md:blur-[90px]" />
      <div className="absolute -right-[15vw] top-[20vh] size-[55vw] max-w-[820px] rounded-full bg-emerald/25 blur-[40px] will-change-transform motion-safe:animate-blob-b md:blur-[90px]" />
      <div className="absolute bottom-[-20vh] left-[25vw] size-[45vw] max-w-[700px] rounded-full bg-gold/15 blur-[40px] will-change-transform motion-safe:animate-blob-c md:blur-[90px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--color-bg)_75%)] opacity-70" />
    </div>
  )
}
