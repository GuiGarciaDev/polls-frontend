"use client"
import VoteCard from "@/components/VoteCard"
import { queryClient } from "@/context/queryClientProvider"
import { Poll } from "@/types/poll"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { z } from "zod"

export default function Page() {
  const param = useParams()

  const getParams = z.object({
    id: z.string().uuid(),
  })

  const { id } = getParams.parse(param)

  const { data, isSuccess } = useQuery({
    queryKey: ["poll"],
    queryFn: (): Promise<{ poll: Poll }> => {
      return axios
        .get(`http://localhost:3333/polls/${id}`)
        .then((res) => res.data)
    },
  })

  // TODO: add websocket to realtime connection, maybe inside vote card

  useEffect(() => {
    const socket = new WebSocket(
      "ws://localhost:3333/polls/b903b361-ce6b-4214-b921-186a652c0290/results"
    )

    // Listen to messages from the server
    socket.addEventListener(
      "message",
      function (event: MessageEvent<WebsocketPollResponse>) {
        console.log("Message from server:", event.data)

        queryClient.invalidateQueries("poll")
      }
    )

    // Clean up function
    return () => {
      socket.close() // Close the WebSocket connection when the component unmounts
    }
  }, []) // Empty dependency array to run the effect only once when the component mounts

  if (isSuccess) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <VoteCard poll={data.poll} />
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center grow">
      <span>LOADING...</span>
    </div>
  )
}
