![PsyDAO-Logo-White](readme-logo-white.svg#gh-dark-mode-only)![PsyDAO-Logo-Purple](readme-logo-purple.svg#gh-light-mode-only)

<br />

> This repository contains the code for [PsyDAO's homepage](https://psydao.io/)

## Contributing

Fill in [this form](https://airtable.com/shrCaOD9DaD57J3Mu) if you want to get involved and [join us](https://discord.gg/FJHQtBZYdp) on our Discord.

This is a [Next.js](https://nextjs.org/) app. You can run the development server locally with `npm run dev`. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[Create a PR](https://github.com/psydao/psydao-io/pulls) targeting `dev` or [open an issue](https://github.com/psydao/psydao-io/issues).

## Subgraph details

Newest subgraph link: https://api.studio.thegraph.com/query/42782/psy-sepolia-test/version/latest

### After subgraph has been redeployed, follow these steps:

- Share the new link with everyone

- Update your local .env and make sure the Vercel env gets updated as well.
- Test new deployment by creating a minimum of one sale from the front-end.
- If this does not work, try again on etherscan to see where the problem lies. (https://sepolia.etherscan.io/ for testing environment or https://etherscan.io/ for mainnet deployments)

- Edit your new sales and general dashboard to further test functionality

### Env details:

- The format for NEXT_PUBLIC_WHITELIST_ADDRESSES is as follows: "0x00, 0x01, ..."
- The logic to split this into an array of whitelisted addresses resides in env.mjs in @/config
