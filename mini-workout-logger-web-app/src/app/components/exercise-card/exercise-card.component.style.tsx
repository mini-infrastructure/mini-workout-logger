import { css } from '@emotion/react';

const COVER_SIZE = 88;

const styles = {
    coverSize: COVER_SIZE,

    outer: css({
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--stack-gap-condensed)',
        alignItems: 'stretch',
        height: 100,
    }),

    coverMedia: css({
        height: '100%',
        width: 'auto',
        aspectRatio: '1 / 1',
        flexShrink: 0,
    }),

    content: css({
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-nano)',
        overflow: 'hidden',
    }),

    header: css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--stack-gap-nano)',
    }),

    name: css({
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        minWidth: 0,
    }),

    actions: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-nano)',
        flexShrink: 0,
    }),

    favoriteIcon: css({
        color: 'var(--color-yellow)',
    }),

    favoriteWrapper: css({
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--borderRadius-medium)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        isolation: 'isolate',
        // Hidden by default — visibility:hidden fully suppresses backdrop-filter rendering,
        // unlike opacity:0 which can leave a subtle compositing artifact.
        '& > div': {
            visibility: 'hidden',
            opacity: 0,
            transition: 'opacity 0.25s ease, visibility 0s linear 0.25s',
        },
        '&:hover > div': {
            visibility: 'visible',
            opacity: 1,
            transition: 'opacity 0.25s ease, visibility 0s linear 0s',
        },
        '&:hover button': {
            backgroundColor: 'transparent',
        },
    }),

    favoriteButton: css({
        backgroundColor: 'var(--color-container2)',
        position: 'relative',
    }),

    divider: css({
        width: '100%',
    }),

    footer: css({
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
        overflow: 'hidden',
    }),

    footerBadges: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        gap: 'var(--stack-gap-nano)',
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
    }),
};

export default styles;
