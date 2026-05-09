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

};

export default styles;
