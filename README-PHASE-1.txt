GEF Research & Development Department Portfolio Website
Phase 1 — Foundation + Dynamic Base

Included files:
- index.html
- style.css
- script.js
- assets/logo-placeholder.svg
- README.txt

Purpose of Phase 1:
This is the first dynamic skeleton for the public English portfolio website of Ghazali Education Foundation — Research & Development Department.

Completed in this phase:
1. Home / Hero section
2. Professional English website wording
3. GEF logo placement area with placeholder logo
4. Navigation in locked website order for initial sections
5. Ghazali-style maroon, golden yellow, cream, and white theme
6. Responsive layout for desktop, tablet, and mobile
7. Google Sheet fetch system structure
8. Google Drive image link converter
9. Status = Active filter
10. Display Order sorting
11. Basic loading/error fallback through safe fallback data
12. GitHub Pages-ready structure

How to connect Google Sheets:
1. Open your Google Sheet.
2. Publish each required tab to the web as CSV.
3. Copy each CSV link.
4. Open script.js.
5. Paste the relevant CSV links inside the SHEET_URLS object.

Example:
const SHEET_URLS = {
  Settings: 'YOUR_SETTINGS_CSV_LINK',
  Team: 'YOUR_TEAM_CSV_LINK',
  Development: 'YOUR_DEVELOPMENT_CSV_LINK',
  'Digital Projects': 'YOUR_DIGITAL_PROJECTS_CSV_LINK',
  Contact: 'YOUR_CONTACT_CSV_LINK'
};

Important Google Sheet columns:
- Status
- Display Order
- Title / Name
- Description
- Image / Photo
- Category

Rules already implemented:
- Only Status = Active rows appear.
- Status = Draft or Hidden rows do not appear.
- Display Order controls item order.
- Google Drive file links are converted for image display.
- Missing images show a clean placeholder.
- Optional empty fields do not break the website.

Notes:
- This phase uses fallback sample data because no actual Google Sheet CSV links were provided in the development prompt.
- Phase 2 should replace/extend fallback previews with full dynamic About R&D, Team, Development Work, Digital Projects, Training, and Contact sections.

ZIP name:
GEF-RND-Portfolio-Phase-1.zip
