import {css, Theme} from '@emotion/react';

const globalStyles = (theme: {
    mode: string;
    colors: {
        white: string,
        text: string,
        container1: string,
        border1: string,
        container2: string,
        border2: string,
        text2: string,
        text3: string,
        primary: string,
        primaryHover: string,
        secondary: string
    };
    fonts: { primary: string; secondary: string; number: string },
    fontSizes: {
        small: string;
        medium: string;
        header: string;
        large: string;
        extraLarge: string;
    },
}) => css({
    body: {
        margin: 0,
        backgroundColor: theme.colors.white,
        color: theme.colors.text,
        fontFamily: theme.fonts.primary,
        fontSize: theme.fontSizes.medium,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
});

export default globalStyles;
