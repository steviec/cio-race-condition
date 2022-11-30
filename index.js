#!/usr/bin/env node

import { RegionUS, TrackClient } from "customerio-node";
import { ulid } from "ulid";
import { setTimeout } from "timers/promises";

const siteId = process.env.TRACKING_SITE_ID
const apiKey = process.env.TRACKING_API_KEY

const tracker = new TrackClient(siteId, apiKey, { region: RegionUS });

async function createAndAssociateCustomer() {
  try {
    const user = {
      email: `stevie+${ulid()}@getscreenable.com`,
      personalName: "stevie",
      familyName: "clifton",
    };

    // Step 1: initial call to create user based on on Email address
    await tracker.identify(user.email, {
      first_name: user.personalName,
      last_name: user.familyName,
    });

    // Step 2: associate the internally created user id with the email address
    const newUserId = ulid();
    await tracker.identify(user.email, {
      id: newUserId,
    });

    // OPTIONAL: wait 2s
    if(process.env.WAIT === "true") {
      await setTimeout(2000);
    }

    // Step 3: sending a tracking event using the user's id
    await tracker.track(newUserId, {
      name: "account_registered",
    });

    console.log(`Created user ${newUserId} with email ${user.email}`);
  } catch (error) {
    console.error(error);
  }
}

for (var i = 0; i < 6; i++) {
  await createAndAssociateCustomer();
}
