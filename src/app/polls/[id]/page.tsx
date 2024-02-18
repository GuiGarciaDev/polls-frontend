"use client"
import VoteCard from "@/components/VoteCard"
import { Poll } from "@/types/poll"
import axios from "axios"
import { useParams } from "next/navigation"
import { useQuery } from "react-query"
import { z } from "zod"

export default function Page() {
  const param = useParams()

  const getParams = z.object({
    id: z.string().uuid(),
  })

  // TODO: add websocket to realtime connection, maybe inside vote card

  const { id } = getParams.parse(param)

  const { data, isSuccess } = useQuery({
    queryKey: ["poll"],
    queryFn: (): Promise<{ poll: Poll }> => {
      return axios
        .get(`http://localhost:3333/polls/${id}`)
        .then((res) => res.data)
    },
  })

  if (isSuccess) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <VoteCard poll={data.poll} />
      </div>
    )
  }

  return (
    <div className="flex">
      <span>LOADING...</span>
    </div>
  )
}
