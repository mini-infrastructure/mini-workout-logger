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
    onToggle?: (selected: boolean) => void;
    legend?: string;
    selectedLegend?: string;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
    customIconCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const OnlyIconButton = ({
    icon,
    selectedIcon,
    iconColor = '--color-blue',
    selectedIconColor = '--color-white',
    selected = false,
    selectedBg,
    onToggle,
    legend,
    selectedLegend,
    customCss,
    customIconCss,
}: OnlyIconButtonProps) => {
    const currentIcon = selected && selectedIcon ? selectedIcon : icon;
    const tooltip = selected && selectedLegend ? selectedLegend : legend;

    // When selected with no explicit selectedBg: soft transparent fill using iconColor.
    // When selectedBg is provided: use it (and use selectedIconColor for the icon).
    const buttonBg = (selected || selectedBg)
        ? `color-mix(in srgb, var(${iconColor}) 12%, transparent)`
        : 'transparent';
    const buttonColor = selected
        ? `var(${selectedIconColor})`
        : `var(${iconColor})`;

    // Hover: always a soft transparent tint; selected → slightly stronger.
    const hoverBg = selected
        ? `color-mix(in srgb, var(${iconColor}) 24%, transparent)`
        : `color-mix(in srgb, var(${iconColor}) 16%, transparent)`;

    return (
        <Button
            onClick={() => onToggle?.(!selected)}
            icon={currentIcon}
            title={tooltip}
            customIconCss={customIconCss}
            customCss={[
                css({
                    backgroundColor: buttonBg,
                    color: buttonColor,
                    border: 'none',
                    ':hover': {
                        backgroundColor: hoverBg,
                    },
                }),
                ...(customCss
                    ? Array.isArray(customCss) ? customCss : [customCss]
                    : []),
            ]}
        />
    );
};

export default OnlyIconButton;
