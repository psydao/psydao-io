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

### Claims:

- Claims cards:

  - If the claim is expired, the amount is set to 0.00 and the button is disabled.
  - If a user is ineligible, the amount is set to 0.00 and the button is disabled.
  - If the user has already claimed, the amount is set to the remaining amount in the pool and the button is disabled.
  - If a claim is claimable by the user the amount is set to what the user can claim and the button is enabled.
  - On a successful claim, there is generally a slight delay before the button state is set to "claimed". This is expected behavior.

- Claim creation:
  - Test claim creation on time periods with- and without proposals
    - Make sure we still get psycHolders for periods without proposals (we get psycHolders by timestamp during those periods)
    - Ensure that returns are the same for time periods with and without proposals
  - The claim's IPFS hash must be pinned to Piñata during claim creation.
  - Claim deadline must be at least one week after the current date to give users enough time to claim.
  - An allowance must be set before you can create a claim. Check the state of the button at the bottom of the window. The admin can either approve the amount or create a claim.
