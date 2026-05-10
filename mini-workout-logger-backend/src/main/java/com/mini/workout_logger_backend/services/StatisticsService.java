package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.workout_logger_backend.dtos.ExerciseStatisticsReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseStatisticsReadDTO.DataPoint;
import com.mini.workout_logger_backend.dtos.ExerciseStatisticsReadDTO.Series;
import com.mini.workout_logger_backend.entities.SetExecution;
import com.mini.workout_logger_backend.entities.WorkoutExerciseExecution;
import com.mini.workout_logger_backend.enums.SetType;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import com.mini.workout_logger_backend.repositories.WorkoutExerciseExecutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class StatisticsService {

    @Autowired
    private WorkoutExerciseExecutionRepository workoutExerciseExecutionRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    public ResponseEntity<ResponseDTO<ExerciseStatisticsReadDTO>> getExerciseStatistics(Long exerciseId, String mode, Long workoutId) {
        var exercise = exerciseRepository.safeFindById(exerciseId);

        List<WorkoutExerciseExecution> executions =
                workoutExerciseExecutionRepository.findAllByExerciseIdOrderByDateDesc(exerciseId);

        if (workoutId != null) {
            executions = executions.stream()
                    .filter(wee -> wee.getWorkoutExecution().getWorkout().getId().equals(workoutId))
                    .toList();
        }

        // Group set executions by set type to build one series per type
        Map<SetType, Map<Instant, List<Double>>> byTypeAndDate = new TreeMap<>();

        for (WorkoutExerciseExecution wee : executions) {
            Instant date = wee.getWorkoutExecution().getInterval().getStart();
            if (date == null) continue;

            for (SetExecution se : wee.getSetExecutions()) {
                if (se.isSkipped()) continue;
                SetType type = se.getPlannedType();
                if (type == null) continue;

                Double value = extractValue(se, type);
                if (value == null) continue;

                byTypeAndDate
                        .computeIfAbsent(type, k -> new TreeMap<>())
                        .computeIfAbsent(date, k -> new ArrayList<>())
                        .add(value);
            }
        }

        List<Series> seriesList = new ArrayList<>();
        for (var entry : byTypeAndDate.entrySet()) {
            SetType type = entry.getKey();
            List<DataPoint> points = entry.getValue().entrySet().stream()
                    .sorted(Map.Entry.comparingByKey())
                    .map(e -> new DataPoint(e.getKey(), e.getValue().stream()
                            .mapToDouble(Double::doubleValue).max().orElse(0)))
                    .toList();
            seriesList.add(new Series(labelFor(type), points));
        }

        ExerciseStatisticsReadDTO dto = new ExerciseStatisticsReadDTO(
                exercise.getId(),
                exercise.getName().getValue(),
                mode != null ? mode : "ALL",
                seriesList
        );

        return ResponseHelper.success(HttpStatus.OK, "Statistics found.", List.of(dto));
    }

    private Double extractValue(SetExecution se, SetType type) {
        return switch (type) {
            case REPS_X_WEIGHT, TIME_X_WEIGHT -> se.getActualWeight() != null ? se.getActualWeight()
                    : (se.getPlannedWeight() != null ? se.getPlannedWeight() : null);
            case REPS -> se.getActualRepetitions() != null ? se.getActualRepetitions().doubleValue()
                    : (se.getPlannedRepetitions() != null ? se.getPlannedRepetitions().doubleValue() : null);
            case TIME -> se.getActualDurationSeconds() != null ? se.getActualDurationSeconds().doubleValue()
                    : (se.getPlannedDurationSeconds() != null ? se.getPlannedDurationSeconds().doubleValue() : null);
        };
    }

    private String labelFor(SetType type) {
        return switch (type) {
            case REPS_X_WEIGHT -> "Weight (kg)";
            case TIME_X_WEIGHT -> "Weight (kg)";
            case REPS -> "Reps";
            case TIME -> "Duration (s)";
        };
    }

}
