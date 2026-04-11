import {PropsWithChildren} from "react";
import {useLocation} from "react-router-dom";
import type {ButtonProps} from "./button.component.tsx";
import Button from "./button.component.tsx";
import styles from "./button.component.style.tsx";

const SidebarButton = ({
                           onClick,
                           path,
                           disabled,
                           customCss,
                           icon,
                           clickedIcon,
                           customIconCss,
                           children
                       }: PropsWithChildren<ButtonProps>) => {
    const { pathname } = useLocation();
    const isActive = path !== undefined && (
        path === "/" ? pathname === "/" : pathname.startsWith(path)
    );

    return (
        <Button
            onClick={onClick}
            path={path}
            disabled={disabled}
            customCss={[
                styles.buttonSidebar,
                isActive && styles.buttonSidebarActive,
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}
            icon={icon}
            clickedIcon={clickedIcon}
            customIconCss={[
                styles.iconSidebar,
                ...(customIconCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}>
            {children}
        </Button>
    );
};

export default SidebarButton;
