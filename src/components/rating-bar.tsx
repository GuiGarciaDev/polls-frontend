interface RatingBarProps {
  title: string
  percentage: number
  selected: boolean
}

export default function RatingBar({
  title,
  percentage,
  selected,
}: RatingBarProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="w-full h-auto white rounded">
          <div
            className={`h-auto rounded ${
              selected ? "bg-primary" : "bg-secondary"
            }`}
            style={{ width: `${percentage}%` }}
          >
            <span
              className={`ml-4  ${
                selected ? "text-[#F9FAFB]" : "text-card-foreground"
              }`}
            >
              {title}
            </span>
          </div>
        </div>
        <span className="text-sm font-medium">
          {`${percentage.toFixed(2)}%`}
        </span>
      </div>
    </div>
  )
}
