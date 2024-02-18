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
    defaultValues: {
      values: "",
    },
    mode: "onChange",
    resolver: zodResolver(VoteSchema),
  })

  const [voted, setVoted] = useState(false)

  async function createVote(): Promise<{ message: string }> {
    return await api
      .post(`http://localhost:3333/polls/${poll.id}/votes`, {
        pollOptionId: getValues("values"),
      })
      .then((res) => res.data)
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
                    percentage={(Math.random() * 100).toFixed(2)}
                    selected={getValues("values") === option.id}
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
        </CardContent>
        <CardFooter className="flex justify-end space-x-3">
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
        </CardFooter>
      </Card>
    </form>
  )
}
