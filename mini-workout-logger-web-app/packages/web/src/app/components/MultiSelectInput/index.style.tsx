import { css, keyframes } from '@emotion/react';

const rotateUp = keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(180deg)' },
});

const rotateDown = keyframes({
    from: { transform: 'rotate(180deg)' },
    to: { transform: 'rotate(0deg)' },
});

const styles = {
    wrapper: css({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-sm)',
    }),

    inputContainer: css({
        cursor: 'pointer',
    }),

    arrowIcon: css({
        transition: 'transform var(--transition-fast)',
    }),

    arrowIconOpen: css({
        animation: `${rotateUp} var(--transition-fast) forwards`,
    }),

    arrowIconClosed: css({
        animation: `${rotateDown} var(--transition-fast) forwards`,
    }),

    badgesContainer: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-xs)',
    }),

    badge: css({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-xs)',
        paddingBlock: 'var(--space-2xs)',
        paddingInline: 'var(--space-sm)',
        backgroundColor: 'var(--color-white)',
        border: 'var(--border-medium) solid var(--color-black)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-black)',
        fontWeight: 'var(--font-weight-medium)',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',

        '&:hover': {
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-white)',
            borderColor: 'var(--color-white)',
        },
    }),

    badgeRemove: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1rem',
        height: '1rem',
        padding: 0,
        border: 'none',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'transparent',
        color: 'var(--color-black)',
        fontSize: 'var(--font-size-xs)',
        cursor: 'pointer',
        transition: 'background-color var(--transition-fast), color var(--transition-fast)',
    }),

    badgeRemoveInverted: css({
        color: 'var(--color-white)',
    }),

    badgeRemoveHover: css({
        backgroundColor: 'rgba(15, 22, 32, 0.2)',
    }),

    badgeRemoveHoverInverted: css({
        backgroundColor: 'rgba(243, 244, 248, 0.3)',
    }),

    moreIndicator: css({
        display: 'inline-flex',
        alignItems: 'center',
        paddingBlock: 'var(--space-2xs)',
        paddingInline: 'var(--space-sm)',
        backgroundColor: 'var(--color-black)',
        border: 'var(--border-medium) solid var(--color-white)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-white)',
        fontWeight: 'var(--font-weight-medium)',
    }),
};

export default styles;
