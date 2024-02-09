const callbackChannelGreet = (err, msg) => {
  const { SERVICE } = process.env;
  if (err) {
    console.log("subscription error", err.message);
    return;
  }
  console.log(`[${SERVICE}/${msg.subject}] data = ${msg.string()}`);
  msg.respond(`[${SERVICE}/${msg.subject}] ack`)
}

const callbackChannelYolo = (err, msg) => {
  const { SERVICE } = process.env;
  if (err) {
    console.log("subscription error", err.message);
    return;
  }
  console.log(`[${SERVICE}/${msg.subject}] data =`, msg.json());
}

export default [
  { channel: "greet.*", callback: callbackChannelGreet, queue: "worker" },
  { channel: "yolo", callback: callbackChannelYolo },
]
