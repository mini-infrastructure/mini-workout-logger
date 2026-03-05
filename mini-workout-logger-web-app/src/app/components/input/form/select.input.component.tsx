import { useState } from "react";
import styles from "./form.input.component.style.tsx";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import Button from "../../button/button.component.tsx";

type Option = {
    label: string;
    value: string;
};

type SelectProps = {
    options: Option[];
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
};

const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => setOpen((prev) => !prev);

    const handleSelect = (val: string) => {
        onChange(val);
        setOpen(false);
    };

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div css={styles.wrapper}>
            {/* SELECT BOX */}
            <div
                onClick={() => setOpen(!open)}
                css={styles.input}
            >
                <span>{selectedOption ? selectedOption.label : placeholder ?? "Select..."}</span>

                <Button
                    icon={<MdKeyboardArrowDown />}
                    clickedIcon={<MdKeyboardArrowUp />}
                    isClicked={open}
                    onClick={toggleDropdown}
                    customCss={styles.inputButton}
                    customIconCss={styles.inputButtonIcon}
                />
            </div>

            {open && (
                <div css={[styles.dropdown, styles.dropdownContainer]}>
                    {options.map((opt) => {
                        const checked = value === opt.value;

                        return (
                            <div
                                key={opt.value}
                                css={styles.dropdownItem(checked)}
                                onClick={() => handleSelect(opt.value)}
                            >
                                {opt.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Select;
