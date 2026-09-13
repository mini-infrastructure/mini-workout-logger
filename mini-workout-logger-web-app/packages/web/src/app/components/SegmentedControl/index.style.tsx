import { css } from '@emotion/react';

const styles = {
    container: css({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',

        backgroundColor: 'var(--color-black)',
        border: 'var(--border-medium) solid var(--color-white)',
        borderRadius: 'var(--radius-full)',

        padding: 'var(--space-2xs)',
    }),

    containerLarge: css({
        padding: 'var(--space-xs)',
    }),

    slider: css({
        position: 'absolute',
        top: 'var(--space-2xs)',
        left: 'var(--space-2xs)',
        height: 'calc(100% - var(--space-2xs) * 2)',

        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-full)',

        transition: 'transform 0.25s ease, width 0.25s ease',
        pointerEvents: 'none',
    }),

    sliderLarge: css({
        top: 'var(--space-xs)',
        left: 'var(--space-xs)',
        height: 'calc(100% - var(--space-xs) * 2)',
    }),

    optionsWrapper: css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
    }),

    option: css({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',

        paddingBlock: 'var(--space-sm)',
        paddingInline: 'var(--space-lg)',

        fontFamily: 'var(--font-family)',
        fontSize: 'var(--font-size-md)',
        fontWeight: 'var(--font-weight-medium)',
        lineHeight: 'var(--line-height-tight)',

        color: 'var(--color-white)',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: 'var(--radius-full)',

        cursor: 'pointer',
        transition: 'color 0.2s ease',

        '&:hover:not(:disabled)': {
            opacity: 0.8,
        },

        '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    }),

    optionLarge: css({
        paddingBlock: 'var(--space-md)',
        paddingInline: 'var(--space-xl)',
        fontSize: 'var(--font-size-lg)',
    }),

    optionIcon: css({
        paddingInline: 'var(--space-md)',
    }),

    optionIconLarge: css({
        paddingInline: 'var(--space-lg)',
    }),

    optionSelected: css({
        color: 'var(--color-black)',
    }),

    icon: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25em',
    }),

    iconLarge: css({
        fontSize: '1.5em',
    }),
};

export default styles;
