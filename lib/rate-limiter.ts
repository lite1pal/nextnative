import "server-only";
import { createHash, randomUUID } from "node:crypto";
import Redis from "ioredis";

type RateLimitResult = {
  success: boolean;
  remaining: number;
  reset: number;
};

type RateLimiter = {
  limit: (identifier: string) => Promise<RateLimitResult>;
};

const WINDOW_SECONDS = 30;
const MAX_REQUESTS = 5;

const RATE_LIMIT_LUA = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local member = ARGV[4]

redis.call("ZREMRANGEBYSCORE", key, 0, now - window)
local count = redis.call("ZCARD", key)

if count >= limit then
  local oldest = redis.call("ZRANGE", key, 0, 0, "WITHSCORES")
  local oldestScore = now
  if oldest[2] then
    oldestScore = tonumber(oldest[2])
  end
  return {0, limit - count, oldestScore + window}
end

redis.call("ZADD", key, now, member)
redis.call("PEXPIRE", key, window)
count = redis.call("ZCARD", key)

local oldest = redis.call("ZRANGE", key, 0, 0, "WITHSCORES")
local oldestScore = now
if oldest[2] then
  oldestScore = tonumber(oldest[2])
end

return {1, limit - count, oldestScore + window}
`;

function buildRatelimit(): RateLimiter | null {
  try {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) return null;

    const redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
    });

    return {
      async limit(identifier: string) {
        try {
          const now = Date.now();
          const safeIdentifier = createHash("sha256")
            .update(identifier)
            .digest("hex");
          const key = `ratelimit:${safeIdentifier}`;
          const member = `${now}-${randomUUID()}`;

          const result = (await redis.eval(
            RATE_LIMIT_LUA,
            1,
            key,
            now,
            WINDOW_SECONDS * 1000,
            MAX_REQUESTS,
            member,
          )) as [number, number, number];

          const [allowed, remaining, reset] = result;
          return {
            success: allowed === 1,
            remaining: Math.max(0, remaining),
            reset,
          };
        } catch {
          return {
            success: true,
            remaining: MAX_REQUESTS,
            reset: Date.now() + WINDOW_SECONDS * 1000,
          };
        }
      },
    };
  } catch {
    return null;
  }
}

export const ratelimit = buildRatelimit();
