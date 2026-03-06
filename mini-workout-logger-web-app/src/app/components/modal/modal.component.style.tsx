import {css, keyframes, Theme} from "@emotion/react";
import {transparentize} from "polished";

const styles = {
    overlayStyle: (theme: Theme) => css({
        position: 'fixed',
        inset: 0,
        backgroundColor: transparentize(0.4, theme.colors.black),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        justifySelf: 'center',
        zIndex: 9999,
        width: '100%',
    }),

    modalStyle: (theme: Theme) => css({
        position: 'relative',
        backgroundColor: theme.colors.background,
        borderRadius: '0.75rem',
        padding: '4rem',
        width: 'fit-content',
        minWidth: '30vw',
        maxWidth: '35vw',
        height: 'fit-content',
        boxShadow: theme.shadow.normal,
    }),

    closeButton: (theme: Theme) => css({
        position: 'absolute',
        top: 0,
        right: 0,
        color: theme.colors.red,
        borderRadius: '0 0.5rem 0 0.5rem',
        margin: '1rem 1rem 0 0',
    }),

    closeButtonIcon: css({
        width: 'auto',
        height: 'auto',
        fontSize: '1.2rem',
    }),

    modalOpenEffect: (theme: Theme) => {
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
