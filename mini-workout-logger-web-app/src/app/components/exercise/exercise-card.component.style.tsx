import {css, Theme} from '@emotion/react';
import {transparentize} from "polished";

const styles = {

    cardActive: css({
        zIndex: 1000,
    }),

    exerciseCard: (theme: Theme) => css({
        // position: 'relative',
        borderRadius: '0 0 0.75rem 0.75rem',
        strokeLinejoin: 'round',
        padding: '1.5rem 1rem 1rem 1rem',
        boxShadow: `0 4px 6px ${transparentize(0.95, theme.colors.black)}`,
        overflow: 'visible',
        minHeight: '8.5rem',
    }),

    dropdownWrapper: css({
        width: '100%',
        height: '1.2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }),

    dropdownButton: (theme: Theme) => css({
        backgroundColor: 'transparent',
        color: theme.colors.text2,
        border: 'none',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: transparentize(0.9, theme.colors.secondary),
            filter: `drop-shadow(0 0 2px ${transparentize(0.5, theme.colors.white)})`,
        },
        ':focus': {
            backgroundColor: transparentize(0.9, theme.colors.secondary),
        },
    }),

    dropdownIconButton: (theme: Theme) => css({
        width: 'auto',
        height: 'auto',
        fontSize: theme.fontSizes.large,
    }),

    /**
     * Header.
     */

    header: css({
        fontWeight: 700,
    }),

    /**
     * Card body.
     */

    session: css({
        margin: '0.75rem 0',
    }),

    sessionHeader: css({
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: '0.5rem',
            minWidth: '2rem',
        }
    }),

    badgesWrapper: css({
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }),

    divider: css({
        width: '100%',
    }),

};

export default styles;
