import styles from "./layout.component.style.tsx";

export type NavbarProps = {};

const Navbar = ({}: NavbarProps) => {
    return (
        <nav css={styles.navbar}>
            <div css={styles.navbarActions}>
                <span>Dashboard</span>
                <span>Workouts</span>
                <span>Profile</span>
            </div>
        </nav>
    );
};

export default Navbar;
