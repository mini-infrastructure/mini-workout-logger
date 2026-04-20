import { useEffect, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import { IoPlay, IoPause, IoStop } from 'react-icons/io5';
import { IoMdSave } from 'react-icons/io';
import { MdClear } from 'react-icons/md';
import Layout from '../../components/layout/layout.component.tsx';
import Card from '../../components/card/card.component.tsx';
import Button from '../../components/button/button.component.tsx';
import OnlyIconButton from '../../components/button/only-icon-button.component.tsx';
import WorkoutExerciseCard from '../../components/workout-exercise-card/workout-exercise-card.component.tsx';
import ProgressBar from '../../components/progress-bar/progress-bar.component.tsx';
import { useWorkout } from '../../hooks/useWorkout.tsx';
import { useAlert } from '../../context/alert.context.tsx';
import WorkoutService from '../../services/workout.service.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import type { WorkoutWriteDTO } from '../../dtos/workout-write.dto.tsx';
import styles from './workout.view.style.tsx';

const WorkoutView = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const { workout } = useWorkout(id);
    const pushAlert = useAlert();

    // Timer state
    const [isPlaying, setIsPlaying] = useState(searchParams.get('mode') === 'play');
    const [elapsed, setElapsed] = useState(0);
    const [stopKey, setStopKey] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Exercises local state (mutable copy for editing/reordering)
    const [exercises, setExercises] = useState<WorkoutExerciseReadDTO[]>([]);
    const [originalExercises, setOriginalExercises] = useState<WorkoutExerciseReadDTO[]>([]);
    const [dirty, setDirty] = useState(false);

    // Drag state
    const [dragFrom, setDragFrom] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<number | null>(null);

    // Progress tracking
    const [completedCounts, setCompletedCounts] = useState<Record<number, number>>({});
    const totalSets = exercises.reduce((sum, we) => sum + we.sets.length, 0);
    const completedSets = Object.values(completedCounts).reduce((sum, n) => sum + n, 0);
    const progressPct = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

    const handleCompletedChange = (exerciseId: number, count: number) => {
        setCompletedCounts((prev) => ({ ...prev, [exerciseId]: count }));
    };

    useEffect(() => {
        if (workout?.workout_exercises) {
            setExercises(workout.workout_exercises);
            setOriginalExercises(workout.workout_exercises);
        }
    }, [workout]);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying]);

    const handleStop = () => {
        setIsPlaying(false);
        setElapsed(0);
        setStopKey((k) => k + 1);
        setCompletedCounts({});
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Reorder drag-and-drop
    const handleDragStart = (index: number) => setDragFrom(index);

    const handleDragOver = (index: number, e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(index);
    };

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
            pushAlert(`Exercise reordered. Workout saved.`, 'info');
        } catch {
            setExercises(original);
            pushAlert('Failed to reorder exercise.', 'error');
        }
    };

    // Set field changes
    const handleSetChange = (exerciseId: number, setId: number, field: string, value: number) => {
        setExercises((prev) =>
            prev.map((we) => {
                if (we.id !== exerciseId) return we;
                return {
                    ...we,
                    sets: we.sets.map((s) =>
                        s.id === setId ? { ...s, [field]: value } : s
                    ),
                };
            })
        );
        setDirty(true);
    };

    // Remove a set from an exercise
    const handleSetRemove = (exerciseId: number, setId: number) => {
        setExercises((prev) =>
            prev.map((we) =>
                we.id !== exerciseId ? we : { ...we, sets: we.sets.filter((s) => s.id !== setId) }
            )
        );
        setDirty(true);
    };

    // Add a new empty set to an exercise
    const handleSetAdd = (exerciseId: number) => {
        setExercises((prev) =>
            prev.map((we) => {
                if (we.id !== exerciseId) return we;
                const last = we.sets[we.sets.length - 1];
                const newSet: WorkoutExerciseReadDTO['sets'][number] = {
                    id: -Date.now(),
                    position: we.sets.length,
                    category: last?.category ?? 'NORMAL',
                    type: last?.type ?? 'REPS',
                    planned_repetitions: 0,
                    planned_weight: 0,
                    planned_duration_seconds: 0,
                };
                return { ...we, sets: [...we.sets, newSet] };
            })
        );
        setDirty(true);
    };

    // Clear edits
    const handleClear = () => {
        setExercises(originalExercises);
        setDirty(false);
    };

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
                    planned_repetitions: s.type === 'TIME_X_WEIGHT' ? null : (s.planned_repetitions ?? 0),
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
            pushAlert('Workout saved.', 'success');
        } catch {
            pushAlert('Failed to save workout.', 'error');
        }
    };

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                <div css={styles.header}>
                    <div css={styles.titleBlock}>
                        <span css={styles.title}>{workout?.name}</span>
                        <span css={styles.setsCounter}>{completedSets}/{totalSets} sets</span>
                    </div>

                    {dirty && (
                        <>
                            <Button
                                icon={<MdClear />}
                                onClick={handleClear}
                                customCss={styles.saveClearButton}
                            >
                                Clear
                            </Button>
                            <Button
                                icon={<IoMdSave />}
                                onClick={handleSave}
                                customCss={styles.saveClearButton}
                            >
                                Save
                            </Button>
                        </>
                    )}

                    <Card customCss={styles.timerCard}>
                        <span css={styles.clockIcon}>
                            <FaRegClock />
                        </span>
                        <span css={styles.timerDisplay}>{formatTime(elapsed)}</span>
                        <OnlyIconButton
                            icon={<IoPlay />}
                            selectedIcon={<IoPause />}
                            iconColor="--color-blue"
                            selectedIconColor="--color-white"
                            selected={isPlaying}
                            onToggle={(val) => setIsPlaying(val)}
                            legend="Start"
                            selectedLegend="Pause"
                        />
                        <OnlyIconButton
                            icon={<IoStop />}
                            iconColor="--color-white"
                            legend="Stop"
                            onToggle={handleStop}
                            customCss={!isPlaying && elapsed === 0 && { opacity: 0.3, pointerEvents: 'none' }}
                        />
                    </Card>

                </div>

                <ProgressBar percentage={progressPct} />

                <div css={styles.content}>
                    {exercises.map((we, index) => (
                        <WorkoutExerciseCard
                            key={we.id}
                            workoutExercise={we}
                            isDragOver={dragOver === index}
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(index, e)}
                            onDrop={() => handleDrop(index)}
                            onSetChange={(setId, field, value) =>
                                handleSetChange(we.id, setId, field, value)
                            }
                            isPlaying={isPlaying}
                            resetKey={stopKey}
                            onSetRemove={(setId) => handleSetRemove(we.id, setId)}
                            onSetAdd={() => handleSetAdd(we.id)}
                            onCompletedChange={handleCompletedChange}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutView;
