import type { ReactElement } from 'react';
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
import { PiSneakerMoveLight, PiSneakerMoveFill } from "react-icons/pi";

// Icons are cast to ReactElement to bridge the EmotionJSX.Element / React.ReactElement
// namespace gap introduced by jsxImportSource: "@emotion/react".
const r = (el: JSX.Element) => el as unknown as ReactElement;

const routeIcons: Record<string, { icon: ReactElement; clickedIcon?: ReactElement }> = {
    '/':          { icon: r(<FiHome />) },
    '/exercises': { icon: r(<PiSneakerMoveLight />), clickedIcon: r(<PiSneakerMoveFill />) },
    '/workouts':  { icon: r(<FiDatabase />) },
    '/calendar':  { icon: r(<FaRegCalendarAlt />) },
    '/analysis':  { icon: r(<IoAnalyticsSharp />) },
    '/settings':  { icon: r(<FiSettings />) },
    '/help':      { icon: r(<GiHelp />) },
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
