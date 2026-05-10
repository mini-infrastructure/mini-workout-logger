import {useRef, useState} from "react";
import type {FormOption} from "./form.input.component.tsx";
import styles from "./form.input.component.style.tsx";
import SecondaryButton from "../../button/button.secondary.component.tsx";
import Button from "../../button/button.component.tsx";
import {MdClose} from "react-icons/md";
import {useClickOut} from "../../../hooks/useClickOut.tsx";
import {useEscapeKey} from "../../../hooks/useEscapeKey.tsx";
import DropdownListOptions from "../../dropdown-list-options/dropdown-list-options.component.tsx";

type ButtonSelectProps = {
    inputEnabled?: boolean;
    options: FormOption[];
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
    onClear?: () => void;
    disabled?: boolean;
    error?: boolean;
};

const ButtonSelect = ({
                          inputEnabled = false,
                          options,
                          placeholder,
                          value,
                          onChange,
                          onClear,
                          disabled = false,
                          error,
                      }: ButtonSelectProps) => {

    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const close = () => setOpen(false);
    useClickOut(containerRef, close);
    useEscapeKey(close);

    const handleSelect = (val: string) => {
        onChange(val);
        close();
    };

    const filteredOptions = inputEnabled && value
        ? options.filter((o) => o.label.toLowerCase().includes(value.toLowerCase()))
        : options;

    const selectedOption = options.find((o) => o.value === value);
    const displayValue = inputEnabled ? value : (selectedOption?.label ?? "");

    return (
        <div css={styles.wrapper} ref={containerRef}>
            <div css={styles.multiassociativeSelectBox(disabled)}>
                <div
                    css={[styles.multiassociativeInputWrapper, styles.input, error ? styles.inputError : undefined]}
                    onClick={!inputEnabled ? () => setOpen((p) => !p) : undefined}
                >
                    <input
                        css={styles.inputRaw}
                        type="text"
                        placeholder={placeholder}
                        value={displayValue}
                        readOnly={!inputEnabled}
                        disabled={disabled}
                        onChange={inputEnabled ? (e) => { onChange(e.target.value); setOpen(true); } : undefined}
                        onFocus={inputEnabled ? () => setOpen(true) : undefined}
                    />
                    {onClear && value && (
                        <Button
                            icon={<MdClose />}
                            onClick={(e) => { e.stopPropagation(); onClear(); }}
                            customCss={styles.inputButton}
                            customIconCss={styles.inputButtonIcon}
                        />
                    )}
                </div>

                {!disabled && (
                    <SecondaryButton
                        isClicked={open}
                        onClick={() => setOpen((p) => !p)}
                    >
                        Choose
                    </SecondaryButton>
                )}
            </div>

            {open && filteredOptions.length > 0 && (
                <DropdownListOptions
                    options={filteredOptions}
                    selected={value ? [value] : []}
                    onSelect={handleSelect}
                />
            )}
        </div>
    );
};

export default ButtonSelect;
