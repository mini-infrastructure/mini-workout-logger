# Mini Workout Logger

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Run dev
Compile and serve
```bash
mvn clean -U install
mvn spring-boot:run
```
Bootstrap dev
```bash
cd  mini-workout-logger-backend/src/test/resources/db/
bash run-dev.sh up
```
- [Swagger UI](http://localhost:9090/swagger-ui/index.html)
- [pgAdmin](http://localhost:180/)

## Entities

- `Exercise`: One instance of an activity requiring physical effort;
  - Name, ExerciseType, Muscle Groups, Equipment, Media, etc.
- `ExerciseExecution`: An exercise being performed;
    - Reps, Weight, Duration, Quality, Media, etc.
- `Set`: A collection of exercise executions;
  - ExerciseExecution, Rest between Sets, etc.
- `Workout`: A collection of sets;
  - Sets, Workout Type, Tags, etc.
- `WorkoutExecution`: A workout being performed;
    - Sets, Date, Duration, Notes, Media, etc.

- `Muscle`: A group of muscles targeted by exercises (e.g., Chest, Back, Legs);
- `Media`: Represents media content related to exercises, such as images or videos;

- `SetExecution`: 