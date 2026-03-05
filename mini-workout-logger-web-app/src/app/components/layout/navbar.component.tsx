import styles from "./layout.component.style.tsx";
import {useLocation} from "react-router-dom";
import ToggleThemeButton from "../../input/switch/theme-switch.input.component.tsx";
import {PropsWithChildren} from "react";

const Navbar = ({ children }: PropsWithChildren) => {
    const { pathname } = useLocation();

    const getBreadcrumbParts = () => {
        const mainRoutes = ['', 'exercises', 'workouts', 'calendar', 'analysis'];
        const supportRoutes = ['settings', 'help'];

        const cleanPath = pathname.replace(/^\/+/, '');
        const segments = cleanPath ? cleanPath.split('/') : [];

        if (pathname === '/') {
            return ['Main', 'Dashboard'];
        }

        let section = '';
        if (mainRoutes.includes(segments[0])) section = 'Main';
        if (supportRoutes.includes(segments[0])) section = 'Support';

        return [section, ...segments.map(capitalize)];
    };

    const parts = getBreadcrumbParts();

    return (
        <nav css={styles.navbar}>
            <>
                <p css={styles.breadcrumb}>
                    {parts.map((part, index) => {
                        const isLast = index === parts.length - 1;

                        return (
                            <span key={index}>
                <span
                    css={[
                        styles.breadcrumbItem,
                        !isLast && styles.breadcrumbInactive
                    ]}
                >
                    {part}
                </span>

                                {!isLast && (
                                    <span css={styles.breadcrumbSeparator}>
                        /
                    </span>
                                )}
            </span>
                        );
                    })}
                </p>
            </>

            <div css={styles.navbarRight}>
                {children}
                <ToggleThemeButton />
            </div>
        </nav>
    );
};

function capitalize(value: string) {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export default Navbar;
