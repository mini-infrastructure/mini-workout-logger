import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Interpolation, Theme, SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';

export type DragHandleProps = {
    onMouseDown: () => void;
    onMouseUp: () => void;
};

export type DragItemProvided = {
    dragHandleProps: DragHandleProps;
    /** Inset box-shadow CSS to apply to the card's own root element via customCss. */
    indicatorCss: SerializedStyles | undefined;
};

export type DragGridProps<T> = {
    items: T[];
    direction?: 'vertical' | 'horizontal';
    onReorder: (fromIndex: number, toIndex: number) => void;
    renderItem: (item: T, provided: DragItemProvided, index: number) => ReactNode;
    getItemKey: (item: T) => string | number;
    borderColor?: string;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

type DropSide = 'before' | 'after';

function DragGrid<T extends object>({
    items,
    direction = 'vertical',
    onReorder,
    renderItem,
    getItemKey,
    borderColor = 'var(--color-blue)',
    customCss,
}: DragGridProps<T>): ReactNode {
    const [dragFrom, setDragFrom] = useState<number | null>(null);
    const [dragOver, setDragOver] = useState<number | null>(null);
    const [dropSide, setDropSide] = useState<DropSide>('before');
    const [draggableIndex, setDraggableIndex] = useState<number | null>(null);

    const getIndicatorCss = (index: number): SerializedStyles | undefined => {
        if (dragOver !== index) return undefined;
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
                            e.dataTransfer.setData('application/drag-grid', '');
                            setDragFrom(index);
                        }}
                        onDragOver={(e) => {
                            if (!e.dataTransfer.types.includes('application/drag-grid')) return;
                            e.preventDefault();
                            const rect = e.currentTarget.getBoundingClientRect();
                            const ratio = direction === 'vertical'
                                ? (e.clientY - rect.top) / rect.height
                                : (e.clientX - rect.left) / rect.width;
                            setDropSide(ratio < 0.5 ? 'before' : 'after');
                            setDragOver(index);
                        }}
                        onDrop={(e) => {
                            if (!e.dataTransfer.types.includes('application/drag-grid')) return;
                            e.preventDefault();
                            const from = dragFrom;
                            const over = dragOver;
                            const side = dropSide;
                            setDragFrom(null);
                            setDragOver(null);
                            setDraggableIndex(null);
                            if (from === null || over === null) return;
                            const rawTarget = side === 'before' ? over : over + 1;
                            const toIndex = from < rawTarget ? rawTarget - 1 : rawTarget;
                            if (from !== toIndex) {
                                onReorder(from, toIndex);
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
