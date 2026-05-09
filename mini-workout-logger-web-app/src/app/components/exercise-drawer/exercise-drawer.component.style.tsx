import {css} from '@emotion/react';

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
        gap: 'var(--stack-gap-tiny)',
    }),

    fieldLabel: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
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

    mediaImg: css({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    }),

    mediaPlaceholder: css({
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        color: 'var(--color-border)',
    }),

};

export default styles;
