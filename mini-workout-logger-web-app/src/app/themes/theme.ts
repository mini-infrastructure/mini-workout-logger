import {darken, lighten} from "polished";

const base = {
    white: '#FFFFFF',
    gray100: '#F3F5F7',
    gray200: '#EAEAEC',
    black: '#111111',
    gray700: '#404040',
    blue500: '#0064c7',
    blue700: '#014e8e',
    blue200: '#A7D7FF',
};

const fonts = {
    primary: "'Montserrat', sans-serif",
    secondary: "'Playfair Display', serif",
    number: "'Sometype Mono', monospace",
};

export const lightTheme = {
    mode: 'light',
    colors: {
        background: base.white,
        body: base.gray100,
        border: darken(0.01, base.gray100),
        surface: base.gray200,
        surfaceText: base.gray700,
        text: base.black,
        lightText: base.white,
        primary: base.blue500,
        primaryHover: base.blue700,
        secondary: base.blue200,
    },

    fonts: fonts,
};

export const darkTheme = {
    mode: 'dark',
    colors: {
        background: base.black,
        body: lighten(0.02, base.black),
        border: darken(0.01, base.gray100),
        surface: base.gray200,
        surfaceText: base.gray700,
        text: base.white,
        lightText: base.black,
        primary: base.blue500,
        primaryHover: base.blue700,
        secondary: base.blue200,
    },

    fonts: fonts,
};

export type AppTheme = typeof lightTheme;
