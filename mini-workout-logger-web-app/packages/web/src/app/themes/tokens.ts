import { css } from '@emotion/react';

/**
 * Design tokens for the Mini Workout Logger app.
 *
 * All values use proportional units (rem, em, %) - no pixels.
 * Colors follow a primary + contrast pattern with pre-defined text colors.
 */

// =============================================================================
// COLOR SYSTEM
// =============================================================================

/**
 * Base palette - raw color values.
 * Use semantic tokens (--color-*) in components, not these directly.
 */
const palette = {
    black:  '#0F1620',
    white:  '#F3F4F8',
    gray:   '#CFCFCF',

    red:            '#EF4A2A',
    redContrast:    '#A8371F',

    yellow:         '#FCE63A',
    yellowContrast: '#B68506',

    blue:           '#1E2173',
    blueContrast:   '#424589',

    green:          '#50A554',
    greenContrast:  '#6DB370',

    pink:           '#F7BEE7',
    pinkContrast:   '#903436',
} as const;

/**
 * Text color mapping for each accent color.
 * Defines which text color (black or white) provides adequate contrast.
 */
export const colorTextMap = {
    red:            palette.black,
    redContrast:    palette.black,
    yellow:         palette.black,
    yellowContrast: palette.black,
    green:          palette.black,
    greenContrast:  palette.black,
    pink:           palette.black,
    pinkContrast:   palette.black,
    blue:           palette.white,
    blueContrast:   palette.white,
} as const;

/**
 * Helper to get the appropriate text color for a given background color.
 */
export const getTextColorFor = (colorName: keyof typeof colorTextMap): string => {
    return colorTextMap[colorName];
};


// =============================================================================
// SPACING SCALE
// =============================================================================

/**
 * Proportional spacing scale based on rem.
 * Base unit: 1rem = 16px at default browser settings.
 */
const spacing = {
    xs:   '0.25rem',   // 4px
    sm:   '0.5rem',    // 8px
    md:   '1rem',      // 16px
    lg:   '1.5rem',    // 24px
    xl:   '2rem',      // 32px
    '2xl': '3rem',     // 48px
    '3xl': '4rem',     // 64px
    '4xl': '6rem',     // 96px
} as const;


// =============================================================================
// TYPOGRAPHY
// =============================================================================

const typography = {
    fontFamily: '"Mona Sans", sans-serif',

    fontSize: {
        xs:   '0.75rem',   // 12px
        sm:   '0.875rem',  // 14px
        md:   '1rem',      // 16px
        lg:   '1.25rem',   // 20px
        xl:   '1.5rem',    // 24px
        '2xl': '2rem',     // 32px
        '3xl': '3rem',     // 48px
    },

    fontWeight: {
        regular:  400,
        medium:   500,
        semibold: 600,
        bold:     700,
    },

    lineHeight: {
        tight:  1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;


// =============================================================================
// BORDER RADIUS
// =============================================================================

const radius = {
    sm:   '0.5rem',    // 8px
    md:   '0.75rem',   // 12px
    lg:   '1rem',      // 16px
    xl:   '1.5rem',    // 24px
    full: '9999px',    // Pill shape
} as const;


// =============================================================================
// BORDER WIDTH
// =============================================================================

const borderWidth = {
    thin:   '0.0625rem',  // 1px
    medium: '0.125rem',   // 2px
    thick:  '0.1875rem',  // 3px
} as const;


// =============================================================================
// TRANSITIONS & ANIMATIONS
// =============================================================================

// const transition = {
//     fast:   '150ms ease',
//     normal: '250ms ease',
//     slow:   '400ms ease',
// } as const;

// const animation = {
//     // Add animation keyframes and durations as needed
// } as const;


// =============================================================================
// SHADOWS
// =============================================================================

// const shadow = {
//     sm: '0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)',
//     md: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)',
//     lg: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
// } as const;


// =============================================================================
// Z-INDEX SCALE
// =============================================================================

// const zIndex = {
//     base:    0,
//     dropdown: 100,
//     sticky:  200,
//     modal:   300,
//     tooltip: 400,
// } as const;


// =============================================================================
// GLOBAL STYLES
// =============================================================================

export const globalStyles = css({
    ':root': {
        // Colors - Base
        '--color-black': palette.black,
        '--color-white': palette.white,
        '--color-gray':  palette.gray,

        // Colors - Accent (primary)
        '--color-red':    palette.red,
        '--color-yellow': palette.yellow,
        '--color-blue':   palette.blue,
        '--color-green':  palette.green,
        '--color-pink':   palette.pink,

        // Colors - Accent (contrast)
        '--color-red-contrast':    palette.redContrast,
        '--color-yellow-contrast': palette.yellowContrast,
        '--color-blue-contrast':   palette.blueContrast,
        '--color-green-contrast':  palette.greenContrast,
        '--color-pink-contrast':   palette.pinkContrast,

        // Spacing
        '--space-xs':  spacing.xs,
        '--space-sm':  spacing.sm,
        '--space-md':  spacing.md,
        '--space-lg':  spacing.lg,
        '--space-xl':  spacing.xl,
        '--space-2xl': spacing['2xl'],
        '--space-3xl': spacing['3xl'],
        '--space-4xl': spacing['4xl'],

        // Typography
        '--font-family': typography.fontFamily,

        '--font-size-xs':  typography.fontSize.xs,
        '--font-size-sm':  typography.fontSize.sm,
        '--font-size-md':  typography.fontSize.md,
        '--font-size-lg':  typography.fontSize.lg,
        '--font-size-xl':  typography.fontSize.xl,
        '--font-size-2xl': typography.fontSize['2xl'],
        '--font-size-3xl': typography.fontSize['3xl'],

        '--font-weight-regular':  typography.fontWeight.regular,
        '--font-weight-medium':   typography.fontWeight.medium,
        '--font-weight-semibold': typography.fontWeight.semibold,
        '--font-weight-bold':     typography.fontWeight.bold,

        '--line-height-tight':   typography.lineHeight.tight,
        '--line-height-normal':  typography.lineHeight.normal,
        '--line-height-relaxed': typography.lineHeight.relaxed,

        // Border radius
        '--radius-sm':   radius.sm,
        '--radius-md':   radius.md,
        '--radius-lg':   radius.lg,
        '--radius-xl':   radius.xl,
        '--radius-full': radius.full,

        // Border width
        '--border-thin':   borderWidth.thin,
        '--border-medium': borderWidth.medium,
        '--border-thick':  borderWidth.thick,

        // Transitions (uncomment when needed)
        // '--transition-fast':   transition.fast,
        // '--transition-normal': transition.normal,
        // '--transition-slow':   transition.slow,

        // Shadows (uncomment when needed)
        // '--shadow-sm': shadow.sm,
        // '--shadow-md': shadow.md,
        // '--shadow-lg': shadow.lg,

        // Z-index (uncomment when needed)
        // '--z-base':     zIndex.base,
        // '--z-dropdown': zIndex.dropdown,
        // '--z-sticky':   zIndex.sticky,
        // '--z-modal':    zIndex.modal,
        // '--z-tooltip':  zIndex.tooltip,
    },

    '*, *::before, *::after': {
        boxSizing: 'border-box',
    },

    body: {
        margin: 0,
        padding: 0,
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-white)',
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--font-size-md)',
        lineHeight: 'var(--line-height-normal)',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    },
});


// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type AccentColor = 'red' | 'yellow' | 'blue' | 'green' | 'pink';
export type SpacingKey = keyof typeof spacing;
export type FontSizeKey = keyof typeof typography.fontSize;
export type RadiusKey = keyof typeof radius;
