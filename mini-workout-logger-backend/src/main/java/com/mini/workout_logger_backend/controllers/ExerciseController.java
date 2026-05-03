package com.mini.workout_logger_backend.controllers;

import com.mini.java_core.controller.AbstractMediaController;
import com.mini.java_core.dto.MediaReadDTO;
import com.mini.java_core.dto.ResponseDTO;
import com.mini.workout_logger_backend.dtos.ExerciseExecutionHistoryReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseRecommendationReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseWriteDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.ExerciseMedia;
import com.mini.workout_logger_backend.enums.ExerciseMediaRole;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.repositories.ExerciseMediaRepository;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import com.mini.workout_logger_backend.services.ExerciseRecommendationService;
import com.mini.workout_logger_backend.services.ExerciseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



@RestController
@RequestMapping("/exercises")
@Tag(name = "Exercise", description = "Exercise API")
public class ExerciseController extends AbstractMediaController<Exercise,
                                                               ExerciseMedia,
                                                               ExerciseReadDTO,
                                                               ExerciseWriteDTO,
                                                               ExerciseMapper,
                                                               ExerciseRepository,
                                                               ExerciseMediaRepository,
                                                               ExerciseService> {

    @Autowired
    private ExerciseRecommendationService recommendationService;

    /**
     * Role-specific media upload.
     * POST /exercises/{id}/media/{role}  — upload COVER or EXECUTION media.
     * Replaces any existing media of the same role.
     */
    @Operation(summary = "Upload media for an exercise with an explicit role (COVER or EXECUTION)")
    @PostMapping(value = "/{id}/media/{role}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseDTO<MediaReadDTO>> uploadMediaWithRole(
            @PathVariable("id") @NotNull @Min(1) Long id,
            @RequestParam("file") MultipartFile file,
            @PathVariable("role") ExerciseMediaRole role) {
        return service.uploadMedia(id, file, role);
    }

    /**
     * Exercise Execution History API.
     */

    @Tag(name = "Exercise History", description = "Exercise Execution History API")
    @Operation(
        summary = "Get execution history for an exercise",
        description = "Returns all workout exercise executions for the given exercise, ordered by date descending. Each entry contains the workout name, date, completion status, and the actual set execution data."
    )
    @GetMapping("/{id}/history")
    public ResponseEntity<ResponseDTO<ExerciseExecutionHistoryReadDTO>> getHistory(
            @NotNull @PathVariable("id") Long id) {
        return service.getHistory(id);
    }

    /**
     * Exercise Recommendations API.
     */

    @Tag(name = "Exercise Recommendations", description = "Exercise Recommendations API")
    @Operation(
        summary = "Get exercise recommendations",
        description = """
            Returns exercises ranked by similarity to the reference exercise.

            Similarity is measured by the fraction of (muscle, role) pairs in the reference
            exercise that also appear in the candidate:

                score = shared (muscle, role) pairs / total (muscle, role) pairs in reference

            A score of 1.0 means the candidate contains every pair from the reference
            (exact_match = true). Lower scores indicate partial overlap. Only candidates
            with score > 0 are ever returned.

            Results are sorted by score descending.
            """
    )
    @GetMapping("/{id}/recommendations")
    public ResponseEntity<ResponseDTO<ExerciseRecommendationReadDTO>> getRecommendations(
            @NotNull @PathVariable("id") Long id,
            @Parameter(
                description = """
                    Minimum similarity score threshold, in the range [0.0, 1.0].
                    0.0 (default) returns every exercise that shares at least one (muscle, role) pair.
                    0.5 returns only exercises where at least half the reference pairs are matched.
                    1.0 returns only exact matches (candidate covers all reference pairs).
                    """,
                example = "0.5"
            )
            @RequestParam(value = "minScore", defaultValue = "0.0") double minScore,
            @Parameter(
                description = "Maximum number of results to return. Applied after sorting by score descending, so the top-N most similar exercises are returned.",
                example = "10"
            )
            @RequestParam(value = "limit", defaultValue = "10") int limit) {
        return recommendationService.getRecommendations(id, minScore, limit);
    }

    /**
     * Exercise Group API.
     */

    @Tag(name = "Exercise Group", description = "Exercise Group API")
    @GetMapping("/groups")
    public ResponseEntity<ResponseDTO<String>> getAllExerciseGroupNames() {
        return service.getAllExerciseGroupNames();
    }

    @Tag(name = "Exercise Group")
    @GetMapping("/groups/{groupName}")
    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> getExercisesByGroupName(@PathVariable("groupName") String groupName) {
        return service.listExercisesByMuscleGroup(groupName);
    }

    /**
     * Favorited Exercises API.
     */

    @Tag(name = "Exercise Favorites", description = "Exercise Favorites API")
    @GetMapping("/favorites")
    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> getFavoritedExercises() {
        return service.getFavoritedExercises();
    }

    @Tag(name = "Exercise Favorites")
    @PatchMapping("/{id}/favorite")
    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> favoriteExercise(
            @NotNull @PathVariable("id") Long id) {
        return service.favoriteExercise(id);
    }

    @Tag(name = "Exercise Favorites")
    @PatchMapping("/{id}/unfavorite")
    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> unfavoriteExercise(
            @NotNull @PathVariable("id") Long id) {
        return service.unfavoriteExercise(id);
    }

}
