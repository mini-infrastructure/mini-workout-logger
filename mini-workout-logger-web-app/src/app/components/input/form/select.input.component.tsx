import {useRef, useState} from "react";
import styles from "./form.input.component.style.tsx";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import Button from "../../button/button.component.tsx";
import type {FormOption} from "./form.input.component.tsx";
import {useClickOut} from "../../../hooks/useClickOut.tsx";
import {useEscapeKey} from "../../../hooks/useEscapeKey.tsx";
import DropdownListOptions from "../../dropdown-list-options/dropdown-list-options.component.tsx";

export type SelectProps = {
    options: FormOption[];
    placeholder?: string;
    onChange: (val: string) => void;
    value: string;
    disabled?: boolean;
    error?: boolean;
};

const Select = ({
                    options,
                    value,
                    onChange,
                    placeholder,
                    disabled,
                    error,
                }: SelectProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const close = () => setOpen(false);
    useClickOut(containerRef, close);
    useEscapeKey(close);

    const toggleDropdown = () => {
        if (disabled) return;
        setOpen((prev) => !prev);
    };

    const handleSelect = (val: string) => {
        onChange(val);
        if (!disabled) setOpen(false);
    };

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div css={styles.wrapper} ref={containerRef}>
            {/* SELECT BOX */}
            <div
                onClick={() => { if (!disabled) setOpen(!open); }}
                css={[styles.input, error ? styles.inputError : undefined]}
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
                <DropdownListOptions
                    options={options}
                    selected={value ? [value] : []}
                    onSelect={handleSelect}
                />
            )}
        </div>
    );
};

export default Select;
