"use client"
import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { pollUrl } from "@/types/zod"
import { toast } from "sonner"

interface InputButtonProps {
  placeholder: string
  rightIcon?: ReactNode
}

export default function InputButton({
  placeholder,
  rightIcon,
}: InputButtonProps) {
  const [inputUrl, setInputUrl] = useState<string>("")

  const router = useRouter()

  function validateUrl(url: string) {
    const { success } = pollUrl.safeParse(url)

    if (success) {
      router.push(url)
      return
    }

    toast("URL inválida!")
  }

  return (
    <div className="flex flex-col h-11 w-full xsm:w-fit">
      <div className="webflow-style-input w-full xsm:w-fit relative flex flex-row max-w-400 mx-auto h-full rounded-md px-3 bg-transparent">
        <input
          type="text"
          className="flex-grow text-base leading-7 bg-transparent focus:outline-none"
          placeholder={placeholder}
          onChange={(e) => {
            setInputUrl(e.target.value)
          }}
        />
        <button
          className="flex items-center text-base transition-colors duration-250 hover:text-primary mb-[3px]"
          onClick={() => {
            validateUrl(inputUrl)
          }}
        >
          {rightIcon}
        </button>
        <div className="absolute left-0 right-0 bottom-0 z-10 h-[3px] bg-primary"></div>
      </div>
    </div>
  )
}
