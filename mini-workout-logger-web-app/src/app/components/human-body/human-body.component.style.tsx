import {css} from '@emotion/react';

const styles = {
    wrapper: css({
        position: 'relative',
        height: '100%',
    }),

    container: css({
        height: '100%',

        '& svg': {
            height: '100%',
            width: 'auto',
            display: 'block',
        },
    }),

    flipButton: css({
        position: 'absolute',
        bottom: 'var(--stack-gap-normal)',
        right: 'var(--stack-gap-normal)',
    }),

    tooltip: css({
        position: 'fixed',
        pointerEvents: 'none',
        backgroundColor: 'var(--color-container2)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--borderRadius-medium)',
        padding: '0.4rem 0.65rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.1rem',
        zIndex: 9999,
        boxShadow: '0 4px 6px -1px rgba(1, 4, 9, 0.8)',
    }),

    tooltipPrimary: css({
        fontSize: 'var(--size-medium)',
        color: 'var(--color-text)',
        fontWeight: 500,
        whiteSpace: 'nowrap',
    }),

    tooltipSecondary: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        whiteSpace: 'nowrap',
    }),
};

export const globalMuscleStyles = css`
    [id^="Muscle."] {
        transition: filter 0.15s ease;
    }

    .muscle--hovered,
    .muscle--hovered path {
        filter: brightness(1.5);
    }

    .muscle--interactive [id^="Muscle."] {
        cursor: pointer;
    }

    .muscle--interactive button {
        cursor: pointer;
    }

    .muscle--selected,
    .muscle--selected path {
        fill: var(--color-blue) !important;
        opacity: 0.8;
    }

    .muscle--highlighted,
    .muscle--highlighted path {
        fill: var(--color-orange) !important;
        opacity: 0.8;
    }
`;

export default styles;
