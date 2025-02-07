# BattleTech MechLab

The BattleTech MechLab is a T3 Stack app inspired by the MechLab in MW5: Mercenaries, intended to be used with the BattleTech table top miniatures game. You can build any BattleMech you like in a very similar way to how you build them in MW5 with drag and drop functionality.

I've always preferred to build mechs this way rather than the step by step process that exists in the BattleTech Tech Manual.

Currently the app is only intended to allow the building of BattleMechs. Eventually, it would be my intent to be able to build any type of mech or vehicle for BattleTech Total Warfare.

## What technology did we use?

Most, if not all, of the technologies used are the same technologies that are used by the [T3 Stack](https://create.t3.gg/). We are not necessarily using the same versions as what the T3 Stack uses, although most tech is the same. If you want to learn about any of the tech used, reference the links provided in the list below.

- [Next.js](https://nextjs.org)
- [Drizzle](https://orm.drizzle.team)
- [Zod](https://zod.dev)
- [Clerk](https://clerk.com)
- [Sentry for NextJS](https://docs.sentry.io/platforms/javascript/guides/nextjs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## TODO

- [ ] Correctly calculate tonnage for engine heat sinks
- [ ] Fix issue with initial actuators not forcing redraw on mech builder
- [ ] Implement jump jets in mech builder
- [ ] Implement gyroscope in mech builder
- [ ] Implement basic cockpit in mech builder
- [ ] Implement weapon ammunition in mech builder
- [ ] Ensure installed equipment persists after refresh for WIP mech in mech builder
- [ ] Redesign weapon create/edit form (modal?)
- [ ] Routing/weapon details page (modal?)
- [ ] Analytics (posthog)
- [ ] Ratelimiting (upstash)
- [ ] Configure Lighthouse CI metrics
- [ ] Finish mobile menu
- [ ] Update site favicon

## DONE

- [ ] Implement mech engine tonnage in mech builder
- [x] Correctly calculate cooling for engine heat sinks
- [x] Implement integrated engine heat sinks
- [x] Implement engines in mech builder
- [x] Implement lower arm actuators in mech builder
- [x] Implement hand actuators in mech builder
- [x] Implement heating per turn in mech builder summary
- [x] Implement location mounted additional heat sinks in mech builder
- [x] Fix weapon form not submitting due to missing default values
- [x] Set up pagination for mech builder equipment list
- [x] Get filters on mech builder working
- [x] Mech weapon colors persist when placed in locations
- [x] Implement colors for different weapon types in mech builder
- [x] Add filters to the equipment list on the mech builder
- [x] Enable Equipment list loading from the db for weapons
- [x] Enable weapon table filtering based on WeaponType/TechRating
- [x] Add weapon type ~~category/subcategory~~ via db schema (add to weapon form and weapon table)
- [x] Add tech rating to weapons via db schema (add to weapon form and weapon table)
- [x] Add max armor, strip equipment, ~~strip armor~~, ~~and strip mech~~ buttons
- [x] Disable increase/decrease armor buttons when they would not do anything
- [x] Ensure mech weight is updated when adding/removing armor
- [x] Get add and remove armor buttons working in mech builder on mech locations
- [x] Add armor to mech locations in mech builder
- [x] Syle internal structure rendering
- [x] Add internal structure to mech locations in mech builder
- [x] Weapons add/remove their weight to currentMechTonnage state variable
- [x] Implement weight allowance for mech in mech builder
- [x] Implement edit weapon form (same as create weapon form)
- [x] Migrate project to use ESLint v9
- [x] Fix issue with data table row resize due to row actions dropdown
- [x] Remove caching to fix invalid data type issue
- [x] Migrate project to use tailwind v4
- [x] Fix button child of button hydration error on /weapons page
- [x] Switch to using a dropdown menu for data table row actions
- [x] Add caching to get all weapons call for weapons page
- [x] Highlight the mech location that the dragged item would go to if dropped
- [x] Create a toaster UI element that displays an error to user when equipping item doesn't work
- [x] Fix incorrect display of mech equipment location name
- [x] Prevent resizing of mech equipment locations during drop event
- [x] Implement react app state using `zustand`
- [x] Add ability to remove equipment item ~~by right clicking when equipped~~ using remove button
- [x] Get equipped items to display as correct height (take multiple critical slots, no resize of location)
- [x] Get equipped items to display as correct style (color, fit single slot)
- [x] Get dropped equipment item to display in the correct equipment location
- [x] Add basic drag and drop functionality for mech equipment into builder location
- [x] Add all locations for mech in mech builder component
- [x] Create component to display mech equipment by location (i.e. right arm, right torso, etc.)
- [x] Create initial mech equipment inventory list for mech builder page
- [x] Style alert dialog for deleting weapon
- [x] Add tooltips to DataTable UI buttons (especially row actions section)
- [x] Require admin for new weapon form and weapon table new button
- [x] Get weapon form to actually create a new item in the DB
- [x] Fix weapon form field validation for number fields
- [x] Add creation form for new weapon
- [x] Add delete/copy weapon buttons to weapon list (w/ Server Actions)
- [x] Only show weapon table row actions for admin
- [x] Create site header component that will contain TopNav and mobile menu
- [x] Fix weapon table row height
- [x] Generate zod schemas for weapons using drizzle-zod
- [x] Extract out components from the DataTable base component
- [x] Add column visibility toggling to weapons table
- [x] Add filtering to weapons table
- [x] Add sorting buttons to weapons table columns
- [x] Add pagination to weapons table
- [x] Use shadui to display list of weapons
- [x] Add weapon list page
- [x] Error management (w/ Sentry)
- [x] Create weapon DTO in NextJS data layer
- [x] Create auth access in NextJS data layer
- [x] Add authentication (w/ clerk)
- [x] Attach database to UI
- [x] Actually set up a database (vercel postgres)
- [x] Tidy up build process
- [x] Scaffold basic ui with mock data
- [x] Make it deploy (vercel)
