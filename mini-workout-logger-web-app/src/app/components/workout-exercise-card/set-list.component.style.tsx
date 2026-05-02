import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
        minWidth: 0,
    }),

    // drag | # | type | field1 | field2 | actions
    row: css({
        display: 'grid',
        gridTemplateColumns: 'var(--base-size-16) var(--base-size-32) auto 1fr 1fr auto',
        gap: '0 var(--stack-gap-normal)',
        alignItems: 'center',
    }),

    headerRow: css({
        display: 'grid',
        gridTemplateColumns: 'var(--base-size-16) var(--base-size-32) auto 1fr 1fr auto',
        gap: '0 var(--stack-gap-normal)',
        alignItems: 'center',
        paddingBottom: 'var(--stack-gap-condensed)',
    }),

    rowDragOver: css({
        boxShadow: '0 -2px 0 0 var(--color-blue)',
    }),

    rowSkipped: css({
        '& > *:not(:last-child)': {
            opacity: 0.3,
        },
    }),

    cardProgressBar: css({
        marginBottom: 'var(--stack-gap-condensed)',
    }),

    headerCell: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-border)',
        fontWeight: 600,
    }),

    setNumber: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        textAlign: 'center',
        borderRadius: 'var(--borderRadius-small)',
        padding: '0.4rem 0',
    }),

    // Plan mode: clickable badge (rendered via Button)
    typeBadge: css({
        fontSize: 'var(--size-tiny)',
        fontWeight: 600,
        padding: '2px 6px',
        borderRadius: 'var(--borderRadius-full)',
        backgroundColor: 'var(--color-container2)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-gray)',
        whiteSpace: 'nowrap',
        lineHeight: 1.5,
        ':hover': {
            borderColor: 'var(--color-blue)',
            color: 'var(--color-blue)',
            backgroundColor: 'var(--color-container2)',
        },
    }),

    // Execution mode: read-only label
    typeBadgeReadOnly: css({
        fontSize: 'var(--size-tiny)',
        fontWeight: 600,
        padding: '2px 6px',
        borderRadius: 'var(--borderRadius-full)',
        backgroundColor: 'var(--color-container2)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-gray)',
        whiteSpace: 'nowrap',
        textAlign: 'center',
    }),

    input: css({
        padding: '0.4rem 0.6rem',
        borderRadius: 'var(--borderRadius-small)',
        backgroundColor: 'var(--color-container2)',
        border: 'none',
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
        width: '100%',
        boxSizing: 'border-box' as const,
        outline: 'none',
        ':focus': {
            outline: 'var(--borderWidth-thin) solid var(--color-blue)',
        },
    }),

    // Plan mode: input + inline unit label
    inputWithUnit: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        minWidth: 0,
    }),

    timeInput: css({
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        minWidth: 0,
    }),

    timeSegment: css({
        width: '56px',
        minWidth: '56px',
        flexShrink: 0,
    }),

    timeSeparator: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        padding: '0 1px',
    }),

    unit: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
    }),

    rowActions: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
    }),

    dragHandle: css({
        background: 'transparent',
        border: 'none',
        padding: '2px',
        color: 'var(--color-border)',
        cursor: 'grab',
        ':hover': {
            color: 'var(--color-white)',
            background: 'transparent',
        },
        ':active': {
            cursor: 'grabbing',
        },
    }),

    dragHandleIcon: css({
        width: '14px',
        height: '14px',
        fontSize: '14px',
    }),

    collapseWrapper: css({
        overflow: 'hidden',
        transition: 'max-height var(--transition-expand)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    addSet: css({
        width: '100%',
        backgroundColor: 'var(--color-blue)',
        ':hover': {
            backgroundColor: 'var(--color-blue-border)',
        },
    }),
};

export default styles;
