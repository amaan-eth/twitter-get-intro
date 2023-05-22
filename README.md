# Get Intros for Twitter Accounts
This is a tool that lets you see who your mutuals are with an account that doesn't follow you yet. I use it for context to see what the likelihood is that person would follow me.

If you view a profile that's followed by 100 ppl you follow vs 1 person you follow, that's a pretty useful signal. This is the inverse to see if an account you're interested in would see a good or bad signal when they view **your** account.

## ❗❗DISCLAIMERS❗❗
- Twitter's API is a pain when it comes to auth, rate limiting, etc. Rate limiting is a huge blocker so if an account follows multiples of thousands of people (particularly more than 15k), then this prob won't work/you'll get rate limited very quickly.
- Only spent 1-2 days building this, so there's lots of pieces that aren't optimized that I could improve on.
- Be careful w API keys

## How to Use

1. Clone the repo
2. Change `.env.example` to `.env`
3. Go to https://tweeterid.com/ to find your Twitter ID
4. In the `.env` file, replace the `PLASMO_PUBLIC_TWITTER_USER_ID` with your own Twitter ID
5. Head to https://developer.twitter.com/en/portal/dashboard & create your own app
6. Head to the "Keys and Tokens" tab and copy the Bearer Token. Replace `PLASMO_PUBLIC_BEARER_TOKEN` with your own Bearer Token
7. Run `pnpm install` to install dependencies
8. Run `pnpm run build` to compile the project
9. Go to chrome://extensions & turn on developer mode
10. Click "Load Unpacked". Select this repo and find the `build` folder. There should be a `chrome-mv3-prod` folder. Select that.
11. Enjoy!

## How I Built This
I discovered Plasmo which makes developing chrome extensions *so* much easier. The DX is 10x better. You can use Typescript, React, Tailwind, and more w it.

I already had the scripts for GetIntro from another private app I was building, so this project was mainly about converting it into a chrome extension + figuring out Twitter auth. Was spending **way** too much time debugging & trying to figure out the issues for a project that was only supposed to take a day to build, so decided to use the Bearer token method to get it launched.

Also would like to express gratitude to GPT. I've been using it as a coding assistant for months & am **still** in awe of how useful it is for debugging & handling code I don't feel like writing. It speeds up the dev process so much.

## Socials
If you want to stay up to date w/ what I'm working on, check out [my Twitter](https://twitter.com/amaan_eth).

