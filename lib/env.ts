import "server-only";
import { type Env, validateEnv } from "./env-core";

export const env: Env = validateEnv();
