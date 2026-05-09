import type { JSX } from '@emotion/react/jsx-runtime';
import type { Interpolation, Theme } from '@emotion/react';
import { css } from '@emotion/react';
import Button from './button.component.tsx';

export type OnlyIconButtonProps = {
    icon: JSX.Element;
    selectedIcon?: JSX.Element;
    iconColor?: string;
    selectedIconColor?: string;
    selected?: boolean;
    selectedBg?: string;
    size?: 'small' | 'large';
    onToggle?: (selected: boolean) => void;
    legend?: string;
    selectedLegend?: string;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    customIconCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const largeCss = css({
    padding: 'var(--base-size-12)',
    width: 'calc(var(--size-icon-sm) + 2 * var(--base-size-12))',
    height: 'calc(var(--size-icon-sm) + 2 * var(--base-size-12))',
});

const largeIconCss = css({
    width: 'var(--size-icon-sm)',
    height: 'var(--size-icon-sm)',
    fontSize: 'var(--size-icon-sm)',
});

const OnlyIconButton = ({
    icon,
    selectedIcon,
    iconColor = '--color-blue',
    selectedIconColor = '--color-white',
    selected = false,
    selectedBg,
    size = 'small',
    onToggle,
    legend,
    selectedLegend,
    customCss,
    customIconCss,
}: OnlyIconButtonProps) => {
    const currentIcon = selected && selectedIcon ? selectedIcon : icon;
    const tooltip = selected && selectedLegend ? selectedLegend : legend;

    const buttonBg = selected
        ? (selectedBg ?? `color-mix(in srgb, var(${iconColor}) 12%, transparent)`)
        : 'transparent';
    const buttonColor = selected
        ? `var(${selectedIconColor})`
        : `var(${iconColor})`;

    // Hover: always a soft transparent tint; selected → slightly stronger.
    const hoverBg = selected
        ? (selectedBg ?? `color-mix(in srgb, var(${iconColor}) 24%, transparent)`)
        : `color-mix(in srgb, var(${iconColor}) 16%, transparent)`;

    return (
        <Button
            onClick={() => onToggle?.(!selected)}
            icon={currentIcon}
            title={tooltip}
            customIconCss={[
                ...(size === 'large' ? [largeIconCss] : []),
                ...(customIconCss
                    ? Array.isArray(customIconCss) ? customIconCss : [customIconCss]
                    : []),
            ]}
            customCss={[
                css({
                    backgroundColor: buttonBg,
                    color: buttonColor,
                    border: 'none',
                    ':hover': {
                        backgroundColor: hoverBg,
                    },
                }),
                ...(size === 'large' ? [largeCss] : []),
                ...(customCss
                    ? Array.isArray(customCss) ? customCss : [customCss]
                    : []),
            ]}
        />
    );
};

export default OnlyIconButton;
