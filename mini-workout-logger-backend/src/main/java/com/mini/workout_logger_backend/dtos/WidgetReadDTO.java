package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.ReadDTO;
import com.mini.workout_logger_backend.enums.WidgetBackground;
import com.mini.workout_logger_backend.enums.WidgetType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WidgetReadDTO extends ReadDTO {

    @JsonProperty("dashboard_id")
    private Long dashboardId;

    @JsonProperty("widget_type")
    private WidgetType widgetType;

    private int x;
    private int y;

    @JsonProperty("col_span")
    private int colSpan;

    @JsonProperty("row_span")
    private int rowSpan;

    private WidgetBackground background;

    @JsonProperty("background_color")
    private String backgroundColor;

    private String config;

}
