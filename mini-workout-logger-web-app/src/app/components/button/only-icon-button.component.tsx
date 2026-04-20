import type { ReactNode } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { css } from '@emotion/react';
import Button from './button.component.tsx';

export type OnlyIconButtonProps = {
    icon: ReactNode;
    selectedIcon?: ReactNode;
    iconColor?: string;
    selectedIconColor?: string;
    selected?: boolean;
    onToggle?: (selected: boolean) => void;
    legend?: string;
    selectedLegend?: string;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const OnlyIconButton = ({
    icon,
    selectedIcon,
    iconColor = '--color-blue',
    selectedIconColor = '--color-white',
    selected = false,
    onToggle,
    legend,
    selectedLegend,
    customCss,
}: OnlyIconButtonProps) => {
    const currentIcon = selected && selectedIcon ? selectedIcon : icon;
    const tooltip = selected && selectedLegend ? selectedLegend : legend;

    // Icon color is driven by the button's `color` property, which cascades
    // to react-icons SVGs via `currentColor`.
    const buttonColor = selected ? `var(${selectedIconColor})` : `var(${iconColor})`;
    const buttonBg = selected ? `var(${iconColor})` : 'transparent';

    return (
        <Button
            onClick={() => onToggle?.(!selected)}
            icon={currentIcon}
            title={tooltip}
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
