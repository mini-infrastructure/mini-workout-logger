import { useState } from 'react';
import type { ReactElement } from 'react';
import type { Interpolation, Theme, SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { useAlert } from '../../../context/alert.context.tsx';
import { getDropSide, computeReorderIndex, type DropSide } from '../../../utils/drag-utils.tsx';

export type DragHandleProps = {
    onMouseDown: () => void;
    onMouseUp: () => void;
};

export type DragItemProvided = {
    dragHandleProps: DragHandleProps;
    /** Inset box-shadow CSS to apply to the card's own root element via customCss. */
    indicatorCss: SerializedStyles | undefined;
};

export type RenderItem<T> = (item: T, provided: DragItemProvided, index: number) => ReactElement;

export type DragGridProps<T extends object> = {
    items: T[];
    direction?: 'vertical' | 'horizontal';
    onReorder: (fromIndex: number, toIndex: number) => void;
    renderItem: RenderItem<T>;
    getItemKey: (item: T) => string | number;
    /** Label used in the reorder alert: "<label> reordered." Omit to suppress the alert. */
    reorderLabel?: string;
    /** Data-transfer type key. Use distinct values for nested DragGrids. Default: 'application/drag-grid'. */
    dragType?: string;
    /** When true, paints a border on the drop target to indicate insertion point. Default: true. */
    colorBorderOnDrag?: boolean;
    borderColor?: string;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

function DragGrid<T extends object>({
    items,
    direction = 'vertical',
    onReorder,
    renderItem,
    getItemKey,
    reorderLabel,
    dragType = 'application/drag-grid',
    colorBorderOnDrag = true,
    borderColor = 'var(--color-blue)',
    customCss,
}: DragGridProps<T>) {
    const pushAlert = useAlert();
    const [dragFrom, setDragFrom] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<number | null>(null);
    const [dropSide, setDropSide] = useState<DropSide>('before');
    const [draggableIndex, setDraggableIndex] = useState<number | null>(null);

    const getIndicatorCss = (index: number): SerializedStyles | undefined => {
        if (!colorBorderOnDrag || dragOver !== index) return undefined;
        if (direction === 'vertical') {
            return dropSide === 'before'
                ? css({ boxShadow: `inset 0 3px 0 0 ${borderColor}` })
                : css({ boxShadow: `inset 0 -3px 0 0 ${borderColor}` });
        } else {
            return dropSide === 'before'
                ? css({ boxShadow: `inset 3px 0 0 0 ${borderColor}` })
                : css({ boxShadow: `inset -3px 0 0 0 ${borderColor}` });
        }
    };

    return (
        <div
            css={[
                css({
                    display: 'flex',
                    flexDirection: direction === 'vertical' ? 'column' : 'row',
                    gap: 'var(--stack-gap-normal)',
                }),
                ...(customCss
                    ? Array.isArray(customCss) ? customCss : [customCss]
                    : []),
            ]}
        >
            {items.map((item, index) => {
                const provided: DragItemProvided = {
                    dragHandleProps: {
                        onMouseDown: () => setDraggableIndex(index),
                        onMouseUp: () => setDraggableIndex(null),
                    },
                    indicatorCss: getIndicatorCss(index),
                };

                return (
                    <div
                        key={getItemKey(item)}
                        css={css({ minWidth: 0 })}
                        draggable={draggableIndex === index}
                        onDragStart={(e) => {
                            e.dataTransfer.setData(dragType, '');
                            setDragFrom(index);
                        }}
                        onDragOver={(e) => {
                            if (!e.dataTransfer.types.includes(dragType)) return;
                            e.preventDefault();
                            e.stopPropagation();
                            const rect = e.currentTarget.getBoundingClientRect();
                            setDropSide(getDropSide(e, rect, direction));
                            setDragOver(index);
                        }}
                        onDrop={(e) => {
                            if (!e.dataTransfer.types.includes(dragType)) return;
                            e.preventDefault();
                            e.stopPropagation();
                            const from = dragFrom;
                            const over = dragOver;
                            const side = dropSide;
                            setDragFrom(null);
                            setDragOver(null);
                            setDraggableIndex(null);
                            if (from === null || over === null) return;
                            const toIndex = computeReorderIndex(from, over, side);
                            if (from !== toIndex) {
                                onReorder(from, toIndex);
                                if (reorderLabel) {
                                    pushAlert(`${reorderLabel} reordered.`, 'info');
                                }
                            }
                        }}
                        onDragEnd={() => {
                            setDragFrom(null);
                            setDragOver(null);
                            setDraggableIndex(null);
                        }}
                    >
                        {renderItem(item, provided, index)}
                    </div>
                );
            })}
        </div>
    );
}

export default DragGrid;
