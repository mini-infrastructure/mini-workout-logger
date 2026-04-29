package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class FinishWorkoutExecutionWriteDTO {

    @JsonProperty("set_executions")
    private List<SetCompletionDTO> setExecutions;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SetCompletionDTO {

        @JsonProperty("set_execution_id")
        private Long setExecutionId;

        @JsonProperty("completed")
        private boolean completed;

        @JsonProperty("skipped")
        private boolean skipped;
    }
}
