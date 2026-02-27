import { PropsWithChildren } from 'react';
import styles from "./layout.component.style.tsx";
import Sidebar from "./sidebar.component.tsx";
import Navbar from "./navbar.component.tsx";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div css={styles.wrapper}>
            <Sidebar />

            <div css={styles.contentArea}>
                <Navbar />

                <main css={styles.mainContent}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
