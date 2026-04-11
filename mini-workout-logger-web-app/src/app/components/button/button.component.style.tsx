import {css} from '@emotion/react';

const styles = {
    /**
     * Default Button.
     */
    button: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        padding: `var(--control-medium-paddingBlock) var(--control-medium-paddingInline)`,
        borderRadius: 'var(--borderRadius-large)',
        border: 'none',
        cursor: 'pointer',
        width: 'auto',
        lineHeight: 'var(--base-size-16)',
        fontSize: 'var(--size-medium)',
        fontFamily: 'inherit',

        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',

        transition: 'background-color 0.2s ease, color 0.2s ease',

        ':hover': {
            backgroundColor: 'var(--color-container2)',
        },

        ':disabled': {
            opacity: 0.5,
            pointerEvents: 'none',
            cursor: 'not-allowed',
        },

        '&[data-active="true"]': {
            backgroundColor: 'color-mix(in srgb, var(--color-container1) 50%, transparent)',
        },
    }),

    icon: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: `0 var(--control-small-gap) 0 0`,
        width: 'var(--control-small-iconSize)',
        height: 'var(--control-small-iconSize)',
        pointerEvents: 'none',
    }),

    onlyIconButton: css({
        padding: 'var(--control-small-size)',
        borderRadius: 'var(--borderRadius-medium)',
    }),

    onlyIcon: css({
        margin: '0',
        padding: '0',
    }),

    /**
     * Primary Button.
     */
    buttonPrimary: css({
        padding: '0.8rem 1.3rem',
        fontWeight: 700,
        backgroundColor: 'var(--color-blue)',
        border: `var(--borderWidth-thin) solid var(--color-blue-border)`,
        color: 'var(--color-white)',
        backgroundImage: 'linear-gradient(to top, color-mix(in srgb, var(--color-blue) 30%, transparent), transparent)',

        ':hover': {
            opacity: 0.9,
            backgroundColor: 'var(--color-blue)',
            backgroundImage: 'linear-gradient(to top, color-mix(in srgb, var(--color-blue-border) 10%, transparent), transparent)',
        },
    }),

    iconPrimary: css({
        width: 'auto',
        height: 'auto',
        fontSize: 'var(--size-large)',
    }),

    /**
     * Secondary Button.
     */
    buttonSecondary: css({
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: 'var(--color-container2)',
        border: `var(--borderWidth-thin) solid var(--color-border)`,
        backgroundImage: 'linear-gradient(to top, color-mix(in srgb, var(--color-container2) 50%, transparent), transparent)',

        ':hover': {
            backgroundImage: 'linear-gradient(to top, var(--color-container2), transparent)',
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
        borderRadius: 'var(--borderRadius-large)',
        border: 'none',

        backgroundColor: 'transparent',
        color: 'var(--color-text)',

        fontSize: 'var(--size-medium)',
        textAlign: 'left',

        cursor: 'pointer',
        outline: 'none',

        transition: 'background-color 0.2s ease, color 0.2s ease',

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
