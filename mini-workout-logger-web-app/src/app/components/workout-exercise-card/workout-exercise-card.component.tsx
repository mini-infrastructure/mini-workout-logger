import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { css } from '@emotion/react';
import { MdDragIndicator, MdDoneAll } from 'react-icons/md';
import Card from '../card/card.component.tsx';
import Badge from '../badge/badge.component.tsx';
import Button from '../button/button.component.tsx';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
import SetList from './set-list.component.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
import styles from './workout-exercise-card.component.style.tsx';

const formatMuscleCode = (code: string) =>
    code.replace('Muscle.', '').replace(/_/g, ' ');

export type WorkoutExerciseCardProps = {
    key?: any;
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
    onSkippedChange?: (exerciseId: number, skippedCount: number) => void;
    onSetTypeChange?: (setId: number, type: SetType) => void;
    planMode?: boolean;
    isDragOver?: boolean;
    highlighted?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
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
    onSkippedChange,
    onSetTypeChange,
    planMode = false,
    isDragOver = false,
    highlighted = false,
    onMouseEnter,
    onMouseLeave,
    customCss,
}: WorkoutExerciseCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const toggleAllRef = useRef<(() => void) | null>(null);
    const [draggable, setDraggable] = useState(false);
    const [allCompleted, setAllCompleted] = useState(false);

    const rootMuscles = workoutExercise.exercise.root_muscles ?? [];

    return (
        <div
            ref={cardRef}
            draggable={draggable}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
                    css({ transition: 'box-shadow 0.2s ease, border-color 0.2s ease' }),
                    highlighted && css({
                        borderColor: 'var(--color-blue)',
                        boxShadow: `0 0 0 1px var(--color-blue)`,
                    }),
                    isDragOver && css({
                        boxShadow: `0 -3px 0 0 var(--color-blue)`,
                    }),
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

                        {!planMode && (
                            <OnlyIconButton
                                icon={<MdDoneAll />}
                                iconColor="--color-green"
                                selectedIconColor="--color-container2"
                                selected={allCompleted}
                                onToggle={() => toggleAllRef.current?.()}
                                legend="Mark all as completed"
                                selectedLegend="Deselect all"
                                customIconCss={css({ width: '20px', height: '20px', fontSize: '20px' })}
                                customCss={!isPlaying ? css({ opacity: 0.3, pointerEvents: 'none' }) : undefined}
                            />
                        )}
                    </div>

                    <SetList
                        sets={workoutExercise.sets}
                        planMode={planMode}
                        onChange={(setId, field, value) => onSetChange(setId, field, value)}
                        onTypeChange={(setId, type) => onSetTypeChange?.(setId, type)}
                        onRemove={onSetRemove}
                        onReorder={onSetReorder}
                        onAdd={onSetAdd}
                        isPlaying={isPlaying}
                        resetKey={resetKey}
                        onCompletedChange={(count) => onCompletedChange?.(workoutExercise.id, count)}
                        onSkippedChange={(count) => onSkippedChange?.(workoutExercise.id, count)}
                        onAllCompletedChange={setAllCompleted}
                        toggleAllRef={toggleAllRef}
                    />
                </div>
            </Card>
        </div>
    );
};

export default WorkoutExerciseCard;
