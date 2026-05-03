import { useEffect, useRef, useState } from 'react';
import type { JSX } from '@emotion/react/jsx-runtime';
import type { Interpolation, Theme } from '@emotion/react';
import GridCell from './grid-cell/grid-cell.component.tsx';
import styles from './widget-grid.component.style.tsx';

export type WidgetItem = {
    id: number;
    x: number;
    y: number;
    colSpan: number;
    rowSpan: number;
    background: 'SOLID' | 'GLASS';
    backgroundColor?: string;
};

export type WidgetGridProps = {
    columns: number;
    editMode: boolean;
    widgets: WidgetItem[];
    onAddWidget?: (x: number, y: number) => void;
    onLayoutChange?: (widgets: WidgetItem[]) => void;
    renderWidget: (item: WidgetItem) => JSX.Element;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const WidgetGrid = ({
    columns,
    editMode,
    widgets,
    onAddWidget,
    onLayoutChange,
    renderWidget,
    customCss,
}: WidgetGridProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cellSize, setCellSize] = useState(0);
    const [localWidgets, setLocalWidgets] = useState(widgets);
    const [dragId, setDragId] = useState<number | null>(null);
    const [dropTarget, setDropTarget] = useState<{ x: number; y: number } | null>(null);

    // Sync local state when prop changes (e.g. after save)
    useEffect(() => {
        setLocalWidgets(widgets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(widgets)]);

    // Compute cell size from container width
    useEffect(() => {
        if (!containerRef.current) return;
        const gap = 8; // var(--stack-gap-condensed) ≈ 8px
        const observer = new ResizeObserver(([entry]) => {
            const w = entry.contentRect.width;
            setCellSize(Math.floor((w - gap * (columns - 1)) / columns));
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [columns]);

    // Compute grid dimensions
    const rows = localWidgets.length === 0
        ? Math.max(3, columns)
        : Math.max(
              columns,
              Math.max(...localWidgets.map((w) => w.y + w.rowSpan)) + 1,
          );

    // Build occupied set
    const occupied = new Set<string>();
    localWidgets.forEach((w) => {
        for (let r = w.y; r < w.y + w.rowSpan; r++) {
            for (let c = w.x; c < w.x + w.colSpan; c++) {
                occupied.add(`${c},${r}`);
            }
        }
    });

    const handleDrop = (x: number, y: number) => {
        if (dragId === null) return;
        const updated = localWidgets.map((w) =>
            w.id === dragId ? { ...w, x, y } : w
        );
        setLocalWidgets(updated);
        onLayoutChange?.(updated);
        setDragId(null);
        setDropTarget(null);
    };

    if (cellSize <= 0) {
        return <div ref={containerRef} css={customCss} style={{ flex: 1 }} />;
    }

    return (
        <div
            ref={containerRef}
            css={[styles.container(columns, cellSize), customCss]}
        >
            {/* Background cell layer (edit mode + drop targets) */}
            {editMode && Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const key = `${col},${row}`;
                    const isTarget = dropTarget?.x === col && dropTarget?.y === row;
                    return (
                        <div
                            key={key}
                            css={styles.widgetWrapper(col, row, 1, 1)}
                            onDragOver={(e) => { e.preventDefault(); setDropTarget({ x: col, y: row }); }}
                            onDrop={() => handleDrop(col, row)}
                        >
                            <GridCell
                                editMode
                                occupied={occupied.has(key)}
                                isDropTarget={isTarget && dragId !== null}
                                onClick={() => onAddWidget?.(col, row)}
                            />
                        </div>
                    );
                })
            )}

            {/* Widgets */}
            {localWidgets.map((item) => (
                <div
                    key={item.id}
                    css={[
                        styles.widgetWrapper(item.x, item.y, item.colSpan, item.rowSpan),
                        editMode && styles.draggable,
                        editMode && dragId === item.id && styles.dragging,
                    ]}
                    draggable={editMode}
                    onDragStart={() => setDragId(item.id)}
                    onDragEnd={() => { setDragId(null); setDropTarget(null); }}
                >
                    {renderWidget(item)}
                </div>
            ))}
        </div>
    );
};

export default WidgetGrid;
