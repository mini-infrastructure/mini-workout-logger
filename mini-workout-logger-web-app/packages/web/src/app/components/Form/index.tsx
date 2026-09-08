import { useEffect, useCallback, useState, type RefObject } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import type { SerializedStyles } from '@emotion/react';
import TextInput, { type ValidationRule } from '../TextInput';
import SelectInput from '../SelectInput';
import MultiSelectInput from '../MultiSelectInput';
import AutocompleteInput from '../AutocompleteInput';
import { type DropdownOption, type DropdownGroup } from '../Dropdown';
import styles from './index.style';

export type { FormErrors } from './parseBackendErrors';
export { parseBackendErrors } from './parseBackendErrors';

export type FormFieldType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'select'
    | 'multiselect'
    | 'autocomplete';

export type FormFieldValue = string | string[] | null;

export type FormField<T = string> = {
    name: string;
    label: string;
    type: FormFieldType;
    slots?: number;
    required?: boolean;
    placeholder?: string;
    helperText?: string;
    disabled?: boolean;

    // For select/multiselect
    options?: DropdownOption<T>[];
    groupedOptions?: DropdownGroup<T>[];
    searchable?: boolean;
    selectAll?: boolean;
    selectAllLabel?: string;

    // For autocomplete
    suggestions?: DropdownOption<T>[];
    onSuggestionsFetch?: (value: string) => void;
    minChars?: number;

    // For password
    showPasswordToggle?: boolean;

    // For text validation
    validationRules?: ValidationRule[];
};

export type FormValues = Record<string, FormFieldValue>;
export type FormErrorsMap = Record<string, string>;

export type FormProps = {
    containerRef: RefObject<HTMLDivElement | null>;
    fields: FormField[];
    totalSlots: number;
    values: FormValues;
    onChange: (name: string, value: FormFieldValue) => void;
    errors?: FormErrorsMap;
    onValidationChange?: (isValid: boolean) => void;
    gap?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    customCss?: SerializedStyles;
};

const Form = ({
    fields,
    totalSlots,
    values,
    onChange,
    errors = {},
    onValidationChange,
    gap = 'md',
    disabled = false,
}: FormProps) => {
    // Track password visibility per field
    const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});

    const togglePasswordVisibility = (fieldName: string) => {
        setPasswordVisibility(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName],
        }));
    };

    // Compute whether the form is valid
    const computeIsValid = useCallback(() => {
        for (const field of fields) {
            if (field.required) {
                const value = values[field.name];
                const isEmpty =
                    value === null ||
                    value === undefined ||
                    value === '' ||
                    (Array.isArray(value) && value.length === 0);
                if (isEmpty) return false;
            }
        }

        // Also check if there are any backend errors
        if (Object.keys(errors).length > 0) return false;

        return true;
    }, [fields, values, errors]);

    // Notify parent of validation state changes
    useEffect(() => {
        const isValid = computeIsValid();
        onValidationChange?.(isValid);
    }, [computeIsValid, onValidationChange]);

    const renderField = (field: FormField) => {
        const fieldValue = values[field.name];
        const fieldError = errors[field.name];
        const isDisabled = disabled || field.disabled;

        switch (field.type) {
            case 'select':
                return (
                    <SelectInput
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        groupedOptions={field.groupedOptions}
                        value={(fieldValue as string) ?? null}
                        onChange={(val) => onChange(field.name, val)}
                        placeholder={field.placeholder}
                        error={fieldError}
                        helperText={field.helperText}
                        disabled={isDisabled}
                        required={field.required}
                        searchable={field.searchable}
                    />
                );

            case 'multiselect':
                return (
                    <MultiSelectInput
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        groupedOptions={field.groupedOptions}
                        value={(fieldValue as string[]) ?? []}
                        onChange={(val) => onChange(field.name, val)}
                        placeholder={field.placeholder}
                        error={fieldError}
                        helperText={field.helperText}
                        disabled={isDisabled}
                        required={field.required}
                        searchable={field.searchable}
                        selectAll={field.selectAll}
                        selectAllLabel={field.selectAllLabel}
                    />
                );

            case 'autocomplete':
                return (
                    <AutocompleteInput
                        name={field.name}
                        label={field.label}
                        inputValue={(fieldValue as string) ?? ''}
                        onInputChange={(val) => {
                            onChange(field.name, val);
                            field.onSuggestionsFetch?.(val);
                        }}
                        suggestions={field.suggestions ?? []}
                        onSelect={(opt) => onChange(field.name, opt.label)}
                        placeholder={field.placeholder}
                        error={fieldError}
                        helperText={field.helperText}
                        disabled={isDisabled}
                        required={field.required}
                        minChars={field.minChars}
                    />
                );

            case 'password': {
                const isVisible = passwordVisibility[field.name] ?? false;
                return (
                    <TextInput
                        name={field.name}
                        label={field.label}
                        type={isVisible ? 'text' : 'password'}
                        value={(fieldValue as string) ?? ''}
                        onChange={(val) => onChange(field.name, val)}
                        placeholder={field.placeholder}
                        error={fieldError}
                        helperText={field.helperText}
                        disabled={isDisabled}
                        required={field.required}
                        validationRules={field.validationRules}
                        icon={field.showPasswordToggle ? (isVisible ? <FiEyeOff /> : <FiEye />) : undefined}
                        iconPosition="right"
                        onIconClick={field.showPasswordToggle ? () => togglePasswordVisibility(field.name) : undefined}
                    />
                );
            }

            case 'text':
            case 'email':
            case 'number':
            case 'tel':
            default:
                return (
                    <TextInput
                        name={field.name}
                        label={field.label}
                        type={field.type === 'text' ? 'text' : field.type}
                        value={(fieldValue as string) ?? ''}
                        onChange={(val) => onChange(field.name, val)}
                        placeholder={field.placeholder}
                        error={fieldError}
                        helperText={field.helperText}
                        disabled={isDisabled}
                        required={field.required}
                        validationRules={field.validationRules}
                    />
                );
        }
    };

    return (
        <div css={styles.form(gap)}>
            {fields.map((field) => {
                const slots = Math.min(field.slots ?? 1, totalSlots);
                return (
                    <div
                        key={field.name}
                        css={styles.field(slots, totalSlots, gap)}
                    >
                        {renderField(field)}
                    </div>
                );
            })}
        </div>
    );
};

export default Form;
