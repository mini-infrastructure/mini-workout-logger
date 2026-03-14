import {css, Theme} from '@emotion/react';
import {darken, invert, lighten, transparentize} from "polished";

const styles = {

    actionsWrapper: (theme: Theme) => css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }),

    headerWrapper: (theme: Theme) => css({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    }),

    header: (theme: Theme) => css({
        fontSize: theme.fontSizes.larger,
    }),

    // Search.

    searchAndFilterBtnWrapper: (theme: Theme) => css({
        display: 'flex',
        margin: '1rem 0 1rem 0',
        gap: '1rem',
    }),

    searchBar: (theme: Theme) => css({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${theme.colors.border1}`,
        borderRadius: 15,

        '&:focus-within': {
            border: `1px solid ${lighten(0.2, theme.colors.secondary)}`,
        },

        '& input': {
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            padding: '0.8rem 0.8rem 0.8rem 0',
            outline: 'none',
        },

        '& svg': {
            color: theme.colors.text2,
            margin: '0 1rem',
        }
    }),

    filterButton: (open: boolean) => (theme: Theme) => css({
        width: '10%',
        backgroundColor: open ? theme.colors.primary : theme.colors.background,
        border: `1px solid ${theme.colors.border1}`,
        color: open ? theme.colors.white : theme.colors.text,

        ':hover': {
            backgroundColor: open ? lighten(0.1, theme.colors.primary) : theme.colors.container2,
        }
    }),

    filterButtonIcon: (theme: Theme) => css({
        width: 'auto',
        height: 'auto',
        fontSize: theme.fontSizes.large,
    }),

    // Muscle badges

    rootMuscleBadgesWrapper: css({
        display: 'flex',
        gap: '0.5rem',
        margin: '0 0 1rem 0',
    }),

    rootMuscleBadges: (theme: Theme) => css({
        display: 'flex',
        justifyContent: 'center',
        padding: '0.5rem',
        minWidth: '4rem',
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border1}`,
        '&:hover': {
            backgroundColor: transparentize(0.8, theme.colors.secondary),
            color: theme.colors.primary,
            border: `1px solid ${transparentize(0.4, theme.colors.primary)}`,
        },
    }),

    // Body.

    cardsWrapper: css({
        flex: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1rem',
        width: '100%',
    }),

    col: (theme: Theme) => css({
        backgroundColor: theme.colors.container1,
        border: `1px solid ${theme.colors.border1}`,
        borderRadius: 15,
        padding: '1rem',
        boxSizing: 'border-box',
    }),

    filtersWrapper: (open: boolean) => (theme: Theme) => css({
        height: open ? 'auto' : 0,
        transition: 'all 0.25s ease',
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        backgroundColor: theme.colors.container1,
        border: open ? `1px solid ${theme.colors.border1}` : 'none',
        borderRadius: 10,
        padding: open ? '1rem' : 0,
        marginBottom: open ? '1rem' : 0,
    }),

};

export default styles;
