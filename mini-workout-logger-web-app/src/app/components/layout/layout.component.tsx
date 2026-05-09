import type {PropsWithChildren} from 'react';
import type {JSX} from '@emotion/react/jsx-runtime';
import styles from "./layout.component.style.tsx";
import Sidebar from "./sidebar.component.tsx";
import Navbar from "./navbar.component.tsx";

type LayoutProps = {
    navbarContent?: JSX.Element;
};

const Layout = ({ children, navbarContent }: PropsWithChildren<LayoutProps>) => {
    return (
        <div css={styles.wrapper}>
            <Sidebar />

            <div css={styles.contentArea}>
                <Navbar>
                    {navbarContent}
                </Navbar>

                <main css={styles.mainContent}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
