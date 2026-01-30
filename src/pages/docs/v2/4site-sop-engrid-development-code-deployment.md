---
title: "4Site SOP: ENgrid Development & Code Deployment"
---

## **1\. Objective**

To ensure the stability of live client pages, prevent version regression, and maintain quality assurance across all ENgrid Engaging Networks deployments. This process specifically addresses protocols for pushing code to active accounts and managing front-end changes that impact multiple clients.

## **2\. Authorized Personnel**

Strict access control applies to active Engaging Networks accounts.

- **Approved Deployers:** Only **Fernando, Michael T., and Bryan** are authorized to push code live to _active_ Engaging Networks accounts.
- **Other Developers:**
  - May NOT push code to active accounts without explicit, case-by-case authorization.
  - Authorization can only be granted by **Fernando** or **Michael T.**
  - Even with authorization, Junior Developers must not deploy in isolation (see _Communication Protocols_).
- **Dev Support POC:** Every developer task must have a defined **Dev Support Point of Contact** listed in the Productive task. This POC must be either Fernando, Bryan, or Michael T.

## **3\. Pre-Deployment & Development Protocols**

### **A. Version Control & Asset Management**

- **Check ENgrid Versions:** Before committing code or building files, developers must ensure their local environment matches the client's current live ENgrid version.
  - _Risk Mitigation:_ This prevents overwriting a newer live version with an older local build (a known issue that causes regression).
- **Front-End Multi-Client Updates:**
  - Any front-end work (CSS/JS) that touches multiple clients (e.g., updates to the **Promo Plugin**) must undergo a mandatory Code Review & QA by the **Director of Development (Fernando)** before implementation.
  - _Note:_ This is to ensure CSS updates intended for one platform (e.g., EveryAction) do not negatively impact the visual layout of Engaging Networks forms.

### **B. Communication Protocols**

- **No Siloed Deployments:** Communication regarding pushing code live must **never** happen via Slack Direct Message.
- **Public Slack Channels:** All requests, approvals, and confirmations regarding deployment must occur in the public project Slack channel or the dedicated ENgrid channel.
  - _Reasoning:_ This ensures the wider team has visibility on changes, allowing others to flag potential conflicts or errors immediately.
- **Productive as source of record:** The Productive task must also be updated to confirm explicit consent for deployment.

## **4\. Deployment Procedure**

### **Step 1: Verification**

- **Verify Client Account:** Ensure you are logged into the correct Engaging Networks server (e.g., verify US vs. Canada accounts).
- **Verify Local Assets:** Double-check that the file folder open on your machine matches the client you are uploading to.

### **Step 2: Deployment**

- Ensure you are on the right Engaging Networks folder (usually called “Ω 4Site \- ENgrid” or “Ω1. 4Site Live \- ENgrid Page Template and Components” \- [ref](https://engrid.4sitestudios.com/docs/v2/en-account-buildout#en-uploaded-assets))
- Upload the assets to the verified Engaging Networks account.

### **Step 3: Mandatory Post-Deployment Testing**

**All deployments to active accounts require a Live Donation Test.**

1. **Clear Cache/Cookies:** Ensure you are viewing the most recent version of the page.
2. **Visual Verification:** Navigate to the client’s main donation page to ensure assets are loading correctly and layout integrity is maintained.
3. **Live Transaction:** Perform a **real** (live) donation.
   - **Location Requirement:** The donation must be made from the **United States** (to ensure proper handling of state/region codes and address validation).
   - _Why Live?_ Test donations often miss specific CSS issues (such as a hidden submit button) or gateway rejections that only occur in live environments.
4. **Refund:** Immediately request a refund for the live donation using the [live donation testing refund form](https://docs.google.com/forms/d/1IlnKH87YDPTkwsac9szuqNSALbMf0YwteDBSTwomai8/viewform)

## **5\. Emergency & Rushed Timelines**

- **No Exceptions:** Even during high-pressure periods (e.g., End of Year, Giving Tuesday, or last-minute client requests), **steps 1–3 of the Deployment Procedure are mandatory.**
- Rushed timelines often lead to errors (e.g., cookie suppression bugs, version mismatches). If a timeline does not allow for this process, the deployment must be flagged to the Project Manager and/or Director of Development immediately.
