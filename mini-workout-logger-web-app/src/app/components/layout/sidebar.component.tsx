import type {JSX} from '@emotion/react/jsx-runtime';
import styles from "./layout.component.style.tsx";
import SidebarButton from "../button/button.sidebar.component.tsx";
import SidebarCollapseButton from "../button/button-collapse.sidebar.component.tsx";
import Divider from "../divider/divider.component.tsx";
import NavigationButtons from "../button/navigation/navigation.button.component.tsx";
import {routes, type RouteSection} from "../../routes.tsx";
import {
    FcAcceptDatabase,
    FcAreaChart,
    FcEngineering,
    FcFolder,
    FcHome,
    FcOpenedFolder,
    FcPlanner,
    FcSupport
} from "react-icons/fc";

const routeIcons: Record<string, { icon: JSX.Element; clickedIcon?: JSX.Element }> = {
    '/':          { icon: <FcHome /> },
    '/exercises': { icon: <FcFolder />, clickedIcon: <FcOpenedFolder /> },
    '/workouts':  { icon: <FcPlanner /> },
    '/log':       { icon: <FcAcceptDatabase /> },
    '/analysis':  { icon: <FcAreaChart /> },
    '/settings':  { icon: <FcEngineering /> },
    '/help':      { icon: <FcSupport /> },
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
