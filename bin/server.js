#!/usr/bin/env node

/* ---------- ENVIRONMENT VARIABLES ---------- */

import 'dotenv/config';

process.env.SERVICE = process.env.SERVICE || process.argv[2];

/* ---------- MAIN ---------- */

import * as app from '../src/app.js';
import * as db from '../src/db.js';
import * as mq from '../src/mq.js';

(async () => {
  try {
    await db.connect();
    await mq.connect();
    await mq.subscribes();
    if (process.env.API_ENABLED === "true")
      await app.start();
  } catch (e) {
    console.error(e);
  }
})();


