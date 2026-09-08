import { useState, useRef, useMemo } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { FiChevronDown, FiPlus } from 'react-icons/fi';
import TextInput from '../TextInput';
import Dropdown, { type DropdownOption, type DropdownGroup } from '../Dropdown';
import { useClickOut } from '../../hooks/useClickOut';
import styles from './index.style';

// Special marker for the "create new" option
const CREATE_NEW_MARKER = '__CREATE_NEW__';

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
    /** Label for creating new option in editable mode. Use {value} as placeholder. Default: "Create '{value}'" */
    createNewLabel?: string;
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
    createNewLabel = "Create '{value}'",
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

    // Check if typed value exactly matches an existing option
    const hasExactMatch = useMemo(() => {
        if (!editableInputValue) return false;
        const lowerInput = editableInputValue.toLowerCase();
        return allOptions.some(opt => opt.label.toLowerCase() === lowerInput);
    }, [editableInputValue, allOptions]);

    // In editable mode, filter options based on input value and add "create new" option
    const filteredOptions = useMemo(() => {
        let filtered = options;
        if (editable && editableInputValue) {
            filtered = options.filter(opt =>
                opt.label.toLowerCase().includes(editableInputValue.toLowerCase())
            );
        }

        // Add "create new" option if in editable mode, has input, and no exact match
        if (editable && editableInputValue && !hasExactMatch) {
            const createLabel = createNewLabel.replace('{value}', editableInputValue);
            const createOption: DropdownOption<T> = {
                value: `${CREATE_NEW_MARKER}${editableInputValue}` as T,
                label: createLabel,
                icon: <FiPlus />,
            };
            return [...filtered, createOption];
        }

        return filtered;
    }, [editable, editableInputValue, options, hasExactMatch, createNewLabel]);

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
        if (editable && typeof newValue === 'string' && newValue.startsWith(CREATE_NEW_MARKER)) {
            // "Create new" option was selected - use the typed value
            const actualValue = newValue.slice(CREATE_NEW_MARKER.length) as T;
            onChange(actualValue);
            setEditableInputValue(actualValue as string);
        } else {
            onChange(newValue);
            if (editable) {
                const selected = allOptions.find(opt => opt.value === newValue);
                setEditableInputValue(selected?.label ?? (newValue as string) ?? '');
            }
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
