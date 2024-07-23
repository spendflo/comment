import type { Cluster } from 'ioredis';
import Redis from 'ioredis';
import Redlock from 'redlock';

import env from 'server/src/config/Env.ts';
import { isNotNull } from 'common/util/index.ts';
import { anonymousLogger } from 'server/src/logging/Logger.ts';

const compareAndDelete = 'compareAndDelete';
const incrAndExpire = 'incrAndExpire';
type RedisWithOurCommands = Cluster & {
  // see defineCommand in initRedis
  // compareAndDelete() executes a Lua script as a single transaction on redis
  // that deletes the key if the value stored under the key matches the
  // specified value. Returns 1 if key was deleted or 0 if not.
  [compareAndDelete]: (key: string, val: string) => Promise<number>;
  [incrAndExpire]: (key: string, expireInSec: number) => Promise<number>;
};
let redis: RedisWithOurCommands | undefined;

export function getRedis(): RedisWithOurCommands {
  if (redis === undefined) {
    throw new Error('Redis has not been initialised');
  }
  return redis;
}

let predis: RedisWithOurCommands | undefined;

export function getPredis(): RedisWithOurCommands {
  if (predis === undefined) {
    throw new Error('Predis has not been initialised');
  }
  return predis;
}

let redlock: Redlock | undefined;

export function getRedlock(): Redlock {
  if (redlock === undefined) {
    throw new Error('Redis has not been initialised');
  }
  return redlock;
}

function addOurCommands(redisClient: Cluster) {
  redisClient.defineCommand(compareAndDelete, {
    numberOfKeys: 1,
    lua: `
local currVal = redis.call("get", KEYS[1])
if currVal == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end`,
  });
  redisClient.defineCommand(incrAndExpire, {
    numberOfKeys: 1,
    // this lua script increments a value (which sets it to 1 if it did not
    // exist before). If the value was just created, an expiry is set on the value.
    lua: `
local currVal = redis.call("incr", KEYS[1])
if currVal == 1 then
  redis.call("expire", KEYS[1], ARGV[1])
end
return currVal
`,
  });
}

export function initRedis() {
  const redisClient = createRedisClient();
  const predisClient = createPredisClient();

  [redisClient, predisClient].forEach((client) => addOurCommands(client));

  redis = redisClient as RedisWithOurCommands;
  predis = predisClient as RedisWithOurCommands;

  // Used for adding Slack mirrored threads
  redlock = new Redlock([redis]);
}

export function createRedisClient(): Cluster {
  const redisCluster: Cluster = new Redis.Cluster([{port: Number(env.REDIS_PORT), host: env.REDIS_HOST}]);
  redisCluster.connect().then(() => {
    return redisCluster;
  }).catch((err) => {
    console.log(err);
  });
  return redisCluster;
}

export function createPredisClient(): Cluster {
  const redisCluster: Cluster = new Redis.Cluster([{port: Number(env.REDIS_PORT), host: env.REDIS_HOST}]);
  redisCluster.connect().then(() => {
    return redisCluster;
  }).catch((err) => {
    console.log(err);
  });
  return redisCluster;
}

// This is a helper function to check for errors after a Redis MULTI
// transaction is used.
export function multiOperationSucceeded(
  errsAndVals: [Error | null, unknown][] | null,
  message: string,
): errsAndVals is [Error | null, unknown][] {
  if (!errsAndVals) {
    anonymousLogger().logException(
      message,
      new Error('Return value was empty'),
    );
    return false;
  }
  const errs = errsAndVals
    .map((errAndVal) => errAndVal[0])
    .filter(isNotNull)
    .map((err) => err.message);
  if (errs.length > 0) {
    anonymousLogger().logException(message, errs[0], { allErrors: errs });
    return false;
  }
  return true;
}
