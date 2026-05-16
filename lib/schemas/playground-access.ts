import "server-only";
import { z } from "zod";

export const playgroundAccessSchema = z.object({
  email: z.string().trim().email(),
});

export type PlaygroundAccessInput = z.infer<typeof playgroundAccessSchema>;
