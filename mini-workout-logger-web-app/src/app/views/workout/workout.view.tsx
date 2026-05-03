import { useEffect, useMemo, useRef, useState } from 'react';
import { css } from '@emotion/react';
import type { KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoPlay } from 'react-icons/io5';
import { IoMdSave } from 'react-icons/io';
import { MdClear, MdAdd, MdExpandLess } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import { FaCheck, FaPlusCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Layout from '../../components/layout/layout.component.tsx';
import Button from '../../components/button/button.component.tsx';
import SecondaryButton from '../../components/button/button.secondary.component.tsx';
import OnlyIconButton from '../../components/button/only-icon-button.component.tsx';
import Badge from '../../components/badge/badge.component.tsx';
import EditableBadge from '../../components/badge/editable-badge.component.tsx';
import WorkoutExerciseCard from '../../components/workout-exercise-card/workout-exercise-card.component.tsx';
import DragGrid from '../../components/drag-grid/drag-grid.component.tsx';
import type { RenderItem } from '../../components/drag-grid/drag-grid.component.tsx';
import HumanBody from '../../components/human-body/human-body.component.tsx';
import Search from '../../components/search/search.component.tsx';
import ExerciseCard from '../../components/exercise-card/exercise-card.component.tsx';
import Divider from '../../components/divider/divider.component.tsx';
import Pagination from '../../components/pagination/pagination.component.tsx';
import { useWorkout } from '../../hooks/useWorkout.tsx';
import { useExercises } from '../../hooks/useExercises.tsx';
import { useAlert } from '../../context/alert.context.tsx';
import WorkoutService from '../../services/workout.service.tsx';
import WorkoutExecutionService from '../../services/workout-execution.service.tsx';
import TagService from '../../services/tag.service.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import type { WorkoutWriteDTO } from '../../dtos/workout-write.dto.tsx';
import type { WorkoutExecutionReadDTO } from '../../dtos/workout-execution-read.dto.tsx';
import type { ExerciseReadDTO } from '../../dtos/exercise-read.dto.tsx';
import type { TagReadDTO } from '../../dtos/tag-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
import WorkoutExecutionHistoryCard from '../../components/workout-execution-card/workout-execution-history-card.component.tsx';
import {
    buildWorkoutExercisesPayload,
    applySetChange,
    applySetTypeChange,
    applySetRemove,
    applySetReorder,
    applySetAdd,
    applyNotesChange,
    applyExerciseReorder,
    applyExerciseRemove,
    applyExerciseSwap,
} from '../../utils/workout-exercise.utils.tsx';
import styles from './workout.view.style.tsx';

const WorkoutView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { workout } = useWorkout(id);
    const pushAlert = useAlert();

    // Plan editing state
    const [exercises, setExercises] = useState<WorkoutExerciseReadDTO[]>([]);
    const [originalExercises, setOriginalExercises] = useState<WorkoutExerciseReadDTO[]>([]);
    const [dirty, setDirty] = useState(false);

    // Name editing
    const [nameEditMode, setNameEditMode] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [editedName, setEditedName] = useState('');
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Tags
    const [localTags, setLocalTags] = useState<TagReadDTO[]>([]);
    const [addingTag, setAddingTag] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const tagInputRef = useRef<HTMLInputElement>(null);

    // Execution history
    const [executions, setExecutions] = useState<WorkoutExecutionReadDTO[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Add exercise section
    const [addOpen, setAddOpen] = useState(false);
    const [addAnimating, setAddAnimating] = useState(false);
    const [exerciseQuery, setExerciseQuery] = useState('');
    const [searchPage, setSearchPage] = useState(0);
    const existingExerciseIds = useMemo(() => exercises.map((we) => we.exercise.id), [exercises]);
    const { exercises: searchResults, pagination: searchPagination } = useExercises(exerciseQuery, searchPage, {}, [], 12, existingExerciseIds);


    // Hovered exercise — drives muscle highlight on the body visualization
    const [hoveredExerciseId, setHoveredExerciseId] = useState<number | null>(null);

    useEffect(() => {
        if (workout?.workout_exercises) {
            setExercises(workout.workout_exercises);
            setOriginalExercises(workout.workout_exercises);
        }
        if (workout?.name) {
            setDisplayName(workout.name);
            setEditedName(workout.name);
        }
        if (workout?.tags) {
            setLocalTags(workout.tags);
        }
    }, [workout]);

    useEffect(() => {
        if (nameEditMode) nameInputRef.current?.focus();
    }, [nameEditMode]);

    useEffect(() => {
        if (addingTag) tagInputRef.current?.focus();
    }, [addingTag]);

    useEffect(() => {
        if (!id) return;
        setLoadingHistory(true);
        WorkoutExecutionService.getAll(id)
            .then(setExecutions)
            .catch(() => setExecutions([]))
            .finally(() => setLoadingHistory(false));
    }, [id]);

    useEffect(() => {
        if (!addOpen) return;
        const id = setTimeout(() => setAddAnimating(true), 16);
        return () => clearTimeout(id);
    }, [addOpen]);

    const handleToggleAdd = () => {
        if (addOpen) {
            setAddAnimating(false);
            setTimeout(() => setAddOpen(false), 260);
        } else {
            setAddOpen(true);
            setSearchPage(0);
        }
    };

    // All muscles across the workout (shown when nothing is hovered)
    const allMuscles = useMemo(
        () => [...new Set(exercises.flatMap((we) => we.exercise.root_muscles ?? []))],
        [exercises]
    );

    // When hovering an exercise card, show only its muscles; otherwise show all
    const bodyMuscles = useMemo(() => {
        if (hoveredExerciseId !== null) {
            const we = exercises.find((e) => e.id === hoveredExerciseId);
            return we?.exercise.root_muscles ?? [];
        }
        return allMuscles;
    }, [hoveredExerciseId, exercises, allMuscles]);

    // Exercise stats
    const totalSets = exercises.reduce((sum, we) => sum + we.sets.length, 0);

    // Build the full payload from current state
    const buildPayload = (name: string, tags: TagReadDTO[]): WorkoutWriteDTO => ({
        name,
        workout_exercises: buildWorkoutExercisesPayload(exercises),
        tag_ids: tags.map((t) => t.id),
    });

    // Drag-to-reorder exercises
    const handleReorder = async (from: number, to: number) => {
        const original = exercises;
        const { updated, moved } = applyExerciseReorder(exercises, from, to);
        setExercises(updated);
        try {
            await WorkoutService.reorderExercise(id!, moved.id, to);
        } catch {
            setExercises(original);
            pushAlert('Failed to reorder exercise.', 'error');
        }
    };

    // Set field change
    const handleSetChange = (exerciseId: number, setId: number, field: string, value: number) => {
        setExercises((prev) => applySetChange(prev, exerciseId, setId, field, value));
        setDirty(true);
    };

    // Set type change
    const handleSetTypeChange = (exerciseId: number, setId: number, type: SetType) => {
        setExercises((prev) => applySetTypeChange(prev, exerciseId, setId, type));
        setDirty(true);
    };

    // Set reorder (local only, saved with full workout save)
    const handleSetReorder = (exerciseId: number, fromIndex: number, toIndex: number) => {
        setExercises((prev) => applySetReorder(prev, exerciseId, fromIndex, toIndex));
        setDirty(true);
    };

    // Exercise remove
    const handleRemoveExercise = (exerciseId: number) => {
        setExercises((prev) => applyExerciseRemove(prev, exerciseId));
        setDirty(true);
    };

    const handleNotesChange = (exerciseId: number, notes: string) => {
        setExercises((prev) => applyNotesChange(prev, exerciseId, notes));
        setDirty(true);
    };

    const handleSwapExercise = (exerciseId: number, newExercise: ExerciseReadDTO) => {
        setExercises((prev) => applyExerciseSwap(prev, exerciseId, newExercise));
        setDirty(true);
    };

    // Set remove
    const handleSetRemove = (exerciseId: number, setId: number) => {
        setExercises((prev) => applySetRemove(prev, exerciseId, setId));
        setDirty(true);
    };

    // Set add
    const handleSetAdd = (exerciseId: number) => {
        setExercises((prev) => {
            const exercise = prev.find((we) => we.id === exerciseId);
            const defaultType = exercise?.exercise.category === 'CARDIO' ? 'TIME' : undefined;
            return applySetAdd(prev, exerciseId, false, defaultType);
        });
        setDirty(true);
    };

    useEffect(() => { setSearchPage(0); }, [exerciseQuery]);

    // Add exercise from search
    const handleAddExercise = (exercise: ExerciseReadDTO) => {
        const newEntry: WorkoutExerciseReadDTO = {
            id: -Date.now(),
            position: exercises.length,
            exercise,
            sets: [{
                id: -Date.now() - 1,
                position: 0,
                category: 'NORMAL',
                type: 'REPS',
                planned_repetitions: 0,
                planned_weight: 0,
                planned_duration_seconds: 0,
            }],
            equipment: exercise.equipment ?? 'BODYWEIGHT',
            rest_time_seconds: 60,
        };
        setExercises((prev) => [...prev, newEntry]);
        setDirty(true);
        setAddOpen(false);
        setExerciseQuery('');
        setSearchPage(0);
    };

    // Clear edits
    const handleClear = () => { setExercises(originalExercises); setDirty(false); };

    // Save workout (exercises + tags, current name)
    const handleSave = async () => {
        if (!workout) return;
        const payload = buildPayload(editedName || workout.name, localTags);
        try {
            await WorkoutService.update(id!, payload);
            setDirty(false);
            setOriginalExercises(exercises);
            pushAlert('Workout saved.', 'success');
        } catch {
            pushAlert('Failed to save workout.', 'error');
        }
    };

    // Save name only
    const handleSaveName = async () => {
        const trimmed = editedName.trim();
        if (!trimmed || !workout) return;
        const payload = buildPayload(trimmed, localTags);
        try {
            await WorkoutService.update(id!, payload);
            setDisplayName(trimmed);
            setNameEditMode(false);
            pushAlert('Workout name updated.', 'success');
        } catch {
            pushAlert('Failed to update name.', 'error');
        }
    };

    const handleCancelNameEdit = () => {
        setEditedName(displayName);
        setNameEditMode(false);
    };

    // Edit existing tag
    const handleTagEdit = async (tag: TagReadDTO, newName: string) => {
        try {
            const updated = await TagService.update(tag.id, newName);
            const newTags = localTags.map((t) => (t.id === tag.id ? updated : t));
            setLocalTags(newTags);
            const payload = buildPayload(displayName, newTags);
            await WorkoutService.update(id!, payload);
            pushAlert(`Tag renamed to "${newName}".`, 'success');
        } catch {
            pushAlert('Failed to rename tag.', 'error');
        }
    };

    // Remove existing tag
    const handleTagRemove = async (tagId: number) => {
        const newTags = localTags.filter((t) => t.id !== tagId);
        setLocalTags(newTags);
        try {
            const payload = buildPayload(displayName, newTags);
            await WorkoutService.update(id!, payload);
            pushAlert('Tag removed.', 'info');
        } catch {
            pushAlert('Failed to remove tag.', 'error');
        }
    };

    // Add tag inline — reuses an existing tag if the name already exists
    const handleTagCommit = async () => {
        const trimmed = tagInput.trim();
        setTagInput('');
        setAddingTag(false);
        if (!trimmed || !workout) return;
        try {
            const allTags = await TagService.getAll();
            const existing = allTags.find((t) => t.name.toLowerCase() === trimmed.toLowerCase());
            const tag = existing ?? await TagService.create(trimmed);
            if (localTags.some((t) => t.id === tag.id)) return;
            const newTags = [...localTags, tag];
            setLocalTags(newTags);
            const payload = buildPayload(editedName || workout.name, newTags);
            await WorkoutService.update(id!, payload);
            pushAlert(`Tag "${tag.name}" added.`, 'success');
        } catch {
            pushAlert('Failed to add tag.', 'error');
        }
    };

    const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleTagCommit();
        if (e.key === 'Escape') { setTagInput(''); setAddingTag(false); }
    };

    // Start execution
    const handleStart = async () => {
        try {
            const execution = await WorkoutExecutionService.create(id!);
            navigate(`/workouts/${id}/executions/${execution.id}`);
        } catch {
            pushAlert('Failed to start workout.', 'error');
        }
    };

    const renderExerciseCard: RenderItem<WorkoutExerciseReadDTO> = (we, provided) => (
        <WorkoutExerciseCard
            workoutExercise={we}
            dragHandleProps={provided.dragHandleProps}
            indicatorCss={provided.indicatorCss}
            onSetChange={(setId, field, value) => handleSetChange(we.id, setId, field, value)}
            onSetTypeChange={(setId, type) => handleSetTypeChange(we.id, setId, type)}
            onSetRemove={(setId) => handleSetRemove(we.id, setId)}
            onSetReorder={(from, to) => handleSetReorder(we.id, from, to)}
            onSetAdd={() => handleSetAdd(we.id)}
            onRemoveExercise={() => handleRemoveExercise(we.id)}
            onSwapExercise={(newExercise) => handleSwapExercise(we.id, newExercise)}
            onNotesChange={handleNotesChange}
            existingExerciseIds={exercises.map((e) => e.exercise.id)}
            highlighted={hoveredExerciseId === we.id}
            onMouseEnter={() => setHoveredExerciseId(we.id)}
            onMouseLeave={() => setHoveredExerciseId(null)}
            planMode
        />
    );

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                {/* Header */}
                <div css={styles.header}>
                    <div css={styles.titleBlock}>
                        <div css={styles.nameRow}>
                            {nameEditMode ? (
                                <>
                                    <input
                                        ref={nameInputRef}
                                        css={styles.nameInput}
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveName();
                                            if (e.key === 'Escape') handleCancelNameEdit();
                                        }}
                                    />
                                    <OnlyIconButton
                                        icon={<FaCheck />}
                                        iconColor="--color-green"
                                        onToggle={handleSaveName}
                                        legend="Save name"
                                    />
                                    <OnlyIconButton
                                        icon={<IoClose />}
                                        iconColor="--color-red"
                                        onToggle={handleCancelNameEdit}
                                        legend="Cancel"
                                        customIconCss={{ fontSize: '20px', width: '20px', height: '20px' }}
                                    />
                                </>
                            ) : (
                                <>
                                    <span css={styles.title}>{displayName}</span>
                                    <OnlyIconButton
                                        icon={<RiEdit2Fill />}
                                        iconColor="--color-gray"
                                        onToggle={() => setNameEditMode(true)}
                                        legend="Edit name"
                                    />
                                    {localTags.map((tag) => (
                                        <EditableBadge
                                            key={tag.id}
                                            variant="primary"
                                            onEdit={(newName) => handleTagEdit(tag, newName)}
                                            onRemove={() => handleTagRemove(tag.id)}
                                        >
                                            {tag.name}
                                        </EditableBadge>
                                    ))}
                                    {addingTag ? (
                                        <input
                                            ref={tagInputRef}
                                            css={styles.tagInput}
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onBlur={handleTagCommit}
                                            onKeyDown={handleTagKeyDown}
                                            placeholder="Tag name..."
                                        />
                                    ) : (
                                        <Badge variant="primary" icon={<FaPlusCircle />} onClick={() => setAddingTag(true)}>
                                            Add tag
                                        </Badge>
                                    )}
                                </>
                            )}
                        </div>
                        <span css={styles.subtitle}>
                            {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} · {totalSets} set{totalSets !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {dirty && (
                        <>
                            <SecondaryButton icon={<MdClear />} onClick={handleClear} customCss={styles.actionButton}>
                                Clear
                            </SecondaryButton>
                            <SecondaryButton icon={<IoMdSave />} onClick={handleSave} color="var(--color-green)" customCss={styles.actionButton}>
                                Save
                            </SecondaryButton>
                        </>
                    )}

                    <Button icon={<IoPlay />} onClick={handleStart} customCss={styles.startButton}>
                        Start
                    </Button>
                </div>

                {/* Two-column content */}
                <div css={styles.contentRow}>
                    {/* Left: exercises + add + history */}
                    <div css={styles.leftColumn}>

                        {/* Exercise cards */}
                        <DragGrid
                            items={exercises}
                            getItemKey={(we) => we.id}
                            onReorder={handleReorder}
                            renderItem={renderExerciseCard}
                            reorderLabel="Exercise"
                        />

                        {/* Add exercise */}
                        <Divider />
                        <div css={styles.addContainer}>
                            <Button
                                icon={addOpen ? <MdExpandLess /> : <MdAdd />}
                                onClick={handleToggleAdd}
                                customCss={styles.addExerciseToggle}
                            >
                                {addOpen ? 'Collapse' : 'Add exercise'}
                            </Button>

                            {addOpen && (
                            <div css={styles.addSectionWrapper} style={{ maxHeight: addAnimating ? '500px' : '0' }}>
                                <div css={styles.addSection}>
                                    <Search
                                        value={exerciseQuery}
                                        onChange={setExerciseQuery}
                                        placeholder="Search exercises..."
                                    />
                                    {(() => {
                                        return (
                                            <>
                                                <div css={styles.resultsArea}>
                                                    {searchResults.length === 0 ? (
                                                        <span css={styles.noResults}>No exercises found.</span>
                                                    ) : (
                                                        <div css={styles.exerciseSearchResults}>
                                                            {searchResults.map((ex) => (
                                                                <ExerciseCard
                                                                    key={ex.id}
                                                                    exercise={ex}
                                                                    mini
                                                                    onClick={() => handleAddExercise(ex)}
                                                                    customCss={styles.searchResultCard}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                {searchResults.length > 0 && searchPagination && searchPagination.total_pages > 1 && (
                                                    <Pagination
                                                        page={searchPage}
                                                        totalPages={searchPagination.total_pages}
                                                        onPageChange={setSearchPage}
                                                        customCss={css({ marginTop: 'var(--stack-gap-condensed)' })}
                                                    />
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                            )}
                        </div>

                        {/* History */}
                        <Divider />
                        <span css={styles.sectionTitle}>Past executions</span>

                        {loadingHistory ? (
                            <span css={styles.historyEmpty}>Loading...</span>
                        ) : executions.length === 0 ? (
                            <span css={styles.historyEmpty}>No executions yet.</span>
                        ) : (
                            <div css={styles.historyList}>
                                {executions.map((ex) => (
                                    <WorkoutExecutionHistoryCard key={ex.id} execution={ex} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: human body front + back */}
                    <div css={styles.rightPanel}>
                        <div css={styles.bodyWrapper}>
                            <HumanBody
                                selectedMuscles={bodyMuscles}
                                initialView="front"
                                showFlipButton={false}
                            />
                        </div>
                        <div css={styles.bodyWrapper}>
                            <HumanBody
                                selectedMuscles={bodyMuscles}
                                initialView="back"
                                showFlipButton={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutView;
