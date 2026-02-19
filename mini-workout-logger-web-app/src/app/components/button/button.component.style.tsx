import {css, Theme} from '@emotion/react';
import {darken, transparentize} from "polished";

const styles = {
    button: (theme: Theme) => css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderRadius: 15,
        border: 'none',
        cursor: 'pointer',
        width: 'auto',
        color: theme.colors.text,
        margin: '0.5rem',
        fontSize: '1rem',

        transition: 'all 0.2s ease',
        ':hover': {
            transform: 'translateY(-0.1rem)',
        },
        ':active': {
            transform: 'translateY(0)',
        },
        ':disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    }),

    icon: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: "0 0.5rem 0 0",
        width: '0.9vw'
    }),

    buttonPrimary: (theme: Theme) => css({
        fontWeight: 700,
        backgroundColor: theme.colors.primary,
        border: `1px solid ${transparentize(0.7, theme.colors.primary)}`,
        color: theme.colors.lightText,
        backgroundImage: `linear-gradient(to top, ${transparentize(0.7, theme.colors.primary)}, transparent)`,

        ':hover': {
            opacity: 0.9,
            backgroundImage: `linear-gradient(to top, ${transparentize(0.9, theme.colors.secondary)}, transparent)`,
        },
    }),

    iconPrimary: css({
        fontSize: "1.3rem",
    }),

    buttonSecondary: (theme: Theme) => css({
        display: "flex",
        justifyContent: "flex-start",
        padding: '0.7rem 0.9rem',
        fontSize: '0.95rem',
        backgroundColor: theme.colors.surface,
        color: theme.colors.surfaceText,
        border: `1px solid ${darken(0.1, theme.colors.surface)}`,
        backgroundImage: `linear-gradient(to top, ${transparentize(0.5, theme.colors.surface)}, transparent)`,

        ':hover': {
            backgroundImage: `linear-gradient(to top, ${theme.colors.surface}, transparent)`,
        },
    }),

    iconSecondary: css({
        fontSize: "1rem",
    }),

    buttonSidebar: (theme: Theme) => css({
        display: "flex",
        justifyContent: "flex-start",
        margin: "0 0.4rem 0.4rem",
        padding: "0.4rem",
        cursor: "pointer",
        fontSize: "0.9rem",
        height: 'auto',
        color: darken(0.8, theme.colors.surface),
        backgroundColor: "transparent",
        borderRadius: 10,

        ':hover': {
            backgroundColor: theme.colors.surface,
        },
    }),

    iconSidebar: css({
    }),

    buttonSidebarCollapse: css({
    }),

    iconSidebarCollapse: css({
    }),

    collapseContainer: (theme: Theme) => css({
        color: theme.colors.surfaceText,
    }),

    collapsableButton: css({
        fontSize: "0.85rem",
        width: "100%",
    }),

    verticalLine: (theme: Theme) => css({
        width: '1px',
        backgroundColor: transparentize(0.7, theme.colors.surfaceText),
    }),

    collapseItem: css({
        margin: "0 1.2rem 0",
        display: "flex",
        flexDirection: 'row',
        alignItems: 'stretch',
    }),

};

export default styles;
