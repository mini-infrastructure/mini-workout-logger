package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractMediaService;
import com.mini.java_core.specification.SpecificationBuilder;
import com.mini.workout_logger_backend.dtos.ExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseWriteDTO;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.ExerciseGroup;
import com.mini.workout_logger_backend.entities.ExerciseMuscle;
import com.mini.workout_logger_backend.entities.ExerciseMedia;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.repositories.ExerciseGroupRepository;
import com.mini.workout_logger_backend.repositories.ExerciseMediaRepository;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toCollection;

@Service
public class ExerciseService extends AbstractMediaService<Exercise,
        ExerciseMedia,
        ExerciseReadDTO,
        ExerciseWriteDTO,
        ExerciseMapper,
        ExerciseRepository,
        ExerciseMediaRepository> {

    @Override
    protected ExerciseMedia createMediaEntity(Exercise owner) {
        ExerciseMedia media = new ExerciseMedia();
        media.setOwner(owner);
        return media;
    }

    @Autowired
    MuscleService muscleService;

    @Autowired
    ExerciseGroupRepository exerciseGroupRepository;

    @Override
    @SuppressWarnings("unchecked")
    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> getAll(Map<String, String> params) {
        Map<String, String> filteredParams = new HashMap<>(params);
        String groupName   = filteredParams.remove("groupName");
        String muscle      = filteredParams.remove("muscle");
        String muscles     = filteredParams.remove("muscles");
        String excludeIds  = filteredParams.remove("excludeIds");

        int page = parseIntParam(filteredParams.get("page"), 0);
        int size = parseIntParam(filteredParams.get("size"), 20);
        Pageable pageable = buildPageable(page, size, filteredParams.get("sort"));

        // Extract multi-value (comma-separated) enum params and build IN specs for them
        List<Specification<Exercise>> specs = new ArrayList<>();
        for (String field : new String[]{"category", "equipment", "force", "mechanics", "role", "type", "difficulty"}) {
            String value = filteredParams.get(field);
            if (value != null && value.contains(",")) {
                filteredParams.remove(field);
                specs.add(buildEnumInSpec(field, value.split(",")));
            }
        }

        // Only use SpecificationBuilder for remaining single-value params that aren't infrastructure keys
        List<String> infraKeys = List.of("lang", "page", "size", "sort");
        boolean hasSingleValueFilters = filteredParams.keySet().stream().anyMatch(k -> !infraKeys.contains(k));
        if (hasSingleValueFilters) {
            specs.add(new SpecificationBuilder<Exercise>().build(filteredParams, Exercise.class));
        }

        Specification<Exercise> spec = specs.stream().reduce(Specification::and).orElse(null);

        if (StringUtils.hasText(groupName)) {
            Optional<Long> groupId = exerciseGroupRepository.findAll().stream()
                    .filter(g -> groupName.equalsIgnoreCase(g.getName().getValue()))
                    .map(ExerciseGroup::getId)
                    .findFirst();
            Specification<Exercise> groupSpec = groupId
                    .<Specification<Exercise>>map(gid -> (root, query, cb) ->
                            cb.equal(root.join("group", JoinType.LEFT).get("id"), gid))
                    .orElse((root, query, cb) -> cb.disjunction());
            spec = spec == null ? groupSpec : spec.and(groupSpec);
        }

        if (StringUtils.hasText(muscle)) {
            Optional<Long> muscleId = muscleService.repository.findAll().stream()
                    .filter(m -> muscle.equalsIgnoreCase(m.getName().getValue()))
                    .map(Muscle::getId)
                    .findFirst();
            Specification<Exercise> muscleSpec = muscleId
                    .<Specification<Exercise>>map(mid -> (root, query, cb) -> {
                        query.distinct(true);
                        return cb.equal(
                                root.join("exerciseMuscles", JoinType.LEFT)
                                        .join("muscle", JoinType.LEFT)
                                        .get("id"),
                                mid);
                    })
                    .orElse((root, query, cb) -> cb.disjunction());
            spec = spec == null ? muscleSpec : spec.and(muscleSpec);
        }

        if (StringUtils.hasText(muscles)) {
            List<Muscle> allMuscles = muscleService.repository.findAll();
            Set<Long> allMuscleIds = new HashSet<>();
            for (String muscleName : muscles.split(",")) {
                allMuscles.stream()
                        .filter(m -> muscleName.trim().equalsIgnoreCase(m.getName().getCode()))
                        .findFirst()
                        .ifPresent(m -> {
                            allMuscleIds.add(m.getId());
                            muscleService.findParentMusclesRecursive(m, new HashSet<>())
                                    .forEach(parent -> allMuscleIds.add(parent.getId()));
                        });
            }
            if (!allMuscleIds.isEmpty()) {
                Specification<Exercise> musclesSpec = (root, query, cb) -> {
                    query.distinct(true);
                    jakarta.persistence.criteria.Path<Object> muscleIdPath =
                            root.join("exerciseMuscles", JoinType.LEFT)
                                .join("muscle", JoinType.LEFT)
                                .get("id");
                    CriteriaBuilder.In<Object> inClause = cb.in(muscleIdPath);
                    allMuscleIds.forEach(inClause::value);
                    return inClause;
                };
                spec = spec == null ? musclesSpec : spec.and(musclesSpec);
            }
        }

        if (StringUtils.hasText(excludeIds)) {
            List<Long> ids = Arrays.stream(excludeIds.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(Long::parseLong)
                    .toList();
            if (!ids.isEmpty()) {
                Specification<Exercise> excludeSpec = (root, query, cb) -> root.get("id").in(ids).not();
                spec = spec == null ? excludeSpec : spec.and(excludeSpec);
            }
        }

        Page<ExerciseReadDTO> result = repository.findAll(spec, pageable)
                .map(entity -> afterLoad(mapper.toDTO(entity)));

        return ResponseHelper.success(HttpStatus.OK,
                (result.isEmpty() ?
                        ResponseMessage.ENTITIES_EMPTY.getMessage() :
                        ResponseMessage.ENTITIES_FOUND.getMessage()),
                result);
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private Specification<Exercise> buildEnumInSpec(String field, String[] values) {
        return (root, query, cb) -> {
            java.lang.reflect.Field f = findField(Exercise.class, field);
            if (f == null || !f.getType().isEnum()) return cb.conjunction();
            Class<Enum> enumType = (Class<Enum>) f.getType();

            CriteriaBuilder.In<Object> inClause = cb.in(root.get(field));
            boolean added = false;
            for (String v : values) {
                try {
                    inClause.value(Enum.valueOf(enumType, v.trim().toUpperCase()));
                    added = true;
                } catch (IllegalArgumentException ignored) {}
            }
            return added ? inClause : cb.conjunction();
        };
    }

    private java.lang.reflect.Field findField(Class<?> clazz, String fieldName) {
        Class<?> current = clazz;
        while (current != null && current != Object.class) {
            try { return current.getDeclaredField(fieldName); }
            catch (NoSuchFieldException e) { current = current.getSuperclass(); }
        }
        return null;
    }

    private int parseIntParam(String value, int defaultValue) {
        if (value == null || value.isBlank()) return defaultValue;
        try { return Integer.parseInt(value); }
        catch (NumberFormatException e) { return defaultValue; }
    }

    private Pageable buildPageable(int page, int size, String sort) {
        if (sort == null || sort.isBlank()) return PageRequest.of(page, size);
        String[] parts = sort.split(",", 2);
        Sort.Direction direction = parts.length == 2 && parts[1].equalsIgnoreCase("desc")
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        return PageRequest.of(page, size, Sort.by(direction, parts[0]));
    }

    @Override
    public Exercise beforeSave(Exercise entity) {
        // Given a muscle described at `exerciseMuscles`, adds all its parent muscles as well, with the same role.
        Set<Long> existingMuscleIds = entity.getExerciseMuscles()
                .stream()
                .map(em -> em.getMuscle().getId())
                .collect(toCollection(LinkedHashSet::new));

        Set<ExerciseMuscle> toAdd = new LinkedHashSet<>();
        for (ExerciseMuscle em : new HashSet<>(entity.getExerciseMuscles())) {
            for (Muscle parent : muscleService.findParentMusclesRecursive(em.getMuscle(), new HashSet<>())) {
                if (!existingMuscleIds.contains(parent.getId())) {
                    existingMuscleIds.add(parent.getId());
                    ExerciseMuscle parentEm = new ExerciseMuscle();
                    parentEm.setMuscle(parent);
                    parentEm.setRole(em.getRole());
                    parentEm.setExercise(entity);
                    toAdd.add(parentEm);
                }
            }
        }
        entity.getExerciseMuscles().addAll(toAdd);

        return super.beforeSave(entity);
    }

    public ExerciseReadDTO afterLoad(ExerciseReadDTO dto) {
        dto.setRootMuscles(getExerciseRootMusclesOrderedByRelevance(dto.getId()));
        dto.setMedia(mediaRepository.findAllByOwnerId(dto.getId()).stream()
                .map(this::toMediaReadDTO)
                .toList());
        return super.afterLoad(dto);
    }

    public Set<String> getExerciseRootMusclesOrderedByRelevance(Long exerciseId) {
        Exercise exercise = this.repository.safeFindById(exerciseId);
        return muscleService.findRootMuscleCodesOrderedByRelevance(exercise.getMuscles());
    }

    public ResponseEntity<ResponseDTO<String>> getAllExerciseGroupNames() {
        List<String> groupNames = exerciseGroupRepository.findAll()
                .stream()
                .map(eg -> eg.getName().getValue())
                .toList();
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                groupNames);
    }

    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> getFavoritedExercises() {
        List<ExerciseReadDTO> exercises = repository.findAll()
                .stream()
                .filter(Exercise::isFavorited)
                .map(mapper::toDTO)
                .toList();
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                exercises);
    }

    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> favoriteExercise(Long id) {
        Exercise exercise = repository.safeFindById(id);
        exercise.setFavorited(true);
        repository.save(exercise);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_UPDATED.getMessage(),
                List.of(mapper.toDTO(exercise)));
    }

    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> unfavoriteExercise(Long id) {
        Exercise exercise = repository.safeFindById(id);
        exercise.setFavorited(false);
        repository.save(exercise);
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITY_UPDATED.getMessage(),
                List.of(mapper.toDTO(exercise)));
    }

    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> listExercisesByMuscleGroup(String muscleGroupName) {
        List<ExerciseReadDTO> exercises = repository.findAll()
                .stream()
                .filter(exercise -> {
                    if (exercise.getGroup() == null || exercise.getGroup().getName() == null) {
                        return false;
                    }
                    return exercise.getGroup().getName().getValue().equalsIgnoreCase(muscleGroupName);
                })
                .map(mapper::toDTO)
                .toList();
        return ResponseHelper.success(HttpStatus.OK,
                ResponseMessage.ENTITIES_FOUND.getMessage(),
                exercises);
    }

}
