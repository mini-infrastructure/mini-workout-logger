import theme from "../../themes/theme.ts";
import {css} from "@emotion/react";
import {darken, transparentize} from "polished";

const styles = {

    logo: css({
        backgroundColor: theme.colors.primary.darkBlue,
        color: theme.colors.primary.white,
        borderRadius: 10,
        display: 'flex',
        fontSize: '0.5rem',
        height: '4.5vh',
        aspectRatio: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: theme.fonts.secondary,
    }),

    logoIcon: css({
        padding: '0',
        fontSize: "1.2rem",
        width: "auto",
        color: theme.colors.primary.darkGray,
        backgroundColor: "transparent",
    }),

    wrapper: css({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "16%",
        border: `1px solid ${darken(0.01, theme.colors.primary.lightGray)}`,
        padding: "2rem 0.8rem",
        boxSizing: "border-box",
        backgroundColor: transparentize(0.5, theme.colors.primary.lightGray),
        color: theme.colors.primary.white,
    }),

    topSection: css({
    }),

    bottomSection: css({
        marginTop: "auto",
    }),

};

export default styles;
