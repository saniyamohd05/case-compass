

# ArguMind -- Complete UI/UX Overhaul and Feature Upgrade

## Overview

Transform ArguMind from a dark enterprise theme to a warm white/beige/light-brown theme, rename agents to Clara/Lexor/Verdicta, add infinite marquee, enhanced animations, dedicated Voice AI page, and integrate uploaded media assets -- all while preserving existing functionality.

## What Changes

### 1. Theme Overhaul: White + Beige/Warm Brown

**File: `src/index.css`** -- Complete CSS variable rewrite

Current dark navy theme becomes a warm light theme:
- Background: warm white (#FAFAF8)
- Cards: white with subtle warm border (#F0EDE8)
- Primary: warm brown/amber (#8B6914 or similar)
- Text: dark charcoal (#1A1A1A)
- Muted text: warm gray (#7A7468)
- Accents: beige, cream, light brown tones
- Scrollbar updated to match warm palette
- `.enterprise-card` updated with white bg + warm border
- `.btn-primary` warm brown/amber tones
- `.input-field` light beige background

**File: `tailwind.config.ts`** -- No structural changes, just relies on CSS vars

### 2. Agent Renaming: Clara, Lexor, Verdicta

**File: `src/lib/mockAgents.ts`**
- `runClerk` renamed to `runClara` (Case Organizer)
- `runDevil` renamed to `runLexor` (Risk Analyzer)  
- `runStrategist` renamed to `runVerdicta` (Decision Scorer)
- Update all output text to reference new names

**File: `src/pages/Loading.tsx`**
- Steps reference "Clara", "Lexor", "Verdicta" with updated descriptions:
  - "Clara is organizing your case..."
  - "Lexor is analyzing risks..."
  - "Verdicta is preparing recommendation..."
- Add animated agent orb/icon per step with pulsing animation

**File: `src/pages/Landing.tsx`**
- Agents section updated with Clara, Lexor, Verdicta names and roles

**File: `src/pages/Results.tsx`**
- References updated from clerk/devil/strategist labels

### 3. Landing Page Enhancements

**File: `src/pages/Landing.tsx`** -- Major rewrite

- **Hero**: Two-column layout. Left: headline "Think Before You Sue." + subheadline + buttons. Right: 3D HeroScene (already exists)
- **Marquee Section**: Infinite scrolling horizontal tag strip below hero with items: "Legal Risk Analysis", "Consumer Disputes", "Employment Issues", etc. Uses CSS animation (translateX infinite loop), duplicated content for seamless scroll
- **Who It Helps**: Cards for Tenants, Employees, Freelancers, Small Businesses
- **Features**: AI Case Analysis, Risk Intelligence, Evidence Checklist, Decision Dashboard
- **Agents**: Clara, Lexor, Verdicta with animated orb indicators  
- **Media Section**: Incorporate uploaded images and video (`hammer.jpg`, `terms.jpg`, `legal.jpg`, `legal-video.mp4`)
- **Security + CTA + Footer**: Preserved with warm theme colors

### 4. Infinite Marquee Component

**New file: `src/components/Marquee.tsx`**

- Horizontal infinite scroll of tag pills
- Pure CSS animation using `@keyframes marquee` with `translateX(-50%)`
- Content duplicated for seamless loop
- Tags: Legal Risk Analysis, Consumer Disputes, Employment Issues, Tenant Conflicts, Freelancer Payments, Contract Breaches, Evidence Checklist, Time & Cost Estimation, Decision Intelligence, Smart Legal Choices, AI Case Analysis

### 5. Enhanced Loading Page (Animated Agent Reasoning)

**File: `src/pages/Loading.tsx`**

- Each agent step shows a glowing animated orb (Framer Motion)
- Agent name + role displayed with typewriter-style text reveal
- Progress bar with smooth gradient animation
- Step transitions with fade + scale animations

### 6. Dedicated Voice AI Page

**New file: `src/pages/VoiceAssistant.tsx`**

- Full-page voice assistant interface
- Large microphone button with pulsing animation when active
- Speech-to-text captures input, displays live transcript
- "Analyze" button sends captured text to the analysis flow
- Text-to-speech reads back a brief summary
- Uses existing `VoiceAgent` component logic, expanded to full page

**File: `src/App.tsx`** -- Add route `/voice`

### 7. Dashboard Sidebar Layout

**File: `src/pages/Dashboard.tsx`** -- Restructure with sidebar

- Add sidebar navigation: New Analysis, History, Voice Assistant, Profile, Logout
- On mobile: sidebar becomes bottom nav or collapsible
- Main content area shows existing stats + analyses table
- Warm beige card styling throughout

### 8. Results Page -- Add ScoreGauge

**File: `src/pages/Results.tsx`**

- Replace plain text viability score with the existing `ScoreGauge` component (circular animated gauge)
- Add "Alternative Actions" section (mediation, complaint portals, demand letter, negotiation)
- Maintain What-If simulation, risk breakdown, reasoning sections

### 9. HeroScene Color Update

**File: `src/components/HeroScene.tsx`**

- Update glass card colors from blue/purple to warm amber/brown/gold tones to match new theme
- Point lights updated to warm tones

### 10. Updated Media Assets

- Use the already-copied images (`hammer.jpg`, `terms.jpg`, `legal.jpg`) and video (`legal-video.mp4`) in the Landing page media gallery section
- Warm rounded card treatment for images

### 11. ScrollReveal Animations

Already exists in `src/components/ScrollReveal.tsx` -- will be used throughout Landing page sections for staggered reveal animations.

---

## Technical Details

### Files Modified (11)
1. `src/index.css` -- Theme variables + scrollbar + component classes
2. `tailwind.config.ts` -- Add marquee keyframe animation
3. `src/pages/Landing.tsx` -- Two-column hero, marquee, agent rename, media
4. `src/pages/Loading.tsx` -- Agent rename + enhanced animations
5. `src/pages/Results.tsx` -- ScoreGauge integration + alternatives section
6. `src/pages/Dashboard.tsx` -- Sidebar layout
7. `src/pages/Auth.tsx` -- Warm theme styling
8. `src/lib/mockAgents.ts` -- Rename functions to Clara/Lexor/Verdicta
9. `src/components/Navbar.tsx` -- Warm theme colors
10. `src/components/HeroScene.tsx` -- Warm color palette
11. `src/App.tsx` -- Add /voice route

### Files Created (2)
1. `src/components/Marquee.tsx` -- Infinite scrolling tag marquee
2. `src/pages/VoiceAssistant.tsx` -- Dedicated voice AI page

### No Database Changes Required
All changes are frontend-only. Existing database schema and auth system remain untouched.

### Approach
- Implement theme change first (CSS variables), which cascades to all pages automatically
- Then update Landing page with marquee + agent names + layout
- Then Loading, Results, Dashboard, Voice pages
- Finally verify all pages render correctly with warm palette

