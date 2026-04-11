import type {ReactNode, SyntheticEvent} from "react";
import {useEffect, useState} from "react";
import styles from "./form.input.component.style.tsx";
import Button from "../../button/button.component.tsx";
import MultiSelect from "./multiselect.form.input.component.tsx";
import Select from "./select.input.component.tsx";
import ButtonSelect from "./button.select.input.component.tsx";
import ButtonMultiSelect from "./button.multiselect.form.input.component.tsx";

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
    ;

export type FormOption = {
    label: string;
    value: string;
};

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
    initialValue?: any;
    inputEnabled?: boolean;
};

export type FormBuilderProps = {
    items: FormItem[];
    columns: number;
    onSubmit: (values: Record<string, any>) => void;
    submitButton?: ReactNode;
    disabled?: boolean;
};

const buildInitialValues = (items: FormItem[]) => {
    const values: Record<string, any> = {};

    items.forEach((item) => {
        if (item.initialValue !== undefined) {
            values[item.name] = item.initialValue;
            return;
        }

        if (item.type === "select" &&  Array.isArray(item.options) && item.options.length) {
            values[item.name] = item.options[0].value;
            return;
        }

        if (item.type === "multiselect") {
            values[item.name] = item.initialValue ?? [];
            return;
        }

        values[item.name] = "";
    });

    return values;
};

const FormBuilder = ({
                         items,
                         columns,
                         onSubmit,
                         submitButton,
                         disabled = false,
                     }: FormBuilderProps) => {
    const [values, setValues] = useState<Record<string, any>>(() => buildInitialValues(items));

    const handleChange = (name: string, value: any) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(values);
    };

    useEffect(() => {
        setValues(prev => ({
            ...prev,
            ...buildInitialValues(items)
        }));
    }, [items]);

    return (
        <form css={styles.form(columns)} onSubmit={handleSubmit}>
            {items.map((item) => {
                const colSpan = Math.min(item.colSpan ?? 1, columns);
                return (
                    <div key={item.name} css={styles.fieldWrapper(colSpan)}>
                        <label>{item.label}</label>

                        {item.type === "select" ? (
                            <Select
                                options={item.options as FormOption[]}
                                value={values[item.name] ?? ""}
                                onChange={(val) => handleChange(item.name, val)}
                                placeholder={item.placeholder}
                                disabled={disabled}
                            />
                        ) : item.type === "textarea" ? (
                            <textarea
                                css={styles.input}
                                placeholder={item.placeholder}
                                value={values[item.name] ?? ""}
                                onChange={(e) => handleChange(item.name, e.target.value)}
                                disabled={disabled}
                            />
                        ) : item.type === "multiselect" ? (
                            <MultiSelect
                                options={item.options as FormOption[]}
                                value={values[item.name] ?? []}
                                onChange={(val) => handleChange(item.name, val)}
                                placeholder={item.placeholder}
                                disabled={disabled}
                            />
                        ) : item.type === "buttonselect" ? (
                            <ButtonSelect
                                options={item.options as FormOption[]}
                                placeholder={item.placeholder}
                                value={values[item.name] ?? ""}
                                inputEnabled={item.inputEnabled}
                                onChange={(val) => handleChange(item.name, val)}
                                disabled={disabled}
                            />
                        ) : item.type === "buttonmultiselect" ? (
                            <ButtonMultiSelect
                                options={item.options as ButtonMultiSelectFieldOptions}
                                value={values[item.name] ?? []}
                                onChange={(val) => handleChange(item.name, val)}
                                disabled={disabled}
                            />
                        ) : (
                            <input
                                css={styles.input}
                                type={item.type}
                                placeholder={item.placeholder}
                                value={values[item.name] ?? ""}
                                onChange={(e) => handleChange(item.name, e.target.value)}
                                disabled={disabled}
                            />
                        )}
                    </div>
                );
            })}

            {!disabled ? (
                <div css={styles.fieldWrapper(columns)} style={{ marginTop: "0.5rem" }}>
                    {submitButton ?? <Button type="submit">Submit</Button>}
                </div>
            ) : (
                <></>
            )}
        </form>
    );
};

export default FormBuilder;
