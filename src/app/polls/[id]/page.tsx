"use client"
import VoteCard from "@/components/VoteCard"
import { queryClient } from "@/context/queryClientProvider"
import { POLLS_BASE_URL, WEBSOCKET_BASE_URL } from "@/lib/axios"
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

  // const [pollCache, setPollCache] = useState<Poll>(
  //   queryClient.getQueriesData<Poll>(["poll"])[0][1]
  // )

  //console.log(queryClient.getQueryData<Poll>(["poll"]))

  const { data, isSuccess } = useQuery({
    queryKey: ["poll"],
    queryFn: (): Promise<{ poll: Poll }> => {
      return axios.get(`${POLLS_BASE_URL}/polls/${id}`).then((res) => res.data)
    },
  })

  useEffect(() => {
    const socket = new WebSocket(`${WEBSOCKET_BASE_URL}/polls/${id}/results`)

    // Listen to messages from the server
    socket.addEventListener(
      "message",
      async function (event: MessageEvent<WebsocketPollResponse>) {
        // if (isSuccess) {
        //   let newPollCache = data.poll // Initializing new instance of poll to mutate and update cache
        //   let mutatedOptions = newPollCache.options

        //   for (let i = 0; i < mutatedOptions.length; i++) {
        //     if (mutatedOptions[i].id === event.data.pollOptionId) {
        //       mutatedOptions[i].score = event.data.votes
        //     }
        //   }

        //   queryClient.setQueryData<Poll>(["poll"], newPollCache)
        //   //setPollCache(queryClient.getQueryData<Poll>("poll")[0][1])
        // }

        queryClient.refetchQueries(["poll"]) // Add a more efficient way to manipulate cache and prevent unecessary refetchs
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
