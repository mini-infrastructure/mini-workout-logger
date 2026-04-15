package com.mini.workout_logger_backend.services;

import com.mini.java_core.dto.ResponseDTO;
import com.mini.java_core.entity.ResponseHelper;
import com.mini.java_core.enums.ResponseMessage;
import com.mini.java_core.service.AbstractService;
import com.mini.java_core.specification.SpecificationBuilder;
import com.mini.workout_logger_backend.dtos.ExerciseReadDTO;
import com.mini.workout_logger_backend.dtos.ExerciseWriteDTO;
import com.mini.workout_logger_backend.dtos.MuscleReadDTO;
import com.mini.workout_logger_backend.entities.Exercise;
import com.mini.workout_logger_backend.entities.ExerciseGroup;
import com.mini.workout_logger_backend.entities.ExerciseMuscle;
import com.mini.workout_logger_backend.entities.Muscle;
import com.mini.workout_logger_backend.enums.ExerciseEquipment;
import com.mini.workout_logger_backend.mappers.ExerciseMapper;
import com.mini.workout_logger_backend.repositories.ExerciseGroupRepository;
import com.mini.workout_logger_backend.repositories.ExerciseRepository;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
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
public class ExerciseService extends AbstractService<Exercise,
        ExerciseReadDTO,
        ExerciseWriteDTO,
        ExerciseMapper,
        ExerciseRepository> {

    @Autowired
    MuscleService muscleService;

    @Autowired
    ExerciseGroupRepository exerciseGroupRepository;

    @Override
    @SuppressWarnings("unchecked")
    public ResponseEntity<ResponseDTO<ExerciseReadDTO>> getAll(Map<String, String> params) {
        Map<String, String> filteredParams = new HashMap<>(params);
        String groupName = filteredParams.remove("groupName");
        String muscle    = filteredParams.remove("muscle");

        int page = parseIntParam(filteredParams.get("page"), 0);
        int size = parseIntParam(filteredParams.get("size"), 20);
        Pageable pageable = buildPageable(page, size, filteredParams.get("sort"));

        // Extract multi-value (comma-separated) enum params and build OR specs for them
        Specification<Exercise> spec = null;
        for (String field : new String[]{"category", "equipment", "force", "mechanics", "role", "type", "difficulty"}) {
            String value = filteredParams.get(field);
            if (value != null && value.contains(",")) {
                filteredParams.remove(field);
                String[] values = value.split(",");
                Specification<Exercise> orSpec = buildEnumOrSpec(field, values);
                spec = spec == null ? orSpec : spec.and(orSpec);
            }
        }

        SpecificationBuilder<Exercise> builder = new SpecificationBuilder<>();
        Specification<Exercise> baseSpec = builder.build(filteredParams, Exercise.class);
        spec = spec == null ? baseSpec : (baseSpec == null ? spec : spec.and(baseSpec));

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

        Page<ExerciseReadDTO> result = repository.findAll(spec, pageable)
                .map(entity -> afterLoad(mapper.toDTO(entity)));

        return ResponseHelper.success(HttpStatus.OK,
                (result.isEmpty() ?
                        ResponseMessage.ENTITIES_EMPTY.getMessage() :
                        ResponseMessage.ENTITIES_FOUND.getMessage()),
                result);
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private Specification<Exercise> buildEnumOrSpec(String field, String[] values) {
        return (root, query, cb) -> {
            Class<?> fieldType;
            try {
                java.lang.reflect.Field f = findField(Exercise.class, field);
                if (f == null) return cb.conjunction();
                fieldType = f.getType();
                if (!fieldType.isEnum()) return cb.conjunction();
            } catch (Exception e) {
                return cb.conjunction();
            }
            List<Predicate> predicates = new ArrayList<>();
            for (String v : values) {
                try {
                    Enum<?> enumValue = Enum.valueOf((Class<Enum>) fieldType, v.toUpperCase().trim());
                    predicates.add(cb.equal(root.get(field), enumValue));
                } catch (IllegalArgumentException ignored) {}
            }
            return predicates.isEmpty() ? cb.conjunction() : cb.or(predicates.toArray(new Predicate[0]));
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
        for (Muscle muscle : entity.getMuscles()) {
            for (Muscle parent : muscleService.findParentMusclesRecursive(muscle, new java.util.HashSet<>())) {
                boolean alreadyExists = entity.getMuscles()
                        .stream()
                        .anyMatch(m -> m.equals(parent));

                if (!alreadyExists) {
                    entity.addMuscle(parent, entity.roleOf(muscle));
                }
            }
        }

        return super.beforeSave(entity);
    }

    public ExerciseReadDTO afterLoad(ExerciseReadDTO dto) {
        dto.setRootMuscles(getExerciseRootMusclesOrderedByRelevance(dto.getId()));
        return super.afterLoad(dto);
    }

    public Set<String> getExerciseRootMusclesOrderedByRelevance(Long exerciseId) {
        Exercise exercise = this.repository.safeFindById(exerciseId);
        Set<Muscle> muscles = exercise.getMuscles();
        Set<Muscle> rootMuscles = muscleService.findRootMuscles(muscles);

        Map<Muscle, Long> scores = new HashMap<>();
        for (Muscle rootMuscle : rootMuscles) {
            Set<Muscle> children = muscleService.findChildMusclesRecursive(rootMuscle, new java.util.HashSet<>());
            long score = children.stream().filter(muscles::contains).count();
            scores.put(rootMuscle, score);
        }
        return scores.entrySet()
                .stream()
                .sorted((e1, e2) ->
                        Long.compare(e2.getValue(), e1.getValue()))
                .map(entry -> entry.getKey()
                        .getName()
                        .getValue())
                .collect(toCollection(LinkedHashSet::new));
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
