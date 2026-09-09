import { css, keyframes } from '@emotion/react';

const fadeIn = keyframes({
    from: {
        opacity: 0,
        transform: 'translateY(-0.5rem)',
    },
    to: {
        opacity: 1,
        transform: 'translateY(0)',
    },
});

const spin = keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
});

const styles = {
    container: css({
        position: 'absolute',
        top: '100%',
        left: 0,
        minWidth: '100%',
        width: 'max-content',
        backgroundColor: 'var(--dropdown-bg)',
        borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
        border: 'var(--border-thin) solid var(--dropdown-separator)',
        borderTop: 'none',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 'var(--z-dropdown)',
        overflow: 'hidden',
        animation: `${fadeIn} var(--transition-fast) ease-out`,
    }),

    searchContainer: css({
        padding: 'var(--space-sm)',
        borderBottom: 'var(--border-thin) solid var(--dropdown-separator)',
    }),

    searchInput: css({
        width: '100%',
        padding: 'var(--space-sm) var(--space-md)',
        backgroundColor: 'rgba(243, 244, 248, 0.1)',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--dropdown-text)',
        fontSize: 'var(--font-size-sm)',
        fontFamily: 'var(--font-family)',
        outline: 'none',

        '&::placeholder': {
            color: 'rgba(243, 244, 248, 0.5)',
        },

        '&:focus': {
            backgroundColor: 'rgba(243, 244, 248, 0.15)',
        },
    }),

    selectAllContainer: css({
        borderBottom: 'var(--border-thin) solid var(--dropdown-separator)',
    }),

    selectAllItem: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        padding: 'var(--space-sm) var(--space-md)',
        color: 'var(--dropdown-text)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        cursor: 'pointer',
        transition: 'background-color var(--transition-fast)',

        '&:hover': {
            backgroundColor: 'var(--dropdown-item-hover-bg)',
        },
    }),

    selectAllItemActive: css({
        backgroundColor: 'var(--dropdown-item-selected-bg)',
        color: 'var(--dropdown-item-selected-text)',

        '&:hover': {
            backgroundColor: 'var(--dropdown-item-selected-bg)',
            opacity: 0.9,
        },
    }),

    listContainer: css({
        maxHeight: 'var(--dropdown-max-height)',
        overflowY: 'auto',
        overflowX: 'hidden',

        // Custom scrollbar
        '&::-webkit-scrollbar': {
            width: '0.5rem',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--dropdown-separator)',
            borderRadius: 'var(--radius-full)',
        },
    }),

    groupLabel: css({
        padding: 'var(--space-sm) var(--space-md)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'rgba(243, 244, 248, 0.6)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    }),

    item: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        padding: 'var(--space-sm) var(--space-md)',
        color: 'var(--dropdown-text)',
        fontSize: 'var(--font-size-sm)',
        cursor: 'pointer',
        transition: 'background-color var(--transition-fast)',

        '&:hover': {
            backgroundColor: 'var(--dropdown-item-hover-bg)',
        },
    }),

    itemSelected: css({
        backgroundColor: 'var(--dropdown-item-selected-bg)',
        color: 'var(--dropdown-item-selected-text)',

        '&:hover': {
            backgroundColor: 'var(--dropdown-item-selected-bg)',
            opacity: 0.9,
        },
    }),

    itemDisabled: css({
        opacity: 0.5,
        cursor: 'not-allowed',

        '&:hover': {
            backgroundColor: 'transparent',
        },
    }),

    itemIcon: css({
        flexShrink: 0,
        width: '1.5rem',
        height: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'var(--font-size-md)',
    }),

    itemImage: css({
        flexShrink: 0,
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: 'var(--radius-sm)',
        objectFit: 'cover',
    }),

    checkbox: css({
        flexShrink: 0,
        width: '1.125rem',
        height: '1.125rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.25rem',
        border: 'var(--border-medium) solid rgba(243, 244, 248, 0.4)',
        backgroundColor: 'transparent',
        color: 'transparent',
        fontSize: 'var(--font-size-xs)',
        transition: 'all var(--transition-fast)',
    }),

    checkboxChecked: css({
        backgroundColor: 'var(--color-blue)',
        borderColor: 'var(--color-blue)',
        color: 'var(--color-white)',
    }),

    checkboxCheckedOnSelected: css({
        backgroundColor: 'var(--color-white)',
        borderColor: 'var(--color-white)',
        color: 'var(--color-blue)',
    }),

    itemLabel: css({
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),

    emptyState: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl) var(--space-md)',
        color: 'rgba(243, 244, 248, 0.6)',
        fontSize: 'var(--font-size-sm)',
        textAlign: 'center',
    }),

    emptyIcon: css({
        fontSize: 'var(--font-size-2xl)',
        marginBottom: 'var(--space-sm)',
        opacity: 0.5,
    }),

    loadingState: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl) var(--space-md)',
    }),

    loadingSpinner: css({
        width: '1.5rem',
        height: '1.5rem',
        border: '0.125rem solid var(--dropdown-separator)',
        borderTopColor: 'var(--dropdown-text)',
        borderRadius: 'var(--radius-full)',
        animation: `${spin} 0.8s linear infinite`,
    }),
};

export default styles;
