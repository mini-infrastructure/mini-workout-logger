import {useRef, useState} from "react";
import styles from "./form.input.component.style.tsx";
import EditableBadge from "../../badge/editable-badge.component.tsx";
import Button from "../../button/button.component.tsx";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import type {FormOption} from "./form.input.component.tsx";
import {useClickOut} from "../../../hooks/useClickOut.tsx";
import {useEscapeKey} from "../../../hooks/useEscapeKey.tsx";

type MultiSelectProps = {
    options: FormOption[];
    placeholder?: string;
    onChange: (values: string[]) => void;
    value: string[];
    disabled?: boolean;
    editMode?: boolean;
    error?: boolean;
};

const MultiSelect = ({
                         options,
                         value,
                         onChange,
                         placeholder,
                         disabled = false,
                         editMode,
                         error,
                     }: MultiSelectProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const close = () => setOpen(false);
    useClickOut(containerRef, close);
    useEscapeKey(close);

    const toggleDropdown = () => setOpen((prev) => !prev);

    const allSelected = options.length > 0 && options.every((opt) => value.includes(opt.value));

    const toggleValue = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    const toggleAll = () => {
        if (allSelected) {
            onChange([]);
        } else {
            onChange(options.map((opt) => opt.value));
        }
    };

    const selectedOptions = options.filter((opt) => value.includes(opt.value));

    return (
        <div css={styles.wrapper} ref={containerRef}>

            {/* SELECT BOX */}
            {(editMode === undefined || editMode) && (
                <div
                    onClick={() => setOpen(!open)}
                    css={[styles.input, error ? styles.inputError : undefined]}
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
            )}

            {/* DROPDOWN */}
            {open && (
                <div css={[styles.dropdown, styles.dropdownContainer]}>
                    <div
                        css={styles.dropdownItem(allSelected)}
                        onClick={toggleAll}
                    >
                        <input type="checkbox" checked={allSelected} readOnly />
                        <span>Select all</span>
                    </div>
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
            <div css={styles.multiselectSelectedItems(!!selectedOptions.length)}>
                {selectedOptions.map((opt) => (
                    <EditableBadge
                        key={opt.value}
                        onRemove={disabled ? undefined : () => toggleValue(opt.value)}
                        forceSelected={editMode === true}
                        customCss={styles.badgeCustomCss}
                    >
                        {opt.label}
                    </EditableBadge>
                ))}
            </div>
        </div>
    );
};

export default MultiSelect;