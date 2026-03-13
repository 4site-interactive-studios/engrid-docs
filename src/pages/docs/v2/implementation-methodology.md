---
title: Implementation Methodology
description: How ENgrid implementations are structured, from project planning through launch and ongoing support
---

4Site follows a structured waterfall methodology for ENgrid implementations that provides clarity, accountability, and a clear roadmap at every stage. This page describes the typical phases of an ENgrid buildout and what to expect during each one.

---

## Implementation Phases

### 1. Project Planning

The engagement begins with a structured kickoff to align goals, scope, and roles. This phase produces a detailed project plan with milestones, communication protocols, and risk mitigation strategies.

**Key activities:**
- Kickoff meeting to confirm scope and success criteria
- Detailed project plan with milestones and deliverables
- Communication protocols and meeting cadence established
- Risk identification and mitigation strategies

### 2. Discovery

Requirements are gathered through collaborative sessions with your team. This phase explores functional needs, existing systems, and any integration requirements to produce a final implementation plan.

**Key activities:**
- Requirements gathering across fundraising, advocacy, and digital teams
- Review of existing page templates, branding, and content
- Functional testing of current systems
- Final implementation plan and scope confirmation

### 3. Visual Design

4Site's design team collaborates closely with your organization to create high-fidelity Figma mockups representing page templates and form layouts. Designs are accessible, mobile-first, and aligned with your brand standards.

**Key activities:**
- Creation of branded, accessible page designs (donation, advocacy, and other page types)
- Iterative review cycles with your stakeholders
- Performance and conversion best practices applied
- Final design approval provides the foundation for scalable execution

### 4. ENgrid Template Build and Configuration

Your approved designs are translated into ENgrid page templates. This includes configuring Engaging Networks settings, building custom page templates using the ENgrid framework, and developing any custom functionality that extends beyond native EN capabilities.

**Key activities:**
- ENgrid client theme creation and configuration
- Custom page template development
- Payment processing setup and testing
- Custom code development for functionality not covered by native EN or core ENgrid features

### 5. Internal QA and Refinement

Before your team begins testing, 4Site conducts rigorous internal quality assurance including cross-browser and cross-device validation. Identified issues are triaged and resolved to ensure your User Acceptance Testing is smooth and productive.

**Key activities:**
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Cross-device testing (desktop, tablet, mobile)
- Accessibility testing against WCAG standards
- Payment processing validation
- Performance testing

### 6. Training

Role-based training sessions are delivered for administrators, content editors, and developers, supported by tailored documentation. Training follows the buildout so that all materials and sessions use live, relevant examples.

**Key activities:**
- Administrator training on Engaging Networks and ENgrid management
- Content editor training on page builder workflows and ENgrid helper classes
- Developer training on the ENgrid codebase and deployment process
- Documentation including system configuration guides, process checklists, and code repository orientation
- Orientation to the [ENgrid Documentation Portal](/)

### 7. User Acceptance Testing (UAT)

Your team validates the end-to-end solution against requirements using structured test scripts. Issues are tracked and resolved until final sign-off, ensuring stakeholder confidence before launch.

**Key activities:**
- Structured test scripts covering all page types and user flows
- Feedback collection and triage
- Fix verification and re-testing
- Final stakeholder sign-off

### 8. Launch

Final content updates and go-live coordination. Launch only occurs after all critical UAT feedback is addressed.

**Key activities:**
- Final content updates and last-minute adjustments
- Go-live coordination with your team
- DNS and domain configuration (if applicable)
- Transition from staging to production

### 9. Post-Launch Support

Monitoring of live transactions and immediate post-launch support to address any issues that arise after go-live.

**Key activities:**
- Transaction monitoring
- Bug triage and resolution
- Performance monitoring
- Transition to ongoing support retainer

---

## Typical Timeline

A standard ENgrid implementation runs approximately 15 to 18 weeks. Each phase flows sequentially, with selective overlap where dependencies allow.

| Weeks | Phase | Duration |
| ----- | ----- | -------- |
| 1–3 | Project Planning | 3 weeks |
| 1–5 | Discovery | 5 weeks |
| 2–5 | Visual Design | 4 weeks |
| 4–9 | ENgrid Template Build & Configuration | 6 weeks |
| 10 | Internal QA & Refinement | 1 week |
| 11–14 | Training + User Acceptance Testing | 4 weeks |
| 15 | Launch | 1 week |
| 16–17 | Post-Launch Support | 2 weeks |
| 18+ | Ongoing Support Retainer | Continuous |

{% callout title="You should know!" %}
Timelines can be extended by four to eight additional weeks to accommodate longer review cycles or limited staff availability. 4Site works with each organization to tailor a timeline that matches your team's needs.
{% /callout %}

---

## Client Roles During Implementation

A successful implementation requires active participation from your team. Below are the typical roles and estimated effort levels across each phase.

| Role | Planning | Design | Build | QA/UAT | Training/Launch |
| ---- | -------- | ------ | ----- | ------ | --------------- |
| **Project Lead** | Heavy | Heavy | Moderate | Heavy | Moderate–Heavy |
| **Executive Sponsor** | Light | Light | Light | Light | Light |
| **Business SMEs** (Fundraising, Advocacy, Digital) | Moderate | Moderate | Light | Heavy | Light |
| **IT Liaison** | Light | Light | Light | Moderate | Moderate |
| **Content Admins** | — | — | — | — | Light |

### Project Lead

Your primary internal lead who coordinates stakeholders, consolidates feedback, and drives decisions. This role should plan for a sustained 50–75% weekly time commitment to meet review cycles, unblock decisions, and maintain momentum.

### Executive Sponsor

Provides strategic alignment, rapid decision support, and milestone approvals. Effort is light and concentrated during the Planning, Design, and Launch phases.

### Business SMEs

Subject matter experts from fundraising, advocacy, digital, and content teams who provide requirements, review designs, validate testing, and supply content. Effort is moderate during Planning and Design, light during Build, and heavy during UAT.

### IT Liaison

Handles DNS and domain setup, security review, environment access, and light technical validation. Effort is light with brief spikes before launch.

### Content Admins

Attend role-based training sessions. Effort is concentrated during the Training and Launch phase.

---

## What Can Start Before Data Migration

All ENgrid components — page templates, form configurations, training content — can be built without dependency on data conversion or CRM migration. This means page templates, the ENgrid framework, and training preparation can safely proceed ahead of final data loads, enabling early stakeholder review and reducing the critical path to launch.

---

## Staging and Code Previews

Throughout the implementation, all ENgrid code changes are staged for your QA before being merged to production. For details on the preview system and deployment process, see [Release Cycle & Code Updates](/docs/v2/release-cycle).
