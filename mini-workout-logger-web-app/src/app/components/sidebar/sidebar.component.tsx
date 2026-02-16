import { PropsWithChildren, ReactNode } from "react";
import styles from "./sidebar.component.style";

type SidebarProps = {};

type MenuItemProps = {
    label: string;
    icon?: ReactNode;
}

const MenuItem = ({ label }: MenuItemProps) => {
    return (
        <div css={styles.menuItem}>
            {label}
        </div>
    );
}

const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
    return (
        <aside css={styles.wrapper}>

            <MenuItem label="Perfil"></MenuItem>

            {children}
        </aside>
    );
};

export default Sidebar;
