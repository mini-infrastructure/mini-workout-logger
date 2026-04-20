import {css, keyframes} from "@emotion/react";

const styles = {
    overlayStyle: css({
        position: 'fixed',
        inset: 0,
        backgroundColor: 'color-mix(in srgb, var(--color-black) 60%, transparent)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        justifySelf: 'center',
        zIndex: 'var(--base-zIndex-overlay)' as any,
        width: '100%',
    }),

    modalStyle: css({
        position: 'relative',
        backgroundColor: 'var(--color-container1)',
        borderRadius: 'var(--overlay-borderRadius)',
        padding: 'var(--base-size-64)',
        width: 'fit-content',
        minWidth: '30vw',
        maxWidth: '35vw',
        maxHeight: '70vh',
        overflowY: 'auto',
        height: 'fit-content',
        boxShadow: 'var(--shadow-normal)',
    }),

    closeButton: css({
        position: 'absolute',
        top: 0,
        right: 0,
        color: 'var(--color-red)',
        borderRadius: `0 var(--borderRadius-medium) 0 var(--borderRadius-medium)`,
        margin: `var(--base-size-16) var(--base-size-16) 0 0`,
    }),

    closeButtonIcon: css({
        width: 'auto',
        height: 'auto',
        fontSize: 'var(--size-icon-sm)',
    }),

    modalOpenEffect: () => {
        const modalOpen = keyframes`
            from {
                opacity: 0;
                transform: scale(0.9) translateY(10px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        `;

        return css({
            animation: `${modalOpen} 0.25s ease`,
        });
    },

    modalCloseEffect: () => {
        const modalClose = keyframes`
            from {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            to {
                opacity: 0;
                transform: scale(0.9) translateY(10px);
            }
        `;

        return css({
            animation: `${modalClose} 0.25s ease`,
        });
    }
};

export default styles;
