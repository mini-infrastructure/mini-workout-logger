import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
        overflow: 'hidden',
    }),

    header: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        flexShrink: 0,
    }),

    searchRow: css({
        display: 'flex',
        alignItems: 'stretch',
        gap: 'var(--space-md)',
        width: '100%',
    }),

    searchContainer: css({
        flex: 1,
    }),

    addButton: css({
        height: 'var(--input-height)',
        flexShrink: 0,
    }),

    filtersRow: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        width: '100%',

        // Make filter buttons fill the row
        '& > div': {
            flex: '1 1 auto',
        },
    }),

    filterButtonContainer: css({
        position: 'relative',
        display: 'flex',

        // Make button fill container
        '& > button': {
            width: '100%',
            justifyContent: 'center',
        },
    }),

    filterDropdown: css({
        minWidth: '12rem',
        top: 'calc(100% + var(--space-xs))',
        left: 0,
    }),

    filterBadge: css({
        position: 'absolute',
        top: '-0.25rem',
        right: '-0.25rem',
        minWidth: '1rem',
        height: '1rem',
        padding: '0 0.25rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-red)',
        color: 'var(--color-white)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-bold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1,
    }),

    muscleFilterContainer: css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    }),

    muscleFilterButton: css({
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--color-black)',

        '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-gray-light)',
            border: 'none',
            color: 'var(--color-black)',
        },
    }),

    muscleFilterButtonActive: css({
        backgroundColor: 'var(--color-gray-light)',
        border: 'none',
        color: 'var(--color-black)',

        '&:hover:not(:disabled)': {
            backgroundColor: 'var(--color-gray-light)',
            border: 'none',
            color: 'var(--color-black)',
        },
    }),

    muscleFilterDropdown: css({
        minWidth: '14rem',
        top: 'calc(100% + var(--space-xs))',
        right: 0,
        left: 'auto',
    }),

    content: css({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginTop: 'var(--space-lg)',
        overflow: 'hidden',
    }),

    cellsContainer: css({
        flex: 1,
        overflow: 'auto',
        paddingRight: 'var(--space-sm)',
    }),

    cellsGrid: css({
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 'var(--space-md)',

        // 2 cards per row
        '@media (min-width: 640px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },

        // 3 cards per row
        '@media (min-width: 980px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },

        // 4 cards per row
        '@media (min-width: 1280px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },

        // 5 cards per row
        '@media (min-width: 1600px)': {
            gridTemplateColumns: 'repeat(5, 1fr)',
        },
    }),

    cellWrapper: css({
        height: '12rem',
        cursor: 'pointer',
        transition: 'transform var(--transition-fast)',

        // Make Cell fill the wrapper
        '& > div': {
            height: '100%',
        },

        '&:hover': {
            transform: 'scale(1.02)',
        },
    }),

    sentinel: css({
        width: '100%',
        height: '1px',
        flexShrink: 0,
    }),

    loadingMore: css({
        display: 'flex',
        justifyContent: 'center',
        padding: 'var(--space-lg)',
        color: 'var(--color-white)',
        fontSize: 'var(--font-size-sm)',
    }),

    emptyState: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: 'var(--space-md)',
        color: 'var(--color-white)',
    }),

    emptyIcon: css({
        fontSize: 'var(--font-size-3xl)',
        opacity: 0.5,
    }),

    emptyText: css({
        fontSize: 'var(--font-size-lg)',
        opacity: 0.7,
    }),

    resultCount: css({
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-white)',
        opacity: 0.7,
        marginBottom: 'var(--space-sm)',
    }),
};

export default styles;
