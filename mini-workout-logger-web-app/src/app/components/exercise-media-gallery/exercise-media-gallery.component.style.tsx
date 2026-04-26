import { css } from '@emotion/react';

const styles = {
    container: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stack-gap-condensed)',
    }),
    sectionTitle: css({
        fontSize: 'var(--font-size-small)',
        color: 'var(--color-gray)',
        fontWeight: 500,
    }),
    gallery: css({
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--stack-gap-condensed)',
    }),
    mediaItem: css({
        position: 'relative',
        width: 80,
        height: 80,
        borderRadius: 'var(--border-radius)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        flexShrink: 0,
        '&:hover .remove-btn': {
            opacity: 1,
        },
    }),
    mediaImg: css({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }),
    removeBtn: css({
        position: 'absolute',
        top: 2,
        right: 2,
        opacity: 0,
        transition: 'opacity 0.15s',
        background: 'color-mix(in srgb, var(--color-bg) 80%, transparent)',
        border: 'none',
        borderRadius: '50%',
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-red)',
        padding: 0,
    }),
    uploadArea: css({
        width: 80,
        height: 80,
        border: '1px dashed var(--color-border)',
        borderRadius: 'var(--border-radius)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'var(--color-gray)',
        fontSize: 'var(--font-size-small)',
        gap: 4,
        flexShrink: 0,
        transition: 'border-color 0.15s, color 0.15s',
        '&:hover': {
            borderColor: 'var(--color-blue)',
            color: 'var(--color-blue)',
        },
    }),
    uploadIcon: css({
        fontSize: 20,
    }),
};

export default styles;
