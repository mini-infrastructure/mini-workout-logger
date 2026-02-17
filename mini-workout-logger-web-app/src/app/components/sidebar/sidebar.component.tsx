import {PropsWithChildren} from "react";
import styles from "./sidebar.component.style";
import {FiDatabase, FiFolder, FiSettings, FiUser} from "react-icons/fi";
import Button from "../button/button.component.tsx";
import Divider from "../divider/divider.component.tsx";
import SidebarButton from "../button/button.sidebar.component.tsx";

type SidebarProps = {};

const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
    return (
        <aside css={styles.wrapper}>

            <div css={styles.topSection}>
                <Divider />
            </div>

            <SidebarButton
                icon={<FiFolder />}>
                Workouts
            </SidebarButton>

            <SidebarButton
                icon={<FiDatabase />}>
                Exercises
            </SidebarButton>

            <div css={styles.bottomSection}>
                <Divider />
            </div>

            {children}
        </aside>
    );
};

export default Sidebar;
