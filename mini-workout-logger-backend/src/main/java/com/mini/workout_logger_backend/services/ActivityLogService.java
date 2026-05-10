package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.service.AbstractService;
import com.mini.workout_logger_backend.dtos.ActivityLogReadDTO;
import com.mini.workout_logger_backend.dtos.ActivityLogWriteDTO;
import com.mini.workout_logger_backend.entities.ActivityLog;
import com.mini.workout_logger_backend.mappers.ActivityLogMapper;
import com.mini.workout_logger_backend.repositories.ActivityLogRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ActivityLogService extends AbstractService<ActivityLog,
                                                        ActivityLogReadDTO,
                                                        ActivityLogWriteDTO,
                                                        ActivityLogMapper,
                                                        ActivityLogRepository> {

    @Override
    public ResponseEntity<ResponseDTO<ActivityLogReadDTO>> getAll(Map<String, String> params) {
        String search = params.getOrDefault("search", null);
        if (search != null && search.isBlank()) search = null;
        final String searchLower = search != null ? search.toLowerCase() : null;

        int page = Integer.parseInt(params.getOrDefault("page", "0"));
        int size = Integer.parseInt(params.getOrDefault("size", "10"));

        List<ActivityLog> all = repository.findAll(Sort.by(Sort.Direction.DESC, "startTime"));

        List<ActivityLogReadDTO> filtered = all.stream()
                .filter(log -> searchLower == null ||
                               log.getExercise().getName().getValue().toLowerCase().contains(searchLower))
                .map(log -> {
                    ActivityLogReadDTO dto = new ActivityLogReadDTO();
                    dto.setId(log.getId());
                    dto.setExerciseId(log.getExercise().getId());
                    dto.setExerciseName(log.getExercise().getName().getValue());
                    if (log.getExercise().getCategory() != null) {
                        dto.setExerciseCategory(log.getExercise().getCategory().name());
                    }
                    dto.setStartTime(log.getStartTime());
                    dto.setDurationSeconds(log.getDurationSeconds());
                    dto.setCompleted(log.isCompleted());
                    return dto;
                })
                .toList();

        int total   = filtered.size();
        int fromIdx = Math.min(page * size, total);
        int toIdx   = Math.min(fromIdx + size, total);

        Page<ActivityLogReadDTO> resultPage = new PageImpl<>(
                filtered.subList(fromIdx, toIdx), PageRequest.of(page, size), total);

        return ResponseHelper.success(HttpStatus.OK,
                resultPage.isEmpty() ? "No activity logs found." : "Activity logs found.",
                resultPage);
    }

}
