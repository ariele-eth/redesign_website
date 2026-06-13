# Mobile Audit

## Branch Taken
Branch B — partial mobile support exists.

Why:
- The site already includes a viewport tag in the rendered HTML.
- The repo already uses responsive CSS and Tailwind responsive utilities.
- Mobile-specific regressions still exist, most notably the navbar rendering desktop links at phone widths and event cards staying in a desktop-like split layout.

## Investigation Summary

1. Viewport tag
- Result: present in rendered HTML as `<meta name="viewport" content="width=device-width, initial-scale=1" />`.
- Source context: [src/app/layout.tsx](src/app/layout.tsx) defines metadata, and Next.js injects the viewport tag in the rendered output.

2. Existing `@media` queries
- Found in [src/app/globals.css](src/app/globals.css).
- Breakpoints in use:
  - `1200px`
  - `1100px`
  - `980px`
  - `700px`
  - `640px`
  - `prefers-reduced-motion`

3. CSS framework usage
- Tailwind is in use via `@import 'tailwindcss';` in [src/app/globals.css](src/app/globals.css).
- Responsive utility prefixes are already used in templates, including `sm:` and `md:` in components such as:
  - [src/components/Navigation.tsx](src/components/Navigation.tsx)
  - [src/components/EventCard.tsx](src/components/EventCard.tsx)
  - [src/components/PartnersSection.tsx](src/components/PartnersSection.tsx)
  - [src/app/join/member/page.tsx](src/app/join/member/page.tsx)
  - [src/app/join/committee/page.tsx](src/app/join/committee/page.tsx)

4. Dedicated mobile stylesheet
- No project-specific mobile stylesheet was found.
- The only project CSS file with `mobile` matches is [src/app/globals.css](src/app/globals.css).

5. Separate mobile routes or components
- No dedicated mobile route/component files were found in the app source.
- Search hits were limited to third-party packages in `node_modules`.

6. Git history
- Previous mobile-related commits were found:
  - `9b8e830` `centering past events on mobile`
  - `e1ef098` `change event-card format on mobile`

7. 375px inspection
- Result: the repo does not collapse cleanly at narrow widths in its current state.
- Root cause observed:
  - The navbar desktop links were still visible at phone width because inline `display: flex` overrode `hidden md:flex`.
  - That created horizontal pressure/clipping near the top of the page.
  - The default event card layout also remained split into a date column plus content column on narrow screens, which is too cramped for mobile.

## Fixes Applied

### [src/components/Navigation.tsx](src/components/Navigation.tsx)
- Removed the inline `display: flex` conflict from the desktop nav links so Tailwind `hidden md:flex` can work correctly on mobile.
- Replaced the text-based toggle with `Menu` / `X` icons for a cleaner mobile control.
- Added mobile-only nav adjustments at the existing site-wide `700px` breakpoint:
  - tighter horizontal padding
  - smaller brand mark
  - 44x44 menu tap target
  - smaller but still prominent CTA sizing
  - improved mobile menu panel spacing/background

### [src/components/EventCard.tsx](src/components/EventCard.tsx)
- Switched the default event card to a stacked layout on mobile and preserved the split layout from `md` upward.
- Moved the date panel border from right-to-bottom on mobile.
- Reduced mobile spacing and heading size slightly.
- Made the register button full-width on mobile for easier tapping.

### [src/app/globals.css](src/app/globals.css)
- Allowed the footer contact email link to wrap on small screens instead of forcing a single line.
- Raised mobile form/input font size to `16px` for application fields and newsletter/email inputs to avoid iOS zoom issues.

## Breakpoint Convention Used
- New mobile fixes follow the existing site-wide `700px` mobile breakpoint because it is the dominant mobile breakpoint already used across the codebase.
- This avoids introducing a fourth mobile convention on top of the existing `640px`, `700px`, `980px`, `1100px`, and `1200px` rules.

## Verification
- `npx next build` passed successfully after the changes.
- Targeted linting passed for the touched files with no new errors.
- Remaining warnings were pre-existing/non-blocking:
  - `EventCard.tsx` still uses an existing `<img>` in the compact variant.
  - `globals.css` is not part of the ESLint file matcher for direct linting.
