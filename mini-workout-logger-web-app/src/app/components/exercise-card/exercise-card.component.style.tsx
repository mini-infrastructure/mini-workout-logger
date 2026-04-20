import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-nano)',
    }),

    name: css({
        fontSize: 'var(--size-input-text)',
        color: 'var(--color-text)',
    }),

    header: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),

    actions: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-nano)',
    }),

    favoriteIcon: css({
        color: 'var(--color-yellow)',
    }),

    favoriteButton: css({
    }),

    divider: css({
        width: '100%',
    }),

    footer: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),

    attributes: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-nano)',
    }),

    attributeRow: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-tiny)',
    }),

    attributeLabel: css({
        fontSize: 'var(--size-label)',
        color: 'var(--color-text-subtle)',
        whiteSpace: 'nowrap',
        '&::after': {
            content: '":"',
        },
    }),

    attributeBadges: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-nano)',
    }),
};

export default styles;
