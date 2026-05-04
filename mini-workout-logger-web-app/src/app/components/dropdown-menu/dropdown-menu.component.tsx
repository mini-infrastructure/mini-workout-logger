import { useRef, useState } from "react";
import type { JSX } from "@emotion/react/jsx-runtime";
import type { Interpolation, Theme } from "@emotion/react";
import OnlyIconButton from "../button/only-icon-button.component.tsx";
import Button from "../button/button.component.tsx";
import ActionSwitch from "../../components/input/action/action.input.component.tsx";
import styles from "./dropdown-menu.component.style.tsx";
import Divider from "../divider/divider.component.tsx";
import { IoClose } from "react-icons/io5";
import { useClickOut } from "../../hooks/useClickOut.tsx";
import { FiMoreHorizontal } from "react-icons/fi";
import { createPortal } from "react-dom";

export type MenuItemColor = "primary" | "danger" | "info";

export type DropdownMenuItem = {
    label: string;
    icon?: JSX.Element;
    iconColor?: MenuItemColor;
    onClick?: () => void;
    path?: string;
    disabled?: boolean;
    dividerBefore?: boolean;
};

type DropdownTrigger = "button" | "action-switch";

type DropdownProps = {
    items: DropdownMenuItem[];
    title?: string;
    trigger?: DropdownTrigger;
    customTriggerCss?: Interpolation<Theme> | Interpolation<Theme>[];
    customIconTriggerCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const DropdownMenu = ({
    items,
    title,
    trigger = "button",
    customTriggerCss,
    customIconTriggerCss,
}: DropdownProps) => {
    const [open, setOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    useClickOut(containerRef, () => setOpen(false));

    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const updatePosition = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMenuPosition({ top: rect.bottom, left: rect.right });
    };

    const handleToggle = () => {
        setOpen((prev) => {
            const next = !prev;
            if (next) updatePosition();
            return next;
        });
    };

    return (
        <div css={styles.container} ref={containerRef}>
            {trigger === "action-switch" ? (
                <ActionSwitch
                    checked={open}
                    onChange={setOpen}
                    customCss={customTriggerCss ? (Array.isArray(customTriggerCss) ? customTriggerCss : [customTriggerCss]) : []}
                />
            ) : (
                <OnlyIconButton
                    icon={<FiMoreHorizontal />}
                    selectedIcon={<IoClose />}
                    iconColor="--color-border"
                    selected={open}
                    onToggle={handleToggle}
                    customCss={[styles.triggerButton, ...(customTriggerCss ? (Array.isArray(customTriggerCss) ? customTriggerCss : [customTriggerCss]) : [])]}
                    customIconCss={customIconTriggerCss}
                />
            )}

            {open && createPortal(
                <nav css={styles.menu(menuPosition.top, menuPosition.left)}>
                    {title && <legend css={styles.legend}>{title}</legend>}

                    <ul css={styles.ul}>
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.dividerBefore && <Divider />}
                                <Button
                                    onClick={() => {
                                        item.onClick?.();
                                        setOpen(false);
                                    }}
                                    path={item.path}
                                    disabled={item.disabled}
                                    customCss={styles.menuButton}
                                    icon={item.icon}
                                    customIconCss={item.iconColor ? styles.iconColor(item.iconColor) : undefined}
                                >
                                    {item.label}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </nav>,
                document.body
            )}
        </div>
    );
};

export default DropdownMenu;
