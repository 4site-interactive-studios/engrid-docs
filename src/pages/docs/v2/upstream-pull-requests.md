---
title: ENgrid Change Management and Deployment Process
description: This page documents the procedure for rolling out changes in ENgrid, with a focus on the upstream `engrid-scripts` package and its integration into client child themes.
---

This page documents the procedure for rolling out changes in ENgrid, with a focus on the upstream `engrid-scripts` package and its integration into client child themes.

- ENgrid Scripts: A shared codebase for all ENgrid clients.
- Client Child Themes: Custom themes that depend on the `engrid-scripts`.

## Process for Updating ENgrid Scripts

### 1. CSS only additions

- If your change is new CSS only, that will not impact any existing style, you can merge and deploy directly to `engrid-scripts`. Otherwise you need to follow the process below.

### 2. PR and Productive Task Creation

- The developer creates a new feature or update and prepares a Pull Request (PR) assigned to Fernando.
  - A detailed task description.
  - A link to a test page demonstrating the feature.
- The developer creates a sub-task in Productive for Fernando’s review the PR assigned for the same day with a ballpark estimate.
- When Fernando or the PM see’s the task, they will adjust the estimate/due date as needed to not disrupt any other scheduled work.

### 3. Review and Publishing

- Fernando exclusively reviews the PR.
- Once approved, Fernando publishes an updated version of `engrid-scripts` and updates the sub-task in Productive.

### 4. Deployment

- Immediate Client Update: If a client is already using the latest `engrid-scripts`, and has QA and approved your update, you have the option of deploying it immeditely to the live client account.
- Scheduled Rollout: For clients on older versions of engrid-script, they will receive the update during their next scheduled ENgrid upgrade; which is usually monthly or quarterly.
