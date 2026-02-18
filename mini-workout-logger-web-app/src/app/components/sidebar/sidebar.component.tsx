import {PropsWithChildren} from "react";
import styles from "./sidebar.component.style";
import {FiDatabase, FiHome, FiSettings} from "react-icons/fi";
import {FaRegCalendarAlt, FaRegFolder, FaRegFolderOpen} from "react-icons/fa";
import {GoGraph} from "react-icons/go";
import Divider from "../divider/divider.component.tsx";
import SidebarButton from "../button/button.sidebar.component.tsx";
import SidebarCollapseButton from "../button/button-collapse.sidebar.component.tsx";
import {useWorkouts} from "../../hooks/useWorkouts.tsx";

type SidebarProps = {};

const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
    const { workouts } = useWorkouts();

    return (
        <aside css={styles.wrapper}>

            <div css={styles.topSection}>
                <Divider />
            </div>

            <SidebarButton
                path={"/"}
                icon={<FiHome />}>
                Home
            </SidebarButton>

            <SidebarButton
                path={"/settings"}
                icon={<FiSettings />}>
                Settings
            </SidebarButton>

            <Divider />

            <SidebarButton
                path={"/exercises"}
                icon={<FiDatabase />}>
                Exercises
            </SidebarButton>

            {/* Workouts */}
            <SidebarCollapseButton
                icon={<FaRegFolder />}
                clickedIcon={<FaRegFolderOpen />}
                menuItems={workouts.map((workout) => (workout.name))}
                path={"/workouts"}>
                Workouts
            </SidebarCollapseButton>

            <SidebarButton
                path={"/calendar"}
                icon={<FaRegCalendarAlt />}>
                Calendar
            </SidebarButton>

            <SidebarButton
                path={"/statistics"}
                icon={<GoGraph />}>
                Statistics
            </SidebarButton>

            <div css={styles.bottomSection}>
                <Divider />
            </div>

            {children}
        </aside>
    );
};

export default Sidebar;
