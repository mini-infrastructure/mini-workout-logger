import { css, keyframes } from '@emotion/react';
import type { AccentColor } from '../../themes/tokens';

// Wave animation keyframes - creates a flowing motion
const waveFlow = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const wavePulse = keyframes`
    0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 0.8;
    }
    25% {
        transform: scale(1.05) rotate(2deg);
        opacity: 0.9;
    }
    50% {
        transform: scale(1) rotate(-1deg);
        opacity: 1;
    }
    75% {
        transform: scale(1.03) rotate(1deg);
        opacity: 0.85;
    }
`;

const waveShift = keyframes`
    0%, 100% {
        transform: translateX(0) translateY(0);
    }
    33% {
        transform: translateX(10px) translateY(-5px);
    }
    66% {
        transform: translateX(-5px) translateY(5px);
    }
`;

// Theme colors from tokens.ts
const themeColors = {
    black: '#0F1620',
    white: '#F3F4F8',
    blue: '#1E2173',
    blueContrast: '#424589',
    red: '#EF4A2A',
    redContrast: '#A8371F',
    yellow: '#FCE63A',
    yellowContrast: '#B68506',
    green: '#50A554',
    greenContrast: '#6DB370',
    pink: '#F7BEE7',
    pinkContrast: '#903436',
};

// Color presets using theme colors - primary + contrast for gradients
type ColorPreset = {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    glow: string;
};

const colorPresets: Record<AccentColor, ColorPreset> = {
    blue: {
        primary: themeColors.blue,
        secondary: themeColors.blueContrast,
        tertiary: '#2A2D8A',
        accent: '#5558A8',
        glow: '#141654',
    },
    red: {
        primary: themeColors.red,
        secondary: themeColors.redContrast,
        tertiary: '#D43D1E',
        accent: '#FF6B4A',
        glow: '#8A2A15',
    },
    yellow: {
        primary: themeColors.yellow,
        secondary: themeColors.yellowContrast,
        tertiary: '#E5CF30',
        accent: '#FFF06A',
        glow: '#9A7005',
    },
    green: {
        primary: themeColors.green,
        secondary: themeColors.greenContrast,
        tertiary: '#3D8A40',
        accent: '#8ADB8E',
        glow: '#2D6B30',
    },
    pink: {
        primary: themeColors.pink,
        secondary: themeColors.pinkContrast,
        tertiary: '#E9A8D6',
        accent: '#FFCEF2',
        glow: '#7A2829',
    },
};

// Wave background styles generator with unique pattern per color
const createWaveBackground = (color: AccentColor, animate: boolean) => {
    const preset = colorPresets[color] ?? colorPresets.blue;

    const gradientPatterns: Record<AccentColor, string> = {
        blue: `
            radial-gradient(ellipse at 10% 30%, ${preset.primary} 0%, transparent 40%),
            radial-gradient(ellipse at 90% 70%, ${preset.secondary} 0%, transparent 45%),
            radial-gradient(ellipse at 45% 55%, ${preset.tertiary} 0%, transparent 50%),
            radial-gradient(ellipse at 30% 80%, ${preset.accent} 0%, transparent 35%),
            radial-gradient(ellipse at 65% 20%, ${preset.glow} 0%, transparent 40%),
            radial-gradient(circle at 20% 60%, ${preset.secondary} 0%, transparent 30%),
            radial-gradient(circle at 80% 40%, ${preset.primary} 0%, transparent 35%),
            radial-gradient(circle at 50% 90%, ${preset.tertiary} 0%, transparent 25%)
        `,
        red: `
            radial-gradient(ellipse at 15% 25%, ${preset.primary} 0%, transparent 45%),
            radial-gradient(ellipse at 85% 75%, ${preset.secondary} 0%, transparent 40%),
            radial-gradient(ellipse at 50% 50%, ${preset.tertiary} 0%, transparent 55%),
            radial-gradient(ellipse at 25% 85%, ${preset.accent} 0%, transparent 35%),
            radial-gradient(ellipse at 75% 15%, ${preset.glow} 0%, transparent 35%),
            radial-gradient(circle at 40% 70%, ${preset.primary} 0%, transparent 30%),
            radial-gradient(circle at 60% 30%, ${preset.secondary} 0%, transparent 35%),
            radial-gradient(circle at 10% 90%, ${preset.tertiary} 0%, transparent 25%)
        `,
        yellow: `
            radial-gradient(ellipse at 20% 20%, ${preset.primary} 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, ${preset.secondary} 0%, transparent 45%),
            radial-gradient(ellipse at 60% 40%, ${preset.tertiary} 0%, transparent 50%),
            radial-gradient(ellipse at 40% 70%, ${preset.accent} 0%, transparent 35%),
            radial-gradient(ellipse at 70% 30%, ${preset.glow} 0%, transparent 40%),
            radial-gradient(circle at 30% 50%, ${preset.secondary} 0%, transparent 30%),
            radial-gradient(circle at 90% 20%, ${preset.primary} 0%, transparent 35%),
            radial-gradient(circle at 50% 85%, ${preset.tertiary} 0%, transparent 25%)
        `,
        green: `
            radial-gradient(ellipse at 25% 35%, ${preset.primary} 0%, transparent 45%),
            radial-gradient(ellipse at 75% 65%, ${preset.secondary} 0%, transparent 40%),
            radial-gradient(ellipse at 55% 45%, ${preset.tertiary} 0%, transparent 45%),
            radial-gradient(ellipse at 35% 75%, ${preset.accent} 0%, transparent 35%),
            radial-gradient(ellipse at 80% 25%, ${preset.glow} 0%, transparent 35%),
            radial-gradient(circle at 15% 60%, ${preset.secondary} 0%, transparent 30%),
            radial-gradient(circle at 65% 15%, ${preset.primary} 0%, transparent 35%),
            radial-gradient(circle at 45% 95%, ${preset.tertiary} 0%, transparent 25%)
        `,
        pink: `
            radial-gradient(ellipse at 18% 28%, ${preset.primary} 0%, transparent 42%),
            radial-gradient(ellipse at 82% 72%, ${preset.secondary} 0%, transparent 38%),
            radial-gradient(ellipse at 52% 48%, ${preset.tertiary} 0%, transparent 48%),
            radial-gradient(ellipse at 28% 78%, ${preset.accent} 0%, transparent 32%),
            radial-gradient(ellipse at 72% 22%, ${preset.glow} 0%, transparent 38%),
            radial-gradient(circle at 40% 55%, ${preset.secondary} 0%, transparent 28%),
            radial-gradient(circle at 85% 45%, ${preset.primary} 0%, transparent 32%),
            radial-gradient(circle at 55% 88%, ${preset.tertiary} 0%, transparent 22%)
        `,
    };

    const overlayPatterns: Record<AccentColor, string> = {
        blue: `linear-gradient(150deg, ${preset.primary}70 0%, ${preset.secondary}85 25%, ${preset.tertiary}75 55%, ${preset.accent}80 85%, ${preset.glow}70 100%)`,
        red: `linear-gradient(135deg, ${preset.primary}70 0%, ${preset.secondary}90 30%, ${preset.tertiary}70 60%, ${preset.primary}90 100%)`,
        yellow: `linear-gradient(120deg, ${preset.primary}70 0%, ${preset.accent}80 35%, ${preset.tertiary}70 70%, ${preset.secondary}80 100%)`,
        green: `linear-gradient(140deg, ${preset.primary}75 0%, ${preset.secondary}85 30%, ${preset.tertiary}70 65%, ${preset.accent}75 100%)`,
        pink: `linear-gradient(130deg, ${preset.primary}70 0%, ${preset.secondary}80 25%, ${preset.tertiary}75 50%, ${preset.accent}85 75%, ${preset.primary}70 100%)`,
    };

    return css({
        '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-50%',
            width: '200%',
            height: '200%',
            background: gradientPatterns[color] ?? gradientPatterns.blue,
            backgroundSize: '100% 100%',
            animation: animate ? `${wavePulse} 4s ease-in-out infinite, ${waveShift} 6s ease-in-out infinite` : 'none',
            transition: 'transform 0.3s ease',
        },

        '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: overlayPatterns[color] ?? overlayPatterns.blue,
            backgroundSize: '400% 400%',
            animation: animate ? `${waveFlow} 8s ease infinite` : 'none',
            mixBlendMode: 'overlay',
        },
    });
};

const styles = {
    root: css({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: themeColors.white,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-lg) var(--space-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        minWidth: '16rem',

        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        },
    }),

    rootSelected: css({
        backgroundColor: 'transparent',
    }),

    // Colored rectangle at the top (unselected state) - remains a RECTANGLE
    coloredRectangle: css({
        position: 'relative',
        borderRadius: 'var(--radius-md)',
        width: '100%',
        minHeight: '5rem',
        marginBottom: 'var(--space-lg)',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
    }),

    // Hidden rectangle in selected state (fades out and collapses, image takes over)
    coloredRectangleHidden: css({
        opacity: 0,
        minHeight: 0,
        marginBottom: 0,
        pointerEvents: 'none',
    }),

    // Full background when selected
    fullBackground: css({
        position: 'absolute',
        inset: 0,
        borderRadius: 'var(--radius-lg)',
        zIndex: 0,
        opacity: 0,
        overflow: 'hidden',
        transition: 'opacity 0.4s ease',
    }),

    fullBackgroundVisible: css({
        opacity: 1,
    }),

    // Content wrapper
    content: css({
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        flex: 1,
    }),

    // Image container - positioned to overlap the colored rectangle (left-aligned, mostly above)
    imageContainer: css({
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '-5.5rem',
        marginBottom: 'var(--space-xs)',
        zIndex: 2,
        transition: 'all 0.4s ease',
    }),

    // Image container for selected state (full width, compensate for gap after collapsed rectangle)
    imageContainerSelected: css({
        marginTop: 'calc(-1 * var(--space-md))',
        marginBottom: 'var(--space-xs)',
    }),

    // Image - version 1 (unselected): smaller, overlapping the rectangle
    image: css({
        width: '6rem',
        height: '6rem',
        objectFit: 'cover',
        borderRadius: 'var(--radius-md)',
        backgroundColor: themeColors.white,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.4s ease',
    }),

    // Image - version 2 (selected): full width, taller than rectangle but not a perfect square
    imageSelected: css({
        width: '100%',
        height: '10rem',
        boxShadow: 'none',
    }),

    // Header row with title, description and favorite button
    header: css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 'var(--space-sm)',
    }),

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
        whiteSpace: 'nowrap',
        transition: 'color 0.4s ease',
    }),

    titleSelected: css({
        color: themeColors.white,
    }),

    description: css({
        fontSize: 'var(--font-size-sm)',
        color: '#6B7280',
        margin: 0,
        lineHeight: 'var(--line-height-normal)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        transition: 'color 0.4s ease',
    }),

    descriptionSelected: css({
        color: 'rgba(255, 255, 255, 0.8)',
    }),

    // ============================================
    // FAVORITE BUTTON STYLES (no hover effects)
    // ============================================

    // Version 1 (white card) - Unselected state
    // Transparent bg, no border, black hollow icon
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

    // Version 1 (white card) - Selected/favorited state
    // Transparent bg, no border, black FILLED icon
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

    // Version 2 (colored card) - Unselected state
    // Transparent bg, no border, white hollow icon
    favoriteButtonSelected: css({
        backgroundColor: 'transparent',
        border: 'none',
        color: themeColors.white,
        '&:hover:not(:disabled)': {
            backgroundColor: 'transparent',
            border: 'none',
            color: themeColors.white,
        },
    }),

    // Version 2 (colored card) - Selected/favorited state
    // White bg, no border, icon color uses CONTRAST color for better visibility
    // Note: icon color is set dynamically via inline style in the component
    favoriteButtonSelectedActive: css({
        backgroundColor: themeColors.white,
        border: 'none',
        '&:hover:not(:disabled)': {
            backgroundColor: themeColors.white,
            border: 'none',
        },
    }),

    // Fields grid
    fieldsGrid: css({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-sm)',

        '& > *:only-child, & > *:last-child:nth-child(odd)': {
            gridColumn: '1 / -1',
        },
    }),

    // Field item - transparent in both versions for smooth transition
    field: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xs)',
        transition: 'all 0.4s ease',
    }),

    fieldSelected: css({}),

    fieldLabel: css({
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        transition: 'color 0.4s ease',
    }),

    fieldLabelSelected: css({
        color: 'rgba(255, 255, 255, 0.7)',
    }),

    fieldValue: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-xs)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: themeColors.black,
        transition: 'color 0.4s ease',
    }),

    fieldValueSelected: css({
        color: themeColors.white,
    }),

    fieldIcon: css({
        fontSize: 'var(--font-size-md)',
        flexShrink: 0,
    }),

    // Action button container - pushed to bottom with margin-top: auto
    actionContainer: css({
        marginTop: 'auto',
        paddingTop: 'var(--space-sm)',
    }),

    // Action button - Version 1 (white card): black bg, white text
    // Hover: white bg, black text (toggle)
    actionButton: css({
        width: '100%',
        backgroundColor: themeColors.black,
        color: themeColors.white,
        borderColor: themeColors.black,

        '&:hover:not(:disabled)': {
            backgroundColor: themeColors.white,
            color: themeColors.black,
            borderColor: themeColors.black,
        },
    }),

    // Action button - Version 2 (colored card): white bg, black text
    // Hover: black bg, white text (toggle)
    actionButtonSelected: css({
        width: '100%',
        backgroundColor: themeColors.white,
        color: themeColors.black,
        borderColor: themeColors.white,

        '&:hover:not(:disabled)': {
            backgroundColor: themeColors.black,
            color: themeColors.white,
            borderColor: themeColors.black,
        },
    }),

    // ============================================
    // NO HOVER OVERRIDE FOR ICON BUTTONS
    // ============================================
    noHover: css({
        cursor: 'pointer',
        '&:hover:not(:disabled)': {
            backgroundColor: 'transparent !important',
            color: 'inherit !important',
            borderColor: 'transparent !important',
        },
    }),

    // ============================================
    // RATING COMPONENT (Version 1 only)
    // ============================================

    // Rating container (horizontal, aligned to bottom-right of colored rectangle area)
    ratingContainer: css({
        position: 'absolute',
        right: 0,
        bottom: 'var(--space-xs)',
        display: 'flex',
        flexDirection: 'row',
        gap: 0,
    }),

    // Rating button - unselected (transparent bg, hollow black icon, larger icon)
    ratingButton: css({
        backgroundColor: 'transparent',
        border: 'none',
        color: themeColors.black,
        width: 'auto',
        height: 'auto',
        padding: '0.15rem',
        fontSize: 'var(--font-size-xl)',
        '&:hover:not(:disabled)': {
            backgroundColor: 'transparent',
            border: 'none',
            color: themeColors.black,
        },
    }),

    // Rating button - selected (transparent bg, solid black icon, larger icon)
    ratingButtonActive: css({
        backgroundColor: 'transparent',
        border: 'none',
        color: themeColors.black,
        width: 'auto',
        height: 'auto',
        padding: '0.15rem',
        fontSize: 'var(--font-size-xl)',
        '&:hover:not(:disabled)': {
            backgroundColor: 'transparent',
            border: 'none',
            color: themeColors.black,
        },
    }),

    // Wave background generator function
    waveBackground: createWaveBackground,
};

export default styles;
