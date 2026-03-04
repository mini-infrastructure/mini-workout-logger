import {PropsWithChildren, useState} from "react";
import styles from "./action.input.component.style.tsx";
import {Theme, Interpolation} from '@emotion/react';

export type ActionSwitchType = "hamburger" | "filter" | "plus";

export const themeMap: Record<ActionSwitchType, (theme: Theme) => Interpolation<Theme>> = {
    hamburger: styles.hamburger_x_theme,
    filter: styles.filter_x_theme,
    plus: styles.plus_x_theme,
};

type ActionSwitchProps = {
    type?: ActionSwitchType;
};

const ActionSwitch = ({
                          type = "hamburger",
                          children
                      }: PropsWithChildren<ActionSwitchProps>) => {

    const [checked, setChecked] = useState(false);

    return (
        <label css={styles.dropdownButton}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />

            <div css={styles.switchButton}>
                <div className="button-bg" />
                <div css={themeMap[type]}>
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </label>
    );
};

export default ActionSwitch;