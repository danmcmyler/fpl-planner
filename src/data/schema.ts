import { z } from "zod";

export const FixtureDifficultySchema = z.object({
  season: z.string().min(1),
  gameweeks: z.array(z.number().int().positive()),
  teams: z.array(z.string().min(1)),
  difficulty: z.array(
    z.object({
      gw: z.number().int().positive(),
      team: z.string().min(1),
      value: z.number().int().min(1).max(5)
    })
  )
});

export type FixtureDifficulty = z.infer<typeof FixtureDifficultySchema>;
