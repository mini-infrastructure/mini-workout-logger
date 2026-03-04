import type {ReactNode} from "react";
import type {Theme} from "@emotion/react";
import {css} from "@emotion/react";
import Button from "../button/button.component.tsx";
import ActionSwitch from "../../input/action/action.input.component.tsx";
import {useState} from "react";
import styles from "./dropdown-menu.component.style.tsx";
import Divider from "../divider/divider.component.tsx";

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

export const getIconColor = (color: MenuItemColor = "info") => (theme: Theme) => {
    const map = {
        primary: theme.colors.primary,
        danger: theme.colors.red,
        info: theme.colors.text2,
    };

    return css({
        color: map[color],
    });
};

type DropdownProps = {
    items: DropdownMenuItem[];
    title?: string;
};

const DropdownMenu = ({ items, title }: DropdownProps) => {
    const [open, setOpen] = useState(true);

    return (
        <div css={styles.container}>
            <ActionSwitch
                type="filter"
                checked={open}
                onChange={setOpen}
            />

            {open && (
                <nav css={styles.menu}>
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
