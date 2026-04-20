import { css, keyframes } from '@emotion/react';

const slideIn = keyframes`
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
`;

const slideOut = keyframes`
    from { transform: translateY(0);    opacity: 1; max-height: 200px; margin-bottom: var(--stack-gap-condensed); }
    to   { transform: translateY(100%); opacity: 0; max-height: 0;     margin-bottom: 0; }
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
        zIndex: 'var(--base-zIndex-overlay)' as any,
        pointerEvents: 'none',
    }),

    alert: (variant: string, closing: boolean) => css({
        width: variant === 'warning' ? '420px' : '320px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        backgroundColor: variantColors[variant] ?? variantColors.info,
        borderRadius: 'var(--borderRadius-medium)',
        boxShadow: '0px 0px 5px -3px #111',
        pointerEvents: 'auto',
        animation: `${closing ? slideOut : slideIn} 0.3s ease forwards`,
        overflow: 'hidden',
    }),

    icon: css({
        width: '20px',
        height: '20px',
        flexShrink: 0,
        marginRight: '8px',
        transform: 'translateY(-1px)',
        display: 'flex',
        alignItems: 'center',
        '& svg': { color: '#fff', fontSize: '20px' },
    }),

    title: css({
        fontWeight: 500,
        fontSize: '14px',
        color: '#fff',
        flex: 1,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
    }),

    closeButton: css({
        width: '20px',
        height: '20px',
        flexShrink: 0,
        marginLeft: 'auto',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        padding: 0,
        color: '#fff',
        '& svg': { fontSize: '16px' },
    }),
};

export default styles;
