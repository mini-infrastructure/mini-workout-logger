import { useEffect, useMemo, useState } from 'react';
import type { DragEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoPlay } from 'react-icons/io5';
import { IoMdSave } from 'react-icons/io';
import { MdClear, MdAdd, MdExpandLess } from 'react-icons/md';
import Layout from '../../components/layout/layout.component.tsx';
import Button from '../../components/button/button.component.tsx';
import WorkoutExerciseCard from '../../components/workout-exercise-card/workout-exercise-card.component.tsx';
import HumanBody from '../../components/human-body/human-body.component.tsx';
import Search from '../../components/search/search.component.tsx';
import ExerciseCard from '../../components/exercise-card/exercise-card.component.tsx';
import Divider from '../../components/divider/divider.component.tsx';
import Badge from '../../components/badge/badge.component.tsx';
import { useWorkout } from '../../hooks/useWorkout.tsx';
import { useExercises } from '../../hooks/useExercises.tsx';
import { useAlert } from '../../context/alert.context.tsx';
import WorkoutService from '../../services/workout.service.tsx';
import WorkoutExecutionService from '../../services/workout-execution.service.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import type { WorkoutWriteDTO } from '../../dtos/workout-write.dto.tsx';
import type { WorkoutExecutionReadDTO } from '../../dtos/workout-execution-read.dto.tsx';
import type { ExerciseReadDTO } from '../../dtos/exercise-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
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

    // Execution history
    const [executions, setExecutions] = useState<WorkoutExecutionReadDTO[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    // Add exercise section
    const [addOpen, setAddOpen] = useState(false);
    const [exerciseQuery, setExerciseQuery] = useState('');
    const { exercises: searchResults } = useExercises(exerciseQuery, 0, {}, []);

    // Exercise drag state
    const [dragFrom, setDragFrom] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<number | null>(null);

    // Hovered exercise — drives muscle highlight on the body visualization
    const [hoveredExerciseId, setHoveredExerciseId] = useState<number | null>(null);

    useEffect(() => {
        if (workout?.workout_exercises) {
            setExercises(workout.workout_exercises);
            setOriginalExercises(workout.workout_exercises);
        }
    }, [workout]);

    useEffect(() => {
        if (!id) return;
        setLoadingHistory(true);
        WorkoutExecutionService.getAll(id)
            .then(setExecutions)
            .catch(() => setExecutions([]))
            .finally(() => setLoadingHistory(false));
    }, [id]);

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

    // Drag-to-reorder exercises
    const handleDragStart = (index: number) => setDragFrom(index);
    const handleDragOver = (index: number, e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragOver(index); };
    const handleDragEnd = () => { setDragFrom(null); setDragOver(null); };

    const handleDrop = async (dropIndex: number) => {
        const from = dragFrom;
        setDragFrom(null);
        setDragOver(null);
        if (from === null || from === dropIndex) return;
        const original = exercises;
        const updated = [...exercises];
        const [moved] = updated.splice(from, 1);
        updated.splice(dropIndex, 0, moved);
        setExercises(updated);
        try {
            await WorkoutService.reorderExercise(id!, moved.id, dropIndex);
        } catch {
            setExercises(original);
            pushAlert('Failed to reorder exercise.', 'error');
        }
    };

    // Set field change
    const handleSetChange = (exerciseId: number, setId: number, field: string, value: number) => {
        setExercises((prev) =>
            prev.map((we) =>
                we.id !== exerciseId ? we : {
                    ...we,
                    sets: we.sets.map((s) => s.id === setId ? { ...s, [field]: value } : s),
                }
            )
        );
        setDirty(true);
    };

    // Set type change
    const handleSetTypeChange = (exerciseId: number, setId: number, type: SetType) => {
        setExercises((prev) =>
            prev.map((we) =>
                we.id !== exerciseId ? we : {
                    ...we,
                    sets: we.sets.map((s) => s.id === setId ? { ...s, type } : s),
                }
            )
        );
        setDirty(true);
    };

    // Set reorder (local only, saved with full workout save)
    const handleSetReorder = (exerciseId: number, fromIndex: number, toIndex: number) => {
        setExercises((prev) =>
            prev.map((we) => {
                if (we.id !== exerciseId) return we;
                const sets = [...we.sets];
                const [moved] = sets.splice(fromIndex, 1);
                const adjusted = toIndex > fromIndex ? toIndex - 1 : toIndex;
                sets.splice(adjusted, 0, moved);
                return { ...we, sets };
            })
        );
        setDirty(true);
    };

    // Exercise remove
    const handleRemoveExercise = (exerciseId: number) => {
        setExercises((prev) => prev.filter((we) => we.id !== exerciseId));
        setDirty(true);
    };

    // Set remove
    const handleSetRemove = (exerciseId: number, setId: number) => {
        setExercises((prev) =>
            prev.map((we) =>
                we.id !== exerciseId ? we : { ...we, sets: we.sets.filter((s) => s.id !== setId) }
            )
        );
        setDirty(true);
    };

    // Set add
    const handleSetAdd = (exerciseId: number) => {
        setExercises((prev) =>
            prev.map((we) => {
                if (we.id !== exerciseId) return we;
                const last = we.sets[we.sets.length - 1];
                return {
                    ...we,
                    sets: [...we.sets, {
                        id: -Date.now(),
                        position: we.sets.length,
                        category: last?.category ?? 'NORMAL',
                        type: last?.type ?? 'REPS',
                        planned_repetitions: last?.planned_repetitions ?? 0,
                        planned_weight: last?.planned_weight ?? 0,
                        planned_duration_seconds: last?.planned_duration_seconds ?? 0,
                    }],
                };
            })
        );
        setDirty(true);
    };

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
    };

    // Clear edits
    const handleClear = () => { setExercises(originalExercises); setDirty(false); };

    // Save workout
    const handleSave = async () => {
        if (!workout) return;
        const payload: WorkoutWriteDTO = {
            name: workout.name,
            workout_exercises: exercises.map((we) => ({
                exercise_id: we.exercise.id,
                sets: we.sets.map((s) => ({
                    category: s.category,
                    type: s.type,
                    planned_repetitions: (s.type === 'TIME' || s.type === 'TIME_X_WEIGHT') ? null : (s.planned_repetitions ?? 0),
                    planned_weight: (s.type === 'REPS' || s.type === 'TIME') ? null : (s.planned_weight ?? 0),
                    planned_duration_seconds: (s.type === 'REPS' || s.type === 'REPS_X_WEIGHT') ? null : (s.planned_duration_seconds ?? 0),
                })),
                equipment: we.equipment,
                rest_time_seconds: we.rest_time_seconds,
            })),
        };
        try {
            await WorkoutService.update(id!, payload);
            setDirty(false);
            setOriginalExercises(exercises);
            pushAlert('Workout saved.', 'success');
        } catch {
            pushAlert('Failed to save workout.', 'error');
        }
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

    const formatDate = (iso: string) => {
        if (!iso) return '—';
        return new Date(iso).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                {/* Header */}
                <div css={styles.header}>
                    <div css={styles.titleBlock}>
                        <span css={styles.title}>{workout?.name}</span>
                        <span css={styles.subtitle}>
                            {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} · {totalSets} set{totalSets !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {dirty && (
                        <>
                            <Button icon={<MdClear />} onClick={handleClear} customCss={styles.actionButton}>
                                Clear
                            </Button>
                            <Button icon={<IoMdSave />} onClick={handleSave} customCss={styles.actionButton}>
                                Save
                            </Button>
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
                        <div css={styles.exerciseList}>
                            {exercises.map((we, index) => (
                                <WorkoutExerciseCard
                                    key={we.id}
                                    workoutExercise={we}
                                    isDragOver={dragOver === index}
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={(e) => handleDragOver(index, e)}
                                    onDrop={() => handleDrop(index)}
                                    onDragEnd={handleDragEnd}
                                    onSetChange={(setId, field, value) => handleSetChange(we.id, setId, field, value)}
                                    onSetTypeChange={(setId, type) => handleSetTypeChange(we.id, setId, type)}
                                    onSetRemove={(setId) => handleSetRemove(we.id, setId)}
                                    onSetReorder={(from, to) => handleSetReorder(we.id, from, to)}
                                    onSetAdd={() => handleSetAdd(we.id)}
                                    onRemoveExercise={() => handleRemoveExercise(we.id)}
                                    highlighted={hoveredExerciseId === we.id}
                                    onMouseEnter={() => setHoveredExerciseId(we.id)}
                                    onMouseLeave={() => setHoveredExerciseId(null)}
                                    planMode
                                />
                            ))}
                        </div>

                        {/* Add exercise */}
                        <Divider />
                        <Button
                            icon={addOpen ? <MdExpandLess /> : <MdAdd />}
                            onClick={() => setAddOpen((v) => !v)}
                            customCss={styles.addExerciseToggle}
                        >
                            {addOpen ? 'Collapse' : 'Add exercise'}
                        </Button>

                        {addOpen && (
                            <div css={styles.addSection}>
                                <Search
                                    value={exerciseQuery}
                                    onChange={setExerciseQuery}
                                    placeholder="Search exercises..."
                                />
                                <div css={styles.exerciseSearchResults}>
                                    {searchResults
                                        .filter((ex) => !exercises.some((we) => we.exercise.id === ex.id))
                                        .map((ex) => (
                                        <ExerciseCard
                                            key={ex.id}
                                            exercise={ex}
                                            onClick={() => handleAddExercise(ex)}
                                            customCss={styles.searchResultCard}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

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
                                    <div key={ex.id} css={styles.historyItem}>
                                        <span css={styles.historyDate}>{formatDate(ex.start_time)}</span>
                                        <Badge variant={ex.completed ? 'success' : 'gray'}>
                                            {ex.completed ? 'Completed' : 'Incomplete'}
                                        </Badge>
                                    </div>
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
