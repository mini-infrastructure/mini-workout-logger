package com.mini.workout_logger_backend.seeders;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mini.java_core.entity.Text;
import com.mini.workout_logger_backend.dtos.seed.*;
import com.mini.workout_logger_backend.entities.*;
import com.mini.workout_logger_backend.enums.*;
import com.mini.workout_logger_backend.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Seeds the database with reference and sample data on application startup.
 *
 * <h2>Data Categories</h2>
 * <ul>
 *   <li><b>Reference data</b> (muscles, exercises): Required for the app to function.
 *       Controlled by {@code app.seed.reference-data.enabled} (default: true).</li>
 *   <li><b>Sample data</b> (workouts): Example data for development/demo.
 *       Controlled by {@code app.seed.sample-data.enabled} (default: false).</li>
 * </ul>
 *
 * <h2>Idempotency</h2>
 * <p>Seeding is skipped if data already exists in the respective tables.</p>
 *
 * <h2>Data Files</h2>
 * <p>JSON files are loaded from {@code src/main/resources/seeders/}:</p>
 * <ul>
 *   <li>{@code muscles.json} - muscle definitions with parent relationships</li>
 *   <li>{@code exercises.json} - exercise definitions with muscle associations</li>
 *   <li>{@code workouts.json} - sample workout plans (dev/demo only)</li>
 * </ul>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ObjectMapper objectMapper;
    private final MuscleRepository muscleRepository;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseGroupRepository exerciseGroupRepository;
    private final ExerciseMuscleRepository exerciseMuscleRepository;
    private final WorkoutRepository workoutRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final SetRepository setRepository;

    @Value("${app.seed.reference-data.enabled:true}")
    private boolean referenceDataEnabled;

    @Value("${app.seed.sample-data.enabled:false}")
    private boolean sampleDataEnabled;

    @Value("${app.seed.muscles-file:seeders/muscles.json}")
    private String musclesFile;

    @Value("${app.seed.exercises-file:seeders/exercises.json}")
    private String exercisesFile;

    @Value("${app.seed.workouts-file:seeders/workouts.json}")
    private String workoutsFile;

    // Cache for lookups during seeding
    private final Map<String, Muscle> muscleCache = new HashMap<>();
    private final Map<String, ExerciseGroup> groupCache = new HashMap<>();
    private final Map<String, Exercise> exerciseCache = new HashMap<>();

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (referenceDataEnabled) {
            seedMuscles();
            seedExercises();
        } else {
            log.info("Reference data seeding is disabled (app.seed.reference-data.enabled=false)");
        }

        if (sampleDataEnabled) {
            seedWorkouts();
        } else {
            log.info("Sample data seeding is disabled (app.seed.sample-data.enabled=false)");
        }
    }

    // ========================================================================
    // Reference Data: Muscles
    // ========================================================================

    private void seedMuscles() throws IOException {
        if (muscleRepository.count() > 0) {
            log.info("Muscles table already populated, skipping muscle seeding");
            return;
        }

        log.info("Seeding muscles from {}", musclesFile);

        List<MuscleSeedDTO> muscles = loadJson(musclesFile, new TypeReference<>() {});

        // First pass: create all muscles without parent relationships
        for (MuscleSeedDTO dto : muscles) {
            Muscle muscle = new Muscle();
            muscle.setName(new Text(dto.getName()));
            muscle = muscleRepository.save(muscle);
            muscleCache.put(dto.getName(), muscle);
        }

        // Second pass: establish parent relationships
        for (MuscleSeedDTO dto : muscles) {
            if (dto.getParent() != null) {
                Muscle muscle = muscleCache.get(dto.getName());
                Muscle parent = muscleCache.get(dto.getParent());

                if (parent != null) {
                    muscle.addMuscleGroup(parent);
                    muscleRepository.save(muscle);
                } else {
                    log.warn("Parent muscle '{}' not found for '{}'", dto.getParent(), dto.getName());
                }
            }
        }

        log.info("Seeded {} muscles", muscles.size());
    }

    // ========================================================================
    // Reference Data: Exercises
    // ========================================================================

    private void seedExercises() throws IOException {
        if (exerciseRepository.count() > 0) {
            log.info("Exercises table already populated, skipping exercise seeding");
            return;
        }

        // Ensure muscle cache is populated
        if (muscleCache.isEmpty()) {
            muscleRepository.findAll().forEach(m -> muscleCache.put(m.getName().getCode(), m));
        }

        log.info("Seeding exercises from {}", exercisesFile);

        List<ExerciseSeedDTO> exercises = loadJson(exercisesFile, new TypeReference<>() {});

        for (ExerciseSeedDTO dto : exercises) {
            // Get or create exercise group
            ExerciseGroup group = getOrCreateGroup(dto.getGroup());

            // Create exercise
            Exercise exercise = new Exercise();
            exercise.setName(new Text(dto.getName()));
            exercise.setGroup(group);
            exercise.setHidden(dto.isHidden());

            if (dto.getCategory() != null) {
                exercise.setCategory(ExerciseCategory.valueOf(dto.getCategory()));
            }
            if (dto.getDifficulty() != null) {
                exercise.setDifficulty(ExerciseDifficulty.valueOf(dto.getDifficulty()));
            }
            if (dto.getEquipment() != null) {
                exercise.setEquipment(ExerciseEquipment.valueOf(dto.getEquipment()));
            }
            if (dto.getForce() != null) {
                exercise.setForce(ExerciseForceDirection.valueOf(dto.getForce()));
            }
            if (dto.getMechanics() != null) {
                exercise.setMechanics(ExerciseMechanics.valueOf(dto.getMechanics()));
            }
            if (dto.getRole() != null) {
                exercise.setRole(ExerciseRole.valueOf(dto.getRole()));
            }
            if (dto.getType() != null) {
                exercise.setType(ExerciseType.valueOf(dto.getType()));
            }

            exercise = exerciseRepository.save(exercise);
            exerciseCache.put(dto.getName(), exercise);

            // Add muscle associations (track already-added to avoid duplicate key violations)
            java.util.Set<String> addedMuscles = new java.util.HashSet<>();
            addMuscles(exercise, dto.getTargetMuscles(), ExerciseMuscleMovementClassification.TARGET, addedMuscles);
            addMuscles(exercise, dto.getAgonistMuscles(), ExerciseMuscleMovementClassification.AGONIST, addedMuscles);
            addMuscles(exercise, dto.getSynergistMuscles(), ExerciseMuscleMovementClassification.SYNERGIST, addedMuscles);
            addMuscles(exercise, dto.getStabilizerMuscles(), ExerciseMuscleMovementClassification.STABILIZER, addedMuscles);
            addMuscles(exercise, dto.getDynamicStabilizerMuscles(), ExerciseMuscleMovementClassification.DYNAMIC_STABILIZER, addedMuscles);
            addMuscles(exercise, dto.getAntagonistMuscles(), ExerciseMuscleMovementClassification.ANTAGONIST, addedMuscles);
            addMuscles(exercise, dto.getAntagonistStabilizerMuscles(), ExerciseMuscleMovementClassification.ANTAGONIST_STABILIZER, addedMuscles);
        }

        log.info("Seeded {} exercises", exercises.size());
    }

    private ExerciseGroup getOrCreateGroup(String groupName) {
        if (groupCache.containsKey(groupName)) {
            return groupCache.get(groupName);
        }

        ExerciseGroup group = new ExerciseGroup();
        group.setName(new Text(groupName));
        group = exerciseGroupRepository.save(group);
        groupCache.put(groupName, group);

        return group;
    }

    private void addMuscles(Exercise exercise, List<String> muscleNames, ExerciseMuscleMovementClassification role,
                            java.util.Set<String> alreadyAdded) {
        if (muscleNames == null || muscleNames.isEmpty()) {
            return;
        }

        for (String muscleName : muscleNames) {
            // Skip if this muscle was already added for this exercise (different role)
            if (alreadyAdded.contains(muscleName)) {
                continue;
            }

            Muscle muscle = muscleCache.get(muscleName);

            if (muscle == null) {
                log.warn("Muscle '{}' not found for exercise '{}', skipping", muscleName, exercise.getName().getCode());
                continue;
            }

            ExerciseMuscle em = new ExerciseMuscle();
            em.setExercise(exercise);
            em.setMuscle(muscle);
            em.setRole(role);
            exerciseMuscleRepository.save(em);

            alreadyAdded.add(muscleName);
        }
    }

    // ========================================================================
    // Sample Data: Workouts
    // ========================================================================

    private void seedWorkouts() throws IOException {
        if (workoutRepository.count() > 0) {
            log.info("Workouts table already populated, skipping workout seeding");
            return;
        }

        // Ensure exercise cache is populated
        if (exerciseCache.isEmpty()) {
            exerciseRepository.findAll().forEach(e -> exerciseCache.put(e.getName().getCode(), e));
        }

        log.info("Seeding workouts from {}", workoutsFile);

        List<WorkoutSeedDTO> workouts = loadJson(workoutsFile, new TypeReference<>() {});

        for (WorkoutSeedDTO dto : workouts) {
            Workout workout = new Workout();
            workout.setName(new Text(dto.getName()));
            workout = workoutRepository.save(workout);

            for (WorkoutExerciseSeedDTO weDto : dto.getExercises()) {
                Exercise exercise = exerciseCache.get(weDto.getExercise());

                if (exercise == null) {
                    log.warn("Exercise '{}' not found for workout '{}', skipping", weDto.getExercise(), dto.getName());
                    continue;
                }

                WorkoutExercise we = new WorkoutExercise();
                we.setWorkout(workout);
                we.setExercise(exercise);
                we.setRestTimeSeconds(weDto.getRestTimeSeconds());
                we = workoutExerciseRepository.save(we);

                workout.getWorkoutExercises().add(we);

                for (SetSeedDTO setDto : weDto.getSets()) {
                    Set set = new Set();
                    set.setWorkoutExercise(we);
                    set.setCategory(SetCategory.valueOf(setDto.getCategory()));
                    set.setType(SetType.valueOf(setDto.getType()));
                    set.setPlannedRepetitions(setDto.getRepetitions());
                    set.setPlannedWeight(setDto.getWeight());
                    set.setPlannedDurationSeconds(setDto.getDurationSeconds());
                    setRepository.save(set);

                    we.getSets().add(set);
                }
            }
        }

        log.info("Seeded {} workouts", workouts.size());
    }

    // ========================================================================
    // Utilities
    // ========================================================================

    private <T> T loadJson(String path, TypeReference<T> typeReference) throws IOException {
        ClassPathResource resource = new ClassPathResource(path);
        try (InputStream is = resource.getInputStream()) {
            return objectMapper.readValue(is, typeReference);
        }
    }

}
