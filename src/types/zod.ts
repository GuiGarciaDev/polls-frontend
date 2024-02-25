import { z } from "zod";

export const VoteSchema = z.object({
    values: z.string().min(1).uuid(),
})

export const pollUrlSchema = z.object({
    pollUrl: z.string().url().min(1)
})

export const pollUrl = z.string().url().min(1)
