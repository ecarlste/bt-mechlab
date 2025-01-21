# BattleTech Mech Lab

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guide for [Vercel](https://create.t3.gg/en/deployment/vercel).

## TODO

- [x] Make it deploy (vercel)
- [x] Scaffold basic ui with mock data
- [x] Tidy up build process
- [x] Actually set up a database (vercel postgres)
- [x] Attach database to UI
- [x] Add authentication (w/ clerk)
- [x] Create auth access in NextJS data layer
- [x] Create weapon DTO in NextJS data layer
- [x] Error management (w/ Sentry)
- [x] Add weapon list page
- [x] Use shadui to display list of weapons
- [x] Add pagination to weapons table
- [x] Add sorting buttons to weapons table columns
- [x] Add filtering to weapons table
- [x] Add column visibility toggling to weapons table
- [x] Extract out components from the DataTable base component
- [x] generate zod schemas for weapons using drizzle-zod
- [x] fix weapon table row height
- [x] create site header component that will contain TopNav and mobile menu
- [x] only show weapon table row actions for admin
- [x] Add delete/copy weapon buttons to weapon list (w/ Server Actions)
- [x] Add creation form for new weapon
- [ ] Fix weapon form field validation for number fields
- [ ] Get weapon form to actually create a new item in the DB
- [ ] Routing/weapon details page (modal?)
- [ ] Analytics (posthog)
- [ ] Ratelimiting (upstash)
- [ ] Add tooltips to DataTable UI buttons (especially row actions section)
- [ ] Finish mobile menu
