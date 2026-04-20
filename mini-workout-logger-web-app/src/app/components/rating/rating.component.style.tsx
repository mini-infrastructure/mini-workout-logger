import {css} from "@emotion/react";

const styles = {
    ratesContainer: (color: string) => css({
        display: 'flex',
        gap: 'var(--stack-gap-nano)',
        alignItems: 'center',
        textTransform: 'lowercase',
        fontFamily: 'var(--font-number)',
        color: `var(--color-${color})`,

        '.selected-level-label::first-letter': {
            textTransform: 'uppercase',
            marginLeft: 'var(--base-size-8)',
        }
    }),

    rate: css({
        display: 'inline-block',
        width: 'var(--control-small-size)',
        height: 'var(--control-small-size)',
        backgroundColor: 'var(--color-border)',
        borderRadius: '50%',
    }),

    rateFilled: (color: string) => css({
        backgroundColor: `var(--color-${color})`,
        color: `var(--color-${color})`,
    }),
};

export default styles;
