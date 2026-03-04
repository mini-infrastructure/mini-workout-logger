import {css, Theme} from "@emotion/react";
import {darken} from "polished";

// Burger

const BURGER_LINE_WIDTH = '1.125em';
const BURGER_LINE_HEIGHT = '0.125em';
const BURGER_OFFSET = '0.625em';
const BURGER_BG = (theme: Theme) => theme.colors.border1;
const BURGER_COLOR = (theme: Theme) => theme.colors.border1;
const BURGER_LINE_BORDER_RADIUS = '0.1875em';
const BURGER_DIAMETER = '1.8rem';
const BURGER_BTN_BORDER_RADIUS = `calc(${BURGER_DIAMETER} / 2)`;
const BURGER_LINE_TRANSITION = '.3s';
const BURGER_TRANSITION = 'all .1s ease-in-out';
const BURGER_HOVER_SCALE = '1.1';
const BURGER_ACTIVE_SCALE = '.95';
const BURGER_ENABLE_OUTLINE_COLOR = BURGER_BG;
const BURGER_ENABLE_OUTLINE_WIDTH = '0.125em';
const BURGER_ENABLE_OUTLINE_OFFSET = BURGER_ENABLE_OUTLINE_WIDTH;

// Nav

const NAV_PADDING_X = '0.25em';
const NAV_PADDING_Y = '0.625em';
const NAV_BORDER_RADIUS = '0.375em';
const NAV_BORDER_COLOR = (theme: Theme) => theme.colors.container1;
const NAV_BORDER_WIDTH = '0.0625em';
const NAV_SHADOW_COLOR = 'rgba(0, 0, 0, .2)';
const NAV_SHADOW_WIDTH = '0 1px 5px';
const NAV_BG = (theme: Theme) => theme.colors.container2;
const NAV_FONT_FAMILY = 'Menlo, Roboto Mono, monospace';
const NAV_DEFAULT_SCALE = '.8';
const NAV_ACTIVE_SCALE = '1';
const NAV_POSITION_LEFT = '0';
const NAV_POSITION_RIGHT = 'unset';

// Nav Title

const NAV_TITLE_SIZE = '0.625em';
const NAV_TITLE_COLOR = (theme: Theme) => theme.colors.border1;
const NAV_TITLE_PADDING_X = '1rem';
const NAV_TITLE_PADDING_Y = '0.25em';

// Nav Button

const NAV_BUTTON_PADDING_X = '1rem';
const NAV_BUTTON_PADDING_Y = '0.375em';
const NAV_BUTTON_BORDER_RADIUS = '0.375em';
const NAV_BUTTON_FONT_SIZE = '12px';
const NAV_BUTTON_HOVER_BG = (theme: Theme) => theme.colors.primary;
const NAV_BUTTON_HOVER_TEXT_COLOR = (theme: Theme) => theme.colors.white;
const NAV_BUTTON_DISTANCE = '0.875em';

// Underline

const UNDERLINE_BORDER_WIDTH = '0.0625em';
const UNDERLINE_BORDER_COLOR = (theme: Theme) => theme.colors.container1;
const UNDERLINE_MARGIN_Y = '0.3125em';

const styles = {

    dropdownButton: css({
        padding: '0',
        margin: '0 0.5rem',
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

    burger: (theme: Theme) => css({
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BURGER_BG(theme),
        color: theme.colors.text,
        width: BURGER_DIAMETER,
        height: BURGER_DIAMETER,
        borderRadius: BURGER_BTN_BORDER_RADIUS,
        cursor: 'pointer',
        overflow: 'hidden',
        transition: BURGER_TRANSITION,
        outline: `${BURGER_ENABLE_OUTLINE_WIDTH} solid transparent`,
        outlineOffset: 0,

        '& span': {
            height: BURGER_LINE_HEIGHT,
            width: BURGER_LINE_WIDTH,
            backgroundColor: theme.colors.text2,
            borderRadius: BURGER_LINE_BORDER_RADIUS,
            position: 'absolute',
            transition: BURGER_LINE_TRANSITION,
        },

        '& span:first-of-type': {
            top: BURGER_OFFSET,
        },

        '& span:nth-of-type(2)': {
            bottom: BURGER_OFFSET,
        },

        '& span:last-of-type': {
            top: '50%',
            transform: 'translateY(-50%)',
        },
    }),

    style2: (theme: Theme) => css({
    }),

};

export default styles;
