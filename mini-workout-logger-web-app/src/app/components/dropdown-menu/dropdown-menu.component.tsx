import type {ReactNode} from "react";
import {useEffect, useRef, useState} from "react";
import type {Interpolation, Theme} from "@emotion/react";
import {css} from "@emotion/react";
import Button from "../button/button.component.tsx";
import ActionSwitch from "../../input/action/action.input.component.tsx";
import styles from "./dropdown-menu.component.style.tsx";
import Divider from "../divider/divider.component.tsx";
import {IoClose} from "react-icons/io5";
import {HiCursorClick} from "react-icons/hi";

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

const getIconColor = (color: MenuItemColor = "info") => (theme: Theme) => {
    const map = {
        primary: theme.colors.primary,
        danger: theme.colors.red,
        info: theme.colors.text2,
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
};

const DropdownMenu = ({
                          items,
                          title,
                          trigger = "button",
                          customTriggerCss,
                      }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current) return;

            if (!containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                    onClick={() => setOpen((prev) => !prev)}
                    isClicked={open}
                    icon={<HiCursorClick />}
                    clickedIcon={<IoClose />}
                    customCss={customTriggerCss ? (Array.isArray(customTriggerCss) ? customTriggerCss : [customTriggerCss]) : []}
                >
                </Button>
            )}

            {open && (
                <nav css={styles.menu} >
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
                </nav>
            )}
        </div>
    );
};

export default DropdownMenu;
