package com.mini.workout_logger_backend.entities;

import com.mini.java_core.entity.AbstractEntity;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;

import java.util.Date;

@MappedSuperclass
@AllArgsConstructor
public class Execution extends AbstractEntity {

    public void setUpdatedAtToNow() {
        this.setUpdatedAt(new Date());
    }

    public Date getStartTime() {
        return this.getCreatedAt();
    }

    public Date getEndTime() {
        if (this.getUpdatedAt() == null || !this.getUpdatedAt().after(this.getCreatedAt())) {
            return null;
        }
        return this.getUpdatedAt();
    }

    public boolean getCompleted() {
        return getEndTime() != null;
    }

}
