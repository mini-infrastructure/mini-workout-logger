# Naming Conventions

## Rule 1 — Casing per identifier kind

Every module lives in its own folder. Inside the folder, the entry files use a fixed `index.*` layout:

| File | When present |
|---|---|
| `index.tsx` (or `index.ts` for pure logic without JSX) | Always — the module's implementation |
| `index.style.tsx` | When the module needs Emotion styles |
| `index.test.tsx` (or `.test.ts`) | When the module has tests |

Folder casing follows the primary export:

| Kind | Folder casing | Example |
|---|---|---|
| React component, TypeScript type/interface, enum, DTO, model, service class | `PascalCase` | `ExerciseCard/`, `ExerciseReadDTO/`, `ExerciseService/`, `SetType/` |
| Custom hook | `camelCase` starting with `use` | `useExerciseDrawer/`, `useDebounce/` |
| Standalone utility function | `camelCase` | `formatSetSummary/`, `toIsoDate/` |

Identifier-level casing:

| Kind | Case | Example |
|---|---|---|
| Component / type / interface / enum / DTO / class | `PascalCase` | `ExerciseCard`, `WorkoutReadDTO` |
| Variable, function, prop, hook identifier | `camelCase` | `handleSaveWorkout`, `useExerciseDrawer` |
| Module-level primitive constant | `SCREAMING_SNAKE_CASE` | `WORKOUTS_ENDPOINT`, `DEFAULT_PAGE_SIZE` |
| Enum value | `SCREAMING_SNAKE_CASE` (mirrors backend JSON) | `STRENGTH`, `REPS_X_WEIGHT` |
| CSS variable | `--kebab-case` | `--color-blue`, `--base-size-16` |

**Bad:**
```
src/app/dtos/exercise.read.dto.tsx
src/app/hooks/useExerciseDrawer.tsx
src/app/components/exercise-card/
    exercise-card.component.tsx
    exercise-card.component.style.tsx
```

**Good:**
```
src/app/dtos/ExerciseReadDTO/
    index.ts
src/app/hooks/useExerciseDrawer/
    index.tsx
    index.test.tsx
src/app/components/ExerciseCard/
    index.tsx
    index.style.tsx
    index.test.tsx
```

## Rule 2 — Descriptive names, no generic tokens

Every identifier states its purpose. Avoid names that are pure category words (`Component`, `Wrapper`, `Container`, `Data`, `Helper`, `Info`, `Item`). These add zero information — the type system already tells the reader it's a component or a data object.

**Bad:**
```tsx
const ExerciseComponent = () => { ... };
const workoutData = getAll();
const setInfo = { reps: 10, weight: 20 };

type WorkoutItem = { ... };
```

**Good:**
```tsx
const ExerciseCard = () => { ... };
const workouts = getAll();
const plannedSet = { reps: 10, weight: 20 };

type WorkoutSummary = { ... };
```

**Exception:** `Wrapper` and `Container` are acceptable *only* when they name a component whose single purpose is to wrap children with layout (`<PageContainer>`, `<CardWrapper>`) and no better semantic name exists.

## Rule 3 — No appearance-based names

Names describe *what* something is, not *where it is on the screen* or *how it currently looks*. Visual descriptors (`RightPanel`, `TopCard`, `BlurredBg`, `RedButton`) rot the moment the layout changes, the design goes RTL, or a redesign moves the panel to the left.

**Bad:**
```tsx
const RightPanel = () => <HumanBody />;
const TopBar = () => <Navigation />;

<Button style={css({ color: 'red' })} onClick={handleDelete}>
    Delete
</Button>
```

**Good:**
```tsx
const MuscleFilterPanel = () => <HumanBody />;
const AppNavigation = () => <Navigation />;

<Button variant="destructive" onClick={handleDelete}>
    Delete
</Button>
```

**Applies to CSS vars too:** `--color-red` is fine as a raw palette token in the theme, but consumers should use semantic aliases like `--color-danger` in feature code so a rebrand doesn't require a codebase-wide rename.
