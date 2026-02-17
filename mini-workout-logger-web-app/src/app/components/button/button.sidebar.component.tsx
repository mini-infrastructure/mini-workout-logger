import {PropsWithChildren} from "react";
import type {ButtonProps} from "./button.component.tsx";
import Button from "./button.component.tsx";
import styles from "./button.component.style.tsx";

const SidebarButton = ({
                           onClick,
                           path,
                           disabled,
                           customCss,
                           icon,
                           customIconCss,
                           children
                       }: PropsWithChildren<ButtonProps>) => {
    return (
        <Button
            onClick={onClick}
            path={path}
            disabled={disabled}
            customCss={[
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
                styles.buttonSidebar
            ]}
            icon={icon}
            customIconCss={[
                ...(customIconCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
                styles.iconSidebar
            ]}>
            {children}
        </Button>
    );
};

export default SidebarButton;
