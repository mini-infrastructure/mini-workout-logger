import { css } from '@emotion/react';

const styles = {
    /**
     * Default Button — GitHub-inspired: solid border, medium radius, medium weight.
     */
    button: css({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--control-small-gap)',
        boxSizing: 'border-box',

        padding: `var(--control-medium-paddingBlock) var(--control-medium-paddingInline)`,
        borderRadius: 'var(--borderRadius-medium)',
        border: `var(--borderWidth-thin) solid var(--color-border)`,
        cursor: 'pointer',
        width: 'auto',
        lineHeight: 'var(--base-size-16)',
        fontSize: 'var(--size-medium)',
        fontWeight: 500,
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        minWidth: 'max-content',

        backgroundColor: 'var(--color-container2)',
        color: 'var(--color-text)',

        transition: 'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease',

        ':hover': {
            backgroundColor: 'color-mix(in srgb, var(--color-container2) 70%, var(--color-border))',
            borderColor: 'color-mix(in srgb, var(--color-border) 70%, var(--color-text))',
        },

        ':active': {
            backgroundColor: 'var(--color-container1)',
        },

        ':disabled': {
            opacity: 0.5,
            pointerEvents: 'none',
            cursor: 'not-allowed',
        },

        '&[data-active="true"]': {
            backgroundColor: 'color-mix(in srgb, var(--color-container2) 50%, transparent)',
        },
    }),

    icon: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'var(--control-small-iconSize)',
        height: 'var(--control-small-iconSize)',
        fontSize: 'var(--control-small-iconSize)',
        pointerEvents: 'none',
        flexShrink: 0,
    }),

    onlyIconButton: css({
        padding: 'var(--control-small-size)',
        borderRadius: 'var(--borderRadius-medium)',
    }),

    onlyIcon: css({
        margin: '0',
        padding: '0',
    }),

    iconEnd: css({
        order: 1,
    }),

    /**
     * Primary Button — blue filled, no border.
     */
    buttonPrimary: css({
        fontWeight: 600,
        backgroundColor: 'var(--color-blue)',
        border: `var(--borderWidth-thin) solid var(--color-blue-border)`,
        color: 'var(--color-white)',

        ':hover': {
            backgroundColor: 'color-mix(in srgb, var(--color-blue) 85%, var(--color-black))',
            borderColor: 'var(--color-blue-border)',
        },

        ':active': {
            backgroundColor: 'color-mix(in srgb, var(--color-blue) 75%, var(--color-black))',
        },
    }),

    iconPrimary: css({
        width: 'auto',
        height: 'auto',
        fontSize: 'var(--size-large)',
    }),

    /**
     * Secondary Button — neutral border style with an optional text color override.
     * Matches the Clear/Save button style in the workout view header.
     */
    buttonSecondary: css({
        fontWeight: 500,
        backgroundColor: 'var(--color-container2)',
        border: `var(--borderWidth-thin) solid var(--color-border)`,

        ':hover': {
            backgroundColor: 'color-mix(in srgb, var(--color-container2) 70%, var(--color-border))',
            borderColor: 'color-mix(in srgb, var(--color-border) 70%, var(--color-text))',
        },
    }),

    iconSecondary: css({
        width: 'auto',
        height: 'auto',
        fontSize: 'var(--size-large)',
    }),

    /**
     * Sidebar Button.
     */
    buttonSidebar: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 'var(--control-small-gap)',

        width: '100%',
        padding: 'var(--control-medium-paddingBlock)',
        margin: 'var(--stack-gap-nano) 0 0 0',
        borderRadius: 'var(--borderRadius-large)',
        border: 'none',

        backgroundColor: 'transparent',
        color: 'var(--color-text)',

        fontSize: 'var(--size-medium)',
        textAlign: 'left',
        textDecoration: 'none',

        cursor: 'pointer',
        outline: 'none',

        transition: 'background-color 0.15s ease, color 0.15s ease',

        ':hover': {
            backgroundColor: 'var(--color-container2)',
        },

        ':active': {
            backgroundColor: 'var(--color-container2)',
            fontWeight: 600,
        },

        ':disabled': {
            opacity: 0.5,
            pointerEvents: 'none',
            cursor: 'not-allowed',
        },
    }),

    buttonSidebarActive: css({
        backgroundColor: 'var(--color-container2)',
        fontWeight: 600,
    }),

    iconSidebar: css({}),

    /**
     * Sidebar Collapse Button.
     */
    buttonSidebarCollapse: css({}),

    iconSidebarCollapse: css({}),

    collapseContainer: css({
        color: 'var(--color-text)',
    }),

    collapsableButton: css({
        width: '100%',
    }),

    seeMoreButton: css({
        ':hover': {
            backgroundColor: 'color-mix(in srgb, var(--color-blue) 20%, transparent)',
        },
    }),

    verticalLine: css({
        width: 'var(--borderWidth-thin)',
        marginRight: 'var(--overlay-padding-condensed)',
        backgroundColor: 'color-mix(in srgb, var(--color-border) 30%, transparent)',
    }),

    collapseItem: css({
        margin: `0 var(--overlay-padding-condensed) 0`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
    }),
};

export default styles;
