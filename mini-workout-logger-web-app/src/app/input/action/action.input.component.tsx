import type {ButtonProps} from "../../components/button/button.component.tsx";
import {PropsWithChildren} from "react";
import styles from "./action.input.component.style.tsx";

type ActionSwitchProps = ButtonProps & {};

const ActionSwitch = ({
                            children
                        }: PropsWithChildren<ActionSwitchProps>) => {
    return (
        <>
            <label className="dropdown-btn-label" css={styles.dropdownButton}>
                <input type="checkbox"/>
                <div css={styles.burger}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </label>
        </>
    );
};

export default ActionSwitch;