import theme from "../../themes/theme.ts";

const styles = {
    wrapper: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "250px",
        padding: "2rem 1rem",
        boxSizing: "border-box",
        backgroundColor: theme.colors.primary.lightGrayTransparency,
        color: theme.colors.primary.white,
    },
    menuItem: {
        borderRadius: 10,
        marginBottom: "1rem",
        padding: " 1rem 0.8rem",
        cursor: "pointer",
        fontSize: "1.2rem",
        fontWeight: "bold",
        color: theme.colors.primary.black,
        "&:hover": {
            backgroundColor: theme.colors.primary.lightGray,
        },
    },
};

export default styles;
