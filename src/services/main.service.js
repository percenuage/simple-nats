import { JSONCodec } from "nats";
import { nc } from "../mq.js";
import users from "../users.json" assert { type: "json" };

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const login = async (msg) => {
  const { SERVICE } = process.env;
  const user = msg.json();
  console.log(`[${SERVICE}/${msg.subject}] User [${user.name}] is logged in`);
  console.log(`[${SERVICE}/${msg.subject}] Publish to [login] channel...`);
  const data = JSONCodec().encode(user);
  try {
    nc.publish("login", data);
  } catch (e) {
    console.error(e);
  }
}

const createPost = async () => {
  const { SERVICE } = process.env;
  const user = users[0];
  const post = { id: 42, user: user.name, text: user.tags.join('|') }
  console.log(`[${SERVICE}] User [${user.name}] creates a post [${post.text}]`);
  console.log(`[${SERVICE}] Publish to [social] channel...`);
  const data = JSONCodec().encode(post);
  try {
    const reps = await Promise.all([
      nc.request("publish.facebook", data),
      nc.request("publish.twitter", data)
    ])
    for (const rep of reps) {
      console.log(rep.string());
    }
  } catch (e) {
    console.error(e);
  }
}

const notifyUsers = async () => {
  const { SERVICE } = process.env;
  const names = users.map(u => u.name);
  console.log(`[${SERVICE}] Getting users from DB...`);
  console.log(`[${SERVICE}] Users [${names.join(',')}] must be notify for the new post`);
  console.log(`[${SERVICE}] Publish to [notify] channel...`);
  const data = JSONCodec().encode(names);
  try {
    nc.publish("push", data);
  } catch (e) {
    console.error(e);
  }
}

const start = async (err, msg) => {
  if (err) {
    console.log("subscription error", err.message);
    return;
  }
  await login(msg);
  await sleep(3000);
  await createPost();
  await sleep(1000);
  await notifyUsers();
}

export default [
  { channel: "start", callback: start, queue: process.env.SERVICE },
]
