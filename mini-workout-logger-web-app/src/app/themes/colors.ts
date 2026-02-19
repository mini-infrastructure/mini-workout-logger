import {darken, invert} from "polished";

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

export const lightTheme = {
    mode: 'light',
    background: base.white,
    body: base.gray100,
    border: darken(0.01, base.gray100),
    surface: base.gray200,
    text: base.black,
    surfaceText: base.gray700,
    primary: base.blue500,
    primaryHover: base.blue700,
    secondary: base.blue200,
}

export const darkTheme = {
    mode: 'dark',
    background: invert(base.white),
    body: invert(base.gray100),
    border: darken(0.01, invert(base.gray100)),
    surface: invert(base.gray200),
    text: invert(base.black),
    surfaceText: invert(base.gray700),
    primary: base.blue500,
    primaryHover: base.blue700,
    secondary: base.blue200,
}
