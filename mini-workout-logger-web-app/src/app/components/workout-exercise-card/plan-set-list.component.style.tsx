import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    // drag | # | type | field1 | field2 | trash
    row: css({
        display: 'grid',
        gridTemplateColumns: 'var(--base-size-16) var(--base-size-32) auto 1fr 1fr auto',
        gap: '0 var(--stack-gap-normal)',
        alignItems: 'center',
    }),

    rowDragOver: css({
        boxShadow: '0 -2px 0 0 var(--color-blue)',
    }),

    setNumber: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        textAlign: 'center',
        padding: '0.4rem 0',
    }),

    typeBadge: css({
        fontSize: 'var(--size-tiny)',
        fontWeight: 600,
        padding: '2px 6px',
        borderRadius: 'var(--borderRadius-full)',
        backgroundColor: 'var(--color-container2)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-gray)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'border-color 0.15s, color 0.15s',
        ':hover': {
            borderColor: 'var(--color-blue)',
            color: 'var(--color-blue)',
        },
    }),

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
        width: '40px',
    }),

    timeSeparator: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        padding: '0 1px',
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

    unit: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
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

    addSet: css({
        width: '100%',
        backgroundColor: 'var(--color-blue)',
        ':hover': {
            backgroundColor: 'var(--color-blue-border)',
        },
    }),
};

export default styles;
