package com.mini.workout_logger_backend.entities;

import com.mini.java_core.entity.AbstractEntity;
import com.mini.java_core.entity.Interval;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Execution extends AbstractEntity {

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "start",    column = @Column(name = "start_time")),
            @AttributeOverride(name = "end",      column = @Column(name = "end_time")),
            @AttributeOverride(name = "duration", column = @Column(name = "duration"))
    })
    private Interval interval = new Interval();

    public boolean getCompleted() {
        return interval != null && interval.getEnd() != null;
    }

}
