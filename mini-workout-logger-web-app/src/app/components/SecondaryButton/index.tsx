import type { PropsWithChildren } from 'react';
import { css } from '@emotion/react';
import type { ButtonProps } from '../Button/index.tsx';
import Button from '../Button/index.tsx';
import styles from '../Button/index.style.tsx';

export type SecondaryButtonProps = ButtonProps & {
    /** CSS color value for the button text and icon. Defaults to var(--color-text). */
    color?: string;
};

const SecondaryButton = ({
    onClick,
    path,
    disabled,
    customCss,
    icon,
    customIconCss,
    type,
    color,
    children,
}: PropsWithChildren<SecondaryButtonProps>) => {
    return (
        <Button
            onClick={onClick}
            path={path}
            disabled={disabled}
            type={type}
            customCss={[
                styles.buttonSecondary,
                color ? css({ ':hover': { color } }) : undefined,
                ...(customCss
                    ? Array.isArray(customCss) ? customCss : [customCss]
                    : []),
            ]}
            icon={icon}
            customIconCss={[
                styles.iconSecondary,
                ...(customIconCss
                    ? Array.isArray(customIconCss) ? customIconCss : [customIconCss]
                    : []),
            ]}
        >
            {children}
        </Button>
    );
};

export default SecondaryButton;
