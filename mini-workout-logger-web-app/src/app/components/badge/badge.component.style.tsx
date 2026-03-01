import { css, Theme } from "@emotion/react";
import {darken, rgba, transparentize} from "polished";

const styles = {
    badge: (theme: Theme) => css({
        fontFamily: theme.fonts.number,
        lineHeight: ' 1.25rem',
        padding: '2px .5rem',
        borderRadius: '0.375rem',
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

    primaryBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.primary),
        color: darken(0.2, theme.colors.primary),
    }),

    dangerBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.red),
        color: theme.colors.red,
    }),

    warningBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.yellow),
        color: darken(0.1, theme.colors.yellow),
    }),

    successBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.green),
        color: theme.colors.green,
    }),

    pinkBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.pink),
        color: theme.colors.pink,
    }),

    purpleBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.purple),
        color: theme.colors.purple,
    }),

    orangeBadge: (theme: Theme) => css({
        backgroundColor: transparentize(0.9, theme.colors.orange),
        color: theme.colors.orange,
    }),

};

export default styles;