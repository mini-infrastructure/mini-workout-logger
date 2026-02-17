import {PropsWithChildren} from "react";
import styles from "./sidebar.component.style";
import {FiDatabase, FiFolder, FiSettings, FiUser} from "react-icons/fi";
import Button from "../button/button.component.tsx";

type SidebarProps = {};

const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
    return (
        <aside css={styles.wrapper}>

            <Button customCss={styles.menuItem} icon={<FiUser />}>Profile</Button>
            <Button customCss={styles.menuItem} icon={<FiSettings />}>Settings</Button>
            <Button customCss={styles.menuItem} icon={<FiFolder />}>Workouts</Button>
            <Button customCss={styles.menuItem} icon={<FiDatabase />}>Exercises</Button>

            {children}
        </aside>
    );
};

export default Sidebar;
