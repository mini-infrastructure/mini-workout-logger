import {PropsWithChildren} from "react";
import type {ButtonProps} from "./button.component.tsx";
import styles from "./button.component.style.tsx";
import Button from "./button.component.tsx";

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
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
                styles.buttonPrimary
            ]}
            icon={icon}
            customIconCss={customIconCss}>
            {children}
        </Button>
    );
};

export default PrimaryButton;
