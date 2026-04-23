import styles from "./layout.component.style.tsx";
import SidebarButton from "../button/button.sidebar.component.tsx";
import { FiDatabase, FiHome, FiSettings } from "react-icons/fi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiHelp } from "react-icons/gi";
import SidebarCollapseButton from "../button/button-collapse.sidebar.component.tsx";
import Divider from "../divider/divider.component.tsx";
import NavigationButtons from "../button/navigation/navigation.button.component.tsx";
import { routes, type RouteSection } from "../../routes.tsx";
import type { ReactNode } from "react";
import { PiSneakerMoveLight, PiSneakerMoveFill } from "react-icons/pi";

type RouteIconEntry = { icon: ReactNode; clickedIcon?: ReactNode };

const routeIcons: Record<string, RouteIconEntry> = {
    '/':          { icon: <FiHome /> },
    '/exercises': { icon: <PiSneakerMoveLight />, clickedIcon: <PiSneakerMoveFill /> },
    '/workouts':  { icon: <FiDatabase /> },
    '/calendar':  { icon: <FaRegCalendarAlt /> },
    '/analysis':  { icon: <IoAnalyticsSharp /> },
    '/settings':  { icon: <FiSettings /> },
    '/help':      { icon: <GiHelp /> },
};

const sections: RouteSection[] = ['Main', 'Support'];

const Sidebar = () => {
    return (
        <aside css={styles.sidebar}>
            <div css={styles.sidebarTopDivider}>
                <p>Movit</p>
                <NavigationButtons />
            </div>

            <div css={styles.sidebarContent}>
                {sections.map((section, i) => {
                    const sectionRoutes = routes.filter(r => r.section === section);
                    return (
                        <div key={section}>
                            {i > 0 && <Divider />}
                            <div css={styles.sidebarHeader}>{section}</div>
                            {sectionRoutes.map(route => {
                                const { icon, clickedIcon } = routeIcons[route.path] ?? {};
                                return route.children ? (
                                    <SidebarCollapseButton
                                        key={route.path}
                                        icon={icon}
                                        clickedIcon={clickedIcon}
                                        menuItems={route.children}
                                    >
                                        {route.label}
                                    </SidebarCollapseButton>
                                ) : (
                                    <SidebarButton
                                        key={route.path}
                                        path={route.path}
                                        icon={icon}
                                        clickedIcon={clickedIcon}
                                    >
                                        {route.label}
                                    </SidebarButton>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;
