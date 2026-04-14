import {PropsWithChildren} from "react";
import {useLocation} from "react-router-dom";
import type {ButtonProps} from "./button.component.tsx";
import Button from "./button.component.tsx";
import styles from "./button.component.style.tsx";

type SidebarButtonProps = ButtonProps & {
    exact?: boolean;
};

const SidebarButton = ({
                           onClick,
                           path,
                           disabled,
                           customCss,
                           icon,
                           clickedIcon,
                           customIconCss,
                           exact = false,
                           children
                       }: PropsWithChildren<SidebarButtonProps>) => {
    const { pathname } = useLocation();
    const isActive = path !== undefined && (
        exact || path === "/" ? pathname === path : pathname.startsWith(path)
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
