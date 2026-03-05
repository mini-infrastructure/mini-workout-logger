import {CSSProperties, ReactNode} from "react";
import styles from "./switch.input.component.style.tsx";
import type {Interpolation, Theme} from "@emotion/react";

// Todo: sm, lg sizes
export type ToggleSize = "sm" | "md" | "lg";

export type SwitchInputProps = {
    onIcon: ReactNode;
    offIcon: ReactNode;
    onClick: () => void;
    isOn: boolean;
    size?: ToggleSize;
    onSliderCustomCss?: Interpolation<Theme>;
    offSliderCustomCss?: Interpolation<Theme>;
    onIconCustomCss?: Interpolation<Theme>;
    offIconCustomCss?: Interpolation<Theme>;
};

const sizeMap: Record<ToggleSize,
    {
        width: string;
        height: string;
        button: string;
        buttonOffset: string;
        iconOffset: string;
        iconSize: string;
    }
> = {
    sm: {
        width: "2.8rem",
        height: "1.4rem",
        button: "1rem",
        buttonOffset: "0.15rem",
        iconOffset: "0.4rem",
        iconSize: "0.7rem",
    },
    md: {
        width: "3.5rem",
        height: "1.8rem",
        button: "1.4rem",
        buttonOffset: "0.2rem",
        iconOffset: "0.5rem",
        iconSize: "0.9rem",
    },
    lg: {
        width: "4.03rem",
        height: "2.07rem",
        button: "1.61rem",
        buttonOffset: "0.23rem",
        iconOffset: "0.58rem",
        iconSize: "1.1rem",
    },
};

// Todo: `SwitchInput`: Alert to agnostic component, move to ``
const SwitchInput = ({
                         onIcon,
                         offIcon,
                         onClick,
                         isOn,
                         size = "lg",
                         onSliderCustomCss,
                         offSliderCustomCss,
                         onIconCustomCss,
                         offIconCustomCss,
                     }: SwitchInputProps) => {
    const selectedSize = sizeMap[size];

    const cssVariables: CSSProperties & Record<string, string> = {
        "--toggle-width": selectedSize.width,
        "--toggle-height": selectedSize.height,
        "--button-size": selectedSize.button,
        "--button-offset": selectedSize.buttonOffset,
        "--icon-offset": selectedSize.iconOffset,
        "--icon-size": selectedSize.iconSize,
    };

    return (
        <label css={styles.switch} style={cssVariables}>
            <input
                type="checkbox"
                checked={isOn}
                onChange={onClick}
            />

            <span css={[
                styles.slider,
                isOn ? onSliderCustomCss : offSliderCustomCss,
            ]}>
                <span css={[
                    styles.icon,
                    isOn ? onIconCustomCss : offIconCustomCss,
                ]}>
                  {isOn ? onIcon : offIcon}
                </span>

            <span css={styles.button} />
            </span>
        </label>
    );
};

export default SwitchInput;