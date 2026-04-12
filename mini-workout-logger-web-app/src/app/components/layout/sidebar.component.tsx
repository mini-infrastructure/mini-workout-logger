import styles from "./layout.component.style.tsx";
import SidebarButton from "../button/button.sidebar.component.tsx";
import { FiDatabase, FiHome, FiSettings } from "react-icons/fi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiHelp } from "react-icons/gi";
import SidebarCollapseButton from "../button/button-collapse.sidebar.component.tsx";
import Divider from "../divider/divider.component.tsx";
import NavigationButtons from "../button/navigation/navigation.button.component.tsx";
import { routes, type RouteSection } from "../../routes.ts";
import type { ReactNode } from "react";

const routeIcons: Record<string, ReactNode> = {
    '/':          <FiHome />,
    '/exercises': <FiDatabase />,
    '/workouts':  <FiDatabase />,
    '/calendar':  <FaRegCalendarAlt />,
    '/analysis':  <IoAnalyticsSharp />,
    '/settings':  <FiSettings />,
    '/help':      <GiHelp />,
};

const sections: RouteSection[] = ['Main', 'Support'];

const Sidebar = () => {
    return (
        <aside css={styles.sidebar}>
            <div css={styles.sidebarTopDivider}>
                <p>Fitracker</p>
                <NavigationButtons />
            </div>

            <div css={styles.sidebarContent}>
                {sections.map((section, i) => {
                    const sectionRoutes = routes.filter(r => r.section === section);
                    return (
                        <div key={section}>
                            {i > 0 && <Divider />}
                            <div css={styles.sidebarHeader}>{section}</div>
                            {sectionRoutes.map(route => (
                                <SidebarButton
                                    key={route.path}
                                    path={route.path}
                                    icon={routeIcons[route.path]}
                                >
                                    {route.label}
                                </SidebarButton>
                            ))}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;
