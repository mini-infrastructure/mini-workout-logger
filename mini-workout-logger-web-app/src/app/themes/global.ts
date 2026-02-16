import { css } from '@emotion/react';

const globalStyles = (theme: any) => css({
    body: {
        backgroundColor: theme.colors.primary.white,
        color: theme.colors.primary.black,
        fontFamily: theme.fonts.primary,
    },
});

export default globalStyles;