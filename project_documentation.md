# DevOpsIQ Developer Documentation & Interview Playbook

This document is your comprehensive guide to the **DevOpsIQ** codebase. It outlines the technology stack, component structures, core UI/UX interaction logic, and custom animations. Use this playbook to quickly recall how the application functions and how to implement edits during your interview.

---

## 1. Technology Stack

DevOpsIQ is a modern, single-page marketing and product site designed with premium aesthetics and high-performance animations:

*   **Vite**: A fast Next-Gen front-end tooling bundler used for hot module replacement (HMR) and production builds.
*   **React (v18+)**: Powers the UI components, interactivity states, and custom hooks.
*   **Tailwind CSS (v3)**: A utility-first CSS framework configured to style layouts, responsiveness, and grid spaces.
*   **Lucide React**: Vector-based icon library representing stages, telemetry, and capabilities.
*   **PostCSS / Autoprefixer**: Handles cross-browser CSS compilation.

---

## 2. File Directory Structure

The project has a minimalist, clean front-end structure:

```
├── package.json          # Dependency configurations & script commands
├── tailwind.config.js    # Tailwind layout overrides and fonts
├── index.html            # Main HTML wrapper (attaches app root element)
└── src/
    ├── main.jsx          # All React rendering, states, data and components
    └── styles.css        # CSS imports, Tailwind directives and custom keyframe animations
```

---

## 3. Codebase Walkthrough: `src/main.jsx`

The file is organized into:
1.  **Static Configuration Data** (Capabilities, Lifecycle Stages, Navigation)
2.  **Hooks** (`useStaggerReveal`)
3.  **UI Components** (`Header`, `HeroVisual`, `CapabilityCard`, `LifecycleCard`, `ArchitectureSection`)
4.  **Root Component** (`App`)

### Static Data Arrays (Lines 10 - 27)
Modify these arrays to change text, stats, icons, or color configurations:
-   `capabilities`: Objects containing title, description, badge tags, stats, and long detail explanations.
-   `lifecycle`: 6 DevOps pipeline stages (Plan, Code, Build, Deploy, Operate, Optimize) mapped with specific accents.

---

### UI Core Components

#### A. Interactive Hero Console: `HeroVisual` (Lines 104 - 315)
This component renders the interactive DevOps intelligence console on the right side of the hero section.

```javascript
// Active state handlers
const [hoveredIdx, setHoveredIdx] = useState(null)
const [activeIdx, setActiveIdx] = useState(0)

// Cycles through stages when no hover is active
useEffect(() => {
  if (hoveredIdx !== null) return;
  const interval = setInterval(() => {
    setActiveIdx((prev) => (prev + 1) % nodes.length);
  }, 3500);
  return () => clearInterval(interval);
}, [hoveredIdx]);
```

*   **SVG Connection Paths**: Coordinates (`x`, `y` from `0` to `100`) match absolute positions of floating nodes, rendering laser-like SVG lines (`<line>`) that connect to the center circle.
*   **`.dash-flow` Class**: A stroke-dasharray SVG line that shimmers with flowing particles to represent code commits and deployments.
*   **DevOps Telemetry Panels**: Absolute glassmorphic panels displaying simulated Kubernetes Pod status (`GKE_SYS_MONITOR`) and active `DORA_ANALYTICS`.

---

#### B. Floating Capability Cards: `CapabilityCard` (Lines 317 - 384)
Handles the layout of individual capabilities cards.
*   **Independent Expand State**: Uses `expandedIdx` from the parent to ensure only the clicked card is expanded.
*   **Float Overlay (`.cap-detail-overlay`)**: Rendered using absolute overlays positioned below the clicked card. This ensures that expanding a card **does not shift or warp** neighboring cards, preserving layout grid stability.
*   **Outside Click Close Hook**: Implements an event listener that collapses the detail panel when clicking outside.

---

#### C. Continuous DevOps Pipeline: `LifecycleCard` (Lines 386 - 424)
Represents a continuous pipeline stage with top-border color gradients, a stage badge, and connecting status indicators.
*   **Stagger Reveal Style**: Receives progressive transitions to animate cards one-by-one as they enter the screen.

---

#### D. Connected Architecture Flow: `ArchitectureSection` (Lines 426 - 576)
Renders a connecting network tree flow (Toolchain → Intelligence Fabric → Action tags).
*   **Flowing Connector Lines**: Connecting arrows inside `.arch-connector-line` contain moving particles (`.arch-particle`) that slide left-to-right to symbolize automated integration fabric.

---

### Custom Intersection Observer Hook: `useStaggerReveal`
A reusable viewport listener that registers container elements:
```javascript
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const revealIdx = entry.target.getAttribute('data-reveal');
        setVisibleMap(prev => ({ ...prev, [revealIdx]: true }));
      }
    });
  },
  { threshold }
);
```
Applying this hook dynamically populates `visibleMap` objects that activate fade-in and slide-up CSS transformations in stagger sequences.

---

## 4. CSS & Styling: `src/styles.css`

Includes custom variables, base rules, layout adjustments, and keyframe animations:

### A. Dark / Light Mode Transition
Toggled by writing the class `.dark` directly on the document element root inside `main.jsx`'s `App` effect:
```javascript
useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])
```
Tailwind utility prefixes like `dark:bg-ink` automatically listen to this class.

### B. Core Animations
*   `@keyframes dashFlow`: Shifts SVG `stroke-dashoffset` from `100` to `-100` continuously, making connector lines flow with energy.
*   `@keyframes pipelineFlow`: Moves the horizontal pipeline beam overlay across the continuous Lifecycle section.
*   `@keyframes barGrow`: Animates the height scale of production chart telemetry from `0` to full size.
*   `.animate-float`: A continuous floating translation that applies smooth vertical drift to the Hero graphic.

---

## 5. Interview Cheat Sheet: Quick Customization Guide

During your interview, you might be asked to make manual layout edits. Here is how to execute them on the spot:

### Q1: "How do I change the details or metrics inside the Capabilities cards?"
1. Open [main.jsx](file:///c:/Users/LENOVO/Documents/New%20project/src/main.jsx).
2. Go to `const capabilities = [...]` (around Line 10).
3. Edit the `stat` (e.g., `'70%'`), `statText` (e.g., `'faster migrations'`), or `detail` field of the chosen card object.

### Q2: "How do I change the color of a pipeline stage in the Lifecycle section?"
1. Go to `const lifecycle = [...]` (around Line 20).
2. Change the `color` hex string of the stage (e.g., `color: '#a78bfa'` for PLAN). The top accent, badge glow, active indicator, and connection arrows will automatically update.

### Q3: "How do I modify node labels, positions, or logs in the Hero graphic?"
1. Look for the `nodes` configuration array inside the `HeroVisual` component (Line 105).
2. To edit positions, adjust the Tailwind class in the `pos` field (e.g., `'top-[3%] left-[35%]'`).
3. If you move a node, adjust its `x` and `y` coordinate percentages to match. For instance, if you shift `pos` to `left-[40%]`, change `x: 40`. The SVG connecting line will realign itself automatically.
4. Modify `cmd`, `log`, and `status` strings to change the terminal feed output.

### Q4: "How do I adjust the speed of the flowing particles or animations?"
1. Open [styles.css](file:///c:/Users/LENOVO/Documents/New%20project/src/styles.css).
2. Locate the `.dash-flow` or `.pipeline-beam::after` classes.
3. Change the duration value (e.g., `animation: dashFlow 3s linear infinite;` to `1.5s` for twice the speed).
