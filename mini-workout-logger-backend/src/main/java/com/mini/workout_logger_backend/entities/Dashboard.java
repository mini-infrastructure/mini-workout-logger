package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mini.java_core.entity.AbstractEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "dashboards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Dashboard extends AbstractEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "columns", nullable = false)
    private int columns = 6;

    @JsonManagedReference
    @OneToMany(mappedBy = "dashboard",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<Widget> widgets = new ArrayList<>();

}
