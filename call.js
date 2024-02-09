/**
 * USE CASE
 * 1/ [MAIN] User login --> [NOTIFICATION] Write in DB
 * 2/ [MAIN] User publish a post --> [SOCIAL] A post is published to FB and Twitter
 * 3/ [SOCIAL] A post is published --> [NOTIFICATION] Notify all users
 */

import { connect, JSONCodec } from "nats";
import users from "./src/users.json" assert { type: "json" };

try {
  const nc = await connect({ name: "call", port: 4222 });
  console.log(`Connected to ${nc.getServer()}`);
  const data = JSONCodec().encode(users[0]);
  try {
    nc.publish("start", data);
  } catch (e) {
    console.error(e);
  }
  await nc.drain();
} catch (e) {
  console.log(`Error connecting`, e);
}

