import {darken, lighten} from "polished";

const base = {
    white: '#FFFFFF',

    gray100: '#F3F5F7',
    gray200: '#EAEAEC',
    gray300: '#80786B',
    gray500: '#8D8D8D',
    gray700: '#4B4B53',

    black700: '#0D1117',
    black500: '#151B23',
    black400: '#1A2028',
    black100: '#3D444D',

    blue500: '#0064c7',
    blue700: '#014e8e',
    blue200: '#A7D7FF',
};

const fonts = {
    primary: "\"Noto Serif\", serif",
    secondary: "\"EB Garamond\", serif",
    number: "'Sometype Mono', monospace",
};

const fontSizes = {
    small:  '0.75em',
    medium: '0.9em',
    header: '1.1em',
    large:  '1.3em',
    extraLarge: '3em',
    mega: '18em',
};

export const lightTheme = {
    mode: 'light',
    colors: {
        white: base.white,
        black: base.black700,
        background: base.white,
        text: base.black700,
        container1: base.gray100,
        border1: darken(0.05, base.gray100),
        container2: base.gray200,
        border2: darken(0.5, base.gray200),
        text2: base.gray500,
        text3: base.black500,
        primary: base.blue500,
        primaryHover: base.blue700,
        secondary: base.blue200,
    },
    fonts: fonts,
    fontSizes: fontSizes,
};

export const darkTheme = {
    mode: 'dark',
    colors: {
        white: base.white,
        black: base.black700,
        background: base.black700,
        text: base.white,
        container1: base.black500,
        border1: base.gray700,
        container2: lighten(0.05, base.black400),
        border2: base.gray700,
        text2: base.gray200,
        text3: base.gray100,
        primary: base.blue500,
        primaryHover: base.blue700,
        secondary: base.blue200,
    },
    fonts: fonts,
    fontSizes: fontSizes,
};

export type AppTheme = typeof lightTheme;
