import {PropsWithChildren, useState} from "react";
import styles from "./action.input.component.style.tsx";
import {Theme, Interpolation, css} from '@emotion/react';

export type ActionSwitchType = "hamburger" | "filter" | "plus";

export const themeMap: Record<ActionSwitchType, (theme: Theme) => Interpolation<Theme>> = {
    hamburger: styles.hamburger_x_theme,
    filter: styles.filter_x_theme,
    plus: styles.plus_x_theme,
};

type ActionSwitchProps = {
    type?: ActionSwitchType;
    checked: boolean;
    onChange: (checked: boolean) => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const ActionSwitch = ({
                          type = "hamburger",
                          checked,
                          onChange,
                          customCss,
                      }: PropsWithChildren<ActionSwitchProps>) => {
    return (
        <label css={styles.dropdownButton}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />

            <div
                css={[
                    styles.switchButton,
                    ...(customCss
                        ? Array.isArray(customCss)
                            ? customCss
                            : [customCss]
                        : []),
                ]}
            >
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
