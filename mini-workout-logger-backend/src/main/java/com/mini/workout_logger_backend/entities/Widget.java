package com.mini.workout_logger_backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mini.java_core.entity.AbstractEntity;
import com.mini.workout_logger_backend.enums.WidgetBackground;
import com.mini.workout_logger_backend.enums.WidgetType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "widgets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Widget extends AbstractEntity {

    @JsonBackReference
    @ManyToOne(optional = false)
    @JoinColumn(name = "dashboard_id", nullable = false)
    private Dashboard dashboard;

    @Column(name = "widget_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private WidgetType widgetType;

    @Column(name = "x", nullable = false)
    private int x;

    @Column(name = "y", nullable = false)
    private int y;

    @Column(name = "col_span", nullable = false)
    private int colSpan = 1;

    @Column(name = "row_span", nullable = false)
    private int rowSpan = 1;

    @Column(name = "background", nullable = false)
    @Enumerated(EnumType.STRING)
    private WidgetBackground background = WidgetBackground.SOLID;

    @Column(name = "background_color")
    private String backgroundColor;

    @Column(name = "config", columnDefinition = "TEXT")
    private String config;

}
