# Mini Workout Logger

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Project architecture

- `Muscle`: A group of muscles targeted by exercises (e.g., Chest, Back, Legs);
- `Exercise`: Static description of an exercise (e.g. Chest Fly);
- `Set`: A series in which an exercise is performed (e.g. 3 repetitions of 23kg);
- `Workout`: A collection of exercise executions;

## Run dev
### Compile and serve
```bash
mvn clean -U install
```
```bash
mvn spring-boot:run
```

### Bootstrap dev
```bash
cd  mini-workout-logger-backend/src/test/resources/db/
```
```bash
bash run-dev.sh up
```

Start the test containers:
```bash
✔ Container mini-workout-logger-db        Started
✔ Container mini-workout-logger-pgadmin   Started
```
Which can be accessed here:
- [Swagger UI](http://localhost:9090/swagger-ui/index.html)
- [pgAdmin](http://localhost:180/)
