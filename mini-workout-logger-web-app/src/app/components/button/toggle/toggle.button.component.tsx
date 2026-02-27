import {ReactNode} from 'react';
import styles from "./toggle.button.component.style.tsx";

export type ToggleButtonProps = {
    onIcon: ReactNode;
    offIcon: ReactNode;
    onClick: () => void;
    isOn: boolean;
};

    const ToggleButton = ({
                          onIcon,
                          offIcon,
                          onClick,
                          isOn
                      }: ToggleButtonProps) => {
    return (
        <label css={styles.switch}>
            <input
                type="checkbox"
                checked={isOn}
                onChange={onClick}
            />

            <span css={styles.slider}>
                <span css={styles.knob}>
                  {isOn ? onIcon : offIcon}
                </span>
            </span>
        </label>
    );
};

export default ToggleButton;
