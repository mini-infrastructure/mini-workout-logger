import type {PropsWithChildren, ReactNode} from 'react';
import styles from "./index.style.tsx";
import Sidebar from "../Sidebar/index.tsx";
import Navbar from "../Navbar/index.tsx";

type LayoutProps = {
    navbarContent?: ReactNode;
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
