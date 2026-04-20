import type {FormOption} from "./form.input.component.tsx";
import styles from "./form.input.component.style.tsx";
import SecondaryButton from "../../button/button.secondary.component.tsx";
import {useState} from "react";

type ButtonSelectProps = {
    inputEnabled?: boolean;
    options: FormOption[];
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
};

const ButtonSelect = ({
                          inputEnabled = false,
                          options,
                          placeholder,
                          value,
                          onChange,
                          disabled = false,
                      }: ButtonSelectProps) => {

    const [open, setOpen] = useState(false);

    const toggleDropdown = () => setOpen((prev) => !prev);

    const handleSelect = (val: string) => {
        onChange(val);
        setOpen(false);
    };

    const selectedOption = options.find((o) => o.value === value);
    const displayValue = selectedOption?.label ?? "";

    return (
        <div css={styles.wrapper}>

            <div
                css={styles.multiassociativeSelectBox(disabled!)}
                onClick={() => setOpen(!open)}
            >
                <input
                    css={styles.input}
                    type="text"
                    placeholder={placeholder}
                    value={displayValue}
                    disabled={!inputEnabled}
                    readOnly
                />

                {!disabled && (
                    <SecondaryButton
                        isClicked={open}
                        onClick={toggleDropdown}
                    >
                        Choose
                    </SecondaryButton>
                )}
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

export default ButtonSelect;
