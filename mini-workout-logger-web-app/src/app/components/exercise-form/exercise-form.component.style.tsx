import {css} from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    mediaArea: css({
        position: 'relative',
        width: '100%',
        height: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--borderRadius-medium)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-container2)',
    }),

    musclesRow: css({
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--stack-gap-normal)',
        alignItems: 'flex-start',
    }),

    musclesLeft: css({
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),

    musclesHeader: css({
        fontSize: 'var(--size-medium)',
        color: 'var(--color-text)',
        fontWeight: 500,
    }),

    classificationSection: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-tiny)',
    }),

    classificationHeader: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--stack-gap-tiny)',
    }),

    classificationLabel: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-white)',
        fontWeight: 500,
    }),

    bodyMapsColumn: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
        flexShrink: 0,
        width: 220,
    }),

    bodyMaps: css({
        display: 'flex',
        flexDirection: 'row',
        gap: 'var(--stack-gap-condensed)',
        flex: 1,
    }),

    bodyMapItem: css({
        flex: 1,
        height: 200,
    }),

    legend: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-tiny)',
    }),
};

export default styles;
