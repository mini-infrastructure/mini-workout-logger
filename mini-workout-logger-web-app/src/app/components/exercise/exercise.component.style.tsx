import {css, Theme} from '@emotion/react';
import {darken, rgba, transparentize} from "polished";

const styles = {

    cardWrapper: css({
        padding: '0.6rem',
    }),

    /**
     * Header.
     */
    headerWrapper: (theme: Theme) => css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),

    nameIconWrapper: css({
        display: 'flex',
        alignItems: 'center',
    }),

    iconWrapper: (theme: Theme) => css({
        width: '2rem',
        height: '2rem',
        marginRight: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.container2,
        '& svg': {
            filter: `drop-shadow(0 0 4px ${rgba(theme.colors.secondary, 0.5)})`,
        },
    }),

    buttonsWrapper: (theme: Theme) => css({
        display: 'flex',
        gap: '0.3rem',
    }),

    headerButton: (theme: Theme) => css({
        backgroundColor: 'transparent',
        ':hover': {
            backgroundColor: theme.colors.container2,
        },
    }),

    editButton: (theme: Theme) => css({
        '&:hover svg': {
            filter: `drop-shadow(0 0 4px ${rgba(theme.colors.white, 0.9)})`,
        },
    }),

    trashButton: (theme: Theme) => css({
        color: theme.colors.red,
        '&:hover svg': {
            filter: `drop-shadow(0 0 4px ${rgba(theme.colors.red, 0.9)})`,
        },
    }),

    /**
     * Muscles badges.
     */

    badgesWrapper: css({
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }),

};

export default styles;
