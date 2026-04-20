import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-normal)',
    }),

    header: css({
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--stack-gap-condensed)',
    }),

    dragHandle: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        padding: 'var(--base-size-4)',
        borderRadius: 'var(--borderRadius-small)',
        color: 'var(--color-border)',
        cursor: 'grab',
        flexShrink: 0,
        alignSelf: 'flex-start',
        marginTop: 'calc(-1 * var(--base-size-4))',

        ':hover': {
            color: 'var(--color-white)',
            background: 'transparent',
        },

        ':active': {
            cursor: 'grabbing',
        },
    }),

    dragHandleIcon: css({
        width: '22px',
        height: '22px',
        fontSize: '22px',
    }),

    exerciseInfo: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
        flex: 1,
        minWidth: 0,
    }),

    exerciseName: css({
        fontWeight: 600,
        fontSize: 'var(--size-medium)',
    }),

    muscles: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-condensed)',
    }),
};

export default styles;
