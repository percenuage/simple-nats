import nats from "nats";

export let nc = null;
export let subs = [];

export const connect = async () => {
  const { NATS_URL, SERVICE } = process.env;
  nc = await nats.connect({ servers: NATS_URL, name: SERVICE });
  console.log(`[${SERVICE}] Connected to Nats on ${nc.getServer()}`);
}

export const subscribes = async () => {
  const { SERVICE } = process.env;
  const { default: services } = await import(`./services/${SERVICE}.service.js`);
  for (const { channel, callback, queue } of services) {
    const sub = nc.subscribe(channel, { callback, queue });
    subs.push(sub);
  }
  const channels = services.map(service => service.channel);
  console.log(`[${SERVICE}] Subscribes to channels [${channels.join(',')}]`);
}
