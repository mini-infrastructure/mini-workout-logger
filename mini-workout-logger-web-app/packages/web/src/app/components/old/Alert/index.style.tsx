import { css, keyframes } from '@emotion/react';
import { cssVar } from '@mini/shared';

const slideIn = keyframes`
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
`;

const slideOut = keyframes`
    from { transform: translateY(0);    opacity: 1; max-height: var(--animation-maxHeight-sm); margin-bottom: var(--stack-gap-condensed); }
    to   { transform: translateY(100%); opacity: 0; max-height: 0;                             margin-bottom: 0; }
`;

const variantColors: Record<string, string> = {
    error:   'var(--color-red)',
    info:    'var(--color-blue)',
    success: 'var(--color-green)',
    warning: 'var(--color-yellow)',
};

const styles = {
    container: css({
        position: 'fixed',
        bottom: 'var(--base-size-32)',
        right: 'var(--base-size-32)',
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 'var(--stack-gap-condensed)',
        zIndex: cssVar<number>('--base-zIndex-overlay'),
        pointerEvents: 'none',
    }),

    alert: (variant: string, closing: boolean) => css({
        width: variant === 'warning' ? 'var(--base-size-420)' : 'var(--base-size-320)',
        padding: 'var(--base-size-12)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        backgroundColor: variantColors[variant] ?? variantColors.info,
        borderRadius: 'var(--borderRadius-medium)',
        boxShadow: 'var(--shadow-alert)',
        pointerEvents: 'auto',
        animation: `${closing ? slideOut : slideIn} 0.3s ease forwards`,
        overflow: 'hidden',
    }),

    icon: css({
        width: 'var(--base-size-20)',
        height: 'var(--base-size-20)',
        flexShrink: 0,
        marginRight: 'var(--base-size-8)',
        transform: 'translateY(-1px)',
        display: 'flex',
        alignItems: 'center',
        '& svg': { color: 'var(--color-white)', fontSize: 'var(--base-size-20)' },
    }),

    title: css({
        fontWeight: 500,
        fontSize: 'var(--base-size-14)',
        color: 'var(--color-white)',
        flex: 1,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    }),

    closeButton: css({
        width: 'var(--base-size-20)',
        height: 'var(--base-size-20)',
        flexShrink: 0,
        marginLeft: 'auto',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        padding: 0,
        color: 'var(--color-white)',
        '& svg': { fontSize: 'var(--base-size-16)' },
    }),
};

export default styles;
