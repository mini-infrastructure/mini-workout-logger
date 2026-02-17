import theme from "../../themes/theme.ts";
import {css} from "@emotion/react";

const styles = {
    logoContainer: css({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        color: theme.colors.primary.black,
        fontSize: '1rem',
        justifyContent: 'space-between',
    }),

    children: css({
        flex: 1,
        marginLeft: '1rem',
    }),

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
        left: 0,
        height: "100vh",
        width: "16%",
        padding: "2rem 1rem",
        boxSizing: "border-box",
        backgroundColor: theme.colors.primary.lightGrayTransparency,
        color: theme.colors.primary.white,
    }),

    menuItem: css({
        display: "flex",
        marginBottom: "0.5rem",
        padding: "0.6rem",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: 200,
        height: 'auto',
        color: theme.colors.primary.black,

        ':hover': {
            backgroundColor: theme.colors.primary.lightGrayTransparency,
            color: theme.colors.primary.darkGray,
        },
    }),

    menuItemIcon: css({
        fontSize: "1rem",
        marginRight: "0.6rem",
    }),

    topSection: css({
    }),

    bottomSection: css({
        marginTop: "auto",
    }),

};

export default styles;
