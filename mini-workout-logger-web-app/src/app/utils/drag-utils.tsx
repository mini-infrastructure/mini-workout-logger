export type DropSide = 'before' | 'after';

/**
 * Determines which side of a drop target the cursor is on.
 * For vertical lists: compares cursor Y to element midpoint.
 * For horizontal lists: compares cursor X to element midpoint.
 */
export function getDropSide(
    e: { clientX: number; clientY: number },
    rect: { top: number; height: number; left: number; width: number },
    direction: 'vertical' | 'horizontal',
): DropSide {
    const ratio = direction === 'vertical'
        ? (e.clientY - rect.top) / rect.height
        : (e.clientX - rect.left) / rect.width;
    return ratio < 0.5 ? 'before' : 'after';
}

/**
 * Computes the final destination index after a drag-reorder.
 */
export function computeReorderIndex(from: number, over: number, side: DropSide): number {
    const rawTarget = side === 'before' ? over : over + 1;
    return from < rawTarget ? rawTarget - 1 : rawTarget;
}
