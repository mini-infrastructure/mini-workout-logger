import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import { IoPlay, IoPause, IoStop } from 'react-icons/io5';
import { MdChecklistRtl, MdClose } from 'react-icons/md';
import Layout from '../../components/layout/layout.component.tsx';
import Card from '../../components/card/card.component.tsx';
import Button from '../../components/button/button.component.tsx';
import SecondaryButton from '../../components/button/button.secondary.component.tsx';
import OnlyIconButton from '../../components/button/only-icon-button.component.tsx';
import WorkoutExerciseCard from '../../components/workout-exercise-card/workout-exercise-card.component.tsx';
import DragGrid from '../../components/drag-grid/drag-grid.component.tsx';
import ProgressBar from '../../components/progress-bar/progress-bar.component.tsx';
import { useWorkout } from '../../hooks/useWorkout.tsx';
import { useAlert } from '../../context/alert.context.tsx';
import WorkoutService from '../../services/workout.service.tsx';
import WorkoutExecutionService from '../../services/workout-execution.service.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import type { WorkoutExecutionReadDTO } from '../../dtos/workout-execution-read.dto.tsx';
import {
    buildWorkoutExercisesPayload,
    applySetChange,
    applySetRemove,
    applySetReorder,
    applySetAdd,
    applyNotesChange,
} from '../../utils/workout-exercise.utils.ts';
import styles from './workout-execution.view.style.tsx';

const WorkoutExecutionView = () => {
    const { id, executionId } = useParams<{ id: string; executionId: string }>();
    const navigate = useNavigate();
    const { workout } = useWorkout(id);
    const pushAlert = useAlert();

    // The current execution (fetched once on mount to get set_execution IDs)
    const [execution, setExecution] = useState<WorkoutExecutionReadDTO | null>(null);

    // Timer
    const [isPlaying, setIsPlaying] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const [stopKey, setStopKey] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Exercises (local copy for set interaction)
    const [exercises, setExercises] = useState<WorkoutExerciseReadDTO[]>([]);


    // Progress — keyed by exerciseId, values are plan set IDs
    const [completedSetIds, setCompletedSetIds] = useState<Record<number, number[]>>({});
    const [skippedSetIds, setSkippedSetIds] = useState<Record<number, number[]>>({});
    const totalSkipped = Object.values(skippedSetIds).reduce((sum, ids) => sum + ids.length, 0);
    const totalSets = exercises.reduce((sum, we) => sum + we.sets.length, 0) - totalSkipped;
    const completedSets = Object.values(completedSetIds).reduce((sum, ids) => sum + ids.length, 0);
    const progressPct = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

    const handleCompletedChange = (exerciseId: number, ids: number[]) => {
        setCompletedSetIds((prev) => ({ ...prev, [exerciseId]: ids }));
    };

    const handleSkippedChange = (exerciseId: number, ids: number[]) => {
        setSkippedSetIds((prev) => ({ ...prev, [exerciseId]: ids }));
    };

    const buildPayload = (currentExercises: WorkoutExerciseReadDTO[]) => ({
        name: workout?.name ?? '',
        workout_exercises: buildWorkoutExercisesPayload(currentExercises),
        tag_ids: workout?.tags?.map((t) => t.id) ?? [],
    });

    const handleNotesChange = (exerciseId: number, notes: string) => {
        setExercises((prev) => applyNotesChange(prev, exerciseId, notes));
    };

    const handleNotesSave = async (exerciseId: number, notes: string) => {
        const updated = exercises.map((we) => we.id !== exerciseId ? we : { ...we, notes });
        setExercises(updated);
        try {
            await WorkoutService.update(id!, buildPayload(updated));
            pushAlert('Note saved.', 'success');
        } catch {
            pushAlert('Failed to save note.', 'error');
        }
    };

    // Exercise drag-to-reorder
    const handleReorder = async (from: number, to: number) => {
        const original = exercises;
        const updated = [...exercises];
        const [moved] = updated.splice(from, 1);
        updated.splice(to, 0, moved);
        setExercises(updated);
        try {
            await WorkoutService.reorderExercise(id!, moved.id, to);
            pushAlert('Exercise reordered.', 'success');
        } catch {
            setExercises(original);
            pushAlert('Failed to reorder exercise.', 'error');
        }
    };

    useEffect(() => {
        if (workout?.workout_exercises) {
            setExercises(workout.workout_exercises);
        }
    }, [workout]);

    useEffect(() => {
        if (!id || !executionId) return;
        WorkoutExecutionService.getAll(id).then((all) => {
            const found = all.find((e) => e.id === Number(executionId));
            if (found) setExecution(found);
        });
    }, [id, executionId]);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPlaying]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleStop = () => {
        setIsPlaying(false);
        setElapsed(0);
        setStopKey((k) => k + 1);
        setCompletedSetIds({});
        setSkippedSetIds({});
    };

    const handleFinish = async () => {
        if (!executionId || !execution) {
            navigate(`/workouts/${id}`);
            return;
        }
        try {
            // Build set_execution_id list from plan set IDs
            const setExecutions = execution.workout_exercise_executions.flatMap((wee) =>
                wee.set_executions.map((se) => {
                    const exerciseEntry = exercises.find((we) =>
                        we.sets.some((s) => s.id === se.set.id)
                    );
                    const exerciseId = exerciseEntry?.id;
                    const completedIds = exerciseId !== undefined ? (completedSetIds[exerciseId] ?? []) : [];
                    const skippedIds = exerciseId !== undefined ? (skippedSetIds[exerciseId] ?? []) : [];
                    return {
                        set_execution_id: se.id,
                        completed: completedIds.includes(se.set.id),
                        skipped: skippedIds.includes(se.set.id),
                    };
                })
            );
            await WorkoutExecutionService.finish(id!, Number(executionId), { set_executions: setExecutions });
            pushAlert('Workout finished!', 'success');
        } catch {
            pushAlert('Failed to save workout execution.', 'error');
        }
        handleStop();
        navigate(`/workouts/${id}`);
    };

    const handleCancel = async () => {
        if (executionId) {
            try {
                await WorkoutExecutionService.delete(id!, Number(executionId));
            } catch {
                // Ignore — navigate away regardless
            }
        }
        handleStop();
        navigate(`/workouts/${id}`);
    };

    // Set interactions (local only — actual tracking is future work)
    const handleSetChange = (exerciseId: number, setId: number, field: string, value: number) => {
        setExercises((prev) => applySetChange(prev, exerciseId, setId, field, value));
    };

    const handleSetRemove = (exerciseId: number, setId: number) => {
        setExercises((prev) => applySetRemove(prev, exerciseId, setId));
    };

    const handleSetReorder = (exerciseId: number, fromIndex: number, toIndex: number) => {
        setExercises((prev) => applySetReorder(prev, exerciseId, fromIndex, toIndex));
    };

    const handleSetAdd = (exerciseId: number) => {
        setExercises((prev) => {
            const exercise = prev.find((we) => we.id === exerciseId);
            const defaultType = exercise?.exercise.category === 'CARDIO' ? 'TIME' : undefined;
            return applySetAdd(prev, exerciseId, true, defaultType);
        });
    };

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                <div css={styles.header}>
                    <div css={styles.titleBlock}>
                        <span css={styles.title}>{workout?.name}</span>
                        <span css={styles.setsCounter}>{completedSets}/{totalSets} sets</span>
                    </div>

                    <SecondaryButton
                        icon={<MdClose />}
                        onClick={handleCancel}
                        color="var(--color-red)"
                    >
                        Cancel
                    </SecondaryButton>

                    <Button
                        icon={<MdChecklistRtl />}
                        onClick={handleFinish}
                        customCss={styles.finishButton}
                    >
                        Finish
                    </Button>

                    <Card customCss={styles.timerCard}>
                        <span css={styles.clockIcon}><FaRegClock /></span>
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
                            legend="Reset"
                            onToggle={handleStop}
                            customCss={!isPlaying && elapsed === 0 ? { opacity: 0.3, pointerEvents: 'none' } : undefined}
                        />
                    </Card>
                </div>

                <ProgressBar percentage={progressPct} />

                <div css={styles.content}>
                    <DragGrid
                        items={exercises}
                        getItemKey={(we) => we.id}
                        onReorder={handleReorder}
                        renderItem={(we, provided) => (
                            <WorkoutExerciseCard
                                workoutExercise={we}
                                dragHandleProps={provided.dragHandleProps}
                                indicatorCss={provided.indicatorCss}
                                onSetChange={(setId, field, value) => handleSetChange(we.id, setId, field, value)}
                                isPlaying={isPlaying}
                                resetKey={stopKey}
                                onSetRemove={(setId) => handleSetRemove(we.id, setId)}
                                onSetReorder={(from, to) => handleSetReorder(we.id, from, to)}
                                onSetAdd={() => handleSetAdd(we.id)}
                                onCompletedChange={handleCompletedChange}
                                onSkippedChange={handleSkippedChange}
                                onNotesChange={handleNotesChange}
                                onNotesSave={handleNotesSave}
                            />
                        )}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutExecutionView;
