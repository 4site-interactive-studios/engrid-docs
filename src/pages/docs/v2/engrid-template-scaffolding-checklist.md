---
title: ENgrid Template Scaffolding Checklist
description: A comprehensive checklist for scaffolding and building new EN templates in a new client account, especially when copying code from another client EN account.
---

Use this checklist when scaffolding/building new EN templates in a new client account, *especially* if you're copying code over from another client EN account.

[Vanilla template code for reference here.](https://github.com/4site-interactive-studios/engrid/tree/main/reference-materials/html/page-template-example)

## Checklist

### 1. Prep the codebase / theme (usually done by dev first)

- [ ] Create a new GitHub repo for the new org using the ENGrid template.
  - [ ] Naming convention: `engrid-<clientAbbreviation>` (example: `engrid-ats`).
  - [ ] Public repo is fine; ENGrid compiles front-end assets into static code used on pages.
- [ ] Clone that repo locally via GitHub Desktop ("Open in GitHub Desktop").
- [ ] Copy all files from an existing client ENGrid repo (ex: SPCAI `main` branch) into the new repo.
  - [ ] Commit that as the initial copy.
- [ ] In the codebase:
  - [ ] Do a global find/replace for the old client abbrev (e.g. `SPCAI`) → new client abbrev (e.g. `ATS`).
  - [ ] Swap in the new brand colors.
  - [ ] Try to run/build locally with Node/npm.
- [ ] If the build/compile step fails or you can't generate a new branded theme:
  - [ ] You can still proceed with page scaffolding using the source client's compiled assets (SPCAI look/feel) and swap branding later.

**Outcome of this step:** a starting code repo and (ideally) a compiled theme for the new org. If that's blocked, you still continue with the rest of this checklist.

---

### 2. Log into Engaging Networks for both orgs

- [ ] Open two browser windows side by side:
  - [ ] Source org (the one with working ENGrid donation pages, e.g. SPCAI).
  - [ ] Target org (the new client, e.g. ATS).
- [ ] Log into both Engaging Networks accounts at the same time.
  - [ ] Tip: you can often do this if one account lives on the US EN domain and the other on the CA EN domain.

You're going to visually copy from source → target.

---

### 3. Identify the reference donation page in the source account

- [ ] In the source org:
  - [ ] Go to **Pages**.
  - [ ] Find the working "in development" donation page you want to replicate.
  - [ ] This is usually inside a folder named with an omega symbol (Ω) and a number (e.g. `Ω3 ...`).
    - [ ] The omega keeps it sorted to the bottom.
    - [ ] The number helps group related work.
- [ ] Click **Edit** on the most recent version of that donation page. This is now your model.

---

### 4. Create the equivalent folder + page in the target account

- [ ] In the target org:
  - [ ] Go to **Pages**.
  - [ ] Create a new folder that mirrors the structure/naming convention from the source (same Ω prefix and number if applicable).
- [ ] Inside that folder, create a **new Donation Page**.
  - [ ] Page naming: follow existing conventions from ENGrid internal examples (e.g. `reference - donation page - test gateway`). Clarity beats clever.
- [ ] In the new donation page settings:
  - [ ] In the "Template" field, choose the correct ENGrid layout template (often named something like "ENGrid", "center-center-2-column", etc.).
- [ ] Go to **Donation Settings** (left nav):
  - [ ] Add a payment gateway.
  - [ ] Pick the test gateway if one exists (the one literally labeled "test").
  - [ ] Click through the wizard (Next / Next) and save.
- [ ] Save and close the page, then reopen it.
  - [ ] EN sometimes doesn't expose the full URL header until after first save/reopen.

At this point you have an empty ENGrid donation page in the new org with the right layout template and a test gateway.

---

### 5. Install the helper script to generate the ENGrid sections

- [ ] Install the TamperMonkey browser extension in Chrome (if you don't already have it).
- [ ] Go to the ENGrid documentation site: `engrid.4sitestudios.com`
  - [ ] In the left nav under **Core Concepts**, review "Creating an ENGrid Theme" and "Creating a One-Column Page Template."
  - [ ] Scroll to the section about "Build a generic donation page."
- [ ] There is a TamperMonkey script in that documentation:
  - [ ] Open the script.
  - [ ] Click **Raw**.
  - [ ] Approve the TamperMonkey install.

That script automates adding all 18 ENGrid sections (Advanced Columns layout) so you don't have to build them by hand.

This script replaces a previously painful manual copy/paste process.

---

### 6. Inject the full ENGrid layout into the new donation page

- [ ] In the target org donation page you just created:
  - [ ] Delete the default row Engaging Networks starts you with.
- [ ] From the right sidebar in the EN page builder:
  - [ ] Drag in the **Advanced Row / Custom Layout** component.
    - [ ] (This sometimes appears as "custom layout" or "advanced column" in the UI. It's the same thing.)
- [ ] After dropping it, you should now see a new button added by the TamperMonkey script.
  - [ ] Click that button once.
  - [ ] Wait and let it run.
- [ ] The script should auto-generate ~18 named sections (Page Alert, Content Header, Body Column, Spacers, Content Pre-Footer, Content Footer, Page Background Image, Custom Code, etc.).
- [ ] Click into Column 1 and Column 18 and confirm:
  - [ ] The sections all exist.
  - [ ] They're labeled with semantic class names.
- [ ] Save the page, then re-open/edit to confirm the named sections persist.
- [ ] Repeat this exact process for the **Thank You page**:
  - [ ] Create the Thank You page in the same folder (similar naming).
  - [ ] Assign the same/similar ENGrid template.
  - [ ] Add Advanced Row / Custom Layout.
  - [ ] Click the TamperMonkey button to generate all ENGrid sections there as well.

**Result:** both the donation page and thank-you page in the new account now have the full ENGrid structural skeleton.

---

### 7. Understand the ENGrid section logic (so you paste into the right places)

- [ ] ENGrid assumes three main width treatments:
  - [ ] **Full width** = edge-to-edge background/hero areas.
  - [ ] **Content width** = max-width container for main content.
  - [ ] **Body column** = sometimes even narrower column where the form sits.
- [ ] Certain sections are "utility" / optional:
  - [ ] `page-alert` (for urgent banners or redirects),
  - [ ] spacers (for vertical rhythm),
  - [ ] image overlay areas.
- [ ] Hero images:
  - [ ] `body-banner` and `page-background-image` handle desktop hero vs background.
  - [ ] ENGrid includes logic to reuse/crop the right image on mobile.
- [ ] `custom-code` lives at the very bottom:
  - [ ] All JS/CSS overrides should ideally sit here.
  - [ ] Benefits:
    - [ ] Your code runs after the page content is present.
    - [ ] If it breaks, it won't prevent the rest of the page from loading.
    - [ ] You avoid "mystery code blocks everywhere."
- [ ] All ~18 sections stay in the DOM even if they're visually unused.
  - [ ] Unused ones are just hidden with CSS.
  - [ ] That means you can re-activate them later without rebuilding the structure.

**TL;DR:** Always paste content into the matching named section on the new page. Don't "freestyle" new rows.

---

### 8. Mirror page content block-by-block (source → target)

- [ ] In the source org, open the donation page in **Edit** mode.
- [ ] In DevTools on that page (optional trick):
  - [ ] Find layout classes like `left-left`.
  - [ ] Temporarily change them in the inspector to match the target layout class (e.g. `center-center-2-col`) purely for visual comparison.
  - [ ] This just changes what *you* see, not production.
- [ ] Now, top to bottom, clone the page into the target org:
  - [ ] For each visible content block (hero/title, intro copy, trust badges, side column appeal text, etc.):
    1. Click **Edit** on the block in SPCAI.
    2. Click **Source View** in the WYSIWYG editor.
    3. Copy the raw HTML from Source View.
    4. In the target org's matching section (same ENGrid section name), edit that block.
    5. Paste the HTML into Source View there.
- [ ] For logos and images:
  - [ ] It is OK at scaffold stage to paste the source org's logo and images directly into the new draft.
  - [ ] Make a note of all assets for which you'll need to replace and put a running list in Productive with a subtask to replace them at a later date if need be.
- [ ] For the donation form block:
  - [ ] Edit the form in the source EN account.
  - [ ] Click the paint/palette icon to view custom classes (styling hooks).
  - [ ] Copy all those classes.
  - [ ] In the target org's equivalent form block, paste/add those same classes.
- [ ] Rebuild each form field:
  - [ ] Add the same fields in the same order (First Name, Last Name, Email, Amount, Frequency, Payment Type, etc.).
  - [ ] Mark hidden fields as hidden if they're hidden in the source page.
  - [ ] Set the same default amounts/frequency.
  - [ ] Apply the same labels / help text.
  - [ ] **IMPORTANT:** field internal names often differ by account.
    - [ ] Example: "Email" could be `email`, `Email`, `e-mail`, etc.
    - [ ] Frequency/Amount/Payment fields are especially likely to have different internal names or wording.
  - [ ] If you hit a mismatch you can't resolve (field doesn't exist in the new page, etc.), write it down and keep moving. Add this to your running checklist in Productive.
- [ ] Continue down the page:
  - [ ] Sidebar ask modules,
  - [ ] Match language,
  - [ ] Security/trust seals,
  - [ ] Footer CTA / recurring upsell / legal copy.
  - [ ] Also copy any decorative "spacer" blocks to the same named spacer sections.
- [ ] Repeat all of this for the **Thank You page**:
  - [ ] Copy the confirmation headline, receipt language, tax language, follow-up CTA, recurring ask upsell, etc.
  - [ ] Note: Thank You pages are often one-column. If Column 2 is empty, that's fine. Just leave it empty in the new page.
  - [ ] Make a note of any content that will need replacing and add it to the running checklist in Productive.

Your goal is **STRUCTURAL PARITY**, not final branding or copy approvals.

---

### 9. Preview and QA for parity

- [ ] Open/preview the old reference donation page in one tab.
- [ ] Open/preview your new donation page in another tab.
- [ ] Visually compare:
  - [ ] Section order from top to bottom.
  - [ ] Padding and spacing.
  - [ ] Form styling (input borders, button style, etc.).
  - [ ] Hero/banner/background behavior.
- [ ] Do the same with both Thank You pages.
- [ ] They should look essentially identical, just with the old branding still showing in the new client account.

If the two pages look the same, the scaffold is correct.

---

### 10. After scaffold

- [ ] Swap in correct branding:
  - [ ] Replace SPCAI logos/images/text with the new org's assets.
  - [ ] Update mission copy, tax/legal copy, etc.
- [ ] Check all code:
  - [ ] In the `custom-code` section at the bottom, move over any JS/CSS you need.
  - [ ] Make sure you are NOT accidentally firing the source org's Google Tag Manager container or analytics in the new org. Comment out the old GTM code until you have the new org's container.
- [ ] Save reusable blocks into the new org's Component Library in Engaging Networks (header blocks, legal language blocks, etc.), once you're confident they're stable.
- [ ] Keep a short punch list of:
  - [ ] Missing fields you couldn't recreate,
  - [ ] Any styling classes that didn't carry over,
  - [ ] Any layout differences you couldn't solve.

---

## TL;DR Quick Hit Checklist

1. Create a new ENGrid repo for the new org and (if possible) swap names/colors.
2. Log into both Engaging Networks accounts (source + target) side by side.
3. In source, identify the "good" donation page (inside the Ω# folder) and open it in Edit.
4. In target:
   - Create matching Ω# folder.
   - Create a new Donation Page with the right ENGrid template.
   - Add a test gateway under Donation Settings.
   - Save + reopen.
5. Install TamperMonkey and the ENGrid script from `engrid.4sitestudios.com`.
6. In the new Donation Page:
   - Delete default row.
   - Add Advanced Row / Custom Layout.
   - Click the TamperMonkey button to auto-generate all ~18 ENGrid sections.
7. Repeat Step 6 for the Thank You page.
8. For each section (top → bottom):
   - Copy HTML from Source View in SPCAI.
   - Paste HTML into Source View in ATS in the matching named section.
   - Rebuild the form with the same classes, fields, defaults, and hidden fields.
9. Preview both pages (SPCAI vs ATS) side by side.
10. If they look the same, you're scaffolded. Branding/content/analytics swaps come next.

