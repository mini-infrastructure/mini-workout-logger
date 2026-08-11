import {PropsWithChildren} from "react";
import type {ButtonProps} from "../Button/index.tsx";
import Button from "../Button/index.tsx";
import styles from "../Button/index.style.tsx";

const PrimaryButton = ({
                           onClick,
                           path,
                           disabled,
                           customCss,
                           icon,
                           customIconCss,
                           type,
                           children
                       }: PropsWithChildren<ButtonProps>) => {
    return (
        <Button
            onClick={onClick}
            path={path}
            disabled={disabled}
            type={type}
            customCss={[
                styles.buttonPrimary,
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}
            icon={icon}
            customIconCss={[
                styles.iconPrimary,
                ...(customIconCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}>
            {children}
        </Button>
    );
};

export default PrimaryButton;
