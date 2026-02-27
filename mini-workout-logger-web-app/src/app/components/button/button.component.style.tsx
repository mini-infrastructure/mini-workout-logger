import {css, Theme} from '@emotion/react';
import {darken, transparentize} from "polished";

const styles = {

    /**
     * Default Button.
     */

    button: (theme: Theme) => css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        padding: '0.75rem 1.4rem',
        borderRadius: 15,
        border: 'none',
        cursor: 'pointer',
        width: 'auto',
        lineHeight: '1rem',
        fontSize: "inherit",
        fontFamily: "inherit",
        backgroundColor: theme.colors.container2,
        color: theme.colors.text,

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
        margin: '0 0.5rem 0 0',
        width: '0.8rem',
        height: '0.8rem',
    }),

    onlyIconButton: css({
        padding: '0.6rem',
        borderRadius: 8,
    }),

    onlyIcon: css({
        margin: '0',
        padding: '0',
    }),

    /**
     * Primary Button.
     */

    buttonPrimary: (theme: Theme) => css({
        fontWeight: 700,
        backgroundColor: theme.colors.primary,
        border: `1px solid ${transparentize(0.7, theme.colors.primary)}`,
        color: theme.colors.white,
        backgroundImage: `linear-gradient(to top, ${transparentize(0.7, theme.colors.primary)}, transparent)`,

        ':hover': {
            opacity: 0.9,
            backgroundImage: `linear-gradient(to top, ${transparentize(0.9, theme.colors.secondary)}, transparent)`,
        },
    }),

    iconPrimary: css({
    }),

    /**
     * Secondary Button.
     */

    buttonSecondary: (theme: Theme) => css({
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: theme.colors.container2,
        border: `1px solid ${theme.colors.border2}`,
        backgroundImage: `linear-gradient(to top, ${transparentize(0.5, theme.colors.container2)}, transparent)`,

        ':hover': {
            backgroundImage: `linear-gradient(to top, ${theme.colors.container2}, transparent)`,
        },
    }),

    iconSecondary: css({
    }),

    /**
     * Sidebar Button.
     */

    buttonSidebar: (theme: Theme) => css({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: "0",
        padding: "0.4rem",
        cursor: "pointer",
        height: 'auto',
        color: theme.colors.text3,
        backgroundColor: "transparent",
        borderRadius: 10,
        fontWeight: 350,

        border: `1px solid transparent`,

        transition: 'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',

        ':hover': {
            backgroundColor: theme.colors.container2,
            borderColor: theme.colors.container2,
            color: theme.colors.text,
            fontWeight: 500,
        },
    }),

    iconSidebar: css({
    }),

    /**
     * Sidebar Collapse Button.
     */

    buttonSidebarCollapse: css({
    }),

    iconSidebarCollapse: css({
    }),

    collapseContainer: (theme: Theme) => css({
        color: theme.colors.text2,
    }),

    collapsableButton: css({
        width: "100%",
    }),

    verticalLine: (theme: Theme) => css({
        width: '1px',
        backgroundColor: transparentize(0.7, theme.colors.text2),
    }),

    collapseItem: css({
        margin: "0 1.2rem 0",
        display: "flex",
        flexDirection: 'row',
        alignItems: 'stretch',
    }),

};

export default styles;
