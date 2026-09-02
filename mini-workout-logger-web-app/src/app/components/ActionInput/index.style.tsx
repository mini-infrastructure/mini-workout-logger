import {css} from "@emotion/react";

const BUTTON_BG = 'var(--color-border)';
const BUTTON_DIAMETER = '1.8rem';
const BUTTON_HOVER_SCALE = '1.15';

// Burger theme

const BURGER_LINE_WIDTH = '1.125em';
const BURGER_LINE_HEIGHT = '0.125em';
const BURGER_OFFSET = '0.625em';
const BURGER_COLOR = 'var(--color-gray)';
const BURGER_LINE_BORDER_RADIUS = '0.1875em';
const BURGER_BTN_BORDER_RADIUS = `calc(${BUTTON_DIAMETER} / 2)`;
const BURGER_LINE_TRANSITION = '.3s';
const BURGER_TRANSITION = 'all .1s ease-in-out';
const BURGER_ACTIVE_SCALE = '.95';
const BURGER_ENABLE_OUTLINE_COLOR = BUTTON_BG;
const BURGER_ENABLE_OUTLINE_WIDTH = '0.125em';
const BURGER_ENABLE_OUTLINE_OFFSET = BURGER_ENABLE_OUTLINE_WIDTH;

const styles = {

    dropdownButton: css({
        padding: '0',
        margin: `0 var(--base-size-8)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '.dropdown-btn-label': {
            display: 'inline-block',
            textRendering: 'optimizeLegibility',
            position: 'relative',
        },

        'input[type="checkbox"]': {
            display: 'none',
        }
    }),

    switchButton: css({
        position: 'relative',
        width: BUTTON_DIAMETER,
        height: BUTTON_DIAMETER,
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: BURGER_BTN_BORDER_RADIUS,
        transition: BURGER_TRANSITION,
        outline: `${BURGER_ENABLE_OUTLINE_WIDTH} solid transparent`,
        outlineOffset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '.button-bg': {
            position: 'absolute',
            inset: 0,
            backgroundColor: BUTTON_BG,
            borderRadius: BURGER_BTN_BORDER_RADIUS,
            transition: 'transform .1s ease-in-out',
        },

        '&:hover': {
            transform: `scale(${BUTTON_HOVER_SCALE})`,
        },

        '&:active': {
            transform: `scale(${BURGER_ACTIVE_SCALE})`,
        },

        '&:focus:not(:hover)': {
            outlineColor: BURGER_ENABLE_OUTLINE_COLOR,
            outlineOffset: BURGER_ENABLE_OUTLINE_OFFSET,
        },
    }),

    hamburger_x_theme: css({
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        'span': {
            position: 'absolute',
            height: BURGER_LINE_HEIGHT,
            width: BURGER_LINE_WIDTH,
            backgroundColor: BURGER_COLOR,
            borderRadius: BURGER_LINE_BORDER_RADIUS,
            transition: BURGER_LINE_TRANSITION,
        },

        // Default state: Hamburger
        'span:nth-of-type(1)': {
            top: BURGER_OFFSET,
        },

        'span:nth-of-type(2)': {
            bottom: BURGER_OFFSET,
        },

        'span:nth-of-type(3)': {
            top: '50%',
            transform: 'translateY(-50%)',
        },

        // Checked state: X
        'input:checked + div & span:nth-of-type(1)': {
            top: '50%',
            transform: 'translateY(-50%) rotate(45deg)',
        },

        'input:checked + div & span:nth-of-type(2)': {
            bottom: '50%',
            transform: 'translateY(50%) rotate(-45deg)',
        },

        'input:checked + div & span:nth-of-type(3)': {
            transform: `translateX(calc(${BUTTON_DIAMETER} * -1 - ${BURGER_LINE_WIDTH}))`,
        },
    }),

    filter_x_theme: css({
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        'span': {
            position: 'absolute',
            height: BURGER_LINE_HEIGHT,
            backgroundColor: BURGER_COLOR,
            borderRadius: BURGER_LINE_BORDER_RADIUS,
            transition: BURGER_LINE_TRANSITION,
            left: '50%',
            transform: 'translateX(-50%)',
        },

        // Default state: Filter
        'span:nth-of-type(1)': {
            width: BURGER_LINE_WIDTH,
            top: BURGER_OFFSET,
        },
        'span:nth-of-type(2)': {
            width: `calc(${BURGER_LINE_WIDTH} * 0.75)`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
        'span:nth-of-type(3)': {
            width: `calc(${BURGER_LINE_WIDTH} * 0.5)`,
            bottom: BURGER_OFFSET,
        },

        // Checked state: X
        'input:checked + div & span:nth-of-type(1)': {
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            width: BURGER_LINE_WIDTH,
        },

        'input:checked + div & span:nth-of-type(2)': {
            transform: `translateX(calc(${BUTTON_DIAMETER} * -1 - ${BURGER_LINE_WIDTH}))`,
        },

        'input:checked + div & span:nth-of-type(3)': {
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            width: BURGER_LINE_WIDTH,
        },
    }),

    plus_x_theme: css({
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        'span': {
            position: 'absolute',
            height: BURGER_LINE_HEIGHT,
            width: BURGER_LINE_WIDTH,
            backgroundColor: BURGER_COLOR,
            borderRadius: BURGER_LINE_BORDER_RADIUS,
            transition: BURGER_LINE_TRANSITION,
        },

        // Default state: Plus
        'span:nth-of-type(2)': {
            transform: 'rotate(90deg)',
        },

        'span:nth-of-type(3)': {
            opacity: 0,
        },

        // Checked state: X
        'input:checked + div & span:nth-of-type(1)': {
            top: '50%',
            transform: 'translateY(-50%) rotate(45deg)',
        },

        'input:checked + div & span:nth-of-type(2)': {
            bottom: '50%',
            transform: 'translateY(50%) rotate(-45deg)',
        },

        'input:checked + div & span:nth-of-type(3)': {
            opacity: 0,
        },

    }),

    dropdownMenu: css({

    }),

};

export default styles;
