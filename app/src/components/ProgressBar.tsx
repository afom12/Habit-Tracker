type Props = {
  value: number // 0..1
}

export default function ProgressBar({ value }: Props) {
  const pct = Math.max(0, Math.min(1, value)) * 100
  return (
    <div className="hidden h-2 w-24 items-center rounded-full bg-zinc-200 dark:bg-zinc-800 sm:flex">
      <div
        className="h-full rounded-full bg-emerald-500 transition-[width]"
        style={{ width: `${pct}%` }}
        aria-label={`Progress ${Math.round(pct)}%`}
      />
    </div>
  )
}


