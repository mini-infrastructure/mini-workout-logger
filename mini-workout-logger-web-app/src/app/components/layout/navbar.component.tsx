import styles from "./layout.component.style.tsx";
import { useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";
import { routes } from "../../routes.tsx";

const Navbar = ({ children }: PropsWithChildren) => {
    const { pathname } = useLocation();

    const segments = pathname.split('/').filter(Boolean);

    const chain = segments.length === 0
        ? [routes.find(r => r.path === '/')]
        : segments.map((_, i) => {
              const p = '/' + segments.slice(0, i + 1).join('/');
              return routes.find(r => r.path === p);
          });

    const matched = chain.filter(Boolean) as typeof routes;

    const parts: string[] = matched.length
        ? [matched[0].section, ...matched.map(r => r.label)]
        : [];

    return (
        <nav css={styles.navbar}>
            <p css={styles.breadcrumb}>
                {parts.map((part, index) => {
                    const isLast = index === parts.length - 1;
                    return (
                        <span key={part}>
                            <span css={[styles.breadcrumbItem, !isLast && styles.breadcrumbInactive]}>
                                {part}
                            </span>
                            {!isLast && (
                                <span css={styles.breadcrumbSeparator}>/</span>
                            )}
                        </span>
                    );
                })}
            </p>

            <div css={styles.navbarRight}>
                {children}
            </div>
        </nav>
    );
};

export default Navbar;
