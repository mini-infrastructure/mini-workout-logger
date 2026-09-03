import { useRef, useState } from "react";
import styles from "../FormBuilder/index.style.tsx";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import Button from "../Button/index.tsx";
import type {FormOption} from "../FormBuilder/index.tsx";
import { useClickOut } from "../../hooks/useClickOut/index.tsx";
import { useEscapeKey } from "../../hooks/useEscapeKey/index.tsx";

export type SelectProps = {
    options: FormOption[];
    placeholder?: string;
    onChange: (val: string) => void;
    value: string;
    disabled?: boolean;
};

const Select = ({
                    options,
                    value,
                    onChange,
                    placeholder,
                    disabled,
                }: SelectProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const close = () => setOpen(false);
    useClickOut(containerRef, close);
    useEscapeKey(close);

    const toggleDropdown = () => {
        if (disabled) return;
        setOpen((prev) => !prev);
    }

    const handleSelect = (val: string) => {
        onChange(val);
        if (disabled) return;
        setOpen(false);
    };

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div css={styles.wrapper} ref={containerRef}>
            {/* SELECT BOX */}
            <div
                onClick={() => {
                    if (disabled) return;
                    setOpen(!open);
                }}
                css={styles.input}
            >
                <span>{selectedOption ? selectedOption.label : placeholder ?? "Select..."}</span>

                {!disabled && (
                    <Button
                        icon={<MdKeyboardArrowDown />}
                        clickedIcon={<MdKeyboardArrowUp />}
                        isClicked={open}
                        onClick={toggleDropdown}
                        customCss={styles.inputButton}
                        customIconCss={styles.inputButtonIcon}
                    />
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

export default Select;
