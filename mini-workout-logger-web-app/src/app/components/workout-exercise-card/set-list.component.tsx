import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { IoCheckmarkCircleOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { FaTrashAlt } from 'react-icons/fa';
import type { SetReadDTO } from '../../dtos/set-read.dto.tsx';
import type { SetType } from '../../models/set.model.tsx';
import Button from '../button/button.component.tsx';
import OnlyIconButton from '../button/only-icon-button.component.tsx';
import styles from './set-list.component.style.tsx';

type SetField = 'planned_repetitions' | 'planned_weight' | 'planned_duration_seconds';

type ColDef = { label: string; field: SetField | null; unit?: string };

const columnDefs: Record<SetType, ColDef[]> = {
    REPS: [
        { label: 'Set',  field: null },
        { label: 'Reps', field: 'planned_repetitions' },
    ],
    REPS_X_WEIGHT: [
        { label: 'Set',    field: null },
        { label: 'Reps',   field: 'planned_repetitions' },
        { label: 'Weight', field: 'planned_weight', unit: 'kg' },
    ],
    TIME_X_WEIGHT: [
        { label: 'Set',    field: null },
        { label: 'Time',   field: 'planned_duration_seconds', unit: 's' },
        { label: 'Weight', field: 'planned_weight', unit: 'kg' },
    ],
    TIME: [
        { label: 'Set',  field: null },
        { label: 'Time', field: 'planned_duration_seconds', unit: 's' },
    ],
};

const completedCellCss = css({
    backgroundColor: 'color-mix(in srgb, var(--color-green) 12%, transparent)',
});

const completedHoverOverrideCss = css({
    ':hover': {
        backgroundColor: 'color-mix(in srgb, var(--color-green) 20%, transparent)',
        color: 'var(--color-green)',
    },
});

export type SetListProps = {
    sets: SetReadDTO[];
    isPlaying?: boolean;
    resetKey?: number;
    onChange: (setId: number, field: SetField, value: number) => void;
    onRemove: (setId: number) => void;
    onAdd: () => void;
    onCompletedChange?: (completedCount: number) => void;
};

const SetList = ({ sets, isPlaying = false, resetKey, onChange, onRemove, onAdd, onCompletedChange }: SetListProps) => {
    const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (resetKey === undefined) return;
        setCompletedIds(new Set());
        onCompletedChange?.(0);
    }, [resetKey]);

    if (!sets || sets.length === 0) return null;

    const cols = columnDefs[sets[0].type] ?? columnDefs['REPS'];
    const colCount = cols.length;

    const toggleCompleted = (id: number) => {
        const next = new Set(completedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setCompletedIds(next);
        onCompletedChange?.(next.size);
    };

    const getValue = (set: SetReadDTO, field: SetField): number => set[field] ?? 0;

    return (
        <div css={styles.table(colCount)}>
            {/* Header */}
            {cols.map((col) => (
                <span key={col.label} css={styles.headerCell}>
                    {col.label}{col.unit ? ` (${col.unit})` : ''}
                </span>
            ))}
            <span css={styles.headerCell} />

            {/* Rows */}
            {sets.flatMap((set, i) => {
                const completed = completedIds.has(set.id);
                return [
                    ...cols.map((col) =>
                        col.field === null ? (
                            <span
                                key={`${set.id}-set`}
                                css={[styles.setNumber, completed && completedCellCss]}
                            >
                                {i + 1}
                            </span>
                        ) : (
                            <input
                                key={`${set.id}-${col.field}`}
                                css={[styles.input, completed && completedCellCss]}
                                type="number"
                                min={0}
                                step={col.field === 'planned_weight' ? 0.5 : 1}
                                value={getValue(set, col.field)}
                                onChange={(e) =>
                                    onChange(set.id, col.field!, parseFloat(e.target.value) || 0)
                                }
                            />
                        )
                    ),
                    <div key={`${set.id}-actions`} css={styles.rowActions}>
                        <OnlyIconButton
                            icon={<IoCheckmarkCircleOutline />}
                            selectedIcon={<IoCheckmarkCircle />}
                            iconColor="--color-border"
                            selectedIconColor="--color-green"
                            selectedBg="transparent"
                            selected={completed}
                            onToggle={() => toggleCompleted(set.id)}
                            legend="Completed"
                            selectedLegend="Not completed"
                            customIconCss={css({ width: '20px', height: '20px', fontSize: '20px' })}
                            customCss={[
                                !isPlaying && css({ opacity: 0.3, pointerEvents: 'none' }),
                                completed ? completedHoverOverrideCss : undefined,
                            ]}
                        />
                        <OnlyIconButton
                            icon={<FaTrashAlt />}
                            iconColor="--color-border"
                            onToggle={() => onRemove(set.id)}
                            legend="Remove"
                        />
                    </div>,
                ];
            })}

            {/* Add set */}
            <Button onClick={onAdd} customCss={styles.addSet}>
                Add set
            </Button>
        </div>
    );
};

export default SetList;
