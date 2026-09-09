import { css, keyframes } from '@emotion/react';

const slideIn = keyframes({
    from: { transform: 'translateY(100%)', opacity: 0 },
    to:   { transform: 'translateY(0)',    opacity: 1 },
});

const slideOut = keyframes({
    from: { transform: 'translateY(0)',    opacity: 1, maxHeight: '6rem', marginBottom: 'var(--space-sm)' },
    to:   { transform: 'translateY(100%)', opacity: 0, maxHeight: 0,      marginBottom: 0 },
});

export type AlertVariant = 'error' | 'info' | 'success' | 'warning';

const variantColors: Record<AlertVariant, string> = {
    error:   'var(--color-red)',
    info:    'var(--color-blue)',
    success: 'var(--color-green)',
    warning: 'var(--color-yellow)',
};

const variantTextColors: Record<AlertVariant, string> = {
    error:   'var(--color-black)',
    info:    'var(--color-white)',
    success: 'var(--color-black)',
    warning: 'var(--color-black)',
};

const styles = {
    container: css({
        position: 'fixed',
        bottom: 'var(--space-xl)',
        right: 'var(--space-xl)',
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 'var(--space-sm)',
        zIndex: 9999,
        pointerEvents: 'none',
    }),

    alert: (variant: AlertVariant, closing: boolean) => css({
        minWidth: '18rem',
        maxWidth: '24rem',
        padding: 'var(--space-sm) var(--space-md)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        backgroundColor: variantColors[variant],
        color: variantTextColors[variant],
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 0.25rem 1rem rgba(0, 0, 0, 0.3)',
        pointerEvents: 'auto',
        animation: `${closing ? slideOut : slideIn} 0.3s ease forwards`,
        overflow: 'hidden',
    }),

    icon: (variant: AlertVariant) => css({
        width: 'var(--space-lg)',
        height: 'var(--space-lg)',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
            color: variantTextColors[variant],
            fontSize: 'var(--font-size-lg)',
        },
    }),

    message: css({
        flex: 1,
        fontWeight: 'var(--font-weight-medium)',
        fontSize: 'var(--font-size-sm)',
        lineHeight: 'var(--line-height-normal)',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    }),

    closeButtonOverride: (variant: AlertVariant) => css({
        width: 'var(--space-lg)',
        height: 'var(--space-lg)',
        flexShrink: 0,
        backgroundColor: 'transparent',
        border: 'none',
        color: variantTextColors[variant],
        '&:hover:not(:disabled)': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            color: variantTextColors[variant],
            borderColor: 'transparent',
        },
    }),
};

export default styles;
