import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SegmentedControl, { type SegmentedControlOption } from '../SegmentedControl';
import styles from './index.style';

type NavbarProps = {
    leftChildren?: ReactNode;
    rightChildren?: ReactNode;
};

const navOptions: SegmentedControlOption[] = [
    { value: '/exercises', label: 'Exercises' },
    { value: '/plans', label: 'Plans' },
];

const Navbar = ({ leftChildren, rightChildren }: NavbarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;
    const selected = navOptions.find(opt => currentPath.startsWith(opt.value))?.value;

    const handleSelect = (value: string) => {
        navigate(value);
    };

    return (
        <nav css={styles.container}>
            <div css={[styles.side, styles.left]}>
                {leftChildren}
            </div>

            <div css={styles.center}>
                <SegmentedControl
                    options={navOptions}
                    selected={selected}
                    onSelect={handleSelect}
                    size="lg"
                />
            </div>

            <div css={[styles.side, styles.right]}>
                {rightChildren}
            </div>
        </nav>
    );
};

export default Navbar;
