import { css, keyframes } from '@emotion/react';

const slideIn = keyframes`
    from { transform: translateX(100%); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
`;

const slideOut = keyframes`
    from { transform: translateX(0);    opacity: 1; }
    to   { transform: translateX(100%); opacity: 0; }
`;

const styles = {
    overlay: css({
        position: 'fixed',
        inset: 0,
        backgroundColor: 'color-mix(in srgb, var(--color-black) 60%, transparent)',
        zIndex: 'var(--base-zIndex-overlay)' as any,
    }),

    drawer: css({
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '40vw',
        minWidth: '320px',
        backgroundColor: 'var(--color-container1)',
        boxShadow: 'var(--shadow-normal)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: 'var(--base-size-64) var(--base-size-32)',
    }),

    openEffect: css({
        animation: `${slideIn} 0.25s ease`,
    }),

    closeEffect: css({
        animation: `${slideOut} 0.25s ease`,
    }),

    headerButtons: css({
        position: 'absolute',
        top: 'var(--base-size-16)',
        right: 'var(--base-size-16)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-nano)',
    }),

    closeButton: css({
        color: 'var(--color-red)',
        // borderRadius: `0 var(--borderRadius-medium) 0 var(--borderRadius-medium)`,
        backgroundColor: 'transparent',
    }),

    closeButtonIcon: css({
        width: 'auto',
        height: 'auto',
        fontSize: 'var(--size-icon-sm)',
    }),
};

export default styles;
