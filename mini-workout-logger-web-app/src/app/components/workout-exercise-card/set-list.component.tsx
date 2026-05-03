import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { FaTrashAlt } from 'react-icons/fa';
import { MdDragIndicator, MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { BiSkipNextCircle, BiSolidSkipNextCircle } from 'react-icons/bi';
import type { SetReadDTO } from '../../dtos/set-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
import Button from '../button/button.component.tsx';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
import ProgressBar from '../progress-bar/progress-bar.component.tsx';
import DragGrid from '../drag-grid/drag-grid.component.tsx';
import type { DragItemProvided } from '../drag-grid/drag-grid.component.tsx';
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

export type SetListProps = {
    sets: SetReadDTO[];
    /** Plan mode (workout.view) — type cycling, inline units, no completion tracking.
     *  Execution mode (workout-execution.view) — read-only type badge, completion toggle. */
    planMode?: boolean;
    /** When true, only TIME-based set fields are shown and type cycling is disabled.
     *  Used for aerobic/CARDIO exercises where reps are irrelevant. */
    onlyTimeSets?: boolean;
    /** When true, hides the set rows and add button. In execution mode the progress bar remains visible. */
    collapsed?: boolean;
    onChange: (setId: number, field: SetField, value: number) => void;
    onTypeChange?: (setId: number, type: SetType) => void;
    onRemove: (setId: number) => void;
    onReorder: (fromIndex: number, toIndex: number) => void;
    onAdd: () => void;
    /** Execution mode only */
    isPlaying?: boolean;
    resetKey?: number;
    onCompletedChange?: (completedIds: number[]) => void;
    onAllCompletedChange?: (allCompleted: boolean) => void;
    toggleAllRef?: React.MutableRefObject<(() => void) | null>;
    onSkippedChange?: (skippedIds: number[]) => void;
};

const SetList = ({
    sets,
    planMode = false,
    onlyTimeSets = false,
    collapsed = false,
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
    const collapseRef = useRef<HTMLDivElement>(null);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const el = collapseRef.current;
        if (!el) return;

        if (isInitialMount.current) {
            isInitialMount.current = false;
            // Set initial state without triggering a transition
            el.style.transition = 'none';
            el.style.maxHeight = collapsed ? '0px' : 'none';
            requestAnimationFrame(() => { el.style.transition = ''; });
            return;
        }

        if (collapsed) {
            // Lock to current height, then animate to 0 in the next frame
            el.style.maxHeight = `${el.scrollHeight}px`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { el.style.maxHeight = '0px'; });
            });
        } else {
            // Animate to content height, then release constraint so new sets aren't clipped
            el.style.maxHeight = `${el.scrollHeight}px`;
            const id = setTimeout(() => { el.style.maxHeight = 'none'; }, 260);
            return () => clearTimeout(id);
        }
    }, [collapsed]);

    useEffect(() => {
        if (resetKey === undefined) return;
        setCompletedIds(new Set());
        setSkippedIds(new Set());
        onCompletedChange?.([]);
        onAllCompletedChange?.(false);
        onSkippedChange?.([]);
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
        onCompletedChange?.([...next]);
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
        onSkippedChange?.([...nextSkipped]);
        onCompletedChange?.([...nextCompleted]);
        const newActiveIds = sets.filter((s) => !nextSkipped.has(s.id)).map((s) => s.id);
        onAllCompletedChange?.(newActiveIds.length > 0 && newActiveIds.every((aid) => nextCompleted.has(aid)));
    };

    const toggleAll = () => {
        if (allCompleted) {
            setCompletedIds(new Set());
            onCompletedChange?.([]);
            onAllCompletedChange?.(false);
        } else {
            const allActiveIds = new Set(activeSetIds);
            setCompletedIds(allActiveIds);
            onCompletedChange?.([...allActiveIds]);
            onAllCompletedChange?.(allActiveIds.size > 0);
        }
    };

    if (toggleAllRef) toggleAllRef.current = toggleAll;

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
        onlyTimeSets || isTimeType(set.type) ? renderTime(set, completed) : renderReps(set, completed);

    const renderField2 = (set: SetReadDTO, completed: boolean) =>
        !onlyTimeSets && hasWeight(set.type) ? renderWeight(set, completed) : <span />;

    // ── Render ───────────────────────────────────────────────────────────────

    const activeSets = sets.length - skippedIds.size;
    const cardProgress = activeSets > 0 ? (completedIds.size / activeSets) * 100 : 0;

    const renderSetRow = (set: SetReadDTO, provided: DragItemProvided, i: number) => {
        const completed = completedIds.has(set.id);
        const skipped = skippedIds.has(set.id);
        return (
            <div css={[styles.row, provided.indicatorCss, skipped && styles.rowSkipped]}>
                <Button
                    icon={<MdDragIndicator />}
                    onMouseDown={provided.dragHandleProps.onMouseDown}
                    onMouseUp={provided.dragHandleProps.onMouseUp}
                    customCss={styles.dragHandle}
                    customIconCss={styles.dragHandleIcon}
                />

                <span css={[styles.setNumber, !planMode && completed && completedBg]}>
                    {i + 1}
                </span>

                {planMode && !onlyTimeSets ? (
                    <Button
                        onClick={() => onTypeChange?.(set.id, cycleType(set.type))}
                        title="Click to change set type"
                        customCss={styles.typeBadge}
                    >
                        {TYPE_LABELS[set.type]}
                    </Button>
                ) : (
                    <span css={styles.typeBadgeReadOnly}>
                        {onlyTimeSets ? 'Time' : TYPE_LABELS[set.type]}
                    </span>
                )}

                {renderField1(set, completed)}
                {renderField2(set, completed)}

                <div css={styles.rowActions}>
                    {!planMode && (
                        <OnlyIconButton
                            icon={<MdCheckBoxOutlineBlank />}
                            selectedIcon={<MdCheckBox />}
                            iconColor="--color-green"
                            selectedIconColor="--color-green"
                            selected={completed}
                            onToggle={() => toggleCompleted(set.id)}
                            legend="Completed"
                            selectedLegend="Not completed"
                            customIconCss={css({ width: '20px', height: '20px', fontSize: '20px' })}
                            customCss={(!isPlaying || skipped) ? css({ opacity: 0.3, pointerEvents: 'none' }) : undefined}
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
    };

    return (
        <div css={styles.container}>
            {!planMode && (
                <ProgressBar percentage={cardProgress} customCss={styles.cardProgressBar} />
            )}
            <div ref={collapseRef} css={styles.collapseWrapper}>
                <DragGrid
                    items={sets}
                    getItemKey={(set) => set.id}
                    onReorder={onReorder}
                    renderItem={renderSetRow}
                    dragType="application/drag-grid-set"
                    reorderLabel="Set"
                    customCss={css({ gap: 'var(--stack-gap-condensed)' })}
                />
                <Button onClick={onAdd} customCss={styles.addSet}>
                    Add set
                </Button>
            </div>
        </div>
    );
};

export default SetList;
