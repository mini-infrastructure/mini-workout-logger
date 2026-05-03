package com.mini.workout_logger_backend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mini.java_core.dto.WriteDTO;
import com.mini.java_core.validation.group.RestMethod;
import com.mini.workout_logger_backend.enums.WidgetBackground;
import com.mini.workout_logger_backend.enums.WidgetType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WidgetWriteDTO extends WriteDTO {

    @NotNull(groups = RestMethod.OnCreate.class)
    @JsonProperty("dashboard_id")
    private Long dashboardId;

    @NotNull(groups = RestMethod.OnCreate.class)
    @JsonProperty("widget_type")
    private WidgetType widgetType;

    @Min(0)
    private int x;

    @Min(0)
    private int y;

    @Min(1)
    @JsonProperty("col_span")
    private int colSpan = 1;

    @Min(1)
    @JsonProperty("row_span")
    private int rowSpan = 1;

    private WidgetBackground background = WidgetBackground.SOLID;

    @JsonProperty("background_color")
    private String backgroundColor;

    private String config;

}
