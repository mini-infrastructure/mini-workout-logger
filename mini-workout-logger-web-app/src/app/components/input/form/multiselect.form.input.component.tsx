import {useRef, useState} from "react";
import styles from "./form.input.component.style.tsx";
import Badge from "../../badge/badge.component.tsx";
import Button from "../../button/button.component.tsx";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {useClickOut} from "../../../hooks/useClickOut.tsx";

type Option = {
    label: string;
    value: string;
};

type MultiSelectProps = {
    options: Option[];
    value: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
};

const MultiSelect = ({ options, value, onChange, placeholder }: MultiSelectProps) => {
    const [open, setOpen] = useState(false);
    const toggleDropdown = () => setOpen((prev) => !prev);

    const toggleValue = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    const selectedOptions = options.filter((opt) => value.includes(opt.value));

    return (
        <div css={styles.wrapper}>

            {/* SELECT BOX */}
            <div
                onClick={() => setOpen(!open)}
                css={styles.input}
            >
                <span>{selectedOptions.length
                    ? selectedOptions.map((o) => o.label).join(", ")
                    : placeholder ?? "Select..."}
                </span>

                <Button
                    icon={<MdKeyboardArrowDown />}
                    clickedIcon={<MdKeyboardArrowUp />}
                    isClicked={open}
                    onClick={toggleDropdown}
                    customCss={styles.inputButton}
                    customIconCss={styles.inputButtonIcon}
                />
            </div>

            {/* DROPDOWN */}
            {open && (
                <div css={[styles.dropdown, styles.dropdownContainer]}>
                    {options.map((opt) => {
                        const checked = value.includes(opt.value);

                        return (
                            <div
                                css={styles.dropdownItem(checked)}
                                key={opt.value}
                                onClick={() => toggleValue(opt.value)}
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    readOnly
                                />

                                <span>{opt.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* SELECTED ITEMS */}
            <div css={styles.multiselectSelectedItems}>
                {selectedOptions.map((opt) => (
                    <Badge
                        key={opt.value}
                        onRemove={() => toggleValue(opt.value)}
                        customCss={styles.badgeCustomCss}
                    >
                        {opt.label}
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default MultiSelect;