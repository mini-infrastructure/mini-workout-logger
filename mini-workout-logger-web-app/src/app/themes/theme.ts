import {darken} from "polished";

const colors = {
    bg:           '#010409',
    container1:   '#0D1117',
    container2:   '#151B23',
    border:       '#3D444D',
    text:         '#FFFFFF',
    white:        '#FFFFFF',
    black:        '#010409',

    blue:         '#3291FF',
    blueBorder:   darken(0.25, '#0D5EC0'),
    red:          '#F35841',
    redBorder:    darken(0.4, '#F35841'),
    yellow:       '#FFCD50',
    yellowBorder: darken(0.4, '#FFCD50'),
    green:        '#48B86E',
    greenBorder:  darken(0.25, '#48B86E'),
    pink:         '#FEA6B4',
    pinkBorder:   darken(0.4, '#FEA6B4'),
    purple:       '#A980FF',
    purpleBorder: darken(0.3, '#A980FF'),
    orange:       '#FFA14A',
    orangeBorder: darken(0.3, '#FFA14A'),
    gray:         '#6E7681',
    grayBorder:   darken(0.4, '#6E7681'),
};

const fonts = {
    primary:   '"Mona Sans", sans-serif',
    secondary: '"Mona Sans", sans-serif',
    number:    '"Mona Sans", sans-serif',
};

const fontSizes = {
    small:      '0.75rem',
    medium:     '0.875rem',
    inputText:  '0.9rem',
    large:      '1.1rem',
    iconSm:     '1.2rem',
    larger:     '1.3rem',
    x_large:    '2rem',
    xx_large:   '3rem',
    xxx_large:  '18rem',
};

const baseSize = {
    4:  '0.25rem',
    8:  '0.5rem',
    12: '0.75rem',
    16: '1rem',
    18: '1.3rem',
    24: '1.5rem',
    32: '2rem',
    64: '4rem',
};

const borderRadius = {
    small:  '0.375rem',
    medium: '0.5rem',
    large:  '0.9375rem',
    xlarge: '1.5rem',
    full:   '999rem',
};

const borderWidth = {
    thin: '0.0625rem',
};

const zIndex = {
    1:       1,
    2:       2,
    10:      10,
    overlay: 9999,
};

const stack = {
    gap: {
        micro:     '0.1rem',
        nano:      '0.2rem',
        tiny:      '0.4rem',
        condensed: '0.5rem',
        normal:    '1rem',
        spacious:  '1.5rem',
    },
};

const overlay = {
    padding: {
        condensed: '0.75rem',
        normal:    '1rem',
    },
    borderRadius: '0.75rem',
    minWidth:     '9rem',
    maxHeight:    '200px',
};

const control = {
    small: {
        paddingBlock:  '0.25rem',
        paddingInline: '0.5rem',
        gap:           '0.3rem',
        size:          '0.6rem',
        iconSize:      '1rem',
    },
    medium: {
        paddingBlock:  '0.5rem',
        paddingInline: '1rem',
        gap:           '0.5rem',
    },
    minWidth: '10rem',
};

const layout = {
    sidebar: {
        minWidth: '16rem',
    },
};

export const theme = {
    colors,
    fonts,
    fontSizes,
    baseSize,
    borderRadius,
    borderWidth,
    zIndex,
    stack,
    overlay,
    control,
    layout,
    shadow: {
        normal: '0 4px 6px -1px rgba(1, 4, 9, 0.8)',
    },
};

export type AppTheme = typeof theme;
