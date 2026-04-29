# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project overview

**Mini Workout Logger** is a full-stack workout tracking application.

| Layer | Stack |
|---|---|
| Backend | Java 21, Spring Boot, ModelMapper, Liquibase, PostgreSQL |
| Frontend | React 18, TypeScript, Vite, Emotion CSS-in-JS |
| Dev infra | Docker Compose (PostgreSQL + pgAdmin via test containers) |

---

## Running the project

### 1. Start the database

```bash
cd mini-workout-logger-backend/src/test/resources/db/
bash run-dev.sh up
```

### 2. Start the backend

```bash
cd mini-workout-logger-backend/
mvn clean -U install
mvn spring-boot:run
```

Backend runs at `http://localhost:9090`. Swagger UI: `http://localhost:9090/swagger-ui/index.html`.

### 3. Start the frontend

```bash
cd mini-workout-logger-web-app/
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`. The Vite dev server proxies `/api/*` → `http://localhost:9090/*`.

Other frontend commands:
```bash
npm run build    # type-check + production build
npm run lint     # ESLint
npm run preview  # preview production build
```

No test runner is configured on the frontend.

---

## Repository structure

```
mini-workout-logger/
├── mini-workout-logger-backend/     # Spring Boot API
└── mini-workout-logger-web-app/     # React frontend
```

---

## Shared library — `mini-java-core`

Located at `~/Documents/CODE/mini/mini-java-core`. This is a separate project that contains all mechanisms that are agnostic and reusable across personal projects (base entity, base repository, base service, base controller, base mapper, DTOs, response helpers, specification builder, etc.).

The backend depends on it as a local Maven dependency. Changes to shared behaviour should go there, not in this project.

Key classes provided by `mini-java-core`:
- `AbstractEntity` — base JPA entity with `id`, `createdAt`, `updatedAt`
- `AbstractRepository` — extends `JpaRepository` + `JpaSpecificationExecutor`; provides `safeFindById`, `safeFindByIds`
- `AbstractService` — base CRUD service; override `getAll(Map<String,String> params)`, `beforeSave`, `afterLoad` as needed
- `AbstractController` — base CRUD controller wiring service methods to HTTP endpoints
- `AbstractMapper` — base ModelMapper wrapper; subclasses implement `configure(ModelMapper)`
- `ReadDTO` / `WriteDTO` — base DTO types
- `ResponseHelper` / `ResponseDTO` — standard API response envelope (`data`, `pagination`, `errors`)
- `SpecificationBuilder` — builds JPA `Specification` from a flat param map
- `AbstractCrudControllerTest` — base Spring Boot test class for controller integration tests

---

## Entity change protocol

**Every time an entity is added or modified, all of the following must be updated:**

1. **Backend entity** — add/edit the JPA entity in `entities/`
2. **ReadDTO + WriteDTO** — add/edit in `dtos/`; always keep them as separate files
3. **Mapper** — add/edit in `mappers/`
4. **Service** — add/edit in `services/`; override `getAll` if the entity needs query param filtering
5. **Controller** — add/edit in `controllers/`
6. **Database** — add/edit the SQL migration file in `src/main/resources/db/changelog/migrations/`. During the testing phase, SQL files can be edited directly without creating a new migration file.
7. **Tests** — evaluate and update controller tests in `src/test/java/com/mini/workout_logger_backend/controllers/`
8. **Frontend DTOs** — add/edit in `src/app/dtos/`
9. **Frontend models** — add/edit in `src/app/models/` (enum types, label maps, icon maps, color maps)

**Key rule:** If a property is **changed** (renamed, retyped), fix every frontend occurrence. If a property or entity is **added**, only create the new `dtos/` and `models/` files — do not touch unrelated frontend code.

10. **Frontend payloads** — search for every place that constructs a WriteDTO payload (look for `buildPayload`, object literals assigned to WriteDTO types, or service call arguments) and add/remove the property there too. Also check that the TypeScript type of the value matches the DTO field exactly — in particular, optional fields (`field?: T`) must use a conditional spread (`...(val !== undefined ? { field: val } : {})`) rather than `field: val` when `val` may be `undefined`, to avoid type errors under strict mode.

---

## Backend

### Architecture

```
HTTP request
  → Controller  (@RestController, in controllers/)
  → Service     (business logic, in services/)
  → Repository  (Spring Data JPA, in repositories/)
  → Entity      (JPA entities, in entities/)

Response path:
  Entity → Mapper (ModelMapper, in mappers/) → DTO (in dtos/) → JSON
```

### Key packages

| Package | Purpose |
|---|---|
| `entities/` | JPA entities (`Exercise`, `Muscle`, `Workout`, `WorkoutExercise`, `Set`, `WorkoutExecution`, `WorkoutExerciseExecution`, `SetExecution`, `ExerciseMuscle`) |
| `dtos/` | Read DTOs (GET responses) and Write DTOs (POST/PUT request bodies) — always separate files |
| `mappers/` | ModelMapper subclasses; each has a `configure(ModelMapper)` method with explicit field mappings |
| `services/` | Business logic; one service per entity group |
| `enums/` | All domain enumerations (see below) |
| `repositories/` | Spring Data JPA repositories |

### Domain entities

| Entity | Description |
|---|---|
| `Muscle` | Named muscle, stored as an i18n key (e.g. `Muscle.Chest`). Has a parent `Muscle` (muscle group). |
| `Exercise` | Static description of an exercise (name, category, equipment, muscles, etc.) |
| `ExerciseMuscle` | Join between Exercise and Muscle, with a `ExerciseMuscleMovementClassification` role |
| `Workout` | A named workout plan containing an ordered list of `WorkoutExercise` entries |
| `WorkoutExercise` | One exercise within a workout plan: exercise reference, sets, equipment, rest time |
| `Set` | A planned set (type, reps, weight, duration) |
| `WorkoutExecution` | A dated execution of a workout plan |
| `WorkoutExerciseExecution` | The execution of one exercise within a workout execution |
| `SetExecution` | How a planned set was actually performed |
| `Tag` | Free-form label (plain `String` name, no i18n). ManyToMany with `Workout` (and potentially other entities). Filterable via `?tags=id1,id2` query param on the workout endpoint. |

### Enums

| Enum | Values |
|---|---|
| `ExerciseCategory` | STRENGTH, CARDIO, WALK, RUN, BIKE, STRETCHING, POWERLIFTING, OLYMPIC_WEIGHTLIFTING, STRONGMAN, CALISTHENICS, PLYOMETRICS, RECOVERY, HIT, MOBILITY, PILATES, YOGA, WARM_UP |
| `ExerciseDifficulty` | NOVICE, BEGINNER, INTERMEDIATE, ADVANCED |
| `ExerciseEquipment` | BARBELL, DUMBBELL, BODYWEIGHT, BOSU_BALL, CABLE, EXERCISE_BALL, MACHINE, SMITH_MACHINE, MEDICINE_BALL, PLATE, RESISTANCE_BAND, TRX, KETTLEBELL |
| `ExerciseForceDirection` | PUSH, PULL, SLIDE, ROTATE_OR_TWIST |
| `ExerciseMechanics` | ISOLATED, COMPOUND |
| `ExerciseMuscleMovementClassification` | TARGET, AGONIST, SYNERGIST, DYNAMIC_STABILIZER, STABILIZER, ANTAGONIST_STABILIZER, ANTAGONIST |
| `ExerciseRole` | BASIC, AUXILIARY, BASIC_OR_AUXILIARY |
| `ExerciseType` | BILATERAL, ISOLATERAL, UNILATERAL |
| `SetCategory` | NORMAL, WARMUP, COMPOUND |
| `SetType` | REPS_X_WEIGHT, TIME_X_WEIGHT, TIME, NUMBER_OF_REPS, DURATION |

### Mapper rules

- Entity → DTO mappings are configured in `configure(ModelMapper mapper)`.
- Always use `getName().getCode()` (not `getValue()`) when mapping muscle names to DTOs — `getCode()` returns the i18n key (`Muscle.Chest`), `getValue()` returns the translated display name. The frontend SVG and filter logic matches by code.
- Use `setPostConverter` for complex post-mapping logic (e.g. resolving parent codes, setting computed fields).

### i18n

All entity names are i18n keys (via `com.mini.java_core.entity.Text`). Translation properties:

- `src/main/resources/i18n/messages_en_US.properties`
- `src/main/resources/i18n/messages_pt_BR.properties`

When adding a new enum value or muscle, always add translations to **both** files.

### Database seeding

Liquibase changelogs: `src/main/resources/db/changelog/`

Muscle seeder: `seeders/001_seed_muscles_table.sql`. Uses the `add_muscle(muscle_name, parent_name)` helper function. Muscle codes follow the pattern `Muscle.Name` (e.g. `Muscle.Pectoralis_Major`).

---

## Frontend

### Data flow

```
View → custom hook (useXxx) → Service (axios) → Spring Boot backend
```

- **Services** (`src/app/services/`) are singleton class instances. They prepend `VITE_API_URL` and pass `lang` as a query param. All responses follow `ApiResponseDTO<T>` (`data`, `pagination`, `errors`).
- **Hooks** (`src/app/hooks/`) own fetch lifecycle (loading/error state). Array/object deps use `JSON.stringify(...)` in `useEffect`.
- **DTOs** (`src/app/dtos/`) are plain TypeScript interfaces. Read and Write DTOs are always separate files.
- **Models** (`src/app/models/`) hold enum types, icon maps, color variant maps, and label maps used in UI.

### Styling — Emotion CSS-in-JS

All styles use `@emotion/react` with the `css` prop (enabled via `jsxImportSource` in `vite.config.ts`). **Always use CSS variables** — never raw colors, sizes, or spacing values.

Available color variables (defined in `src/app/themes/global.ts`):
`--color-bg`, `--color-container1`, `--color-container2`, `--color-text`, `--color-white`, `--color-black`, `--color-border`, `--color-gray`, `--color-blue`, `--color-red`, `--color-yellow`, `--color-green`, `--color-pink`, `--color-purple`, `--color-orange` (plus `-border` variants for each color).

### Component conventions

Every component lives in:
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
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
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
- **Never put margin or spacing on a component's root element.** The `Card` component owns its own padding (`var(--base-size-16)`) — inner containers must not add their own padding.
- `customCss` is applied at the root element and accepts a single value or an array.

**Style file pattern:**
```tsx
import { css } from '@emotion/react';
const styles = {
    container: css({ ... }),
};
export default styles;
```

### Custom SVG icons

SVG icon files live in `public/Icons/`. They are not importable as React components — use the CSS mask technique:

```tsx
// src/app/components/icons/equipment-icons.tsx
const makeEquipmentIcon = (src: string) =>
    ({ size = 14 }: IconBaseProps) => (
        <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: size,
            height: size,
            backgroundColor: 'var(--color-white)',  // or any CSS var
            maskImage: `url(${src})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${src})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
        }} />
    );
```

Cast to `IconType` when inserting into icon maps: `BarbellIcon as IconType`.

Current custom icons: `Barbell`, `Dumbell`, `Kettlebell`, `Machine`, `Plate`, `Back`, `Bike`, `Hit`, `Pilates`, `Streching`, `Walk`, `Yoga`, `Pull`, `Push`, `Rotate`.

### Muscle codes and the i18n contract

Muscles are stored in the DB as i18n keys: `Muscle.Chest`, `Muscle.Adductor_Magnus`, etc.

- **Always filter and match by code**, never by translated name.
- `ExerciseMuscleReadDTO.muscle_code` contains the raw code; `muscle_name` contains the translated display name.
- The `MuscleService.getAll()` call always uses `size=500` to avoid pagination cutting off leg muscles.

### `ExerciseMuscleMovementClassification` color mapping

Used in the exercise drawer body visualization (warm = most active → cool = least active):

| Classification | Color |
|---|---|
| TARGET | `var(--color-red)` |
| AGONIST | `var(--color-orange)` |
| SYNERGIST | `var(--color-yellow)` |
| DYNAMIC_STABILIZER | `var(--color-green)` |
| STABILIZER | `var(--color-blue)` |
| ANTAGONIST_STABILIZER | `var(--color-purple)` |
| ANTAGONIST | `var(--color-pink)` |

### HumanBody component

`src/app/components/human-body/`

Renders interactive SVGs of the muscular system. SVGs live at `public/front.svg` and `public/back.svg`. The component discovers muscles by querying `[id^="Muscle."]` — any SVG element whose `id` matches a muscle code is interactive.

**Props:**

| Prop | Type | Description |
|---|---|---|
| `selectedMuscles` | `string[]` | Codes highlighted blue |
| `onSelectionChange` | `(muscles: string[]) => void` | Makes component interactive; omit for read-only |
| `highlightedMuscles` | `string[]` | Codes highlighted orange (read-only) |
| `coloredMuscles` | `ColoredMuscle[]` | Per-muscle color via inline fill (e.g. classification colors) |
| `initialView` | `'front' \| 'back'` | Default `'front'` |
| `showFlipButton` | `boolean` | Default `true`; set `false` for static visualization |

**Critical implementation notes:**
- SVG is loaded via `fetch()` and inserted via `dangerouslySetInnerHTML` with `key={view}` — the `key` forces a remount on view switch so React never reconciles across different SVGs.
- `coloredMuscles` applies inline `fill` styles directly to SVG DOM elements — this is DOM-direct, not React state.
- Tooltip updates bypass React state entirely (DOM refs) — zero re-renders from `mousemove`.
- Do **not** use CSS `:hover` for the hover brightness effect — it propagates to DOM ancestors. Use the JS-managed `muscle--hovered` class instead.

**Adding a new muscle:**
1. Add to `001_seed_muscles_table.sql` with `add_muscle('Muscle.NewName', 'Muscle.ParentName')`
2. Add translations to both `.properties` files
3. Add a group with `id="Muscle.NewName"` in the SVG(s)
4. No frontend code changes needed

### Exercise page (`exercises.view.tsx`)

- Left column: paginated, filterable exercise card grid
- Right panel: `HumanBody` component for muscle-based filtering
- Muscle filter uses `selectedMuscles` state → maps to `muscles=` query param on the backend
- `handleFilterChange` intercepts `key === 'muscle'` and routes to `setSelectedMuscles` instead of the generic filters map

### Exercise drawer (`exercise-drawer.component.tsx`)

Opened from the exercise card's dropdown. Layout (top to bottom):
1. Exercise name header
2. FormBuilder (name, category, difficulty, equipment, force, mechanics, type, role, group)
3. Divider
4. Muscles row: `MultiSelect` (left) + front & back `HumanBody` (right, `showFlipButton={false}`)
5. Legend of active muscle classifications (clickable to toggle visibility on the body maps)

### Workout page (`workouts.view.tsx`)

- Toolbar with "Add workout" `PrimaryButton`
- Responsive grid of `WorkoutCard` components
- `WorkoutCard` shows: workout name + `DropdownMenu` (Start/Open/Edit/Copy/Archive/Delete), then exercise list as `<name> ... x{sets}`

---

## Environment

Frontend `.env` (copy from `.env.example`):
```
VITE_API_URL=/api
VITE_API_LANGUAGE=en_US
```
