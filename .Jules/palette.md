## 2024-05-23 - Micro-UX: Skip Link
**Learning:** Even modern Next.js apps with client-side routing often miss the "Skip to main content" link, which is a critical WCAG 2.4.1 requirement.
**Action:** Always check for skip links in the root layout first.

## 2024-05-23 - Micro-UX: Decorative vs Informative Images
**Learning:** Infinite sliders with logos often get treated as "decorative", but they convey critical information (trust, integration, partnership). Using generic alt text like "Image 1" is worse than nothing.
**Action:** Always inspect slider content. If it conveys meaning (like brands), specific alt text is mandatory.

## 2025-10-24 - Micro-UX: Form Feedback for Instant Actions
**Learning:** Even "instant" actions like `mailto:` links can feel jarring if they happen immediately. Users expect a moment of processing for form submissions. Adding a simulated loading state (even 1-1.5s) with a "Opening Email Client..." message provides reassuring feedback and confirms the action was registered.
**Action:** Add simulated loading states to form submissions that trigger external actions to improve perceived reliability.
