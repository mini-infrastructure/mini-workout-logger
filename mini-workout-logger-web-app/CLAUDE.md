# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Type-check + production build
npm run lint       # ESLint
npm run preview    # Preview production build
```

No test runner is configured.

## Environment

Copy `.env.example` to `.env`. Default values:

```
VITE_API_URL=/api
VITE_API_LANGUAGE=en_US
```

The Vite dev server proxies `/api/*` → `http://localhost:9090/*` (see `vite.config.ts`). The Spring Boot backend must be running separately.

---

## Architecture

### Data flow

```
View → custom hook (useXxx) → Service (axios) → Spring Boot backend
```

- **Services** (`src/app/services/`) are singleton class instances. They prepend `VITE_API_URL` and pass `lang` as a query param for i18n. All responses follow `ApiResponseDTO<T>` (`data`, `pagination`, `errors`).
- **Hooks** (`src/app/hooks/`) own fetch lifecycle (loading/error state, debounce). Array/object deps use `JSON.stringify(...)` in `useEffect`.
- **DTOs** (`src/app/dtos/`) are plain TypeScript interfaces. Read DTOs and Write DTOs are separate files.
- **Models** (`src/app/models/`) hold enum types and option/icon/variant maps used in UI.

### Styling — Emotion CSS-in-JS

All styles use `@emotion/react` with the `css` prop (enabled via `jsxImportSource` in `vite.config.ts`). The theme object (`src/app/themes/theme.ts`) is mapped to CSS custom properties in `src/app/themes/global.ts`. Always use CSS variables (e.g. `var(--color-blue)`, `var(--stack-gap-normal)`) — never raw values.

### Muscle codes

Muscles in the backend are stored as i18n keys (`Muscle.Chest`, `Muscle.Adductor_Magnus`, etc.). `Text.getCode()` returns the key; `Text.getValue()` returns the translated display name. **Always filter and match by code**, never by translated value. The `root_muscles` field on exercises and the `code` field on muscles both contain raw codes.

---

## Component conventions

Every component follows this structure:

```
src/app/components/<name>/
    <name>.component.tsx        ← component logic
    <name>.component.style.tsx  ← all styles, exported as default `styles` object
```

No barrel `index.ts` files. Import directly from the `.tsx` file.

**Props type:**

```tsx
export type MyComponentProps = {
    value: string;
    onChange?: (value: string) => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];  // always include for overridability
};
```

**Component signature:**

```tsx
const MyComponent = ({ value, onChange, customCss }: MyComponentProps) => { ... };
export default MyComponent;
```

Rules:
- Function components only. No class components.
- No prop spreading.
- Custom hooks for any stateful or async logic.
- **Never put margin or spacing on a component's root element.** Spacing is always the parent's responsibility, applied via `customCss` from the parent or layout styles.
- The `customCss` prop is applied at the root element and accepts a single value or an array.

**Style file pattern:**

```tsx
import { css } from '@emotion/react';

const styles = {
    container: css({ ... }),
    header: css({ ... }),
};

export default styles;
```

Use only CSS variables from the design system. No hardcoded colors, sizes, or spacing. The available variables are defined in `src/app/themes/global.ts`.

---

## HumanBody component

`src/app/components/human-body/`

### What it does

Renders an interactive SVG of the human muscular system. Muscles can be:
- **Selected** (blue fill) — chosen by the user as a filter
- **Highlighted** (orange fill) — shown as worked muscles in read-only contexts
- **Hovered** — brightness increased via a JS-managed CSS class

### SVG contract

The SVG file lives at `public/front.svg`. To replace it, drop in a new file at the same path. The component discovers muscles by querying `[id^="Muscle."]` — any SVG element whose `id` starts with `Muscle.` is treated as a muscle. The ID must match a muscle `code` in the database exactly (e.g. `id="Muscle.Pectoralis_Major"`).

Elements without a `Muscle.*` ID (outlines, decorative shapes) are inert — no special treatment needed. Nesting is supported: a path inside `<g id="Muscle.Quadriceps">` inside `<g id="Muscle.Thighs">` will correctly identify `Muscle.Quadriceps` as the hovered/clicked element via `.closest('[id^="Muscle."]')`.

### Why the SVG is loaded imperatively

The SVG is fetched with `fetch('/front.svg')` and inserted via `containerRef.current.innerHTML = svgText` — **not** through `dangerouslySetInnerHTML` or React state. This is intentional and must not be changed.

React reconciles `dangerouslySetInnerHTML` on every re-render. Even when the string hasn't changed, the reconciliation resets the inner DOM, wiping manually-managed CSS classes (`muscle--selected`, `muscle--hovered`, etc.) and causing visible flashing. By inserting the SVG imperatively once on mount and never touching it again through React, the SVG DOM is fully owned by the event handlers and the class-sync effect.

A `svgLoaded: boolean` state flag signals to other effects that the SVG is in the DOM and ready to be queried.

### Why tooltip updates bypass React state

Mouse position and tooltip content are written directly to DOM refs (`tooltipRef`, `nameRef`, `rootRef`) via `.style` and `.textContent`. There is no `setTooltip` state call. This means `mousemove` produces zero React re-renders, which is essential — re-renders from `setTooltip` would have the same destructive reconciliation effect described above.

### CSS classes and the global stylesheet

Muscle state is communicated entirely through CSS classes on SVG elements. These classes are defined in `globalMuscleStyles` (exported from the style file and injected with Emotion's `<Global>`):

| Class | Applied to | Effect |
|---|---|---|
| `muscle--selected` | SVG group element | Blue fill (`var(--color-blue)`) |
| `muscle--highlighted` | SVG group element | Orange fill (`var(--color-orange)`) |
| `muscle--hovered` | SVG group element | `filter: brightness(1.5)` |
| `muscle--interactive` | Container div | `cursor: pointer` on all muscle elements |

**Do not use CSS `:hover` for the hover brightness effect.** CSS `:hover` propagates to all DOM ancestors, so hovering a child muscle would incorrectly highlight its parent group too. The `muscle--hovered` class is managed by the `mousemove` handler via `hoveredRef`, which removes the class from the previous element before adding it to the new one.

### Tooltip content

The tooltip shows two lines:
1. **Primary** — the muscle's English display name (from the `/muscles` API with `lang=en_US`)
2. **Secondary** — the root ancestor's name (resolved by walking `parent_code` up the chain until a muscle with no parent is found). Hidden when the hovered muscle is itself a root.

The name map (`nameMapRef`) is populated once on mount via `MuscleService.getAll('en_US')` with `size=500` to ensure all muscles are returned (the default page size is 20, which excludes leg muscles and others beyond the first page).

### Props

| Prop | Type | Description |
|---|---|---|
| `selectedMuscles` | `string[]` | Codes of currently selected muscles. Drives `muscle--selected` class. |
| `onSelectionChange` | `(muscles: string[]) => void` | If provided, the component is interactive. Click toggles the clicked muscle in the array. |
| `highlightedMuscles` | `string[]` | Codes of muscles to highlight (read-only, e.g. in workout visualization). |

Omitting `onSelectionChange` renders the component in read-only mode (no cursor pointer, no click handling).

### Adding a new muscle to the system

1. Add the muscle to the backend seeder SQL (`001_seed_muscles_table.sql`) with `add_muscle('Muscle.NewName', 'Muscle.ParentName')`.
2. Add translations to `messages_en_US.properties` and `messages_pt_BR.properties`.
3. In the SVG, add a group with `id="Muscle.NewName"` containing the relevant paths.
4. No frontend code changes are needed — the component discovers muscles from the SVG and the API dynamically.

---

## UI component catalogue

**Never use raw HTML `<button>`, `<input>`, `<form>`, `<select>`, or `<a>` tags directly in views or feature components.** Always use one of the components below. Raw tags are only permitted inside the implementation of these design-system components themselves.

### Buttons — `src/app/components/button/`

| Component | File | When to use |
|---|---|---|
| `Button` | `button.component.tsx` | Base building block. Used internally by all other button variants. Use directly only when no higher-level variant fits. Accepts `icon`, `clickedIcon`, `isClicked`, `path` (renders as `<Link>`), `customCss`, `customIconCss`. |
| `PrimaryButton` | `button.primary.component.tsx` | Primary call-to-action. Blue filled background, white text. Use for the single most important action on a page (e.g. "Add workout", "Submit"). |
| `SecondaryButton` | `button.secondary.component.tsx` | Neutral bordered button. Use for secondary actions (e.g. "Clear", "Cancel", "Save" in a header). Accepts a `color` prop to tint the label and icon (e.g. `color="var(--color-green)"` for Save, `color="var(--color-red)"` for destructive). |
| `OnlyIconButton` | `only-icon-button.component.tsx` | Icon-only toggle button. Transparent background; tints to a soft color on hover/selected. Use for inline icon actions (complete, skip, delete, favorite). Props: `icon`, `selectedIcon`, `iconColor`, `selectedIconColor`, `selectedBg`, `selected`, `onToggle`, `legend`, `selectedLegend`. |
| `SidebarButton` | `button.sidebar.component.tsx` | Left-nav item. Full-width, left-aligned, highlights the active route. Use only inside the sidebar. |
| `SidebarCollapseButton` | `button-collapse.sidebar.component.tsx` | Expandable sidebar nav item. Use for routes that have child pages (e.g. Exercises → Database / Favorites). |

### Inputs — `src/app/components/input/`

| Component | File | When to use |
|---|---|---|
| `FormBuilder` | `input/form/form.input.component.tsx` | Renders a full form grid from a `FormItem[]` config array. Supports `text`, `email`, `password`, `number`, `textarea`, `select`, `multiselect`, `buttonselect`, `buttonmultiselect` field types. Use for any structured edit form (e.g. the exercise drawer). |
| `Select` | `input/form/select.input.component.tsx` | Styled dropdown selector. Used internally by `FormBuilder` but can be used standalone. |
| `MultiSelect` | `input/form/multiselect.form.input.component.tsx` | Multi-value tag picker. Used for muscles, tags, etc. |
| `ButtonSelect` | `input/form/button.select.input.component.tsx` | Single-select via clickable pill buttons. |
| `ButtonMultiSelect` | `input/form/button.multiselect.form.input.component.tsx` | Multi-select via clickable pill buttons. |
| `SwitchInput` | `input/switch/switch.input.component.tsx` | Toggle switch with on/off icons. Use for boolean settings. |
| `ActionSwitch` | `input/action/action.input.component.tsx` | Animated icon toggle (hamburger → ✕, filter, plus). Use for toolbar toggle buttons that change shape. |
| `Search` | `search/search.component.tsx` | Search bar with leading icon and inline clear (✕) button. Use for any text-filter input. Props: `value`, `onChange`, `placeholder`. |

### Layout & containers — `src/app/components/`

| Component | File | When to use |
|---|---|---|
| `Card` | `card/card.component.tsx` | Rounded container with background `container1`, border, and optional hover/click state. All list-item cards must use this as the root. |
| `Divider` | `divider/divider.component.tsx` | Horizontal rule. Props: `thickness` (`thin` / `medium` / `thick`). Use to separate logical sections within a card or page. |
| `Modal` | `modal/modal.component.tsx` | Centered overlay dialog. Use for confirmations and focused tasks that block the rest of the UI. |
| `DrawerModal` | `drawer-modal/drawer-modal.component.tsx` | Slide-in panel from the right. Use for detail/edit views (e.g. exercise drawer). Accepts `headerButton` for a top-right action. |
| `Layout` | `layout/layout.component.tsx` | Page shell with sidebar + content area. Wrap every view's root with this. |

### Display — `src/app/components/`

| Component | File | When to use |
|---|---|---|
| `Badge` | `badge/badge.component.tsx` | Pill label. Supports `variant` (color), `icon`, `selected`, `onClick` (filter toggle), `onRemove`. Use for tags, properties, filter chips. |
| `Rating` | `rating/rating.component.tsx` | Dot-based level indicator (e.g. difficulty). Props: `levelsInfo`, `selectedLevelLabel`, `variant`. |
| `ProgressBar` | `progress-bar/progress-bar.component.tsx` | Horizontal progress fill. Use for workout execution progress. |
| `Pagination` | `pagination/pagination.component.tsx` | Page navigation (prev/next/first/last). Props: `page`, `totalPages`, `onPageChange`. |
| `Carousel` | `carousel/carousel.component.tsx` | Slide viewer with dot navigation. Props: `children: JSX.Element[]`. Dots overlay the content. |
| `MediaItem` | `media-item/media-item.component.tsx` | Square image tile. Shows `FaImage` placeholder on `--color-container2` when no `src`. Becomes a file-upload trigger when `onUpload` is provided. Props: `src`, `alt`, `size`, `onUpload`. |
| `DropdownMenu` | `dropdown-menu/dropdown-menu.component.tsx` | Contextual action menu triggered by a `⋯` button. Props: `items: DropdownMenuItem[]` — each item has `label`, `icon`, `iconColor`, `onClick`. |
