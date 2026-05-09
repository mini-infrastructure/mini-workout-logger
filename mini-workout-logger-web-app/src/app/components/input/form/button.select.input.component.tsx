import {useRef, useState} from "react";
import type {FormOption} from "./form.input.component.tsx";
import styles from "./form.input.component.style.tsx";
import SecondaryButton from "../../button/button.secondary.component.tsx";
import {useClickOut} from "../../../hooks/useClickOut.tsx";
import {useEscapeKey} from "../../../hooks/useEscapeKey.tsx";

type ButtonSelectProps = {
    inputEnabled?: boolean;
    options: FormOption[];
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
    error?: boolean;
};

const ButtonSelect = ({
                          inputEnabled = false,
                          options,
                          placeholder,
                          value,
                          onChange,
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
                <input
                    css={[styles.input, error ? styles.inputError : undefined]}
                    type="text"
                    placeholder={placeholder}
                    value={displayValue}
                    readOnly={!inputEnabled}
                    disabled={disabled}
                    onChange={inputEnabled ? (e) => { onChange(e.target.value); setOpen(true); } : undefined}
                    onFocus={inputEnabled ? () => setOpen(true) : undefined}
                    onClick={!inputEnabled ? () => setOpen((p) => !p) : undefined}
                />

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
                <div css={[styles.dropdown, styles.dropdownContainer]}>
                    {filteredOptions.map((opt) => (
                        <div
                            key={opt.value}
                            css={styles.dropdownItem(value === opt.value)}
                            onClick={() => handleSelect(opt.value)}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ButtonSelect;
