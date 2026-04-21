import type { ReactElement } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { css } from '@emotion/react';
import Button from './button.component.tsx';

export type OnlyIconButtonProps = {
    icon: ReactElement;
    selectedIcon?: ReactElement;
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

    // Icon color is driven by the button's `color` property, which cascades
    // to react-icons SVGs via `currentColor`.
    const buttonColor = selected ? `var(${selectedIconColor})` : `var(${iconColor})`;
    const buttonBg = selected
        ? (selectedBg ?? `var(${iconColor})`)
        : 'transparent';

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
                    // On hover: fill with iconColor, icon takes container bg color
                    ':hover': {
                        backgroundColor: `var(${iconColor})`,
                        color: 'var(--color-container1)',
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
