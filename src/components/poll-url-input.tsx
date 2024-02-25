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
    <div className="flex flex-col h-11">
      {/* <style>
        @keyframes gradient { 
            0%{background-position:0 0}
            100%{background-position:100% 0}
        }
    </style> */}
      <div className="webflow-style-input relative flex flex-row max-w-400 mx-auto h-full rounded-md px-3 bg-transparent">
        <input
          type="text"
          className="flex-grow text-[#BFD2FF] text-base leading-7 placeholder-[#7881A1] placeholder-opacity-100 bg-transparent focus:outline-none"
          placeholder={placeholder}
          onChange={(e) => {
            setInputUrl(e.target.value)
          }}
        />
        <button
          className="flex items-center text-[#7881A1] text-base transition-colors duration-250 hover:text-[#BFD2FF] mb-[3px]"
          onClick={() => {
            validateUrl(inputUrl)
          }}
        >
          {rightIcon}
        </button>
        <div className="absolute left-0 right-0 bottom-0 z-10 h-[3px] bg-gradient-to-r from-purple-400 via-teal-400 to-yellow-200 bg-cover animate-gradient"></div>
      </div>
    </div>
  )
}
