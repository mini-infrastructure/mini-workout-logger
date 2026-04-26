import { css } from '@emotion/react';

const styles = {
    pageWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        gap: 'var(--stack-gap-normal)',
    }),

    header: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--stack-gap-condensed)',
        flexShrink: 0,
    }),

    titleBlock: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-nano)',
        flex: 1,
    }),

    title: css({
        fontSize: 'var(--size-larger)',
        fontWeight: 700,
    }),

    setsCounter: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-white)',
    }),

    finishButton: css({
        flexShrink: 0,
        backgroundColor: 'var(--color-green)',
        ':hover': {
            backgroundColor: 'var(--color-green-border)',
        },
    }),


    timerCard: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        padding: 'var(--base-size-8) var(--base-size-12)',
        width: 'fit-content',
        flexShrink: 0,
    }),

    clockIcon: css({
        display: 'flex',
        alignItems: 'center',
        color: 'var(--color-blue)',
        fontSize: 'var(--size-large)',
    }),

    timerDisplay: css({
        fontVariantNumeric: 'tabular-nums',
        fontSize: 'var(--size-medium)',
        minWidth: '3.5ch',
    }),

    content: css({
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        paddingRight: 'var(--base-size-4)',
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--color-border)',
            borderRadius: 'var(--borderRadius-full)',
        },
        scrollbarWidth: 'auto',
        scrollbarColor: 'var(--color-border) transparent',
    }),
};

export default styles;
