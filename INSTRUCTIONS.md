# Portfolio Customization Guide

Your portfolio has been set up with a modern, high-performance design. Here's how to customize each section with your own content:

## 1. Personal Details & Metadata
- **File:** `app/layout.tsx`
- **Action:** Update the `title` and `description` to match your personal brand.

## 2. Hero Section (Introduction)
- **File:** `components/hero-section.tsx`
- **Action:** 
    - Change "DEVELOPER" vertical text.
    - Update "FULL STACK" split-flap text.
    - Edit the sub-headline and introduction paragraph.

## 3. Tech Stack (Skills)
- **File:** `components/signals-section.tsx`
- **Action:** Edit the `skills` array.
    - `category`: e.g., "Frontend", "Backend".
    - `title`: Skill name (e.g., "React", "Node.js").
    - `note`: Brief description of your expertise.

## 4. Projects (Featured Work)
- **File:** `components/work-section.tsx`
- **Action:** Edit the `projects` array.
    - `title`: Project name.
    - `medium`: Project type (e.g., "Full Stack App").
    - `description`: What you built and technologies used.
    - `span`: Controls grid size (`col-span-2 row-span-2` for large, `col-span-1` for small).

## 5. Philosophy (About)
- **File:** `components/principles-section.tsx`
- **Action:** Edit the `philosophy` array to reflect your values and approach.

## 6. Contact & Footer
- **File:** `components/colophon-section.tsx`
- **Action:** 
    - Update the email link (`mailto:your@email.com`).
    - Update social media links (LinkedIn, GitHub, etc.).
    - Change the status (e.g., "Open to Opportunities").

## 7. Global Styles
- **File:** `app/globals.css`
- **Action:** Adjust colors, fonts, or other global styles if needed.

## Running Locally
To start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your portfolio.
