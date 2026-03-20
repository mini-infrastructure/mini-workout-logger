import {css, Theme} from '@emotion/react';
import {darken, invert, lighten, transparentize} from "polished";

const styles = {

    actionsWrapper: (theme: Theme) => css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }),

    headerWrapper: (theme: Theme) => css({
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    }),

    header: (theme: Theme) => css({
        fontSize: theme.fontSizes.larger,
    }),

};

export default styles;
