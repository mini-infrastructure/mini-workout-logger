# Mini Workout Logger

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

1. [Project architecture](#project-architecture)
    1. [Entities](#entities)
    2. [Routes](#routes)
2. [Run dev](#run-dev)
    1. [Compile and serve backend](#compile-and-serve-backend)
    2. [Create database and seed data](#create-database-and-seed-data)
        1. [Start the test containers](#start-the-test-containers)
3. [Generate release](#generate-release)

## Project architecture

### Entities
| Entity                     | Description                                                                                         | Example                                                                                                                                                                                                                                           |
|----------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Muscle`                   | A group of muscles targeted by exercises                                                            | Chest, Back, Legs                                                                                                                                                                                                                                 |
| `Exercise`                 | Static description of an exercise                                                                   | Chest Fly                                                                                                                                                                                                                                         |
| `Workout`                  | The Workout plan, that has a name, contains a list of exercises and a list of past executions of it | "Upper Body Workout", "A", "B"                                                                                                                                                                                                                    |
| `WorkoutExercise`          | An exercise within a workout plan and how it should be performed                                    | The Chest Fly exercise should be executed in a machine, with this group of sets, and 60s rest time between sets.                                                                                                                                  |
| `Set`                      | A series in which an exercise is performed                                                          | The Chest Fly exercise in the "Upper Body Workout" has 2 sets of type `REPS_X_WEIGHT`, with 10 reps at 20kg; and 2 sets of `TIME_X_WEIGHT`, with 60s at 12kg.                                                                                     |
| `WorkoutExecution`         | An execution of a workout plan, with a date and the exercises performed in it                       | The "Upper Body Workout" was executed on 2024-06-01, with this exercise executions.                                                                                                                                                               |
| `WorkoutExerciseExecution` | How an exercise that belongs to the execution of the workout                                        | The Chest Fly exercise performed on 2024-06-01, during the "Upper Body Workout" training session was not completed 100%: of the four planned sets, only 3 were performed as planned; in the third set, only 5 repetitions of 10kg were performed. |

### Routes

#### Bootstrap routes

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
- 🌐 [Wiki.md](https://github.com/mini-infrastructure/mini-workout-logger/blob/main/Wiki.md)

## Run dev

1. [Compile and serve backend](#compile-and-serve-backend)
2. [Create database and seed data](#create-database-and-seed-data)

### Compile and serve backend
```bash
CD mini-workout-logger-backend/
```
```bash
mvn clean -U install
```
```bash
mvn spring-boot:run
```

### Create database and seed data
```bash
cd  mini-workout-logger-backend/src/test/resources/db/
```
```bash
bash run-dev.sh up
```
#### Start the test containers:
```bash
✔ Container mini-workout-logger-db        Started
✔ Container mini-workout-logger-pgadmin   Started
```
Which can be accessed here:
- 🌐 [Swagger UI](http://localhost:9090/swagger-ui/index.html)
- 🗂️ [pgAdmin](http://localhost:180/)

## Generate release

Run tests
```bash
cd mini-workout-logger-backend/
```
```bash
mvn clean verify -DskipTests=false
```
Set version at `mini-workout-logger-backend/pom.xml`
```bash
 <version>1.0.0</version>
```
Commit release
```bash
git checkout -b v1.0.0
```
```bash
git add pom.xml
```
```bash
git commit -m "Release version 1.0.0"
```
Create tag
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
```
```bash
git push origin v1.0.0
```