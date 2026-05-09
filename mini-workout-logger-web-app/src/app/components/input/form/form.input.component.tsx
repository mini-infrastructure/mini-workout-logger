import type {ReactNode, SyntheticEvent} from "react";
import {useEffect, useMemo, useRef, useState} from "react";
import styles from "./form.input.component.style.tsx";
import MultiSelect from "./multiselect.form.input.component.tsx";
import Select from "./select.input.component.tsx";
import ButtonSelect from "./button.select.input.component.tsx";
import ButtonMultiSelect from "./button.multiselect.form.input.component.tsx";
import PrimaryButton from "../../button/button.primary.component.tsx";

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
};

export type FormBuilderProps = {
    items: FormItem[];
    columns: number;
    onSubmit: (values: Record<string, FormFieldValue>) => void;
    submitButton?: ReactNode;
    disabled?: boolean;
    id?: string;
    onValidationChange?: (canSubmit: boolean) => void;
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
                     }: FormBuilderProps) => {
    const [values, setValues] = useState<Record<string, FormFieldValue>>(() => buildInitialValues(items));
    const [submitted, setSubmitted] = useState(false);
    const prevItemsRef = useRef(items);

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

    // Only sync values whose initialValue actually changed since last render.
    // This prevents resetting user-typed values when unrelated items (e.g. a
    // custom/image item) cause the items array reference to change.
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
                return (
                    <div key={item.name} css={styles.fieldWrapper(colSpan)}>
                        <label>{item.label}</label>
                        {item.type === "select" ? (
                            <Select
                                options={item.options as FormOption[]}
                                value={values[item.name] as string ?? ""}
                                onChange={(val) => handleChange(item.name, val)}
                                placeholder={item.placeholder}
                                disabled={disabled}
                                error={hasError}
                            />
                        ) : item.type === "textarea" ? (
                            <textarea
                                css={[styles.input, hasError ? styles.inputError : undefined]}
                                placeholder={item.placeholder}
                                value={values[item.name] as string ?? ""}
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
                                value={values[item.name] as string ?? ""}
                                inputEnabled={item.inputEnabled}
                                onChange={(val) => handleChange(item.name, val)}
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
                        ) : (
                            <input
                                css={[styles.input, hasError ? styles.inputError : undefined]}
                                type={item.type}
                                placeholder={item.placeholder}
                                value={values[item.name] as string ?? ""}
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
