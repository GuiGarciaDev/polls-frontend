import { z } from "zod";

export const VoteSchema = z.object({
    values: z.string().min(1).uuid(),
})
