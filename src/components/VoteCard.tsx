"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radio-group"
import { Poll } from "@/types/poll"
import { VoteSchema } from "@/types/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import RatingBar from "./rating-bar"
import { toast } from "sonner"
import { api } from "@/lib/axios"
import { AxiosError } from "axios"
import { queryClient } from "@/context/queryClientProvider"

interface VoteCardProps {
  poll: Poll
}

export default function VoteCard({ poll }: VoteCardProps) {
  const {
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof VoteSchema>>({
    resolver: zodResolver(VoteSchema),
  })

  const [voted, setVoted] = useState(false)

  async function createVote(): Promise<{ message: string }> {
    return await api
      .post(`${process.env.NEXT_PUBLIC_API_URL}/polls/${poll.id}/votes`, {
        pollOptionId: getValues("values"),
      })
      .then(async (res) => {
        await queryClient.refetchQueries({ queryKey: ["poll"] })
        return res.data
      })
  }

  async function onSubmit() {
    if (!voted) {
      setVoted(true)

      toast.promise(createVote, {
        loading: "Loading...",
        success: (data) => {
          return data.message
        },
        error: (data: AxiosError<{ message: string }>) => {
          return data.response?.data.message
        },
      })
    }
  }

  function getPollTotalVote() {
    let votes = 0
    poll.options.map((option) => {
      votes += option.score
    })

    return votes
  }

  function getSafePercentage(score: number, total: number) {
    if (score && total) {
      return (score / total) * 100
    }

    return 0
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card key={poll.id}>
        <CardHeader>
          <CardTitle>{poll.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {voted ? (
            <div className="space-y-2">
              {poll.options.map((option) => {
                return (
                  <RatingBar
                    title={option.title}
                    percentage={getSafePercentage(
                      option.score,
                      getPollTotalVote()
                    )}
                    selected={getValues("values") === option.id}
                    key={option.id}
                  />
                )
              })}
            </div>
          ) : (
            <RadioGroup>
              {poll.options.map((option) => {
                return (
                  <div className="flex items-center space-x-2" key={option.id}>
                    <input
                      type="radio"
                      id={option.id}
                      value={option.id}
                      {...register("values")}
                    />
                    <Label htmlFor={option.id}>{option.title}</Label>
                  </div>
                )
              })}
            </RadioGroup>
          )}
          <span className="text-destructive text-sm">
            {errors.values?.message}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between space-x-10">
          <span>{`${getPollTotalVote()} Votos`}</span>
          <div className="space-x-3">
            <Button
              variant={"outline"}
              onClick={() => {
                reset()
                setVoted(false)
              }}
            >
              Change vote
            </Button>
            <Button type="submit">Vote</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
