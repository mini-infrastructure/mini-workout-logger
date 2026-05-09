import {PropsWithChildren, useState} from "react";
import type {JSX} from "@emotion/react/jsx-runtime";
import {useLocation} from "react-router-dom";
import type {ButtonProps} from "./button.component.tsx";
import Button from "./button.component.tsx";
import styles from "./button.component.style.tsx";
import SidebarButton from "./button.sidebar.component.tsx";

type CollapseMenuItem = {
    label: string;
    path: string;
    icon?: JSX.Element;
};

type SidebarCollapseButtonProps = ButtonProps & {
    menuItems: CollapseMenuItem[];
};

const SidebarCollapseButton = ({
                                   onClick,
                                   disabled,
                                   customCss,
                                   icon,
                                   clickedIcon,
                                   customIconCss,
                                   menuItems = [],
                                   children
                       }: PropsWithChildren<SidebarCollapseButtonProps>) => {
    const { pathname } = useLocation();
    const hasActiveChild = menuItems.some(item => item.path === pathname);
    const [isOpen, setIsOpen] = useState(hasActiveChild);

    const handleClick = () => {
        if (disabled) return;
        setIsOpen(prev => !prev);
        if (onClick) onClick();
    };

    return (
        <>
            <Button
                onClick={handleClick}
                disabled={disabled}
                customCss={[
                    styles.buttonSidebar,
                    styles.buttonSidebarCollapse,
                    ...(customCss
                        ? Array.isArray(customCss)
                            ? customCss
                            : [customCss]
                        : []),
                ]}
                icon={icon}
                clickedIcon={clickedIcon}
                isClicked={isOpen}
                customIconCss={[
                    styles.iconSidebar,
                    styles.iconSidebarCollapse,
                    ...(customIconCss
                        ? Array.isArray(customCss)
                            ? customCss
                            : [customCss]
                        : []),
                ]}>
                {children}
            </Button>

            {isOpen && (
                <div css={styles.collapseContainer}>
                    {menuItems.map((item, index) => (
                        <div key={index} css={styles.collapseItem}>
                            <div css={styles.verticalLine} />
                            <SidebarButton path={item.path} exact icon={item.icon} customCss={styles.collapsableButton}>
                                {item.label}
                            </SidebarButton>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default SidebarCollapseButton;
