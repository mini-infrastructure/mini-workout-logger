import {PropsWithChildren} from "react";
import styles from "./sidebar.component.style";
import {FiDatabase, FiFolder, FiSettings, FiUser} from "react-icons/fi";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import Button from "../button/button.component.tsx";
import Divider from "../divider/divider.component.tsx";

type SidebarProps = {};

export const Logo = ({ children }: PropsWithChildren) => {
    return (
        <div css={styles.logoContainer}>
            <div css={styles.logo}>
                <h1>W</h1>
            </div>

            <div css={styles.children}>
                {children}
            </div>

            <Button
                customCss={styles.logoIcon}
                icon={<TbLayoutSidebarLeftCollapseFilled />}
            />
        </div>
    );
};

const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
    return (
        <aside css={styles.wrapper}>

            <div css={styles.topSection}>
                <Logo>Workout Logger</Logo>
                <Divider />
            </div>

            <Button
                customCss={styles.menuItem}
                customIconCss={styles.menuItemIcon}
                icon={<FiUser />}>
                Profile
            </Button>

            <Button
                customCss={styles.menuItem}
                customIconCss={styles.menuItemIcon}
                icon={<FiSettings />}>
                Settings
            </Button>

            <Button
                customCss={styles.menuItem}
                customIconCss={styles.menuItemIcon}
                icon={<FiFolder />}>
                Workouts
            </Button>

            <Button
                customCss={styles.menuItem}
                customIconCss={styles.menuItemIcon}
                icon={<FiDatabase />}>
                Exercises
            </Button>

            <div css={styles.bottomSection}>
                <Divider />
                <Button
                    customCss={styles.menuItem}
                    customIconCss={styles.menuItemIcon}
                    icon={<FiDatabase />}>
                    Exercises
                </Button>
            </div>

            {children}
        </aside>
    );
};

export default Sidebar;
