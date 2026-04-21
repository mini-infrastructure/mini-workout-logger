import type { DragEvent } from 'react';
import { useState } from 'react';
import { css } from '@emotion/react';
import { FaTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import type { SetReadDTO } from '../../dtos/set-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
import Button from '../button/button.component.tsx';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
import styles from './plan-set-list.component.style.tsx';

type SetField = 'planned_repetitions' | 'planned_weight' | 'planned_duration_seconds';

const TYPE_CYCLE: SetType[] = ['REPS', 'REPS_X_WEIGHT', 'TIME_X_WEIGHT', 'TIME'];

const TYPE_LABELS: Record<SetType, string> = {
    REPS: 'Reps',
    REPS_X_WEIGHT: 'R×W',
    TIME_X_WEIGHT: 'T×W',
    TIME: 'Time',
};

const cycleType = (current: SetType): SetType => {
    const idx = TYPE_CYCLE.indexOf(current);
    return TYPE_CYCLE[(idx + 1) % TYPE_CYCLE.length];
};

const toMmSs = (seconds: number) => ({
    mm: Math.floor(seconds / 60),
    ss: seconds % 60,
});

export type PlanSetListProps = {
    sets: SetReadDTO[];
    onChange: (setId: number, field: SetField, value: number) => void;
    onTypeChange: (setId: number, type: SetType) => void;
    onRemove: (setId: number) => void;
    onReorder: (fromIndex: number, toIndex: number) => void;
    onAdd: () => void;
};

const PlanSetList = ({ sets, onChange, onTypeChange, onRemove, onReorder, onAdd }: PlanSetListProps) => {
    const [draggableIndex, setDraggableIndex] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<number | null>(null);

    if (!sets || sets.length === 0) return null;

    const handleDrop = () => {
        if (draggableIndex === null || dragOver === null || draggableIndex === dragOver) return;
        onReorder(draggableIndex, dragOver);
        setDraggableIndex(null);
        setDragOver(null);
    };

    const renderField1 = (set: SetReadDTO) => {
        if (set.type === 'REPS' || set.type === 'REPS_X_WEIGHT') {
            return (
                <div css={styles.inputWithUnit}>
                    <input
                        css={styles.input}
                        type="number"
                        min={0}
                        step={1}
                        value={set.planned_repetitions ?? 0}
                        onChange={(e) => onChange(set.id, 'planned_repetitions', parseFloat(e.target.value) || 0)}
                    />
                    <span css={styles.unit}>×</span>
                </div>
            );
        }
        // TIME or TIME_X_WEIGHT
        const { mm, ss } = toMmSs(set.planned_duration_seconds ?? 0);
        return (
            <div css={styles.timeInput}>
                <input
                    css={[styles.input, styles.timeSegment]}
                    type="number"
                    min={0}
                    value={mm}
                    onChange={(e) => onChange(set.id, 'planned_duration_seconds', (parseInt(e.target.value) || 0) * 60 + ss)}
                />
                <span css={styles.timeSeparator}>:</span>
                <input
                    css={[styles.input, styles.timeSegment]}
                    type="number"
                    min={0}
                    max={59}
                    value={ss}
                    onChange={(e) => onChange(set.id, 'planned_duration_seconds', mm * 60 + (parseInt(e.target.value) || 0))}
                />
                <span css={styles.unit}>mm:ss</span>
            </div>
        );
    };

    const renderField2 = (set: SetReadDTO) => {
        if (set.type === 'REPS_X_WEIGHT' || set.type === 'TIME_X_WEIGHT') {
            return (
                <div css={styles.inputWithUnit}>
                    <input
                        css={styles.input}
                        type="number"
                        min={0}
                        step={0.5}
                        value={set.planned_weight ?? 0}
                        onChange={(e) => onChange(set.id, 'planned_weight', parseFloat(e.target.value) || 0)}
                    />
                    <span css={styles.unit}>kg</span>
                </div>
            );
        }
        return <span />;
    };

    return (
        <div css={styles.container}>
            {sets.map((set, i) => {
                const isOver = dragOver === i && draggableIndex !== null && draggableIndex !== i;
                return (
                    <div
                        key={set.id}
                        css={[styles.row, isOver && styles.rowDragOver]}
                        draggable={draggableIndex === i}
                        onDragStart={(e) => { e.stopPropagation(); e.dataTransfer.setData('application/set', ''); setDragOver(null); }}
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
                        onDragEnd={(e) => { e.stopPropagation(); setDraggableIndex(null); setDragOver(null); }}
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
                        <span css={styles.setNumber}>{i + 1}</span>

                        {/* Type badge — click to cycle */}
                        <button
                            css={styles.typeBadge}
                            onClick={() => onTypeChange(set.id, cycleType(set.type))}
                            title="Click to change set type"
                        >
                            {TYPE_LABELS[set.type]}
                        </button>

                        {/* Field 1 */}
                        {renderField1(set)}

                        {/* Field 2 */}
                        {renderField2(set)}

                        {/* Actions */}
                        <OnlyIconButton
                            icon={<FaTrashAlt />}
                            iconColor="--color-border"
                            onToggle={() => onRemove(set.id)}
                            legend="Remove"
                        />
                    </div>
                );
            })}

            {/* Sentinel drop zone */}
            <div
                css={dragOver === sets.length && draggableIndex !== null ? css({ boxShadow: '0 -2px 0 0 var(--color-blue)' }) : undefined}
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

export default PlanSetList;
