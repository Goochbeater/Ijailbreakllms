## 2024-05-23 - Micro-UX: Skip Link
**Learning:** Even modern Next.js apps with client-side routing often miss the "Skip to main content" link, which is a critical WCAG 2.4.1 requirement.
**Action:** Always check for skip links in the root layout first.

## 2024-05-23 - Micro-UX: Decorative vs Informative Images
**Learning:** Infinite sliders with logos often get treated as "decorative", but they convey critical information (trust, integration, partnership). Using generic alt text like "Image 1" is worse than nothing.
**Action:** Always inspect slider content. If it conveys meaning (like brands), specific alt text is mandatory.

## 2025-10-26 - Micro-UX: Interaction Feedback for Mailto Links
**Learning:** Instantaneous `mailto:` links can feel broken or jarring to users if the email client takes time to open. A simulated loading state (e.g., 1.5s delay with a spinner) provides crucial feedback that the action was received and is processing, reducing "rage clicks" and uncertainty.
**Action:** Wrap `mailto` redirects in a simulated async handler with a visual loading state on the button.
