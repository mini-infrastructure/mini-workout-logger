import {css} from '@emotion/react';

const styles = {
    container: (columns: number, cellSize: number) => css({
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
        gridAutoRows: `${cellSize}px`,
        gap: 'var(--stack-gap-condensed)',
        overflowY: 'auto',
        alignContent: 'start',
    }),

    cellLayer: (columns: number, rows: number) => css({
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: 'var(--stack-gap-condensed)',
        pointerEvents: 'none',
    }),

    cellLayerWrapper: css({
        position: 'relative',
        flex: 1,
        overflow: 'hidden',
    }),

    widgetWrapper: (x: number, y: number, colSpan: number, rowSpan: number) => css({
        gridColumn: `${x + 1} / span ${colSpan}`,
        gridRow: `${y + 1} / span ${rowSpan}`,
    }),

    draggable: css({
        cursor: 'grab',
    }),

    dragging: css({
        opacity: 0.4,
        cursor: 'grabbing',
    }),
};

export default styles;
