import {PropsWithChildren} from "react";
import type {ButtonProps} from "./button.component.tsx";
import Button from "./button.component.tsx";
import styles from "./button.component.style.tsx";

const PrimaryButton = ({
                    onClick,
                    path,
                    disabled,
                    customCss,
                    icon,
                    customIconCss,
                    children
                }: PropsWithChildren<ButtonProps>) => {
    return (
        <Button
            onClick={onClick}
            path={path}
            disabled={disabled}
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
