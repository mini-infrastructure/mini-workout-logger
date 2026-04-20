import { css } from '@emotion/react';

const styles = {
    table: (cols: number) => css({
        display: 'grid',
        // set-number col | data cols | actions col
        gridTemplateColumns: `var(--base-size-32) repeat(${cols - 1}, 1fr) auto`,
        gap: `var(--stack-gap-condensed) var(--stack-gap-normal)`,
        alignItems: 'center',
    }),

    headerCell: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-border)',
        fontWeight: 600,
        padding: `0 0 var(--stack-gap-condensed) 0`,
    }),

    setNumber: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        textAlign: 'center',
        borderRadius: 'var(--borderRadius-small)',
        padding: '0.4rem 0',
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
            outline: `var(--borderWidth-thin) solid var(--color-blue)`,
        },
    }),

    rowActions: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
    }),

    addSet: css({
        gridColumn: '1 / -1',
        width: '100%',
        backgroundColor: 'var(--color-blue)',
        ':hover': {
            backgroundColor: 'var(--color-blue-border)',
        },
    }),
};

export default styles;
