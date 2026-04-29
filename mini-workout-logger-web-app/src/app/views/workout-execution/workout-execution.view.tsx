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
import ProgressBar from '../../components/progress-bar/progress-bar.component.tsx';
import { useWorkout } from '../../hooks/useWorkout.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import styles from './workout-execution.view.style.tsx';

const WorkoutExecutionView = () => {
    const { id } = useParams<{ id: string; executionId: string }>();
    const navigate = useNavigate();
    const { workout } = useWorkout(id);

    // Timer
    const [isPlaying, setIsPlaying] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const [stopKey, setStopKey] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Exercises (local copy for set interaction)
    const [exercises, setExercises] = useState<WorkoutExerciseReadDTO[]>([]);

    // Progress
    const [completedCounts, setCompletedCounts] = useState<Record<number, number>>({});
    const [skippedCounts, setSkippedCounts] = useState<Record<number, number>>({});
    const totalSkipped = Object.values(skippedCounts).reduce((sum, n) => sum + n, 0);
    const totalSets = exercises.reduce((sum, we) => sum + we.sets.length, 0) - totalSkipped;
    const completedSets = Object.values(completedCounts).reduce((sum, n) => sum + n, 0);
    const progressPct = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

    const handleCompletedChange = (exerciseId: number, count: number) => {
        setCompletedCounts((prev) => ({ ...prev, [exerciseId]: count }));
    };

    const handleSkippedChange = (exerciseId: number, count: number) => {
        setSkippedCounts((prev) => ({ ...prev, [exerciseId]: count }));
    };

    useEffect(() => {
        if (workout?.workout_exercises) {
            setExercises(workout.workout_exercises);
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

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleStop = () => {
        setIsPlaying(false);
        setElapsed(0);
        setStopKey((k) => k + 1);
        setCompletedCounts({});
        setSkippedCounts({});
    };

    const handleFinish = () => {
        handleStop();
        navigate(`/workouts/${id}`);
    };

    const handleCancel = () => {
        handleStop();
        navigate(`/workouts/${id}`);
    };

    // Set interactions (local only — actual tracking is future work)
    const handleSetChange = (exerciseId: number, setId: number, field: string, value: number) => {
        setExercises((prev) =>
            prev.map((we) => {
                if (we.id !== exerciseId) return we;
                return { ...we, sets: we.sets.map((s) => s.id === setId ? { ...s, [field]: value } : s) };
            })
        );
    };

    const handleSetRemove = (exerciseId: number, setId: number) => {
        setExercises((prev) =>
            prev.map((we) =>
                we.id !== exerciseId ? we : { ...we, sets: we.sets.filter((s) => s.id !== setId) }
            )
        );
    };

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
    };

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
                        planned_weight: last?.planned_weight ?? null,
                        planned_duration_seconds: last?.planned_duration_seconds ?? null,
                    }],
                };
            })
        );
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
                    <div css={styles.exerciseList}>
                        {exercises.map((we) => (
                            <WorkoutExerciseCard
                                key={we.id}
                                workoutExercise={we}
                                onDragStart={() => {}}
                                onDragOver={() => {}}
                                onDrop={() => {}}
                                onDragEnd={() => {}}
                                onSetChange={(setId, field, value) => handleSetChange(we.id, setId, field, value)}
                                isPlaying={isPlaying}
                                resetKey={stopKey}
                                onSetRemove={(setId) => handleSetRemove(we.id, setId)}
                                onSetReorder={(from, to) => handleSetReorder(we.id, from, to)}
                                onSetAdd={() => handleSetAdd(we.id)}
                                onCompletedChange={handleCompletedChange}
                                onSkippedChange={handleSkippedChange}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutExecutionView;
