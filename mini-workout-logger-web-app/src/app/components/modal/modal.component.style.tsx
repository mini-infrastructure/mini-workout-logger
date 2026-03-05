import {css, Theme} from "@emotion/react";
import {transparentize} from "polished";

const styles = {
    overlayStyle: (theme: Theme) => css({
        position: 'fixed',
        inset: 0,
        backdropFilter: 'blur(0.6px)',
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
        padding: '3rem',
        width: 'fit-content',
        height: 'fit-content',
        overflowY: 'auto',
        boxShadow: theme.shadow.normal,
    }),

    closeButton: (theme: Theme) => css({
        position: 'absolute',
        top: 0,
        right: 0,
        color: theme.colors.red,
        borderRadius: '0 0.5rem 0 0.5rem',
    })
};

export default styles;
