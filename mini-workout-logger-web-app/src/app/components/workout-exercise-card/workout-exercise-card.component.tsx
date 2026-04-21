import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { MdDragIndicator } from 'react-icons/md';
import Card from '../card/card.component.tsx';
import Badge from '../badge/badge.component.tsx';
import Button from '../button/button.component.tsx';
import SetList from './set-list.component.tsx';
import PlanSetList from './plan-set-list.component.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
import styles from './workout-exercise-card.component.style.tsx';

const formatMuscleCode = (code: string) =>
    code.replace('Muscle.', '').replace(/_/g, ' ');

export type WorkoutExerciseCardProps = {
    workoutExercise: WorkoutExerciseReadDTO;
    onDragStart: () => void;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: () => void;
    onDragEnd: () => void;
    isPlaying?: boolean;
    resetKey?: number;
    onSetChange: (setId: number, field: string, value: number) => void;
    onSetRemove: (setId: number) => void;
    onSetReorder: (fromIndex: number, toIndex: number) => void;
    onSetAdd: () => void;
    onCompletedChange?: (exerciseId: number, completedCount: number) => void;
    onSetTypeChange?: (setId: number, type: SetType) => void;
    planMode?: boolean;
    isDragOver?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const WorkoutExerciseCard = ({
    workoutExercise,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    onSetChange,
    isPlaying = false,
    resetKey,
    onSetRemove,
    onSetReorder,
    onSetAdd,
    onCompletedChange,
    onSetTypeChange,
    planMode = false,
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
            onDragStart={(e) => { e.dataTransfer.setData('application/exercise', ''); onDragStart(); }}
            onDragOver={(e) => {
                if (!e.dataTransfer.types.includes('application/exercise')) return;
                e.preventDefault();
                onDragOver(e);
            }}
            onDrop={(e) => {
                if (!e.dataTransfer.types.includes('application/exercise')) return;
                e.preventDefault();
                onDrop();
            }}
            onDragEnd={() => { setDraggable(false); onDragEnd(); }}
        >
            <Card
                customCss={[
                    isDragOver && {
                        boxShadow: `0 -3px 0 0 var(--color-blue)`,
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

                    {planMode ? (
                        <PlanSetList
                            sets={workoutExercise.sets}
                            onChange={(setId, field, value) => onSetChange(setId, field, value)}
                            onTypeChange={(setId, type) => onSetTypeChange?.(setId, type)}
                            onRemove={onSetRemove}
                            onReorder={onSetReorder}
                            onAdd={onSetAdd}
                        />
                    ) : (
                        <SetList
                            sets={workoutExercise.sets}
                            onChange={(setId, field, value) => onSetChange(setId, field, value)}
                            isPlaying={isPlaying}
                            resetKey={resetKey}
                            onRemove={onSetRemove}
                            onReorder={onSetReorder}
                            onAdd={onSetAdd}
                            onCompletedChange={(count) => onCompletedChange?.(workoutExercise.id, count)}
                        />
                    )}
                </div>
            </Card>
        </div>
    );
};

export default WorkoutExerciseCard;
