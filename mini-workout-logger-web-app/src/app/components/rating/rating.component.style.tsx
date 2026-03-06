import {css, Theme} from "@emotion/react";

const styles = {

    ratesContainer: (theme: Theme) => css({
        display: 'flex',
        gap: '0.2rem',
        alignItems: 'center',
        textTransform: 'lowercase',
        fontFamily: theme.fonts.number,

        '.selected-level-label::first-letter': {
            textTransform: 'uppercase',
            marginLeft: '0.5rem',
        }
    }),

    rate: (theme: Theme) => css({
        display: 'inline-block',
        width: '0.6rem',
        height: '0.6rem',
        backgroundColor: theme.colors.border1,
        borderRadius: '50%',
    }),

    rateFilled: (color: string) => (theme: any) => css({
        backgroundColor: theme.colors[color],
    }),

};

export default styles;
