## 2024-05-23 - Micro-UX: Skip Link
**Learning:** Even modern Next.js apps with client-side routing often miss the "Skip to main content" link, which is a critical WCAG 2.4.1 requirement.
**Action:** Always check for skip links in the root layout first.

## 2024-05-23 - Micro-UX: Decorative vs Informative Images
**Learning:** Infinite sliders with logos often get treated as "decorative", but they convey critical information (trust, integration, partnership). Using generic alt text like "Image 1" is worse than nothing.
**Action:** Always inspect slider content. If it conveys meaning (like brands), specific alt text is mandatory.

## 2024-05-24 - Micro-UX: Mailto Feedback
**Learning:** `mailto:` links are synchronous but can feel broken if the email client takes time to open. Users often click multiple times thinking nothing happened.
**Action:** Always wrap `mailto` actions in a simulated loading state (1-1.5s) with visual feedback like "Opening Email Client..." to confirm intent and reduce rage clicks.
