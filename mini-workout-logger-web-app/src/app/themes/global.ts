import {css, Theme} from '@emotion/react';

const globalStyles = (theme: {
    mode: string;
    colors: {
        background: string;
        body: string;
        border: string;
        surface: string;
        surfaceText: string;
        surfaceTextLighter: string;
        text: string;
        lightText: string;
        primary: string;
        primaryHover: string;
        secondary: string
    };
    fonts: { primary: string; secondary: string; number: string }
} | {
    mode: string;
    colors: {
        background: string;
        body: string;
        border: string;
        surface: string;
        surfaceBorder: string;
        surfaceText: string;
        surfaceTextLighter: string;
        text: string;
        lightText: string;
        primary: string;
        primaryHover: string;
        secondary: string
    };
    fonts: { primary: string; secondary: string; number: string }
}) => css({
    body: {
        margin: 0,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.fonts.primary,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
});

export default globalStyles;
