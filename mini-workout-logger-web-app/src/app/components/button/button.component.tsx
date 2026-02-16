import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './button.component.style';

export type ButtonProps = {
    onClick?: () => void;
    path?: string;
    disabled?: boolean;
};

const Button = ({ onClick, path, disabled, children }: PropsWithChildren<ButtonProps>) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (disabled) return;
        if (onClick) onClick();
        if (path) navigate(path);
    };

    return (
        <button css={styles.button} onClick={handleClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
