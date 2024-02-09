const publishToSocials = async (err, msg) => {
  const { SERVICE } = process.env;
  if (err) {
    console.error("subscription error", err.message);
    return;
  }
  const { id, user, text } = msg.json();
  const { 1: media } = msg.subject.split('.');
  console.log(`[${SERVICE}/${msg.subject}] User [${user}] publishes [${text}] to ${media}`);
  msg.respond(`[main/${msg.subject}] Post [${id}] has been published to ${media}`);
}

export default [
  { channel: "publish.*", callback: publishToSocials, queue: process.env.SERVICE },
]

