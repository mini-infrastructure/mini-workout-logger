import type {ReactNode, SyntheticEvent} from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import styles from "./form.input.component.style.tsx";
import MultiSelect from "./multiselect.form.input.component.tsx";
import Select from "./select.input.component.tsx";
import ButtonSelect from "./button.select.input.component.tsx";
import ButtonMultiSelect from "./button.multiselect.form.input.component.tsx";
import PrimaryButton from "../../button/button.primary.component.tsx";
import Button from "../../button/button.component.tsx";
import {MdClose} from "react-icons/md";
import DropdownListOptions from "../../dropdown-list-options/dropdown-list-options.component.tsx";

export type FormFieldType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "multiselect"
    | "buttonselect"
    | "buttonmultiselect"
    | "custom"
    ;

export type FormOption = {
    label: string;
    value: string;
};

export type ButtonMultiSelectValue = {
    first: string;
    second: string;
};

export type FormFieldValue = string | string[] | ButtonMultiSelectValue[];

export type ButtonMultiSelectFieldOptions = {
    first: {
        label?: string;
        options: FormOption[];
        inputEnabled?: boolean;
        initialValue?: string;
    };
    second: {
        label?: string;
        options: FormOption[];
        inputEnabled?: boolean;
        initialValue?: string;
    };
};

export type FormItem = {
    name: string;
    label: string;
    type: FormFieldType;
    placeholder?: string;
    options?: FormOption[] | ButtonMultiSelectFieldOptions;
    colSpan?: number;
    initialValue?: FormFieldValue;
    inputEnabled?: boolean;
    required?: boolean;
    render?: ReactNode;
    // autocomplete / suggestions
    onSearch?: (value: string) => void;
    suggestions?: FormOption[];
    onSuggestionSelect?: (value: string) => void;
};

export type FormBuilderProps = {
    items: FormItem[];
    columns: number;
    onSubmit: (values: Record<string, FormFieldValue>) => void;
    submitButton?: ReactNode;
    disabled?: boolean;
    id?: string;
    onValidationChange?: (canSubmit: boolean) => void;
    resetKey?: number;
    // per-field suggestions injected from outside, keyed by field name
    suggestions?: Record<string, FormOption[]>;
};

const buildInitialValues = (items: FormItem[]) => {
    const values: Record<string, FormFieldValue> = {};

    items.forEach((item) => {
        if (item.type === 'custom') return;

        if (item.initialValue !== undefined) {
            values[item.name] = item.initialValue;
            return;
        }

        if (item.type === "select" && Array.isArray(item.options) && item.options.length) {
            values[item.name] = item.options[0].value;
            return;
        }

        if (item.type === "multiselect") {
            values[item.name] = [];
            return;
        }

        values[item.name] = "";
    });

    return values;
};

const isFieldEmpty = (item: FormItem, value: FormFieldValue): boolean => {
    if (item.type === 'multiselect' || item.type === 'buttonmultiselect') {
        return (value as string[])?.length === 0;
    }
    return value === '' || value === undefined || value === null;
};

const FormBuilder = ({
                         items,
                         columns,
                         onSubmit,
                         submitButton,
                         disabled = false,
                         id,
                         onValidationChange,
                         resetKey,
                         suggestions: externalSuggestions,
                     }: FormBuilderProps) => {
    const [values, setValues] = useState<Record<string, FormFieldValue>>(() => buildInitialValues(items));
    const [submitted, setSubmitted] = useState(false);
    const [openSuggestionsField, setOpenSuggestionsField] = useState<string | null>(null);
    const prevItemsRef = useRef(items);

    useEffect(() => {
        if (resetKey === undefined) return;
        setValues(buildInitialValues(items));
        setSubmitted(false);
        setOpenSuggestionsField(null);
        prevItemsRef.current = items;
    // resetKey is the trigger; items is read at reset time but not a trigger itself
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetKey]);

    const handleChange = (name: string, value: FormFieldValue) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const validationErrors = useMemo(() => {
        const errors: Record<string, boolean> = {};
        items.forEach((item) => {
            if (item.required && item.type !== 'custom') {
                errors[item.name] = isFieldEmpty(item, values[item.name]);
            }
        });
        return errors;
    }, [items, values]);

    const isValid = !Object.values(validationErrors).some(Boolean);
    const canSubmit = !submitted || isValid;

    useEffect(() => {
        onValidationChange?.(canSubmit);
    }, [canSubmit]);

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) {
            setSubmitted(true);
            return;
        }
        onSubmit(values);
    };

    useEffect(() => {
        const changed: Record<string, FormFieldValue> = {};
        items.forEach((item) => {
            if (item.type === 'custom' || item.initialValue === undefined) return;
            const prev = prevItemsRef.current.find(p => p.name === item.name);
            if (!prev || prev.initialValue !== item.initialValue) {
                changed[item.name] = item.initialValue;
            }
        });
        if (Object.keys(changed).length > 0) {
            setValues(prev => ({ ...prev, ...changed }));
        }
        prevItemsRef.current = items;
    }, [items]);

    const isTextType = (type: FormFieldType) =>
        type === 'text' || type === 'email' || type === 'password' || type === 'number';

    return (
        <form id={id} css={styles.form(columns)} onSubmit={handleSubmit}>
            {items.map((item) => {
                const colSpan = Math.min(item.colSpan ?? 1, columns);

                if (item.type === 'custom') {
                    return (
                        <div key={item.name} css={styles.customWrapper(colSpan)}>
                            {item.render}
                        </div>
                    );
                }

                const hasError = submitted && !!validationErrors[item.name];
                const fieldValue = values[item.name] as string ?? "";
                const showClear = !disabled && fieldValue !== '';
                const itemSuggestions = externalSuggestions?.[item.name] ?? item.suggestions;
                const showSuggestions =
                    openSuggestionsField === item.name &&
                    !!itemSuggestions?.length;

                return (
                    <div key={item.name} css={styles.fieldWrapper(colSpan)}>
                        <label>{item.label}</label>
                        {item.type === "select" ? (
                            <Select
                                options={item.options as FormOption[]}
                                value={fieldValue}
                                onChange={(val) => handleChange(item.name, val)}
                                placeholder={item.placeholder}
                                disabled={disabled}
                                error={hasError}
                            />
                        ) : item.type === "textarea" ? (
                            <textarea
                                css={[styles.input, hasError ? styles.inputError : undefined]}
                                placeholder={item.placeholder}
                                value={fieldValue}
                                onChange={(e) => handleChange(item.name, e.target.value)}
                                disabled={disabled}
                            />
                        ) : item.type === "multiselect" ? (
                            <MultiSelect
                                options={item.options as FormOption[]}
                                value={values[item.name] as string[] ?? []}
                                onChange={(val) => handleChange(item.name, val)}
                                placeholder={item.placeholder}
                                disabled={disabled}
                                error={hasError}
                            />
                        ) : item.type === "buttonselect" ? (
                            <ButtonSelect
                                options={item.options as FormOption[]}
                                placeholder={item.placeholder}
                                value={fieldValue}
                                inputEnabled={item.inputEnabled}
                                onChange={(val) => handleChange(item.name, val)}
                                onClear={!disabled ? () => handleChange(item.name, '') : undefined}
                                disabled={disabled}
                                error={hasError}
                            />
                        ) : item.type === "buttonmultiselect" ? (
                            <ButtonMultiSelect
                                options={item.options as ButtonMultiSelectFieldOptions}
                                value={values[item.name] as ButtonMultiSelectValue[] ?? []}
                                onChange={(val) => handleChange(item.name, val)}
                                disabled={disabled}
                            />
                        ) : isTextType(item.type) ? (
                            <div css={styles.textInputContainer}>
                                <div css={[styles.input, hasError ? styles.inputError : undefined]}>
                                    <input
                                        css={styles.inputRaw}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        value={fieldValue}
                                        disabled={disabled}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            handleChange(item.name, val);
                                            item.onSearch?.(val);
                                            if (item.onSearch) setOpenSuggestionsField(item.name);
                                        }}
                                        onFocus={() => {
                                            if (itemSuggestions) setOpenSuggestionsField(item.name);
                                        }}
                                        onBlur={() => {
                                            // delay so mousedown on a suggestion fires first
                                            setTimeout(() => setOpenSuggestionsField(null), 150);
                                        }}
                                    />
                                    {showClear && (
                                        <Button
                                            icon={<MdClose />}
                                            onClick={() => {
                                                handleChange(item.name, '');
                                                item.onSearch?.('');
                                            }}
                                            customCss={styles.inputButton}
                                            customIconCss={styles.inputButtonIcon}
                                        />
                                    )}
                                </div>
                                {showSuggestions && (
                                    <DropdownListOptions
                                        options={itemSuggestions!}
                                        selected={fieldValue ? [fieldValue] : []}
                                        onSelect={(val) => {
                                            handleChange(item.name, val);
                                            setOpenSuggestionsField(null);
                                            item.onSuggestionSelect?.(val);
                                        }}
                                    />
                                )}
                            </div>
                        ) : (
                            <input
                                css={[styles.input, hasError ? styles.inputError : undefined]}
                                type={item.type}
                                placeholder={item.placeholder}
                                value={fieldValue}
                                onChange={(e) => handleChange(item.name, e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    </div>
                );
            })}

            {!disabled ? (
                <div css={[styles.fieldWrapper(columns), styles.submitRow]}>
                    {submitButton ?? <PrimaryButton type="submit" disabled={submitted && !isValid}>Submit</PrimaryButton>}
                </div>
            ) : (
                <></>
            )}
        </form>
    );
};

export default FormBuilder;
