import {css, Theme} from "@emotion/react";
import {darken, invert, transparentize} from "polished";

const styles = {
    badge: (theme: Theme) => css({
        fontFamily: theme.fonts.number,
        lineHeight: ' 1.25rem',
        padding: '2px .5rem',
        borderRadius: 15,
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        backgroundColor: theme.colors.container2,
        display: 'inline-flex',
        alignItems: 'center',
    }),

    icon: css({
        marginRight: '0.4rem',
        '& svg': {
            display: 'block',
        }
    }),

    grayBadge: (theme: Theme) => {
        const baseColor = theme.colors.border1;

        return css({
            backgroundColor: baseColor,
            color: theme.colors.text,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: theme.colors.border2,
                color: invert(theme.colors.text),
            },
        });
    },

    primaryBadge: (theme: Theme) => {
        const baseColor = theme.colors.primary;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: darken(0.2, baseColor),
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.35, baseColor),
                color: theme.colors.white,
            },
        });
    },

    dangerBadge: (theme: Theme) => {
        const baseColor = theme.colors.red;

        return css({
            backgroundColor: transparentize(0.8, baseColor),
            color: darken(0.2, baseColor),
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.2, baseColor),
                color: theme.colors.white,
            },
        });
    },

    warningBadge: (theme: Theme) => {
        const baseColor = theme.colors.yellow;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: darken(0.1, baseColor),
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.2, baseColor),
                color: theme.colors.white,
            },
        });
    },

    successBadge: (theme: Theme) => {
        const baseColor = theme.colors.green;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: theme.colors.green,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.35, baseColor),
                color: theme.colors.white,
            },
        });
    },

    pinkBadge: (theme: Theme) => {
        const baseColor = theme.colors.pink;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: theme.colors.pink,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: transparentize(0.3, baseColor),
                color: theme.colors.white,
            },
        });
    },

    purpleBadge: (theme: Theme) => {
        const baseColor = theme.colors.purple;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: theme.colors.purple,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: baseColor,
                color: theme.colors.white,
            },
        });
    },

    orangeBadge: (theme: Theme) => {
        const baseColor = theme.colors.orange;

        return css({
            backgroundColor: transparentize(0.9, baseColor),
            color: theme.colors.orange,
            transition: 'all 0.2s ease',

            '&:hover': {
                backgroundColor: baseColor,
                color: theme.colors.white,
            },
        });
    },

};

export default styles;