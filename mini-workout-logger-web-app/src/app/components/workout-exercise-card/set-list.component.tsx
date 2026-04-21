import { useEffect, useState } from 'react';
import type { DragEvent } from 'react';
import { css } from '@emotion/react';
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { FaTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import { BiSkipNextCircle, BiSolidSkipNextCircle } from 'react-icons/bi';
import type { SetReadDTO } from '../../dtos/set-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
import Button from '../button/button.component.tsx';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
import ProgressBar from '../progress-bar/progress-bar.component.tsx';
import styles from './set-list.component.style.tsx';

type SetField = 'planned_repetitions' | 'planned_weight' | 'planned_duration_seconds';

const TYPE_CYCLE: SetType[] = ['REPS', 'REPS_X_WEIGHT', 'TIME_X_WEIGHT', 'TIME'];

const TYPE_LABELS: Record<SetType, string> = {
    REPS: 'Reps',
    REPS_X_WEIGHT: 'R×W',
    TIME_X_WEIGHT: 'T×W',
    TIME: 'Time',
};

const cycleType = (current: SetType): SetType =>
    TYPE_CYCLE[(TYPE_CYCLE.indexOf(current) + 1) % TYPE_CYCLE.length];

const toMmSs = (seconds: number) => ({ mm: Math.floor(seconds / 60), ss: seconds % 60 });

const isTimeType = (type: SetType) => type === 'TIME' || type === 'TIME_X_WEIGHT';
const hasWeight  = (type: SetType) => type === 'REPS_X_WEIGHT' || type === 'TIME_X_WEIGHT';

const completedBg = css({
    backgroundColor: 'color-mix(in srgb, var(--color-green) 12%, transparent)',
});

const completedHover = css({
    ':hover': {
        backgroundColor: 'color-mix(in srgb, var(--color-green) 20%, transparent)',
        color: 'var(--color-green)',
    },
});

export type SetListProps = {
    sets: SetReadDTO[];
    /** Plan mode (workout.view) — type cycling, inline units, no completion tracking.
     *  Execution mode (workout-execution.view) — read-only type badge, completion toggle. */
    planMode?: boolean;
    onChange: (setId: number, field: SetField, value: number) => void;
    onTypeChange?: (setId: number, type: SetType) => void;
    onRemove: (setId: number) => void;
    onReorder: (fromIndex: number, toIndex: number) => void;
    onAdd: () => void;
    /** Execution mode only */
    isPlaying?: boolean;
    resetKey?: number;
    onCompletedChange?: (completedCount: number) => void;
    onAllCompletedChange?: (allCompleted: boolean) => void;
    toggleAllRef?: React.MutableRefObject<(() => void) | null>;
    onSkippedChange?: (skippedCount: number) => void;
};

const SetList = ({
    sets,
    planMode = false,
    onChange,
    onTypeChange,
    onRemove,
    onReorder,
    onAdd,
    isPlaying = false,
    resetKey,
    onCompletedChange,
    onAllCompletedChange,
    toggleAllRef,
    onSkippedChange,
}: SetListProps) => {
    const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());
    const [skippedIds, setSkippedIds] = useState<Set<number>>(new Set());
    const [draggableIndex, setDraggableIndex] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<number | null>(null);

    useEffect(() => {
        if (resetKey === undefined) return;
        setCompletedIds(new Set());
        setSkippedIds(new Set());
        onCompletedChange?.(0);
        onAllCompletedChange?.(false);
        onSkippedChange?.(0);
    }, [resetKey]);

    if (!sets || sets.length === 0) return null;

    // ── Completion helpers (execution mode) ──────────────────────────────────

    const activeSetIds = sets.filter((s) => !skippedIds.has(s.id)).map((s) => s.id);
    const allCompleted = activeSetIds.length > 0 && activeSetIds.every((id) => completedIds.has(id));

    const toggleCompleted = (id: number) => {
        if (skippedIds.has(id)) return;
        const next = new Set(completedIds);
        next.has(id) ? next.delete(id) : next.add(id);
        setCompletedIds(next);
        onCompletedChange?.(next.size);
        onAllCompletedChange?.(activeSetIds.every((aid) => next.has(aid)));
    };

    const toggleSkipped = (id: number) => {
        const nextSkipped = new Set(skippedIds);
        nextSkipped.has(id) ? nextSkipped.delete(id) : nextSkipped.add(id);
        // Remove from completed if being skipped
        const nextCompleted = new Set(completedIds);
        if (nextSkipped.has(id)) nextCompleted.delete(id);
        setSkippedIds(nextSkipped);
        setCompletedIds(nextCompleted);
        onSkippedChange?.(nextSkipped.size);
        onCompletedChange?.(nextCompleted.size);
        const newActiveIds = sets.filter((s) => !nextSkipped.has(s.id)).map((s) => s.id);
        onAllCompletedChange?.(newActiveIds.length > 0 && newActiveIds.every((aid) => nextCompleted.has(aid)));
    };

    const toggleAll = () => {
        if (allCompleted) {
            setCompletedIds(new Set());
            onCompletedChange?.(0);
            onAllCompletedChange?.(false);
        } else {
            const allActiveIds = new Set(activeSetIds);
            setCompletedIds(allActiveIds);
            onCompletedChange?.(allActiveIds.size);
            onAllCompletedChange?.(allActiveIds.size > 0);
        }
    };

    if (toggleAllRef) toggleAllRef.current = toggleAll;

    // ── Drag helpers ─────────────────────────────────────────────────────────

    const handleDrop = () => {
        if (draggableIndex === null || dragOver === null || draggableIndex === dragOver) return;
        onReorder(draggableIndex, dragOver);
        setDraggableIndex(null);
        setDragOver(null);
    };

    // ── Field renderers ──────────────────────────────────────────────────────
    //
    // Each renderer produces the same <input> in both modes; plan mode wraps it
    // with an inline unit label, execution mode applies the completed background.

    const renderReps = (set: SetReadDTO, completed: boolean) => {
        const input = (
            <input
                css={[styles.input, !planMode && completed && completedBg]}
                type="number"
                min={0}
                step={1}
                value={set.planned_repetitions ?? 0}
                onChange={(e) => onChange(set.id, 'planned_repetitions', parseFloat(e.target.value) || 0)}
            />
        );
        return planMode
            ? <div css={styles.inputWithUnit}>{input}<span css={styles.unit}>×</span></div>
            : input;
    };

    const renderTime = (set: SetReadDTO, completed: boolean) => {
        if (planMode) {
            // Plan: split mm:ss inputs for ergonomic editing
            const { mm, ss } = toMmSs(set.planned_duration_seconds ?? 0);
            return (
                <div css={styles.timeInput}>
                    <input
                        css={[styles.input, styles.timeSegment]}
                        type="number" min={0} value={mm}
                        onChange={(e) => onChange(set.id, 'planned_duration_seconds', (parseInt(e.target.value) || 0) * 60 + ss)}
                    />
                    <span css={styles.timeSeparator}>:</span>
                    <input
                        css={[styles.input, styles.timeSegment]}
                        type="number" min={0} max={59} value={ss}
                        onChange={(e) => onChange(set.id, 'planned_duration_seconds', mm * 60 + (parseInt(e.target.value) || 0))}
                    />
                    <span css={styles.unit}>mm:ss</span>
                </div>
            );
        }
        // Execution: single seconds input
        return (
            <input
                css={[styles.input, completed && completedBg]}
                type="number" min={0}
                value={set.planned_duration_seconds ?? 0}
                onChange={(e) => onChange(set.id, 'planned_duration_seconds', parseFloat(e.target.value) || 0)}
            />
        );
    };

    const renderWeight = (set: SetReadDTO, completed: boolean) => {
        const input = (
            <input
                css={[styles.input, !planMode && completed && completedBg]}
                type="number"
                min={0}
                step={0.5}
                value={set.planned_weight ?? 0}
                onChange={(e) => onChange(set.id, 'planned_weight', parseFloat(e.target.value) || 0)}
            />
        );
        return planMode
            ? <div css={styles.inputWithUnit}>{input}<span css={styles.unit}>kg</span></div>
            : input;
    };

    const renderField1 = (set: SetReadDTO, completed: boolean) =>
        isTimeType(set.type) ? renderTime(set, completed) : renderReps(set, completed);

    const renderField2 = (set: SetReadDTO, completed: boolean) =>
        hasWeight(set.type) ? renderWeight(set, completed) : <span />;

    // ── Render ───────────────────────────────────────────────────────────────

    const activeSets = sets.length - skippedIds.size;
    const cardProgress = activeSets > 0 ? (completedIds.size / activeSets) * 100 : 0;

    return (
        <div css={styles.container}>
            {!planMode && (
                <ProgressBar percentage={cardProgress} customCss={styles.cardProgressBar} />
            )}
            {sets.map((set, i) => {
                const completed = completedIds.has(set.id);
                const skipped = skippedIds.has(set.id);
                const isOver = dragOver === i && draggableIndex !== null && draggableIndex !== i;
                return (
                    <div
                        key={set.id}
                        css={[styles.row, isOver && styles.rowDragOver, skipped && styles.rowSkipped]}
                        draggable={draggableIndex === i}
                        onDragStart={(e) => {
                            e.stopPropagation();
                            e.dataTransfer.setData('application/set', '');
                            setDragOver(null);
                        }}
                        onDragOver={(e: DragEvent<HTMLDivElement>) => {
                            if (!e.dataTransfer.types.includes('application/set')) return;
                            e.preventDefault();
                            e.stopPropagation();
                            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                            setDragOver(e.clientY < rect.top + rect.height / 2 ? i : i + 1);
                        }}
                        onDrop={(e) => {
                            if (!e.dataTransfer.types.includes('application/set')) return;
                            e.stopPropagation();
                            handleDrop();
                        }}
                        onDragEnd={(e) => {
                            e.stopPropagation();
                            setDraggableIndex(null);
                            setDragOver(null);
                        }}
                    >
                        {/* Drag handle */}
                        <Button
                            icon={<MdDragIndicator />}
                            onMouseDown={() => setDraggableIndex(i)}
                            onMouseUp={() => setDraggableIndex(null)}
                            customCss={styles.dragHandle}
                            customIconCss={styles.dragHandleIcon}
                        />

                        {/* Set number */}
                        <span css={[styles.setNumber, !planMode && completed && completedBg]}>
                            {i + 1}
                        </span>

                        {/* Type: clickable cycle badge (plan) or read-only label (execution) */}
                        {planMode ? (
                            <Button
                                onClick={() => onTypeChange?.(set.id, cycleType(set.type))}
                                title="Click to change set type"
                                customCss={styles.typeBadge}
                            >
                                {TYPE_LABELS[set.type]}
                            </Button>
                        ) : (
                            <span css={styles.typeBadgeReadOnly}>{TYPE_LABELS[set.type]}</span>
                        )}

                        {renderField1(set, completed)}
                        {renderField2(set, completed)}

                        {/* Actions */}
                        <div css={styles.rowActions}>
                            {!planMode && (
                                <OnlyIconButton
                                    icon={<IoCheckmarkCircleOutline />}
                                    selectedIcon={<IoCheckmarkCircle />}
                                    iconColor="--color-green"
                                    selectedIconColor="--color-green"
                                    selectedBg="transparent"
                                    selected={completed}
                                    onToggle={() => toggleCompleted(set.id)}
                                    legend="Completed"
                                    selectedLegend="Not completed"
                                    customIconCss={css({ width: '20px', height: '20px', fontSize: '20px' })}
                                    customCss={[
                                        (!isPlaying || skipped) && css({ opacity: 0.3, pointerEvents: 'none' }),
                                        completed ? completedHover : undefined,
                                    ]}
                                />
                            )}
                            {!planMode && (
                                <OnlyIconButton
                                    icon={<BiSkipNextCircle />}
                                    selectedIcon={<BiSolidSkipNextCircle />}
                                    iconColor="--color-border"
                                    selectedIconColor="--color-border"
                                    selectedBg="transparent"
                                    selected={skipped}
                                    onToggle={() => toggleSkipped(set.id)}
                                    legend="Skip"
                                    selectedLegend="Unskip"
                                    customIconCss={css({ width: '20px', height: '20px', fontSize: '20px' })}
                                    customCss={!isPlaying ? css({ opacity: 0.3, pointerEvents: 'none' }) : undefined}
                                />
                            )}
                            <OnlyIconButton
                                icon={<FaTrashAlt />}
                                iconColor="--color-red"
                                onToggle={() => onRemove(set.id)}
                                legend="Remove"
                            />
                        </div>
                    </div>
                );
            })}

            {/* Sentinel drop zone */}
            <div
                css={dragOver === sets.length && draggableIndex !== null ? styles.rowDragOver : undefined}
                onDragOver={(e: DragEvent<HTMLDivElement>) => {
                    if (!e.dataTransfer.types.includes('application/set')) return;
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOver(sets.length);
                }}
                onDrop={(e) => {
                    if (!e.dataTransfer.types.includes('application/set')) return;
                    e.stopPropagation();
                    handleDrop();
                }}
                style={{ height: '4px' }}
            />

            <Button onClick={onAdd} customCss={styles.addSet}>
                Add set
            </Button>
        </div>
    );
};

export default SetList;
