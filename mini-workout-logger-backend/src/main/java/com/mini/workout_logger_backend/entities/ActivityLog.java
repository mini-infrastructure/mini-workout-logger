package com.mini.workout_logger_backend.entities;

import com.mini.java_core.entity.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "activity_logs", indexes = {
        @Index(name = "idx_activity_logs_exercise",   columnList = "exercise_id"),
        @Index(name = "idx_activity_logs_start_time", columnList = "start_time")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLog extends AbstractEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "duration_seconds")
    private Long durationSeconds;

    @Column(name = "completed", nullable = false)
    private boolean completed = true;

}
