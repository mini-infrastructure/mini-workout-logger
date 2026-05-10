import {css} from '@emotion/react';

const styles = {
    pageWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        gap: 'var(--stack-gap-condensed)',
    }),

    toolbar: css({
        display: 'flex',
        alignItems: 'stretch',
        flexShrink: 0,
        gap: 'var(--stack-gap-condensed)',
    }),

    search: css({
        flex: 1,
    }),

    buttonWrapper: css({
        padding: 'var(--base-size-8)',
        display: 'flex',
        alignItems: 'stretch',
    }),

    tableWrapper: css({
        flex: 1,
        overflowY: 'auto',
    }),

    table: css({
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed' as const,
    }),

    thead: css({
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'var(--color-bg)',
    }),

    th: css({
        padding: 'var(--base-size-8) var(--base-size-12)',
        textAlign: 'left',
        fontWeight: 700,
        fontSize: 'var(--size-small)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
        color: 'var(--color-gray)',
        borderBottom: 'var(--borderWidth-thin) solid var(--color-border)',
        whiteSpace: 'nowrap' as const,
    }),

    tr: css({
        backgroundColor: 'var(--color-container1)',
        borderBottom: 'var(--borderWidth-thin) solid var(--color-border)',
        transition: 'background-color 0.15s',
        ':hover': {
            backgroundColor: 'var(--color-container2)',
        },
    }),

    trSelected: css({
        backgroundColor: 'color-mix(in srgb, var(--color-blue) 10%, transparent)',
        ':hover': {
            backgroundColor: 'color-mix(in srgb, var(--color-blue) 15%, transparent)',
        },
    }),

    td: css({
        padding: 'var(--base-size-8) var(--base-size-12)',
        fontSize: 'var(--size-medium)',
        color: 'var(--color-white)',
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }),

    tdMuted: css({
        color: 'var(--color-white)',
    }),

    thIcon: css({
        width: '40px',
        padding: 'var(--base-size-4) var(--base-size-8)',
    }),

    thDate: css({ width: '160px' }),
    thActivity: css({ width: '25%' }),
    thType: css({ width: '110px' }),
    thDuration: css({ width: '100px' }),
    thState: css({ width: '120px' }),

    tdIcon: css({
        padding: 'var(--base-size-4) var(--base-size-8)',
    }),

    pagination: css({
        paddingTop: 'var(--stack-gap-condensed)',
        flexShrink: 0,
    }),

    empty: css({
        padding: 'var(--base-size-32)',
        textAlign: 'center' as const,
        color: 'var(--color-gray)',
        fontSize: 'var(--size-medium)',
    }),
};

export default styles;
