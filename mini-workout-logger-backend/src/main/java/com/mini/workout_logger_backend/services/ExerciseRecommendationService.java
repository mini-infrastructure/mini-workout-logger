package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.workout_logger_backend.dtos.ExerciseRecommendationReadDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.enums.ExerciseCategory;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.repositories.ExerciseMuscleRepository;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExerciseRecommendationService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExerciseMuscleRepository exerciseMuscleRepository;

    @Autowired
    private ExerciseMapper exerciseMapper;

    @Autowired
    private ExerciseService exerciseService;

    /**
     * Returns a ranked list of exercises similar to the reference exercise.
     *
     * <p>The DB resolves the (muscle, role) intersection; only exercises with at
     * least one matching pair are loaded. Score = matchingPairs / totalReferencePairs.
     *
     * @param referenceId ID of the exercise to find recommendations for
     * @param minScore    minimum score threshold (0.0–1.0), default 0.0
     * @param limit       maximum number of results, default 10
     */
    public ResponseEntity<ResponseDTO<ExerciseRecommendationReadDTO>> getRecommendations(
            Long referenceId,
            double minScore,
            int limit) {

        Exercise reference = exerciseRepository.findById(referenceId).orElse(null);
        if (reference == null) {
            return ResponseHelper.success(HttpStatus.OK,
                    ResponseMessage.ENTITIES_EMPTY.getMessage(),
                    Collections.emptyList());
        }

        boolean referenceIsAerobic = isAerobic(reference.getCategory());

        long totalReferencePairs = exerciseMuscleRepository.countByExerciseId(referenceId);

        if (totalReferencePairs == 0) {
            return ResponseHelper.success(HttpStatus.OK,
                    ResponseMessage.ENTITIES_EMPTY.getMessage(),
                    Collections.emptyList());
        }

        // DB returns [exerciseId, matchCount] for every candidate with score > 0
        List<Object[]> rawMatches = exerciseMuscleRepository
                .findMatchingExerciseIdsAndCounts(referenceId);

        if (rawMatches.isEmpty()) {
            return ResponseHelper.success(HttpStatus.OK,
                    ResponseMessage.ENTITIES_EMPTY.getMessage(),
                    Collections.emptyList());
        }

        // Map exerciseId → matchCount
        Map<Long, Long> matchCounts = rawMatches.stream()
                .collect(Collectors.toMap(
                        row -> (Long) row[0],
                        row -> (Long) row[1]
                ));

        // Load only the matching exercises (not the whole table)
        List<ExerciseRecommendationReadDTO> results = exerciseRepository
                .findAllById(matchCounts.keySet())
                .stream()
                .map(candidate -> {
                    long matched = matchCounts.get(candidate.getId());
                    double score = (double) matched / totalReferencePairs;
                    boolean exactMatch = matched == totalReferencePairs;
                    return new ExerciseRecommendationReadDTO(
                            exerciseMapper.toDTO(candidate), score, exactMatch);
                })
                .filter(r -> r.getScore() >= minScore)
                .filter(r -> isAerobic(r.getExercise().getCategory()) == referenceIsAerobic)
                .sorted(Comparator.comparingDouble(ExerciseRecommendationReadDTO::getScore).reversed())
                .limit(limit)
                .collect(Collectors.toList());

        // Populate root muscles and media for each exercise DTO
        results.forEach(r -> r.setExercise(exerciseService.afterLoad(r.getExercise())));

        return ResponseHelper.success(HttpStatus.OK,
                results.isEmpty()
                        ? ResponseMessage.ENTITIES_EMPTY.getMessage()
                        : ResponseMessage.ENTITIES_FOUND.getMessage(),
                results);
    }

    private static final java.util.Set<ExerciseCategory> AEROBIC_CATEGORIES =
            java.util.Set.of(ExerciseCategory.CARDIO, ExerciseCategory.HIT);

    private boolean isAerobic(ExerciseCategory category) {
        return category != null && AEROBIC_CATEGORIES.contains(category);
    }

}
