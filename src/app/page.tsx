import CreatePollModal from "@/components/create-poll-modal"
import InputButton from "@/components/poll-url-input"
import { Spotlight } from "@/components/ui/spotlight"
import { ArrowBigRight } from "lucide-react"

export default async function Home() {
  return (
    <div className="h-screen w-full flex md:items-center md:justify-center bg-[#030712] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-32 md:left-36 md:-top-20 xl:left-96 xl:-top-20"
        fill="white"
      />
      <div className="max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            PollEase
          </h1>
          <span className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            é facilitar enquetes.
          </span>
        </div>

        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Simplificando a criação e votação de enquetes.
        </p>

        <div className="flex items-center flex-col w-full space-y-3 text-neutral-300 mt-7 p-2 xsm:space-x-10 xsm:flex-row xsm:justify-center">
          <CreatePollModal />

          <InputButton
            placeholder="Link da enquete"
            rightIcon={<ArrowBigRight />}
          />
        </div>
      </div>
    </div>
  )
}
