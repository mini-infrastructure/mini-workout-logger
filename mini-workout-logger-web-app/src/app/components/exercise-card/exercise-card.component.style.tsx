import { css } from '@emotion/react';

const COVER_SIZE = 56;

const styles = {
    coverSize: COVER_SIZE,

    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-nano)',
    }),

    body: css({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 'var(--stack-gap-condensed)',
    }),

    info: css({
        flex: 1,
        minWidth: 0,
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
        // Glass background: hidden by default, fades in on hover
        '& > div': {
            opacity: 0,
            transition: 'opacity 0.25s ease',
        },
        '&:hover > div': {
            opacity: 1,
        },
        // Button solid background: visible by default, fades out on hover
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
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--stack-gap-condensed)',
    }),

    footerBadges: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-nano)',
        flex: 1,
        minWidth: 0,
    }),
};

export default styles;
