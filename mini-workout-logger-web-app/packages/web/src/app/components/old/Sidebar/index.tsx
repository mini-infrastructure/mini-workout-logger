import type { JSX } from '@emotion/react/jsx-runtime';
import styles from "../Layout/index.style.tsx";
import SidebarButton from "../SidebarButton/index.tsx";
import { FiDatabase, FiHome, FiSettings } from "react-icons/fi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiHelp } from "react-icons/gi";
import SidebarCollapseButton from "../SidebarCollapseButton/index.tsx";
import Divider from "../Divider/index.tsx";
import NavigationButtons from "../NavigationButton/index.tsx";
import { routes, type RouteSection } from "../../routes.tsx";
import { PiSneakerMoveLight, PiSneakerMoveFill } from "react-icons/pi";

const routeIcons: Record<string, { icon: JSX.Element; clickedIcon?: JSX.Element }> = {
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
