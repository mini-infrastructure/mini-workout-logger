import {PropsWithChildren} from "react";
import styles from "./sidebar.component.style";
import {FiDatabase, FiFolder, FiSettings, FiUser} from "react-icons/fi";
import Button from "../button/button.component.tsx";
import Divider from "../divider/divider.component.tsx";

type SidebarProps = {};

const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
    return (
        <aside css={styles.wrapper}>

            <div css={styles.topSection}>
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
