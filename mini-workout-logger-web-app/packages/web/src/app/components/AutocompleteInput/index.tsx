import { useState, useRef, useEffect, useCallback } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { FiSearch } from 'react-icons/fi';
import TextInput from '../TextInput';
import Dropdown, { type DropdownOption } from '../Dropdown';
import { useClickOut } from '../../hooks/useClickOut';
import styles from './index.style';

export type AutocompleteInputProps<T = string> = {
    name: string;
    label: string;
    inputValue: string;
    onInputChange: (value: string) => void;
    suggestions: DropdownOption<T>[];
    onSelect: (option: DropdownOption<T>) => void;
    onFocus?: () => void;
    placeholder?: string;
    error?: string;
    helperText?: string;
    disabled?: boolean;
    required?: boolean;
    loading?: boolean;
    emptyMessage?: string;
    debounceMs?: number;
    minChars?: number;
    showSearchIcon?: boolean;
    customCss?: SerializedStyles;
};

const AutocompleteInput = <T extends string | number = string>({
    name,
    label,
    inputValue,
    onInputChange,
    suggestions,
    onSelect,
    onFocus: onFocusProp,
    placeholder,
    error,
    helperText,
    disabled = false,
    required = false,
    loading = false,
    emptyMessage = 'No results found',
    debounceMs = 300,
    minChars = 1,
    showSearchIcon = true,
    customCss,
}: AutocompleteInputProps<T>) => {
    const [open, setOpen] = useState(false);
    const [debouncedValue, setDebouncedValue] = useState(inputValue);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useClickOut(wrapperRef, () => setOpen(false));

    // Debounce input value
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [inputValue, debounceMs]);

    // Open dropdown when there are suggestions and min chars met
    useEffect(() => {
        if (debouncedValue.length >= minChars && (suggestions.length > 0 || loading)) {
            setOpen(true);
        } else if (debouncedValue.length < minChars) {
            setOpen(false);
        }
    }, [debouncedValue, suggestions.length, minChars, loading]);

    const handleInputChange = useCallback((value: string) => {
        onInputChange(value);
        if (value.length >= minChars) {
            setOpen(true);
        }
    }, [onInputChange, minChars]);

    const handleSelect = (value: T | null) => {
        if (value === null) return;
        const option = suggestions.find(s => s.value === value);
        if (option) {
            onSelect(option);
            setOpen(false);
        }
    };

    const handleFocus = () => {
        onFocusProp?.();
        if (inputValue.length >= minChars && (suggestions.length > 0 || loading)) {
            setOpen(true);
        }
    };

    return (
        <div ref={wrapperRef} css={[styles.wrapper, customCss]}>
            <TextInput
                name={name}
                label={label}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                error={error}
                helperText={helperText}
                disabled={disabled}
                required={required}
                loading={loading}
                icon={showSearchIcon ? <FiSearch /> : undefined}
                iconPosition="left"
                showClearButton={inputValue.length > 0}
                onFocus={handleFocus}
            />

            <Dropdown
                options={suggestions}
                value={null}
                onChange={handleSelect}
                open={open}
                onClose={() => setOpen(false)}
                loading={loading}
                emptyMessage={emptyMessage}
            />
        </div>
    );
};

export default AutocompleteInput;
