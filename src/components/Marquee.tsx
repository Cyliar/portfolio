import { content } from '../data/content'

/**
 * Bandeau de technologies qui défile en boucle. La liste est dupliquée et le
 * défilement s'arrête à -50 %, ce qui rend la reprise invisible.
 */
export default function Marquee() {
  const items = [...content.marquee, ...content.marquee]

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-line py-4"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div className="flex w-max animate-marquee gap-10">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-10 font-mono text-[13px] uppercase tracking-[0.16em] text-muted-2"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-violet/70" />
          </span>
        ))}
      </div>
    </div>
  )
}
