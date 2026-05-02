import { useRef, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import type { Interpolation, Theme } from '@emotion/react';
import { useClickOut } from '../../../hooks/useClickOut.tsx';
import { useEscapeKey } from '../../../hooks/useEscapeKey.tsx';
import styles from './dropdown-button.component.style.tsx';
import SecondaryButton from "../button.secondary.component.tsx";
import Button from "../button.component.tsx";

export type DropdownOption = {
    label: string;
    value: string;
};

export type DropdownButtonProps = {
    label: string;
    options: DropdownOption[];
    selected: string[];
    onChange: (values: string[]) => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const DropdownButton = ({
    label,
    options,
    selected,
    onChange,
    customCss,
}: DropdownButtonProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const close = () => setOpen(false);
    useClickOut(containerRef, close);
    useEscapeKey(close);

    const allSelected = options.length > 0 && options.every(opt => selected.includes(opt.value));

    const toggleValue = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter(v => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const toggleAll = () => {
        if (allSelected) {
            onChange([]);
        } else {
            onChange(options.map(opt => opt.value));
        }
    };

    return (
        <div
            css={[styles.container, ...(customCss ? (Array.isArray(customCss) ? customCss : [customCss]) : [])]}
            ref={containerRef}
        >
            <SecondaryButton
                icon={<MdKeyboardArrowDown />}
                clickedIcon={<MdKeyboardArrowUp />}
                isClicked={open}
                iconEnd
                onClick={() => setOpen(prev => !prev)}
                customCss={[selected.length > 0 && styles.triggerActive]}
            >
                {label}
            </SecondaryButton>

            {open && (
                <div css={styles.dropdown}>
                    <div
                        css={styles.dropdownItem(allSelected)}
                        onClick={toggleAll}
                    >
                        <input type="checkbox" checked={allSelected} readOnly />
                        <span>Select all</span>
                    </div>
                    {options.map(opt => {
                        const checked = selected.includes(opt.value);
                        return (
                            <div
                                key={opt.value}
                                css={styles.dropdownItem(checked)}
                                onClick={() => toggleValue(opt.value)}
                            >
                                <input type="checkbox" checked={checked} readOnly />
                                <span>{opt.label}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
