package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.WidgetReadDTO;
import com.mini.workout_logger_backend.dtos.WidgetWriteDTO;
import com.mini.workout_logger_backend.entities.Widget;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class WidgetMapper extends AbstractMapper<Widget, WidgetReadDTO, WidgetWriteDTO> {

    @Override
    protected void configure(ModelMapper mapper) {

        mapper.createTypeMap(Widget.class, WidgetReadDTO.class)
                .setPostConverter(ctx -> {
                    Widget src = ctx.getSource();
                    WidgetReadDTO dst = ctx.getDestination();
                    dst.setDashboardId(src.getDashboard().getId());
                    return dst;
                });

        mapper.createTypeMap(WidgetWriteDTO.class, Widget.class)
                .setPostConverter(ctx -> {
                    WidgetWriteDTO dto = ctx.getSource();
                    Widget entity = ctx.getDestination();
                    if (dto.getWidgetType()      != null) entity.setWidgetType(dto.getWidgetType());
                    if (dto.getBackground()      != null) entity.setBackground(dto.getBackground());
                    if (dto.getBackgroundColor() != null) entity.setBackgroundColor(dto.getBackgroundColor());
                    if (dto.getConfig()          != null) entity.setConfig(dto.getConfig());
                    entity.setX(dto.getX());
                    entity.setY(dto.getY());
                    entity.setColSpan(dto.getColSpan() > 0 ? dto.getColSpan() : 1);
                    entity.setRowSpan(dto.getRowSpan() > 0 ? dto.getRowSpan() : 1);
                    return entity;
                });
    }

}
