/** The two soft colour pools behind the top of every page. */
export function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1200px] overflow-hidden">
      <div className="blob-green -left-[110px] top-[300px] size-[320px] lg:-left-[160px] lg:top-[380px] lg:size-[520px]" />
      <div className="blob-blue -right-[110px] top-[520px] size-[340px] lg:-right-[160px] lg:size-[560px]" />
    </div>
  )
}
