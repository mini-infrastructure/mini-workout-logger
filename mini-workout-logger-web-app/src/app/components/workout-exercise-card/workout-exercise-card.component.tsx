import { useEffect, useRef, useState } from 'react';
import type { DragEvent } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { css } from '@emotion/react';
import { MdDragIndicator, MdCheckBoxOutlineBlank, MdCheckBox, MdDelete } from 'react-icons/md';
import { IoMdSwap } from 'react-icons/io';
import Card from '../card/card.component.tsx';
import Badge from '../badge/badge.component.tsx';
import Button from '../button/button.component.tsx';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
import MediaItem from '../media-item/media-item.component.tsx';
import ExerciseCard from '../exercise-card/exercise-card.component.tsx';
import SetList from './set-list.component.tsx';
import type { WorkoutExerciseReadDTO } from '../../dtos/workout-exercise-read.dto.tsx';
import type { ExerciseReadDTO } from '../../dtos/exercise-read.dto.tsx';
import type { ExerciseRecommendationReadDTO } from '../../dtos/exercise-recommendation-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
import ExerciseRecommendationService from '../../services/exercise-recommendation.service.tsx';
import styles from './workout-exercise-card.component.style.tsx';

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
    onRemoveExercise?: () => void;
    onSwapExercise?: (newExercise: ExerciseReadDTO) => void;
    existingExerciseIds?: number[];
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
    onRemoveExercise,
    onSwapExercise,
    existingExerciseIds = [],
    planMode = false,
    isDragOver = false,
    highlighted = false,
    onMouseEnter,
    onMouseLeave,
    customCss,
}: WorkoutExerciseCardProps) => {
    const toggleAllRef = useRef<(() => void) | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
    const [draggable, setDraggable] = useState(false);
    const [allCompleted, setAllCompleted] = useState(false);
    const [swapOpen, setSwapOpen] = useState(false);
    const [recommendations, setRecommendations] = useState<ExerciseRecommendationReadDTO[]>([]);
    const [loadingRecs, setLoadingRecs] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            setContainerWidth(entry.contentRect.width);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const rootMuscles = workoutExercise.exercise.root_muscles ?? [];
    const cover = workoutExercise.exercise.media?.[0];
    const coverSrc = cover ? `data:${cover.content_type};base64,${cover.data}` : undefined;

    const handleToggleSwap = async () => {
        if (swapOpen) {
            setSwapOpen(false);
            return;
        }
        setSwapOpen(true);
        setLoadingRecs(true);
        const recs = await ExerciseRecommendationService.getRecommendations(
            workoutExercise.exercise.id,
            { limit: 20 }
        );
        if (existingExerciseIds) {
            setRecommendations(recs.filter(r => !existingExerciseIds.includes(r.exercise.id)));
        }
        setLoadingRecs(false);
    };

    const exactMatches = recommendations.filter(r => r.exact_match);
    const partialMatches = recommendations.filter(r => !r.exact_match);
    const hasExact = exactMatches.length > 0;
    const hasPartial = partialMatches.length > 0;

    return (
        <div
            css={css({ minWidth: 0, overflow: 'hidden' })}
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
                <div ref={containerRef} css={styles.container}>
                    <div css={styles.header}>
                        <Button
                            icon={<MdDragIndicator />}
                            onMouseDown={() => setDraggable(true)}
                            onMouseUp={() => setDraggable(false)}
                            customCss={styles.dragHandle}
                            customIconCss={styles.dragHandleIcon}
                        />

                        <MediaItem src={coverSrc} size={styles.coverSize} customCss={styles.cover} />

                        <div css={styles.exerciseInfo}>
                            <span css={styles.exerciseName}>
                                {workoutExercise.exercise.name}
                            </span>
                            {rootMuscles.length > 0 && (
                                <div css={styles.muscles}>
                                    {rootMuscles.map((code) => (
                                        <Badge key={code} variant="gray">
                                            {code.replace('Muscle.', '').replace(/_/g, ' ')}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {planMode ? (
                            <>
                                <OnlyIconButton
                                    icon={<IoMdSwap />}
                                    iconColor={swapOpen ? '--color-blue' : '--color-gray'}
                                    selected={swapOpen}
                                    onToggle={handleToggleSwap}
                                    legend="Swap exercise"
                                    customIconCss={css({ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)', fontSize: 'var(--size-icon-sm)' })}
                                />
                                <OnlyIconButton
                                    icon={<MdDelete />}
                                    iconColor="--color-red"
                                    onToggle={() => onRemoveExercise?.()}
                                    legend="Remove exercise"
                                    customIconCss={css({ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)', fontSize: 'var(--size-icon-sm)' })}
                                />
                            </>
                        ) : (
                            <OnlyIconButton
                                icon={<MdCheckBoxOutlineBlank />}
                                selectedIcon={<MdCheckBox />}
                                iconColor="--color-green"
                                selectedIconColor="--color-green"
                                selected={allCompleted}
                                onToggle={() => toggleAllRef.current?.()}
                                legend="Mark all as completed"
                                selectedLegend="Deselect all"
                                customIconCss={css({ width: 'var(--size-icon-sm)', height: 'var(--size-icon-sm)', fontSize: 'var(--size-icon-sm)' })}
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

                    {planMode && swapOpen && (
                        <div css={styles.swapPanel}>
                            {loadingRecs ? (
                                <span css={styles.swapEmpty}>Loading recommendations…</span>
                            ) : recommendations.length === 0 ? (
                                <span css={styles.swapEmpty}>No similar exercises found.</span>
                            ) : (
                                <>
                                    <div css={styles.swapScrollArea} style={containerWidth ? { width: containerWidth } : undefined}>
                                        <div css={styles.swapCardsRow}>
                                            {[...exactMatches, ...partialMatches].map((rec) => (
                                                <div key={rec.exercise.id} css={styles.swapCardWrapper(rec.exact_match)}>
                                                    <ExerciseCard
                                                        exercise={rec.exercise}
                                                        mini
                                                        onClick={() => {
                                                            onSwapExercise?.(rec.exercise);
                                                            setSwapOpen(false);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div css={styles.swapLegend}>
                                        {hasExact && (
                                            <>
                                                <span css={styles.swapDot('var(--color-green)')} />
                                                <span>Exact match</span>
                                            </>
                                        )}
                                        {hasPartial && (
                                            <>
                                                <span css={styles.swapDot('var(--color-yellow)')} />
                                                <span>Partial match</span>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default WorkoutExerciseCard;
