import { ReactNode, CSSProperties } from "react";
import styles from "./switch.input.component.style.tsx";
import type {Interpolation, Theme} from "@emotion/react";

// Todo: sm, lg sizes
export type ToggleSize = "md";

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
    md: {
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
                         size = "md",
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