package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = """
        An exercise together with its similarity score relative to a reference exercise.
        Similarity is measured by the fraction of (muscle, role) pairs in the reference
        exercise that also appear in this candidate.
        """)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseRecommendationReadDTO {

    @Schema(description = "The recommended exercise.")
    private ExerciseReadDTO exercise;

    @Schema(
        description = """
            Similarity score in the range (0.0, 1.0].
            Computed as: shared (muscle, role) pairs / total (muscle, role) pairs in the reference exercise.
            1.0 means every reference pair was found in this exercise (see exact_match).
            Lower values indicate partial overlap.
            """,
        example = "0.75"
    )
    private double score;

    @Schema(
        description = """
            True when this exercise contains every (muscle, role) pair of the reference exercise
            (i.e. score == 1.0). Note: the candidate may still have additional muscles beyond
            those in the reference. False for partial matches.
            """,
        example = "false"
    )
    @JsonProperty("exact_match")
    private boolean exactMatch;

}
