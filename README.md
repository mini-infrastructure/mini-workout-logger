# Mini Workout Logger

![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Entities:

- `Exercise`: One instance of an activity requiring physical effort;
    - `Name`: Name of the exercise;
    - `List<MuscleGroup>`: List of muscle groups targeted by the exercise;
    - `ExerciseType`: Type of exercise (e.g., assisted bodyweight, number of repetitions, duration,
      barbell, cable, resistance band, dumbbell, kettlebell, machine,
      medicine ball, mobility, powerlifting, resistance band, smith machine,
      weighted bodyweight, weighted duration, etc.);
- `MuscleGroup`: A group of muscles that are targeted by an exercise;
    - `Name`: Name of the muscle group;
- `Repetition`: A single execution of an exercise;
    - `Exercise_id`: The exercise being performed;
    - `Reps`: Number of repetitions performed;
    - `Weight`: Weight used for the repetition (if applicable);
    - `Duration`: Duration of the repetition (if applicable);
    - `Quality`: FULL, PARTIAL, FAIL, NEGATIVE, WARMUP, etc.;
    - `Media`: Media associated with the repetition (e.g., video, image);
- `Set`: Collection of repetitions;
    - `List<Repetition>`: List of repetitions in the set;
    - `Rest`: Rest time between repetitions;
- `Workout`: Collection of sets;
    - `Date`: Date of the workout;
    - `List<Set>:` List of sets in the workout;
    - `Duration`: Duration of the workout;
    - `NextWorkout`: Date of the next workout; -> Fazer manutenção nessa entidade como uma linked list
- `Media`: Media associated with the repetition;
    - `Type`: Type of media (e.g., image, video);
    - `URL`: URL of the media file;
    - `Width`: Width of the media;
    - `Height`: Height of the media;
    - `Duration`: Duration of the media (if applicable);