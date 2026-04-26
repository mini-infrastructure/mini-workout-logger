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

    legendItem: (active: boolean) => css({
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        cursor: 'pointer',
        opacity: active ? 1 : 0.5,
        transition: 'opacity 0.15s ease',
        '&:hover': { opacity: 1 },
    }),

    legendDot: css({
        width: 8,
        height: 8,
        borderRadius: '50%',
        flexShrink: 0,
    }),

    legendLabel: css({
        fontSize: 'var(--size-small)',
        color: 'var(--color-gray)',
        whiteSpace: 'nowrap',
    }),

    mediaArea: css({
        position: 'relative',
        width: '100%',
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--borderRadius-medium)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-container2)',
    }),

    carousel: css({
        width: '100%',
        height: '100%',
    }),

    mediaSlide: css({
        position: 'relative',
        width: '100%',
        height: 300,
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

    mediaRemoveBtn: css({
        position: 'absolute',
        top: 8,
        right: 8,
        background: 'color-mix(in srgb, var(--color-bg) 80%, transparent)',
        border: 'none',
        borderRadius: '50%',
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-red)',
        padding: 0,
    }),

    mediaAddBtn: css({
        position: 'absolute',
        bottom: 8,
        right: 8,
        background: 'color-mix(in srgb, var(--color-bg) 80%, transparent)',
        border: '1px solid var(--color-border)',
        borderRadius: '50%',
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-text)',
        padding: 0,
        '&:hover': {
            borderColor: 'var(--color-blue)',
            color: 'var(--color-blue)',
        },
        '&:disabled': {
            opacity: 0.5,
            cursor: 'default',
        },
    }),
};

export default styles;
