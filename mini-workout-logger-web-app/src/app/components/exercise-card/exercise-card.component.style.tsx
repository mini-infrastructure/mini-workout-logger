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

    favoriteButton: css({}),

    divider: css({
        width: '100%',
    }),

    footer: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),
};

export default styles;
