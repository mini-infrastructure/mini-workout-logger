import { css } from '@emotion/react';

const scrollable = {
    overflowY: 'auto' as const,
    '&::-webkit-scrollbar-track': { background: 'transparent' },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'var(--color-border)',
        borderRadius: 'var(--borderRadius-full)',
    },
    scrollbarWidth: 'auto' as const,
    scrollbarColor: 'var(--color-border) transparent',
};

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

    subtitle: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
    }),

    actionButton: css({
        flexShrink: 0,
    }),

    startButton: css({
        flexShrink: 0,
        backgroundColor: 'var(--color-green)',
        ':hover': {
            backgroundColor: 'var(--color-green-border)',
        },
    }),

    contentRow: css({
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--stack-gap-normal)',
        overflow: 'hidden',
    }),

    leftColumn: css({
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        paddingRight: 'var(--base-size-4)',
        ...scrollable,
    }),

    exerciseList: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
    }),

    addExerciseToggle: css({
        width: '100%',
        backgroundColor: 'transparent',
        border: '1px dashed var(--color-border)',
        color: 'var(--color-gray)',
        ':hover': {
            backgroundColor: 'transparent',
            borderColor: 'var(--color-blue)',
            color: 'var(--color-blue)',
        },
    }),

    addSection: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    exerciseSearchResults: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--stack-gap-condensed)',
        '& > *': {
            cursor: 'pointer',
        },
    }),

    searchResultCard: css({
        transition: 'box-shadow 0.15s',
        ':hover': {
            boxShadow: '0 0 0 2px var(--color-blue)',
        },
    }),

    sectionTitle: css({
        fontSize: 'var(--size-small)',
        fontWeight: 600,
        color: 'var(--color-gray)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
    }),

    historyEmpty: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
    }),

    historyList: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    historyItem: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        padding: 'var(--base-size-8) var(--base-size-12)',
        borderRadius: 'var(--borderRadius-small)',
        backgroundColor: 'var(--color-container2)',
    }),

    historyDate: css({
        flex: 1,
        fontSize: 'var(--size-small)',
        color: 'var(--color-text)',
    }),

    rightPanel: css({
        flexShrink: 0,
        width: '260px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
        ...scrollable,
    }),

    bodyWrapper: css({
        flex: 1,
        minHeight: '240px',
    }),
};

export default styles;
