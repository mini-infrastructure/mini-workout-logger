import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    header: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 'var(--base-size-32)',
    }),

    name: css({
        fontSize: 'var(--size-title-sm)',
        color: 'var(--color-text)',
        fontWeight: 'bold',
    }),

    editButton: css({
        backgroundColor: 'transparent',
    }),

    editBButtonIcon: css({
        width: 'auto',
        height: 'auto',
        fontSize: 'var(--size-icon-sm)',
    }),
};

export default styles;
