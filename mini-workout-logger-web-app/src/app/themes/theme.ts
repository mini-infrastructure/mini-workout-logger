import {darken, lighten} from "polished";

const base = {
    white: '#FFFFFF',
    black: '#1A1824',
    gray100: '#F3F5F7',
    gray200: '#EAEAEC',
    gray500: '#8D8D8D',
    gray700: '#4B4B53',
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
    small:  'clamp(0.65rem, 0.6vw, 0.78rem)',
    medium: 'clamp(0.6rem, 0.8vw, 0.85rem)',
    header: 'clamp(0.7rem, 1vw, 0.95rem)',
    large:  'clamp(0.8rem, 1.2vw, 1.1rem)',
};

export const lightTheme = {
    mode: 'light',
    colors: {
        white: base.white,
        text: base.black,
        container1: base.gray100,
        border1: darken(0.05, base.gray100),
        container2: base.gray200,
        border2: darken(0.5, base.gray200),
        text2: base.gray500,
        text3: base.gray700,
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
        text: base.black,
        container1: base.gray100,
        border1: darken(0.05, base.gray100),
        container2: base.gray200,
        text2: base.gray700,
        primary: base.blue500,
        primaryHover: base.blue700,
        secondary: base.blue200,
    },
    fonts: fonts,
    fontSizes: fontSizes,
};

export type AppTheme = typeof lightTheme;
