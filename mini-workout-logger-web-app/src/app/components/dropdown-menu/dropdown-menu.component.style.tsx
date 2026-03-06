import {css} from "@emotion/react";

const styles = {
    container: css({
        position: 'relative',
        display: 'inline-block',
    }),

    menu: (theme: any) => css({
        position: 'absolute',
        top: '100%',
        right: 0,
        zIndex: 9999,
        background: theme.colors.background,
        borderRadius: '0.375em',
        boxShadow: theme.shadow.normal,
        padding: '0.75rem',
        width: 'max-content',
        minWidth: '9rem',
    }),

    legend: (theme: any) =>  css({
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.small,
        fontFamily: theme.fonts.number,
        padding: '0 0 0.5rem 0',
    }),

    ul: css({
        listStyle: 'none',
        margin: 0,
        padding: 0,
    }),

    menuButton: (theme: any) =>  css({
        width: '100%',
        height: '1.5rem',
        justifyContent: 'flex-start',
        fontFamily: theme.fonts.number,
        borderRadius: 8,
        padding: '0 0.5rem',

        ':hover': {
            backgroundColor: theme.colors.secondary,
            color: theme.colors.white,
            '& svg': {
                color: theme.colors.white,
            },
        },
    }),
};

export default styles;
