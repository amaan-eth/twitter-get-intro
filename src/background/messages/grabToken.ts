import { Client } from "twitter-api-sdk";

import type { PlasmoMessaging } from "@plasmohq/messaging";

/* ======================================
               Main Function
======================================= */
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // Grabs the current page URL from the request body
  const pageUrl = req.body.currentPageUrl;
  const username = pageUrl.split("/").pop();

  // Initialize Twitter API credentials
  const bearerToken = process.env.PLASMO_PUBLIC_BEARER_TOKEN;
  const myUserId = process.env.PLASMO_PUBLIC_TWITTER_USER_ID;

  // Initiate Twitter Client
  const client = new Client(bearerToken);

  // Reusable function to fetch all users from an endpoint. Followers/following is a very similar api call
  const fetchAllUsers = async (endpoint, userId, options) => {
    // Array for users + initial query to endpoint
    const allUsers = [];
    let userQuery = await client.users[endpoint](userId, options);
    allUsers.push(...userQuery.data);

    // Loops through & fetches all users from endpoint until next token is null
    while (userQuery.meta.next_token) {
      userQuery = await client.users[endpoint](userId, {
        ...options,
        pagination_token: userQuery.meta.next_token
      });
      allUsers.push(...userQuery.data);
    }

    return allUsers;
  };

  let myFollowers;
  let targetUser;
  let targetUserFollowing;

  // Request for all My Followers
  try {
    myFollowers = await fetchAllUsers("usersIdFollowers", myUserId, {
      max_results: 1000,
      "user.fields": ["profile_image_url", "description"]
    });
  } catch (err) {
    res.send({ status: "error" });
  }

  // Request for all Target User's Following
  targetUser = await client.users.findUserByUsername(username);
  try {
    targetUserFollowing = await fetchAllUsers(
      "usersIdFollowing",
      targetUser.data.id,
      {
        max_results: 1000,
        "user.fields": ["profile_image_url", "description"]
      }
    );
  } catch (err) {
    res.send({ status: "error" });
  }

  // Find common users — these are people that follow you & that your target user follows
  const commonTwitterUsers = myFollowers.filter((follower) =>
    targetUserFollowing.some((user) => user.id === follower.id)
  );

  res.send({ commonTwitterUsers, status: "success" });
};

export default handler;
