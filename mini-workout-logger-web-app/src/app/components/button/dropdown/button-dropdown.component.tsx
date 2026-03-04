import type {ButtonProps} from "../button.component.tsx";
import {PropsWithChildren} from "react";
import Button from "../button.component.tsx";
import styles from "./button-dropdown.component.style.tsx";

type ButtonDropdownProps = ButtonProps & {};

const ButtonDropdown = ({
                            children
                        }: PropsWithChildren<ButtonDropdownProps>) => {
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

export default ButtonDropdown;
