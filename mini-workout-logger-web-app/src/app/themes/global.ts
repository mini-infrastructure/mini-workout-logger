import {css, Theme} from '@emotion/react';

const globalStyles = (theme: {
    mode: string;
    colors: {
        white: string;
        black: string;
        background: string;
        text: string;
        container1: string;
        border1: string;
        container2: string;
        border2: string;
        text2: string;
        text3: string;
        primary: string;
        primaryHover: string;
        secondary: string;
        red: string;
        yellow: string;
        green: string;
        pink: string;
        purple: string;
        orange: string;
        pastelBlue: string;
        pastelGreen: string;
        pastelPink: string;
        pastelPurple: string;
        pastelOrange: string;
        pastelYellow: string;
        pastelRed: string;
    };
    fonts: { primary: string; secondary: string; number: string };
    fontSizes: {
        small: string;
        medium: string;
        large: string;
        larger: string;
        x_large: string;
        xx_large: string;
        xxx_large: string
    }
}) => css({
    body: {
        margin: 0,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.fonts.primary,
        fontSize: theme.fontSizes.medium,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
});

export default globalStyles;
