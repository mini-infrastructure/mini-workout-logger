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
    required?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    loading?: boolean;
    emptyMessage?: string;
    customCss?: SerializedStyles;
    /** When true, the input becomes editable (combobox mode) - allows typing custom values */
    editable?: boolean;
    /** Called when the user types in editable mode */
    onInputChange?: (value: string) => void;
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
    required = false,
    searchable = false,
    searchPlaceholder,
    loading = false,
    emptyMessage,
    customCss,
    editable = false,
    onInputChange,
}: SelectInputProps<T>) => {
    const [open, setOpen] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [editableInputValue, setEditableInputValue] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useClickOut(wrapperRef, () => setOpen(false));

    const allOptions = useMemo(() => {
        if (groupedOptions) {
            return groupedOptions.flatMap(group => group.options);
        }
        return options;
    }, [options, groupedOptions]);

    const selectedOption = allOptions.find(opt => opt.value === value);

    // In editable mode, filter options based on input value
    const filteredOptions = useMemo(() => {
        if (!editable || !editableInputValue) return options;
        return options.filter(opt =>
            opt.label.toLowerCase().includes(editableInputValue.toLowerCase())
        );
    }, [editable, editableInputValue, options]);

    const filteredGroupedOptions = useMemo(() => {
        if (!editable || !editableInputValue || !groupedOptions) return groupedOptions;
        return groupedOptions.map(group => ({
            ...group,
            options: group.options.filter(opt =>
                opt.label.toLowerCase().includes(editableInputValue.toLowerCase())
            ),
        })).filter(group => group.options.length > 0);
    }, [editable, editableInputValue, groupedOptions]);

    const handleToggle = () => {
        if (!disabled) {
            setOpen(prev => !prev);
            setHasAnimated(true);
        }
    };

    const handleChange = (newValue: T | null) => {
        onChange(newValue);
        if (editable) {
            const selected = allOptions.find(opt => opt.value === newValue);
            setEditableInputValue(selected?.label ?? '');
        }
        setOpen(false);
    };

    const handleInputChange = (inputValue: string) => {
        setEditableInputValue(inputValue);
        onInputChange?.(inputValue);
        if (!open && inputValue.length > 0) {
            setOpen(true);
            setHasAnimated(true);
        }
    };

    const handleInputFocus = () => {
        if (editable && !open) {
            setOpen(true);
            setHasAnimated(true);
        }
    };

    const getArrowStyle = () => {
        if (!hasAnimated) return styles.arrowIcon;
        return open ? styles.arrowIconOpen : styles.arrowIconClosed;
    };

    // In editable mode, show the input value; otherwise show selected option label
    const displayValue = editable ? editableInputValue : (selectedOption?.label ?? '');

    return (
        <div ref={wrapperRef} css={[styles.wrapper, customCss]}>
            <div css={styles.inputContainer} onClick={editable ? undefined : handleToggle}>
                <TextInput
                    name={name}
                    label={label}
                    value={displayValue}
                    onChange={editable ? handleInputChange : () => {}}
                    onFocus={editable ? handleInputFocus : undefined}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                    disabled={disabled}
                    required={required}
                    loading={loading}
                    icon={
                        <FiChevronDown css={getArrowStyle()} onClick={handleToggle} />
                    }
                    iconPosition="right"
                    onIconClick={handleToggle}
                    customCss={editable ? undefined : { pointerEvents: 'none' } as unknown as SerializedStyles}
                />
            </div>

            <Dropdown
                options={editable ? filteredOptions : options}
                groupedOptions={editable ? filteredGroupedOptions : groupedOptions}
                value={value}
                onChange={handleChange}
                open={open}
                onClose={() => setOpen(false)}
                searchable={editable ? false : searchable}
                searchPlaceholder={searchPlaceholder}
                loading={loading}
                emptyMessage={emptyMessage}
            />
        </div>
    );
};

export default SelectInput;
