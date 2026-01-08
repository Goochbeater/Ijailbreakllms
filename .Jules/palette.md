## 2024-05-23 - Micro-UX: Skip Link
**Learning:** Even modern Next.js apps with client-side routing often miss the "Skip to main content" link, which is a critical WCAG 2.4.1 requirement.
**Action:** Always check for skip links in the root layout first.

## 2024-05-23 - Micro-UX: Decorative vs Informative Images
**Learning:** Infinite sliders with logos often get treated as "decorative", but they convey critical information (trust, integration, partnership). Using generic alt text like "Image 1" is worse than nothing.
**Action:** Always inspect slider content. If it conveys meaning (like brands), specific alt text is mandatory.

## 2024-05-23 - Micro-UX: Action Feedback for External Links
**Learning:** Instant redirection to external apps (like `mailto:`) feels jarring and broken. Users might think the button didn't work if the client takes time to load.
**Action:** Add a simulated loading state (delay + feedback) for actions that trigger external applications to provide confirmation.
