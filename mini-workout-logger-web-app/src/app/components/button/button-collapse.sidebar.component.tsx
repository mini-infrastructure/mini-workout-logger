import {PropsWithChildren, useState} from "react";
import type {ButtonProps} from "./button.component.tsx";
import Button from "./button.component.tsx";
import styles from "./button.component.style.tsx";
import { GoPlus } from "react-icons/go";
import SidebarButton from "./button.sidebar.component.tsx";

type SidebarCollapseButtonProps = ButtonProps & {
    menuItems: string[];
};

const SidebarCollapseButton = ({
                                   onClick,
                                   path,
                                   disabled,
                                   customCss,
                                   icon,
                                   clickedIcon,
                                   customIconCss,
                                   menuItems = [],
                                   children
                       }: PropsWithChildren<SidebarCollapseButtonProps>) => {
    const [isOpen, setIsOpen] = useState(false);

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
                    {menuItems.slice(0, 4).map((item, index) => (
                        <div
                            key={index}
                            css={styles.collapseItem}
                        >
                            <div css={styles.verticalLine} />
                            <SidebarButton customCss={styles.collapsableButton}>
                                {item}
                            </SidebarButton>
                        </div>
                    ))}
                    <>
                        <SidebarButton
                            customCss={styles.collapsableButton}
                            icon={<GoPlus />}
                            path={path}>
                            Ver mais
                        </SidebarButton>
                    </>
                </div>
            )}
        </>
    );
};

export default SidebarCollapseButton;
