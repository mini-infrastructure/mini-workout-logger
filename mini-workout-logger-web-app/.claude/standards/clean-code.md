# Clean Code

## Rule 1 — Colocate code with its usage

Everything that only one component uses lives inside that component's folder. Only extract to `src/app/hooks/`, `src/app/utils/`, or a shared component dir once a second consumer appears.

**Bad — extracted prematurely to shared folders:**
```
src/app/utils/formatSetSummary/index.ts       ← only used by SetCard
src/app/hooks/useExerciseDrawer/index.tsx     ← only used by ExerciseDrawer
src/app/components/ExerciseDrawer/
    index.tsx
    index.style.tsx
```

**Good — colocated inside the consumer:**
```
src/app/components/ExerciseDrawer/
    index.tsx
    index.style.tsx
    index.test.tsx
    useExerciseDrawer/
        index.tsx
    formatSetSummary/
        index.ts
```

**Rule of promotion:** move to `src/app/hooks/` or `src/app/utils/` only when a second component actually imports it. Don't pre-extract "for the future".

## Rule 2 — Rename instead of commenting

If the intent of a variable or function is not obvious, the fix is a better name — not a comment that explains what a rename would already communicate.

**Bad:**
```tsx
// URL of the workout endpoint
const URL = '/api/workouts';

const ref = useRef<HTMLButtonElement>(null); // ref for the start button

useEffect(() => {
    // on mount, focus the start button
    ref.current?.focus();
}, []);
```

**Good:**
```tsx
const WORKOUTS_ENDPOINT = '/api/workouts';

const startButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
    startButtonRef.current?.focus();
}, []);
```

## Rule 3 — Never commit commented-out code

If code is not running, delete it. Version control keeps the history.

**Bad:**
```tsx
const handleSaveWorkout = () => {
    saveWorkout(payload);
    // trackWorkoutSaved(payload);
    // notifySlack(payload);
};
```

**Good:**
```tsx
const handleSaveWorkout = () => {
    saveWorkout(payload);
};
```

## Rule 4 — Comments only for intent, workaround, or consequence

Legitimate comments explain *why*, not *what*. Three categories are acceptable:

1. **Intent** — a non-obvious algorithmic choice, or a link to external docs that dictate the approach.
2. **Workaround** — a bug in an external system that forced the shape of the code.
3. **Consequence** — a warning that a change here forces a change somewhere else.

Anything that describes what the next line already says out loud is noise.

**Bad — what:**
```tsx
// increment page by 1
setPage(page + 1);
```

**Good — intent:**
```tsx
// Codes (not translated names) are used everywhere because the SVG element
// IDs and the backend filter param both match on Muscle.<Name>.
const selectedMuscleCodes = selectedMuscles.map(m => m.code);
```

**Good — workaround:**
```tsx
// The muscles endpoint defaults to size=20 and the leg muscles fall past
// that page, so we override to 500 to receive them all in one call.
MuscleService.getAll({ size: 500 });
```

**Good — consequence:**
```tsx
// Changing this list requires updating messages_en_US.properties and
// messages_pt_BR.properties — a missing key throws at runtime.
const EXERCISE_CATEGORIES = ['STRENGTH', 'CARDIO', 'STRETCHING', ...] as const;
```

## Rule 5 — Keep functions small and single-purpose

One function does one thing, and its name states that thing. If you find yourself narrating a function with *and* (fetches the exercise *and* formats the summary *and* logs it), split it.

**Bad — one function branching on data shape:**
```tsx
const getExerciseSummary = (exercise: ExerciseReadDTO) => {
    const label =
        exercise.category === 'CARDIO'
            ? `${exercise.duration_seconds}s`
            : `${exercise.sets}x${exercise.reps}`;
    const equipment =
        exercise.category === 'CARDIO'
            ? 'Machine'
            : exercise.equipment.join(', ');
    return { label, equipment };
};
```

**Good — small named functions, each answering one question:**
```tsx
const isCardio = (e: ExerciseReadDTO) => e.category === 'CARDIO';

const getCardioLabel = (e: ExerciseReadDTO) => `${e.duration_seconds}s`;
const getStrengthLabel = (e: ExerciseReadDTO) => `${e.sets}x${e.reps}`;

const getExerciseLabel = (e: ExerciseReadDTO) =>
    isCardio(e) ? getCardioLabel(e) : getStrengthLabel(e);

const getExerciseEquipment = (e: ExerciseReadDTO) =>
    isCardio(e) ? 'Machine' : e.equipment.join(', ');
```

## Rule 6 — Prefer an object argument over positional arguments

Positional args are fragile: the reader must remember order, `undefined` placeholders appear when skipping optional ones, and reordering breaks every call site silently.

**Bad:**
```tsx
const createSet = (
    reps: number,
    weight: number,
    duration: number | undefined,
    isWarmup: boolean,
) => { ... };

createSet(10, 20, undefined, true);
```

**Good — object arg with destructuring:**
```tsx
type CreateSetInput = {
    reps: number;
    weight: number;
    duration?: number;
    isWarmup?: boolean;
};

const createSet = ({ reps, weight, duration, isWarmup = false }: CreateSetInput) => { ... };

createSet({ reps: 10, weight: 20, isWarmup: true });
```

**When positional is fine:** 1-2 args where the parameter role is obvious from the function name (`toDate(isoString)`, `add(a, b)`). Prefer object once you hit 3+ args or any optional param.

## Rule 7 — No flag arguments

A boolean flag that switches a function between two behaviors means the function is really two functions. Split them.

**Bad:**
```tsx
const saveWorkout = (workout: WorkoutWriteDTO, isDraft: boolean) => {
    if (isDraft) {
        return WorkoutService.saveDraft(workout);
    }
    return WorkoutService.publish(workout);
};

saveWorkout(payload, true);
```

**Good:**
```tsx
const saveWorkoutDraft = (workout: WorkoutWriteDTO) =>
    WorkoutService.saveDraft(workout);

const publishWorkout = (workout: WorkoutWriteDTO) =>
    WorkoutService.publish(workout);

saveWorkoutDraft(payload);
```

The call site now reads as its own intent — no need to trace the flag through the function body.

## Rule 8 — Write pure functions

A pure function returns the same output for the same input and mutates nothing. In practice: don't mutate arguments, don't read or write outside the function's own scope.

**Bad — mutates the argument:**
```tsx
const removeLastSet = (sets: SetReadDTO[]) => sets.pop();
```

**Bad — reads external state:**
```tsx
let cachedExercises: ExerciseReadDTO[] = [];

const getFirstExercise = () => cachedExercises[0];
```

**Good — pure, returns a new array:**
```tsx
const removeLastSet = (sets: SetReadDTO[]) => sets.slice(0, -1);
```

**Good — takes state as input:**
```tsx
const getFirstExercise = (exercises: ExerciseReadDTO[]) => exercises[0];
```

## Rule 9 — Consistent verbs for the same concept

Pick one verb per operation and use it everywhere. Don't mix `get` / `fetch` / `retrieve` / `load` for what amounts to the same call.

**Bad:**
```tsx
ExerciseService.getAll();
WorkoutService.fetchAll();
MuscleService.retrieveAll();
TagService.loadAll();
```

**Good:**
```tsx
ExerciseService.getAll();
WorkoutService.getAll();
MuscleService.getAll();
TagService.getAll();
```

**Convention for this project:**
- `getX` — read
- `saveX` / `createX` / `updateX` — write
- `deleteX` — remove
- `handleX` — event handler
- `useX` — custom hook

## Rule 10 — Optional chaining and nullish coalescing for nested access

When reading a value from a deeply-nested response or an object whose shape may be partial, use `?.` for traversal and `??` for defaulting. Never assume every intermediate is present.

**Bad — one missing intermediate throws at runtime:**
```tsx
const firstMuscleName = exercise.muscles[0].muscle.name;
const restTime = workoutExercise.rest_time_seconds || 60;   // treats 0 as 60
```

**Good:**
```tsx
const firstMuscleName = exercise.muscles?.[0]?.muscle?.name ?? '';
const restTime = workoutExercise.rest_time_seconds ?? 60;   // 0 stays 0
```

The `||` fallback is a common bug source: it triggers on any falsy value (`0`, `''`, `false`), not just `null`/`undefined`. Use `??` when the property can legitimately hold a falsy value.

## Rule 11 — Extract repeated patterns

If the same skeleton (same function-call sequence, same object shape, same JSX layout) appears in 3 or more places, extract it into a helper — util function, factory, custom hook, or shared component. Two copies is a coincidence; three copies is duplication that will drift.

**Trigger points:**
- Same object being constructed with the same keys in multiple services (e.g. every service call passing `{ lang, page, size }`).
- Same JSX structure repeated (`<Card><CardHeader>...</CardHeader><CardBody>...</CardBody></Card>` in five views).
- Same `useState + useEffect` sequence in 3+ hooks — becomes one custom hook.
- Same conditional rendering pattern (`isLoading ? <Spinner /> : error ? <ErrorState /> : <Content />`).

**Bad — same request-envelope building in three services:**
```tsx
// ExerciseService
const params = new URLSearchParams({ lang, page: String(page), size: String(size) });
const { data } = await axios.get(`${apiUrl}/exercises?${params}`);

// WorkoutService
const params = new URLSearchParams({ lang, page: String(page), size: String(size) });
const { data } = await axios.get(`${apiUrl}/workouts?${params}`);

// MuscleService
const params = new URLSearchParams({ lang, page: String(page), size: String(size) });
const { data } = await axios.get(`${apiUrl}/muscles?${params}`);
```

**Good — envelope extracted:**
```tsx
// src/app/services/getPaged/index.ts
const getPaged = <T>(endpoint: string, { lang, page, size }: PageParams) => {
    const params = new URLSearchParams({ lang, page: String(page), size: String(size) });
    return axios.get<ApiResponseDTO<T>>(`${apiUrl}/${endpoint}?${params}`);
};

// Consumers
ExerciseService.getAll = (params) => getPaged<ExerciseReadDTO[]>('exercises', params);
WorkoutService.getAll  = (params) => getPaged<WorkoutReadDTO[]>('workouts',  params);
MuscleService.getAll   = (params) => getPaged<MuscleReadDTO[]>('muscles',    params);
```

**When to hold off:** two occurrences are fine — extracting after two is often *premature abstraction* that ossifies a shape you don't fully understand yet. Wait for the third to see the real pattern.
