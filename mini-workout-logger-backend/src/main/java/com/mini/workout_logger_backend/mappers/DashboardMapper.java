package com.mini.workout_logger_backend.mappers;

import com.mini.java_core.mapper.AbstractMapper;
import com.mini.workout_logger_backend.dtos.DashboardReadDTO;
import com.mini.workout_logger_backend.dtos.DashboardWriteDTO;
import com.mini.workout_logger_backend.dtos.WidgetReadDTO;
import com.mini.workout_logger_backend.entities.Dashboard;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DashboardMapper extends AbstractMapper<Dashboard, DashboardReadDTO, DashboardWriteDTO> {

    @Autowired
    private WidgetMapper widgetMapper;

    @Override
    protected void configure(ModelMapper mapper) {

        mapper.createTypeMap(Dashboard.class, DashboardReadDTO.class)
                .setPostConverter(ctx -> {
                    Dashboard src = ctx.getSource();
                    DashboardReadDTO dst = ctx.getDestination();
                    List<WidgetReadDTO> widgetDTOs = src.getWidgets().stream()
                            .map(widgetMapper::toDTO)
                            .toList();
                    dst.setWidgets(widgetDTOs);
                    return dst;
                });

        mapper.createTypeMap(DashboardWriteDTO.class, Dashboard.class)
                .setPostConverter(ctx -> {
                    DashboardWriteDTO dto = ctx.getSource();
                    Dashboard entity = ctx.getDestination();
                    if (dto.getName() != null) entity.setName(dto.getName());
                    if (dto.getColumns() > 0)  entity.setColumns(dto.getColumns());
                    return entity;
                });
    }

}
