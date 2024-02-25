interface RatingBarProps {
  title: string
  percentage: number
  selected: boolean
}

const colorPallete = {
  one: "#F7F7F7",
  two: "#43D8C9",
  three: "#95389E",
  four: "#100303",
}

export default function RatingBar({
  title,
  percentage,
  selected,
}: RatingBarProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="w-full h-auto white rounde">
          <div
            className={`h-auto px-4 rounded ${
              selected
                ? "bg-[#43D8C9] text-[#100303]"
                : "bg-secondary text-[#100303]"
            }`}
            style={{ width: `${percentage}%` }}
          >
            {title}
          </div>
        </div>
        <span className="text-sm font-medium text-[#100303]">
          {`${percentage.toFixed(2)}%`}
        </span>
      </div>
    </div>
  )
}
