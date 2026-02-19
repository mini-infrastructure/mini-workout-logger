import {css, Theme} from '@emotion/react';

const globalStyles = (theme: Theme) => css({
    body: {
        margin: 0,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.fonts.primary,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
});

export default globalStyles;
