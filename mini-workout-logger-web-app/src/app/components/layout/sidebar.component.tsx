import styles from "./layout.component.style.tsx";
import SidebarButton from "../button/button.sidebar.component.tsx";
import {FiDatabase, FiHome, FiSettings} from "react-icons/fi";
import {GoGraph} from "react-icons/go";
import {FaRegCalendarAlt, FaRegFolder, FaRegFolderOpen} from "react-icons/fa";
import SidebarCollapseButton from "../button/button-collapse.sidebar.component.tsx";
import {useWorkouts} from "../../hooks/useWorkouts.tsx";

export type SidebarProps = {};

const Sidebar = ({}: SidebarProps) => {
    const { workouts } = useWorkouts();

    return (
        <aside css={styles.sidebar}>
            <div css={styles.sidebarTopDivider} />

            <div css={styles.sidebarContent}>

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

            </div>
        </aside>
    );
};

export default Sidebar;
