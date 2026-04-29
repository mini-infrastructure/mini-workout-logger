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
        minWidth: 0,
    }),

    nameRow: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
    }),

    title: css({
        fontSize: 'var(--size-larger)',
        fontWeight: 700,
        whiteSpace: 'nowrap',
    }),

    nameInput: css({
        fontSize: 'var(--size-larger)',
        fontWeight: 700,
        background: 'transparent',
        border: 'none',
        borderBottom: '2px solid var(--color-blue)',
        color: 'var(--color-text)',
        outline: 'none',
        padding: '0 var(--base-size-4)',
        minWidth: 0,
        flex: '1 1 200px',
    }),

    subtitle: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
    }),

    tagInput: css({
        fontSize: 'var(--size-small)',
        background: 'transparent',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--borderRadius-full)',
        color: 'var(--color-text)',
        outline: 'none',
        padding: '2px var(--base-size-8)',
        minWidth: 80,
        maxWidth: 160,
    }),

    actionButton: css({
        flexShrink: 0,
        minWidth: 'unset',
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
        backgroundColor: 'var(--color-blue)',
        ':hover': {
            backgroundColor: 'var(--color-blue-border)',
        },
    }),

    addContainer: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    addSection: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
        padding: 'var(--stack-gap-condensed)',
        backgroundColor: 'var(--color-container2)',
        borderRadius: 'var(--borderRadius-medium)',
    }),

    resultsArea: css({
        height: 256,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }),

    exerciseSearchResults: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--stack-gap-condensed)',
        alignContent: 'flex-start',
        height: '100%',
    }),

    noResults: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        textAlign: 'center' as const,
    }),

    searchResultCard: css({
        transition: 'outline-color 0.15s',
        outline: 'var(--borderWidth-medium) solid transparent',
        outlineOffset: 'calc(-1 * var(--borderWidth-medium))',
        ':hover': {
            outlineColor: 'var(--color-blue)',
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
        width: '18vw',
        minWidth: 'var(--base-size-200)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--stack-gap-normal)',
        ...scrollable,
    }),

    bodyWrapper: css({
        width: '100%',
        flex: 1,
        minHeight: '20vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
};

export default styles;
