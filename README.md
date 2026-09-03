# Mini Workout Logger

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/vite-%236646FF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

1. [Project architecture](#project-architecture)
    1. [Repository structure](#repository-structure)
    2. [Entities](#entities)
    3. [Bootstrap routes](#bootstrap-routes)
2. [Run dev](#run-dev)
    1. [Create database and seed data](#create-database-and-seed-data)
    2. [Compile and serve backend](#compile-and-serve-backend)
    3. [Install and serve web app frontend](#install-and-serve-web-app-frontend)
3. [Procedures](#procedures)
    1. [Generate release](#generate-release)

## Project architecture

### Repository structure

```
mini-workout-logger/
├── mini-workout-logger-backend/     # Spring Boot API
└── mini-workout-logger-web-app/     # Frontend monorepo
    ├── packages/
    │   ├── shared/                  # @mini/shared - Shared code (DTOs, models, services, hooks, utils)
    │   ├── web/                     # @mini/web - React web app
    │   └── mobile/                  # @mini/mobile - React Native app (future)
    ├── package.json                 # Workspaces root
    ├── turbo.json                   # Turborepo config
    └── tsconfig.base.json           # Shared TypeScript config
```

**Packages:**

| Package | Description |
|---------|-------------|
| `@mini/shared` | DTOs, models, services, data hooks, utils — shared between web and mobile |
| `@mini/web` | React web app (components, views, themes, context, UI hooks) |
| `@mini/mobile` | React Native mobile app (not yet implemented) |

### Entities
| Entity                     | Description                                                                                         | Example                                                                                                                                                       |
|----------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Muscle`                   | A group of muscles targeted by exercises                                                            | Chest, Back, Legs                                                                                                                                             |
| `Exercise`                 | Static description of an exercise                                                                   | Chest Fly                                                                                                                                                     |
| `Workout`                  | The Workout plan, that has a name, contains a list of exercises and a list of past executions of it | "Upper Body Workout", "A", "B"                                                                                                                                |
| `WorkoutExercise`          | An exercise within a workout plan and how it should be performed                                    | The Chest Fly exercise should be executed in a machine, with this group of sets, and 60s rest time between sets.                                              |
| `Set`                      | A series in which an exercise is performed                                                          | The Chest Fly exercise in the "Upper Body Workout" has 2 sets of type `REPS_X_WEIGHT`, with 10 reps at 20kg; and 2 sets of `TIME_X_WEIGHT`, with 60s at 12kg. |
| `WorkoutExecution`         | An execution of a workout plan, with a date and the exercises that were actually performed in it    | The "Upper Body Workout" was executed on 2024-06-01, with this exercise executions.                                                                           |
| `WorkoutExerciseExecution` | The execution of a planned exercise inside a workout execution                                      | The Chest Fly exercise was performed on 2024-06-01, during the "Upper Body Workout" training session, with this set executions.                               |
| `SetExecution`             | Given the planned sets, describe how they were actually executed                                    | About the above execution: of the four planned sets, only 3 were performed as expected; in the third set, only 5 repetitions of 10kg were performed.          |

### Bootstrap routes

Install nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
```
```bash
nvm install --lts
```
```bash
nvm use --lts
```

Scan routes:
```bash
curl http://localhost:9090/v3/api-docs.yaml -o openapi.yaml
```
```bash
touch Wiki.md
```
```bash
npx widdershins openapi.yaml -o Wiki.md
```
Access here:
- [Wiki.md](https://github.com/mini-infrastructure/mini-workout-logger/blob/main/Wiki.md)

## Run dev

### Create database and seed data
```bash
cd mini-workout-logger-backend/src/test/resources/db/
bash run-dev.sh up
```

Containers started:
```
✔ Container mini-workout-logger-db        Started
✔ Container mini-workout-logger-pgadmin   Started
```

Access:
- [Swagger UI](http://localhost:9090/swagger-ui/index.html)
- [pgAdmin](http://localhost:180/)

#### Manage the test containers

Data is stored in named Docker volumes (`postgres-data`, `pgadmin-data`) and survives across restarts.

| Command | Behavior |
|---------|----------|
| `bash run-dev.sh up` | Start containers. Creates volumes on first run, reuses them afterwards. |
| `bash run-dev.sh down` | Stop and remove containers. **Preserves volumes** — next `up` resumes with the same DB state. |
| `bash run-dev.sh reset` | Stop containers **and delete volumes** — wipes the DB. Liquibase re-runs all migrations on the next `up`. |

### Compile and serve backend
```bash
cd mini-workout-logger-backend/
mvn clean -U install
mvn spring-boot:run
```

### Install and serve web app frontend

```bash
cd mini-workout-logger-web-app/
npm install
npm run build:shared
```

#### Run with Turborepo (all packages)
```bash
npm run dev
```

#### Run only web app
```bash
npm run dev:web
```

Access:
- [Web App](http://localhost:5173/)

#### Other commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all packages in dev mode (Turborepo) |
| `npm run dev:web` | Start only the web app |
| `npm run dev:mobile` | Start only the mobile app (not yet configured) |
| `npm run build` | Build all packages |
| `npm run build:shared` | Build only @mini/shared |
| `npm run build:web` | Build only @mini/web |
| `npm run lint` | Lint all packages |

## Procedures

### Generate release

Run tests
```bash
cd mini-workout-logger-backend/
mvn clean verify -DskipTests=false
```

Set version at `mini-workout-logger-backend/pom.xml`
```xml
<version>1.0.0</version>
```

Commit release
```bash
git checkout -b v1.0.0
git add pom.xml
git commit -m "Release version 1.0.0"
```

Create tag
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```
