import type {ReactNode} from "react";
import {useRef, useState} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import {css} from "@emotion/react";
import Button from "../button/button.component.tsx";
import ActionSwitch from "../input/action/action.input.component.tsx";
import styles from "./dropdown-menu.component.style.tsx";
import Divider from "../divider/divider.component.tsx";
import {IoClose} from "react-icons/io5";
import {useClickOut} from "../../hooks/useClickOut.tsx";
import {FiMoreHorizontal} from "react-icons/fi";
import {createPortal} from "react-dom";

export type MenuItemColor = "primary" | "danger" | "info";

export type DropdownMenuItem = {
    label: string;
    icon?: ReactNode;
    iconColor?: MenuItemColor;
    onClick?: () => void;
    path?: string;
    disabled?: boolean;
    dividerBefore?: boolean;
};

const getIconColor = (color: MenuItemColor = "info") => {
    const map: Record<MenuItemColor, string> = {
        primary: "var(--color-blue)",
        danger:  "var(--color-red)",
        info:    "var(--color-gray)",
    };

    return css({
        color: map[color],
    });
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

    // Click out effect.
    const containerRef = useRef<HTMLDivElement | null>(null);
    useClickOut(containerRef, () => setOpen(false));

    // Dropdown menu state.
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const updatePosition = () => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        setMenuPosition({
            top: rect.bottom,
            left: rect.right,
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
                <Button
                    onClick={() =>
                        setOpen((prev) => {
                            const next = !prev;
                            if (next) updatePosition();
                            return next;
                        })
                    }
                    isClicked={open}
                    icon={<FiMoreHorizontal />}
                    clickedIcon={<IoClose />}
                    customCss={customTriggerCss ? (Array.isArray(customTriggerCss) ? customTriggerCss : [customTriggerCss]) : []}
                    customIconCss={customIconTriggerCss ? (Array.isArray(customIconTriggerCss) ? customIconTriggerCss : [customIconTriggerCss]) : []}
                >
                </Button>
            )}

            {open && createPortal(
                <nav css={styles.menu(menuPosition.top, menuPosition.left)} >
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
                                    customIconCss={item.iconColor && getIconColor(item.iconColor)}
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
