import { useState, useRef, useMemo } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { FiChevronDown } from 'react-icons/fi';
import TextInput from '../TextInput';
import Dropdown, { type DropdownOption, type DropdownGroup } from '../Dropdown';
import { useClickOut } from '../../hooks/useClickOut';
import styles from './index.style';

export type SelectInputProps<T = string> = {
    name: string;
    label: string;
    options?: DropdownOption<T>[];
    groupedOptions?: DropdownGroup<T>[];
    value: T | null;
    onChange: (value: T | null) => void;
    placeholder?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    loading?: boolean;
    emptyMessage?: string;
    customCss?: SerializedStyles;
};

const SelectInput = <T extends string | number = string>({
    name,
    label,
    options = [],
    groupedOptions,
    value,
    onChange,
    placeholder,
    error,
    helperText,
    disabled = false,
    searchable = false,
    searchPlaceholder,
    loading = false,
    emptyMessage,
    customCss,
}: SelectInputProps<T>) => {
    const [open, setOpen] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useClickOut(wrapperRef, () => setOpen(false));

    const allOptions = useMemo(() => {
        if (groupedOptions) {
            return groupedOptions.flatMap(group => group.options);
        }
        return options;
    }, [options, groupedOptions]);

    const selectedOption = allOptions.find(opt => opt.value === value);

    const handleToggle = () => {
        if (!disabled) {
            setOpen(prev => !prev);
            setHasAnimated(true);
        }
    };

    const handleChange = (newValue: T | null) => {
        onChange(newValue);
        setOpen(false);
    };

    const getArrowStyle = () => {
        if (!hasAnimated) return styles.arrowIcon;
        return open ? styles.arrowIconOpen : styles.arrowIconClosed;
    };

    const displayValue = selectedOption?.label ?? '';

    return (
        <div ref={wrapperRef} css={[styles.wrapper, customCss]}>
            <div css={styles.inputContainer} onClick={handleToggle}>
                <TextInput
                    name={name}
                    label={label}
                    value={displayValue}
                    onChange={() => {}}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                    disabled={disabled}
                    loading={loading}
                    icon={
                        <FiChevronDown css={getArrowStyle()} />
                    }
                    iconPosition="right"
                    customCss={{ pointerEvents: 'none' } as unknown as SerializedStyles}
                />
            </div>

            <Dropdown
                options={options}
                groupedOptions={groupedOptions}
                value={value}
                onChange={handleChange}
                open={open}
                onClose={() => setOpen(false)}
                searchable={searchable}
                searchPlaceholder={searchPlaceholder}
                loading={loading}
                emptyMessage={emptyMessage}
            />
        </div>
    );
};

export default SelectInput;
