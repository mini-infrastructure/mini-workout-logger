import {useRef, useState} from 'react';
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';
import type {Interpolation, Theme} from '@emotion/react';
import {useClickOut} from '../../../hooks/useClickOut.tsx';
import {useEscapeKey} from '../../../hooks/useEscapeKey.tsx';
import styles from './dropdown-button.component.style.tsx';
import SecondaryButton from "../button.secondary.component.tsx";
import DropdownListOptions from "../../dropdown-list-options/dropdown-list-options.component.tsx";

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

    const toggleValue = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter(v => v !== value));
        } else {
            onChange([...selected, value]);
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
                <DropdownListOptions
                    options={options}
                    selected={selected}
                    onSelect={toggleValue}
                    onSelectAll={(allCurrentlySelected) => onChange(allCurrentlySelected ? [] : options.map((o) => o.value))}
                    multiSelect
                    showSelectAll
                    wide
                />
            )}
        </div>
    );
};

export default DropdownButton;
