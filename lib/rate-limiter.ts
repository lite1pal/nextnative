import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function buildRatelimit() {
  try {
    return new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "30 s"), // 5 requests per 30 seconds
      analytics: true,
    });
  } catch {
    return null;
  }
}

export const ratelimit = buildRatelimit();
