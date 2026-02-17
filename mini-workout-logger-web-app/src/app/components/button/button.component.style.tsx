import {css} from '@emotion/react';
import theme from '../../themes/theme';
import {darken, transparentize} from "polished";

const styles = {
    button: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderRadius: 15,
        border: 'none',
        cursor: 'pointer',
        width: 'auto',
        color: theme.colors.primary.black,
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
    }),

    buttonPrimary: css({
        fontWeight: 700,
        backgroundColor: theme.colors.primary.darkBlue,
        border: `1px solid ${transparentize(0.7, theme.colors.primary.darkerBlue)}`,
        color: theme.colors.primary.white,
        backgroundImage: `linear-gradient(to top, ${transparentize(0.7, theme.colors.primary.darkerBlue)}, transparent)`,

        ':hover': {
            opacity: 0.9,
            backgroundImage: `linear-gradient(to top, ${transparentize(0.9, theme.colors.primary.pastelBlue)}, transparent)`,
        },
    }),

    iconPrimary: css({
        fontSize: "1.3rem",
    }),

    buttonSecondary: css({
        display: "flex",
        justifyContent: "flex-start",
        padding: '0.7rem 0.9rem',
        fontSize: '0.95rem',
        backgroundColor: theme.colors.primary.white,
        border: `1px solid ${darken(0.1, theme.colors.primary.lightGray)}`,
        backgroundImage: `linear-gradient(to top, ${transparentize(0.5, theme.colors.primary.lightGray)}, transparent)`,

        ':hover': {
            backgroundImage: `linear-gradient(to top, ${theme.colors.primary.white}, transparent)`,
        },
    }),

    iconSecondary: css({
        fontSize: "1rem",
    }),

    buttonSidebar: css({
        display: "flex",
        justifyContent: "flex-start",
        margin: "0 0.4rem 0.4rem",
        padding: "0.4rem",
        cursor: "pointer",
        fontSize: "0.9rem",
        height: 'auto',
        color: theme.colors.primary.black,
        backgroundColor: "transparent",
        borderRadius: 10,

        ':hover': {
            backgroundColor: theme.colors.primary.lightGray,
        },
    }),

    iconSidebar: css({
    }),

};

export default styles;
