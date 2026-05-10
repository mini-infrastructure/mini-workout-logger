import {css} from '@emotion/react';

const styles = {
    body: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        padding: 'var(--base-size-16)',
        minWidth: '380px',
    }),

    footer: css({
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 'var(--stack-gap-condensed)',
        paddingTop: 'var(--base-size-8)',
    }),

    // Wraps the datetime-local input to match form input styling
    dateInput: css({
        padding: '0.2rem 0.8rem',
        minHeight: 'var(--input-height)',
        borderRadius: 'var(--borderRadius-small)',
        backgroundColor: 'var(--color-container2)',
        border: 'none',
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
        width: '100%',
        boxSizing: 'border-box' as const,
        cursor: 'pointer',
        '&:focus': {
            outline: 'none',
        },
    }),
};

export default styles;
