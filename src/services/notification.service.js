const login = (err, msg) => {
  const { SERVICE } = process.env;
  if (err) {
    console.error("subscription error", err.message);
    return;
  }
  const user = msg.json();
  console.log(`[${SERVICE}/${msg.subject}] Update login info in DB for user [${user.name}]`);
}

const notify = (err, msg) => {
  const { SERVICE } = process.env;
  if (err) {
    console.error("subscription error", err.message);
    return;
  }
  const users = msg.json();
  for (const user of users) {
    console.log(`[${SERVICE}/${msg.subject}] Notification has been pushed to [${user}]`);
  }
}

export default [
  { channel: "login", callback: login, queue: process.env.SERVICE },
  { channel: "push", callback: notify, queue: process.env.SERVICE },
]

