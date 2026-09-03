# React Components

## Rule 1 — Do not spread props

Explicit props read as a contract. Spreading (`<Component {...props} />`) hides which props the child actually receives, kills IDE auto-complete for the reader, and turns a rename into a silent runtime break.

**Bad:**
```tsx
const ExerciseCardWrapper = (props: ExerciseCardProps) => (
    <ExerciseCard {...props} />
);
```

**Good:**
```tsx
const ExerciseCardWrapper = ({ exercise, onEdit, onDelete }: ExerciseCardProps) => (
    <ExerciseCard
        exercise={exercise}
        onEdit={onEdit}
        onDelete={onDelete}
    />
);
```

**Rare exception:** a generic wrapper whose whole job is to forward every prop through (e.g. a `<Link>` polymorphic wrapper). Even there, prefer explicit forwarding when the surface is small.

## Rule 2 — Function components with hooks, no classes and no HOCs

All React components in this project are function components. Class components are forbidden. Logic reuse is done via **custom hooks**, not via higher-order components (`withX`) or render-prop wrappers.

**Bad — class component:**
```tsx
class ExerciseCard extends React.Component<ExerciseCardProps> {
    render() {
        return <div>{this.props.exercise.name}</div>;
    }
}
```

**Bad — higher-order component:**
```tsx
const withExercise = (Wrapped: React.ComponentType) => (props: WrappedProps) => {
    const exercise = useExercise(props.id);
    return <Wrapped {...props} exercise={exercise} />;
};

const EnhancedCard = withExercise(BareCard);
```

**Good — function component + custom hook:**
```tsx
const ExerciseCard = ({ id }: ExerciseCardProps) => {
    const exercise = useExercise(id);
    return <div>{exercise?.name}</div>;
};
```

## Rule 3 — Never put spacing or width on the component root

A component fills whatever container puts it there. Margins, max-widths, or fixed widths on the root make it uncomposable — the parent has to override them with hacks (`style={{ margin: 0, width: '100%' }}`) or add escape-hatch props like `fullWidth`.

**Bad:**
```tsx
const styles = {
    root: css({
        margin: '1rem',
        maxWidth: '400px',
        padding: 'var(--base-size-16)',
        border: '1px solid var(--color-border)',
    }),
};

const ExerciseCard = ({ exercise }: ExerciseCardProps) => (
    <div css={styles.root}>{exercise.name}</div>
);
```

Now every parent has to fight it:
```tsx
<Grid>
    <ExerciseCard css={css({ margin: 0, maxWidth: 'none' })} />
    <ExerciseCard css={css({ margin: 0, maxWidth: 'none' })} />
</Grid>
```

**Good — spacing is the parent's job:**
```tsx
const styles = {
    root: css({
        padding: 'var(--base-size-16)',
        border: '1px solid var(--color-border)',
    }),
};

const ExerciseCard = ({ exercise }: ExerciseCardProps) => (
    <div css={styles.root}>{exercise.name}</div>
);
```

```tsx
const gridStyles = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--stack-gap-normal)',
});

<div css={gridStyles}>
    <ExerciseCard exercise={a} />
    <ExerciseCard exercise={b} />
</div>
```

**Padding inside the component is fine** (it's part of the component's own visual identity). The rule is specifically about the *outside* of the component — margin, max-width, absolute positioning — which are the parent's responsibility.

## Rule 4 — Component logic and styles in separate files

Every component folder has an `index.tsx` for logic/JSX and an `index.style.tsx` for Emotion styles. Never inline `css({...})` blocks or `styled.div` definitions inside the component file (except one-off `customCss` overrides received via prop).

**Bad — everything in one file:**
```tsx
// src/app/components/ExerciseCard/index.tsx
import { css } from '@emotion/react';

const rootStyles = css({
    padding: 'var(--base-size-16)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-container1)',
});
const titleStyles = css({ fontSize: 'var(--font-size-lg)', fontWeight: 600 });

const ExerciseCard = ({ exercise }: ExerciseCardProps) => (
    <div css={rootStyles}>
        <h3 css={titleStyles}>{exercise.name}</h3>
    </div>
);

export default ExerciseCard;
```

**Good — split:**
```tsx
// src/app/components/ExerciseCard/index.style.tsx
import { css } from '@emotion/react';

const styles = {
    root: css({
        padding: 'var(--base-size-16)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-container1)',
    }),
    title: css({
        fontSize: 'var(--font-size-lg)',
        fontWeight: 600,
    }),
};

export default styles;
```

```tsx
// src/app/components/ExerciseCard/index.tsx
import styles from './index.style';

const ExerciseCard = ({ exercise }: ExerciseCardProps) => (
    <div css={styles.root}>
        <h3 css={styles.title}>{exercise.name}</h3>
    </div>
);

export default ExerciseCard;
```

The style file exports **a single default object** named `styles` with one key per element. This makes the JSX read as `styles.<element>` end-to-end.

## Rule 5 — Strict TypeScript for components

Components are typed in TypeScript with the strictest reasonable settings. Three concrete rules:

1. **No `any`.** If you need a "we don't know the shape" type, use `unknown` and narrow before use.
2. **Union types for fixed sets.** If a prop can only hold a finite set of values, express it as a union — never as `string`.
3. **Types colocate with the component.** Prop types live in the same `index.tsx` as the component. Move to a shared location only when a second file imports the type.

**Bad:**
```tsx
type ExerciseCardProps = {
    exercise: any;
    variant: string;
    onSelect: Function;
};
```

**Good:**
```tsx
type ExerciseCardProps = {
    exercise: ExerciseReadDTO;
    variant: 'default' | 'compact' | 'detailed';
    onSelect: (exercise: ExerciseReadDTO) => void;
};
```

If `ExerciseReadDTO` is used by more than one component, it lives in `src/app/dtos/ExerciseReadDTO/index.ts`. If it's used by only one, keep it in that component's `index.tsx`.
