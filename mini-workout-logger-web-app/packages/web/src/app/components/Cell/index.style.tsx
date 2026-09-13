import { css } from '@emotion/react';
import type { AccentColor } from '../../themes/tokens';

const themeColors = {
    black: '#0F1620',
    white: '#F3F4F8',
    blue: '#1E2173',
    red: '#EF4A2A',
    yellow: '#FCE63A',
    green: '#50A554',
    pink: '#F7BEE7',
};

const colorMap: Record<AccentColor, string> = {
    blue: themeColors.blue,
    red: themeColors.red,
    yellow: themeColors.yellow,
    green: themeColors.green,
    pink: themeColors.pink,
};

const styles = {
    root: css({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: themeColors.white,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-md)',
        overflow: 'hidden',
        minWidth: '18rem',
        gap: 'var(--space-md)',
    }),

    // Header row: image + title/description + favorite button
    header: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
    }),

    // Image container with colored background
    imageContainer: css({
        position: 'relative',
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        flexShrink: 0,
    }),

    // Dynamic colored background for image
    imageBackground: (color: AccentColor) => css({
        backgroundColor: colorMap[color] ?? colorMap.blue,
    }),

    image: css({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }),

    imagePlaceholder: css({
        width: '100%',
        height: '100%',
    }),

    // Title group (title + description)
    titleGroup: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xs)',
        flex: 1,
        minWidth: 0,
    }),

    title: css({
        fontSize: 'var(--font-size-md)',
        fontWeight: 'var(--font-weight-bold)',
        color: themeColors.black,
        margin: 0,
        lineHeight: 'var(--line-height-tight)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    }),

    description: css({
        fontSize: 'var(--font-size-sm)',
        color: '#6B7280',
        margin: 0,
        lineHeight: 'var(--line-height-normal)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }),

    // Favorite button styles
    favoriteButton: css({
        flexShrink: 0,
        backgroundColor: 'transparent',
        border: 'none',
        color: themeColors.black,
        borderRadius: 'var(--radius-full)',
        '&:hover:not(:disabled)': {
            backgroundColor: 'transparent',
            border: 'none',
            color: themeColors.black,
        },
    }),

    favoriteButtonActive: css({
        backgroundColor: 'transparent',
        border: 'none',
        color: themeColors.black,
        '&:hover:not(:disabled)': {
            backgroundColor: 'transparent',
            border: 'none',
            color: themeColors.black,
        },
    }),

    // Fields grid (body)
    fieldsGrid: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-sm)',

        '& > *:only-child, & > *:last-child:nth-child(odd)': {
            gridColumn: '1 / -1',
        },
    }),

    field: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xs)',
    }),

    fieldLabel: css({
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    }),

    fieldValue: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-xs)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: themeColors.black,
    }),

    fieldIcon: css({
        fontSize: 'var(--font-size-md)',
        flexShrink: 0,
    }),
};

export default styles;
