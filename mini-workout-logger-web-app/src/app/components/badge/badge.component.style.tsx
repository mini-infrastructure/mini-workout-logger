import {css, SerializedStyles} from "@emotion/react";

const createColoredBadge = (
    colorVar: string,
    borderColorVar: string,
): SerializedStyles => css({
    backgroundColor: `var(${colorVar})`,
    color: `var(${borderColorVar})`,
    transition: 'none',
    '& button': {
        color: `var(${borderColorVar})`,
    },

    '&:hover, &[data-selected="true"]': {
        backgroundColor: `color-mix(in srgb, var(${colorVar}) 90%, white)`,
        color: `color-mix(in srgb, var(${borderColorVar}) 70%, black)`,
        '& button': {
            color: `color-mix(in srgb, var(${borderColorVar}) 80%, black)`,
        },
    },
});

const styles = {
    badge: css({
        fontFamily: 'var(--font-number)',
        lineHeight: 'var(--base-size-18)',
        padding: `1px var(--base-size-8)`,
        borderRadius: 'var(--borderRadius-large)',
        cursor: 'pointer',
        outline: 'none',
        border: 'none',
        backgroundColor: 'var(--color-container2)',
        display: 'inline-flex',
        alignItems: 'center',
    }),

    icon: css({
        marginRight: 'var(--stack-gap-tiny)',
        '& svg': {
            display: 'block',
        },
    }),

    removeButton: css({
        backgroundColor: 'transparent',
        padding: 'var(--stack-gap-nano)',
        ':hover': {
            backgroundColor: 'transparent',
        },
    }),

    grayBadge:   createColoredBadge('--color-container2', '--color-text'),
    primaryBadge: createColoredBadge('--color-blue',  '--color-blue-border'),
    dangerBadge:  createColoredBadge('--color-red',   '--color-red-border'),
    warningBadge: createColoredBadge('--color-yellow','--color-yellow-border'),
    successBadge: createColoredBadge('--color-green', '--color-green-border'),
    pinkBadge:    createColoredBadge('--color-pink',  '--color-pink-border'),
    purpleBadge:  createColoredBadge('--color-purple','--color-purple-border'),
    orangeBadge:  createColoredBadge('--color-orange','--color-orange-border'),
};

export default styles;
