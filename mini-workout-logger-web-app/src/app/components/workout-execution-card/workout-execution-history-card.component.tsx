import {useEffect, useRef, useState} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import type {Interpolation, Theme} from '@emotion/react';
import Card from '../card/card.component.tsx';
import Badge from '../badge/badge.component.tsx';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
import Divider from '../divider/divider.component.tsx';
import ExerciseStatisticsChart from '../statistics/exercise-statistics-chart.component.tsx';
import type {WorkoutExecutionReadDTO} from '../../dtos/workout-execution-read.dto.tsx';
import type {WorkoutExerciseReadDTO} from '../../dtos/workout-exercise-read.dto.tsx';
import styles from './workout-execution-history-card.component.style.tsx';

export type WorkoutExecutionHistoryCardProps = {
    execution: WorkoutExecutionReadDTO;
    workoutId?: number;
    workoutExercises?: WorkoutExerciseReadDTO[];
    onClick?: () => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const WorkoutExecutionHistoryCard = ({ execution, workoutId, workoutExercises, onClick, customCss }: WorkoutExecutionHistoryCardProps) => {
    const [open, setOpen] = useState(false);
    const [animating, setAnimating] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const formattedDate = execution.start_time ?? '—';

    const handleToggle = (expanded: boolean) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (expanded) {
            setOpen(true);
        } else {
            setAnimating(false);
            timerRef.current = setTimeout(() => setOpen(false), 260);
        }
    };

    useEffect(() => {
        if (!open) return;
        const id = setTimeout(() => setAnimating(true), 16);
        return () => clearTimeout(id);
    }, [open]);

    // Build exercise list from execution + workout exercise map
    const exerciseEntries = workoutExercises
        ? execution.workout_exercise_executions
              .map((wee) => {
                  const we = workoutExercises.find((w) => w.id === wee.workout_exercise_id);
                  return we ? { exerciseId: we.exercise.id, exerciseName: we.exercise.name } : null;
              })
              .filter((e): e is { exerciseId: number; exerciseName: string } => e !== null)
        : [];

    // Deduplicate by exerciseId (same exercise can appear twice in a workout)
    const uniqueExercises = exerciseEntries.filter(
        (e, i, arr) => arr.findIndex((x) => x.exerciseId === e.exerciseId) === i
    );

    return (
        <Card customCss={customCss}>
            <div css={styles.container}>
                <span css={styles.date} onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
                    {formattedDate}
                </span>
                <Badge variant={execution.completed ? 'success' : 'gray'}>
                    {execution.completed ? 'Completed' : 'Incomplete'}
                </Badge>
                {uniqueExercises.length > 0 && (
                    <OnlyIconButton
                        icon={<IoIosArrowUp />}
                        selectedIcon={<IoIosArrowDown />}
                        iconColor="--color-gray"
                        selected={!open}
                        onToggle={(val) => handleToggle(!val)}
                        legend="Expand statistics"
                        selectedLegend="Collapse statistics"
                    />
                )}
            </div>

            {open && (
                <div css={styles.statsWrapper} style={{ maxHeight: animating ? '1200px' : '0' }}>
                    <Divider thickness="thin" />
                    <div css={styles.statsContent}>
                        <span css={styles.statsTitle}>Statistics</span>
                        {uniqueExercises.map((e) => (
                            <ExerciseStatisticsChart
                                key={e.exerciseId}
                                exerciseId={e.exerciseId}
                                workoutId={workoutId}
                                exerciseName={e.exerciseName}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default WorkoutExecutionHistoryCard;
