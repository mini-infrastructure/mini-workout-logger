import styles from "./layout.component.style.tsx";
import SidebarButton from "../button/button.sidebar.component.tsx";
import {FiDatabase, FiHome, FiSettings} from "react-icons/fi";
import { IoAnalyticsSharp } from "react-icons/io5";
import {FaRegCalendarAlt, FaRegFolder, FaRegFolderOpen} from "react-icons/fa";
import { GiHelp } from "react-icons/gi";
import SidebarCollapseButton from "../button/button-collapse.sidebar.component.tsx";
import {useWorkouts} from "../../hooks/useWorkouts.tsx";
import Divider from "../divider/divider.component.tsx";

export type SidebarProps = {};

const Sidebar = ({}: SidebarProps) => {
    const { workouts } = useWorkouts();

    return (
        <aside css={styles.sidebar}>
            <div css={styles.sidebarTopDivider} />

            <div css={styles.sidebarContent}>

                <p css={styles.sidebarHeader}>Main</p>

                <SidebarButton
                    path={"/"}
                    icon={<FiHome />}>
                    Dashboard
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
                    path={"/analysis"}
                    icon={<IoAnalyticsSharp />}>
                    Analysis
                </SidebarButton>

                <Divider />

                <p css={styles.sidebarHeader}>Support</p>

                <SidebarButton
                    path={"/settings"}
                    icon={<FiSettings />}>
                    Settings
                </SidebarButton>

                <SidebarButton
                    path={"/help"}
                    icon={<GiHelp />}>
                    Help
                </SidebarButton>

            </div>
        </aside>
    );
};

export default Sidebar;
