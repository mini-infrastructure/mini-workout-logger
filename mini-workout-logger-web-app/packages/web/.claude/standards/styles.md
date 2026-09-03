# Styles

## Rule 1 — Use the Emotion `css` prop with object styles, not the `styled` API

All component styles are written as `css({ ... })` objects consumed via the `css` prop. The `styled.div` / `styled.h1` API is not used in this project.

**Why the object form wins here:**
- TypeScript auto-completes CSS property names and their allowed values.
- No polluted DOM (`styled` components sometimes leak style props onto the underlying element).
- No parallel `Styled*` naming to invent for every element.
- Style reuse is trivial via array composition.

**Bad — `styled` API:**
```tsx
import styled from '@emotion/styled';

const StyledCard = styled.div`
    padding: var(--base-size-16);
    background: var(--color-container1);
`;

const StyledTitle = styled.h3`
    font-size: 1.25rem;
`;

const ExerciseCard = ({ exercise }: ExerciseCardProps) => (
    <StyledCard>
        <StyledTitle>{exercise.name}</StyledTitle>
    </StyledCard>
);
```

**Good — `css` prop with object styles:**
```tsx
// index.style.tsx
import { css } from '@emotion/react';

const styles = {
    root: css({
        padding: 'var(--base-size-16)',
        background: 'var(--color-container1)',
    }),
    title: css({
        fontSize: '1.25rem',
    }),
};

export default styles;
```

```tsx
// index.tsx
const ExerciseCard = ({ exercise }: ExerciseCardProps) => (
    <div css={styles.root}>
        <h3 css={styles.title}>{exercise.name}</h3>
    </div>
);
```

## Rule 2 — Always consume CSS variables from the theme, never hardcode values

Every color, spacing, radius, and font size is defined in `src/app/themes/global.ts` as a CSS custom property (e.g. `--color-blue`, `--base-size-16`, `--radius-md`). Styles reference the variable, never the raw value. A rebrand, a dark-mode toggle, or a spacing rescale then becomes a single-file edit instead of a codebase-wide sweep.

**Bad — raw values:**
```tsx
const styles = {
    root: css({
        padding: '16px',
        background: '#1a1a1a',
        borderRadius: '8px',
        color: '#3b82f6',
    }),
};
```

**Good — CSS variables:**
```tsx
const styles = {
    root: css({
        padding: 'var(--base-size-16)',
        background: 'var(--color-container1)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-blue)',
    }),
};
```

**If a value you need is not yet a token:** add it to the theme file first, then reference it. Never inline a "one-off" hex or px value in a component — that's how design systems drift.

## Rule 3 — Mobile-first responsive styles

Base styles target mobile. Larger screens are layered on top with `min-width` media queries. Never use `max-width` queries as the primary responsive strategy — they force you to "un-desktop" the mobile view, which is more code and easier to get wrong.

**Bad — desktop-first with `max-width`:**
```tsx
const styles = {
    grid: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--stack-gap-normal)',

        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
        },
    }),
};
```

**Good — mobile-first with `min-width`:**
```tsx
const styles = {
    grid: css({
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--stack-gap-normal)',

        '@media (min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media (min-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
    }),
};
```

Rule of thumb: styles read from smaller-screen → larger-screen, top to bottom. Each media query only *adds* rules for wider viewports; it never has to reset defaults.

## Rule 4 — Compose styles by array spread, not string concatenation

When a component needs to combine base styles with variants or one-off overrides, pass them as an array to the `css` prop. Emotion merges them in order; later entries win over earlier ones — no manual string joining, no `!important`.

**Bad — string concat or nested `css()`:**
```tsx
const styles = {
    root: css({ padding: 'var(--base-size-16)' }),
    highlighted: css({ background: 'var(--color-blue)' }),
};

<div css={css([styles.root.styles, styles.highlighted.styles].join(' '))}>
```

**Good — array spread:**
```tsx
const styles = {
    root: css({ padding: 'var(--base-size-16)' }),
    highlighted: css({ background: 'var(--color-blue)' }),
};

<div css={[styles.root, isHighlighted && styles.highlighted]} />
```

**Good — with a `customCss` override from the parent:**
```tsx
type ExerciseCardProps = {
    exercise: ExerciseReadDTO;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const ExerciseCard = ({ exercise, customCss }: ExerciseCardProps) => (
    <div css={[styles.root, customCss]}>
        {exercise.name}
    </div>
);
```

Falsy entries (`false`, `null`, `undefined`) in the array are ignored, so conditional styling reads cleanly: `isSelected && styles.selected`.
