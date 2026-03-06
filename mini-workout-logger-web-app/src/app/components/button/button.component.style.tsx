import {css, Theme} from '@emotion/react';
import {transparentize} from "polished";

const styles = {

    /**
     * Default Button.
     */

    button: (theme: Theme) => css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        padding: '0.5rem 1rem',
        borderRadius: 15,
        border: 'none',
        cursor: 'pointer',
        width: 'auto',
        lineHeight: '1rem',
        fontSize: theme.fontSizes.medium,
        fontFamily: 'inherit',

        backgroundColor: theme.colors.background,
        color: theme.colors.text,

        transition: 'background-color 0.2s ease, color 0.2s ease',

        ':hover': {
            backgroundColor: theme.colors.container1,
        },

        // ':focus': {
        //     backgroundColor: theme.colors.container2,
        //     outline: 'none',
        // },

        ':disabled': {
            opacity: 0.5,
            pointerEvents: 'none',
            cursor: 'not-allowed',
        },

        '&[data-active="true"]': {
            backgroundColor: theme.colors.container1 + '80',
        },
    }),

    icon: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 0.3rem 0 0',
        width: '0.8rem',
        height: '0.8rem',
        pointerEvents: 'none',
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
        padding: '0.8rem 1.3rem',
        fontWeight: 700,
        backgroundColor: theme.colors.primary,
        border: `1px solid ${transparentize(0.7, theme.colors.primary)}`,
        color: theme.colors.white,
        backgroundImage: `linear-gradient(to top, ${transparentize(0.7, theme.colors.primary)}, transparent)`,

        ':hover': {
            opacity: 0.9,
            backgroundColor: theme.colors.primary,
            backgroundImage: `linear-gradient(to top, ${transparentize(0.9, theme.colors.secondary)}, transparent)`,
        },
    }),

    iconPrimary: (theme: Theme) => css({
        width: 'auto',
        height: 'auto',
        fontSize: theme.fontSizes.large,
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
        gap: "0.3rem",

        width: "100%",
        padding: "0.5rem",
        borderRadius: 15,
        border: "none",

        backgroundColor: "transparent",
        color: theme.colors.text3,

        fontSize: theme.fontSizes.medium,
        textAlign: "left",

        cursor: "pointer",
        outline: "none",

        transition: "background-color 0.2s ease, color 0.2s ease",

        ":active": {
            backgroundColor: theme.colors.container2,
            fontWeight: 600,
        },

        ":disabled": {
            opacity: 0.5,
            pointerEvents: "none",
            cursor: "not-allowed",
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

    seeMoreButton: (theme: Theme) => css({
        ':hover': {
            backgroundColor: transparentize(0.8, theme.colors.secondary),
        },
    }),

    verticalLine: (theme: Theme) => css({
        width: '1px',
        marginRight: '0.75rem',
        backgroundColor: transparentize(0.7, theme.colors.text2),
    }),

    collapseItem: css({
        margin: "0 0.75rem 0",
        display: "flex",
        flexDirection: 'row',
        alignItems: 'stretch',
    }),

};

export default styles;
