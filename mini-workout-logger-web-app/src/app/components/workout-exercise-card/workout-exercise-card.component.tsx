import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { MdDragIndicator } from 'react-icons/md';
import Card from '../card/card.component.tsx';
import Badge from '../badge/badge.component.tsx';
import Button from '../button/button.component.tsx';
import SetList from './set-list.component.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import styles from './workout-exercise-card.component.style.tsx';

const formatMuscleCode = (code: string) =>
    code.replace('Muscle.', '').replace(/_/g, ' ');

export type WorkoutExerciseCardProps = {
    workoutExercise: WorkoutExerciseReadDTO;
    onDragStart: () => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: () => void;
    isPlaying?: boolean;
    resetKey?: number;
    onSetChange: (setId: number, field: string, value: number) => void;
    onSetRemove: (setId: number) => void;
    onSetAdd: () => void;
    onCompletedChange?: (exerciseId: number, completedCount: number) => void;
    isDragOver?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const WorkoutExerciseCard = ({
    workoutExercise,
    onDragStart,
    onDragOver,
    onDrop,
    onSetChange,
    isPlaying = false,
    resetKey,
    onSetRemove,
    onSetAdd,
    onCompletedChange,
    isDragOver = false,
    customCss,
}: WorkoutExerciseCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [draggable, setDraggable] = useState(false);

    const rootMuscles = workoutExercise.exercise.root_muscles ?? [];

    return (
        <div
            ref={cardRef}
            draggable={draggable}
            onDragStart={onDragStart}
            onDragOver={(e) => { e.preventDefault(); onDragOver(e); }}
            onDrop={(e) => { e.preventDefault(); onDrop(); }}
            onDragEnd={() => setDraggable(false)}
        >
            <Card
                customCss={[
                    isDragOver && {
                        outline: `2px solid var(--color-blue)`,
                        outlineOffset: '2px',
                    },
                    ...(customCss
                        ? Array.isArray(customCss) ? customCss : [customCss]
                        : []),
                ]}
            >
                <div css={styles.container}>
                    <div css={styles.header}>
                        <Button
                            icon={<MdDragIndicator />}
                            onMouseDown={() => setDraggable(true)}
                            onMouseUp={() => setDraggable(false)}
                            customCss={styles.dragHandle}
                            customIconCss={styles.dragHandleIcon}
                        />

                        <div css={styles.exerciseInfo}>
                            <span css={styles.exerciseName}>
                                {workoutExercise.exercise.name}
                            </span>
                            {rootMuscles.length > 0 && (
                                <div css={styles.muscles}>
                                    {rootMuscles.map((code) => (
                                        <Badge key={code} variant="gray">
                                            {formatMuscleCode(code)}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <SetList
                        sets={workoutExercise.sets}
                        onChange={(setId, field, value) => onSetChange(setId, field, value)}
                        isPlaying={isPlaying}
                        resetKey={resetKey}
                        onRemove={onSetRemove}
                        onAdd={onSetAdd}
                        onCompletedChange={(count) => onCompletedChange?.(workoutExercise.id, count)}
                    />
                </div>
            </Card>
        </div>
    );
};

export default WorkoutExerciseCard;
