package com.mini.workout_logger_backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseStatisticsReadDTO {

    private Long exerciseId;
    private String exerciseName;
    private String mode;
    private List<Series> series;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Series {
        private String label;
        private List<DataPoint> dataPoints;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DataPoint {
        private Instant date;
        private Double value;
    }

}
