import type { ReactNode } from 'react';
import Navbar from '../Navbar';
import styles from './index.style';

type LayoutProps = {
    children: ReactNode;
    navbarLeftChildren?: ReactNode;
    navbarRightChildren?: ReactNode;
};

const Layout = ({ children, navbarLeftChildren, navbarRightChildren }: LayoutProps) => {
    return (
        <div css={styles.container}>
            <Navbar
                leftChildren={navbarLeftChildren}
                rightChildren={navbarRightChildren}
            />
            <main css={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
