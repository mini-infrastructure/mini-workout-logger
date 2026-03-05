import {darken, lighten, saturate, transparentize} from "polished";

const baseColors = {
    white: '#FFFFFF',

    gray100: '#F3F5F7',
    gray200: '#EAEAEC',
    gray300: '#8D8D8D',
    gray500: '#80786B',
    gray700: '#4B4B53',

    black700: '#0D1117',
    black500: '#151B23',
    black400: '#1A2028',
    black100: '#3D444D',

    blue500: '#3b82f6',
    blue700: '#014e8e',
    blue200: '#6495ed',
    blue100: '#A7D7FF',
};

const additionalColors = {
    yellow100: '#fdfd96',
    yellow500: '#ffff00',
    yellow700: '#eab308',
    red100: '#fb9d8e',
    red500: '#dc2828',
    green500: '#22c55e',
    green100: '#c3edc8',
    pink500: '#dd3aa1',
    purple500: '#a626a6',
    orange500: '#ff8800',
};

const fonts = {
    primary: "sans-serif",
    secondary: "\"EB Garamond\", serif",
    number: "'Sometype Mono', monospace",
};

const fontSizes = {
    small:  '0.75rem',
    medium: '0.875rem',
    large: '1.1rem',
    larger:  '1.3rem',
    x_large: '2rem',
    xx_large: '3rem',
    xxx_large: '18rem',
};

export const lightTheme = {
    mode: 'light',
    colors: {
        white: baseColors.white,
        black: baseColors.black700,
        background: baseColors.white,
        text: baseColors.black700,
        container1: baseColors.gray100,
        border1: darken(0.05, baseColors.gray100),
        container2: baseColors.gray200,
        border2: darken(0.5, baseColors.gray200),
        text2: baseColors.gray500,
        text3: baseColors.black500,
        primary: baseColors.blue500,
        primaryHover: baseColors.blue700,
        secondary: baseColors.blue200,

        red: additionalColors.red500,
        yellow: additionalColors.yellow700,
        green: darken(0.1, additionalColors.green500),
        pink: additionalColors.pink500,
        purple: additionalColors.purple500,
        orange: additionalColors.orange500,
        pastelBlue: baseColors.blue100,
        pastelGreen: additionalColors.green100,
        pastelPink: lighten(0.2, additionalColors.pink500),
        pastelPurple: lighten(0.2, additionalColors.purple500),
        pastelOrange: lighten(0.2, additionalColors.orange500),
        pastelYellow: lighten(0.2, additionalColors.yellow700),
        pastelRed: lighten(0.2, additionalColors.red500),
    },
    fonts: fonts,
    fontSizes: fontSizes,
    shadow: {
        normal: `0 4px 6px -1px ${transparentize(0.8, baseColors.black700)}`,
    }
};

export const darkTheme = {
    mode: 'dark',
    colors: {
        white: baseColors.white,
        black: baseColors.black700,
        background: baseColors.black700,
        text: baseColors.white,
        container1: baseColors.black500,
        border1: darken(0.1, baseColors.gray700),
        container2: lighten(0.05, baseColors.black400),
        border2: baseColors.gray700,
        text2: baseColors.gray300,
        text3: baseColors.gray100,
        primary: baseColors.blue500,
        primaryHover: baseColors.blue700,
        secondary: baseColors.blue200,

        red: lighten(0.2, saturate(0.4, additionalColors.red500)),
        yellow: additionalColors.yellow700,
        green: darken(0.1, additionalColors.green500),
        pink: additionalColors.pink500,
        purple: additionalColors.purple500,
        orange: additionalColors.orange500,
    },
    fonts: fonts,
    fontSizes: fontSizes,
    shadow: {
        normal: `0 4px 6px -1px ${transparentize(0.9, baseColors.gray700)}`,
    }
};

export type AppTheme = typeof lightTheme;
