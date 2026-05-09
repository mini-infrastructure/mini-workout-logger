import {css} from '@emotion/react';
import type {IconWidgetBackground} from './icon-widget.component.tsx';

const BUTTON_SIZE = 'calc(var(--size-icon-sm) + 2 * var(--base-size-12))';
const ICON_OFFSET = `calc(var(--base-size-16) + ${BUTTON_SIZE} + var(--stack-gap-condensed))`;

const backgroundStyles: Record<IconWidgetBackground, ReturnType<typeof css>> = {
    SOLID: css({
        backgroundColor: 'var(--color-container1)',
    }),
    GLASS: css({
        backgroundColor: 'color-mix(in srgb, var(--color-container1) 50%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
    }),
    BLOB_GLASS: css({
        backgroundColor: 'transparent',
    }),
};

const styles = {
    root: (color: string | undefined, background: IconWidgetBackground | undefined, hovered: boolean, clickable: boolean) => css(
        {
            position: 'relative',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            padding: 'var(--base-size-16)',
            paddingRight: ICON_OFFSET,
            borderRadius: 'var(--borderRadius-medium)',
            border: `var(--borderWidth-thin) solid ${hovered ? `var(${color ?? '--color-blue'})` : 'var(--color-border)'}`,
            overflow: 'hidden',
            isolation: 'isolate',
            transition: 'border-color 0.15s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--stack-gap-nano)',
            cursor: clickable ? 'pointer' : 'default',
        },
        backgroundStyles[background ?? 'SOLID'],
    ),

    icon: css({
        position: 'absolute',
        top: 'var(--base-size-16)',
        right: 'var(--base-size-16)',
    }),

    iconButton: (color: string | undefined, hovered: boolean) => {
        const c = color ?? '--color-blue';
        return css({
            backgroundColor: hovered
                ? `color-mix(in srgb, var(${c}) 20%, transparent)`
                : `color-mix(in srgb, var(${c}) 12%, transparent)`,
            ':hover': {
                backgroundColor: `color-mix(in srgb, var(${c}) 28%, transparent)`,
            },
        });
    },

    header: (color: string | undefined) => css({
        textTransform: 'uppercase',
        fontSize: 'var(--size-small)',
        fontFamily: 'var(--font-number)',
        color: `var(${color ?? '--color-border'})`,
        lineHeight: BUTTON_SIZE,
    }),

    highlighted: (color: string | undefined) => css({
        fontSize: 'var(--size-xxl)',
        fontFamily: 'var(--font-number)',
        fontWeight: 700,
        color: `var(${color ?? '--color-white'})`,
        lineHeight: 1.1,
    }),

    sub: (color: string | undefined) => css({
        fontSize: 'var(--size-small)',
        fontFamily: 'var(--font-number)',
        color: `var(${color ?? '--color-border'})`,
    }),
};

export default styles;
