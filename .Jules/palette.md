## 2024-05-23 - Micro-UX: Skip Link
**Learning:** Even modern Next.js apps with client-side routing often miss the "Skip to main content" link, which is a critical WCAG 2.4.1 requirement.
**Action:** Always check for skip links in the root layout first.

## 2024-05-23 - Micro-UX: Decorative vs Informative Images
**Learning:** Infinite sliders with logos often get treated as "decorative", but they convey critical information (trust, integration, partnership). Using generic alt text like "Image 1" is worse than nothing.
**Action:** Always inspect slider content. If it conveys meaning (like brands), specific alt text is mandatory.

## 2025-05-09 - Micro-UX: Copy-to-Clipboard for Code Blocks
**Learning:** Code blocks in documentation are almost always meant to be copied. Users expect a one-click solution rather than selecting text manually, especially on mobile. Providing immediate feedback ("Copied!") reinforces the action.
**Action:** Always wrap code blocks in a component that includes a copy button with accessible status feedback.
