import type {ReactNode, SyntheticEvent} from "react";
import {useEffect, useState} from "react";
import styles from "./form.input.component.style.tsx";
import Button from "../../components/button/button.component.tsx";

export type FormFieldType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea";

export type FormItem = {
    name: string;
    label: string;
    type: FormFieldType;
    placeholder?: string;
    options?: { label: string; value: string }[];
    colSpan?: number;
    initialValue?: any;
};

export type FormBuilderProps = {
    items: FormItem[];
    columns: number;
    onSubmit: (values: Record<string, any>) => void;
    submitButton?: ReactNode;
};

const buildInitialValues = (items: FormItem[]) => {
    const values: Record<string, any> = {};

    items.forEach((item) => {
        if (item.initialValue !== undefined) {
            values[item.name] = item.initialValue;
            return;
        }

        if (item.type === "select" && item.options?.length) {
            values[item.name] = item.options[0].value;
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
        setValues(buildInitialValues(items));
    }, [items]);

    return (
        <form css={styles.form(columns)} onSubmit={handleSubmit}>
            {items.map((item) => {
                const colSpan = Math.min(item.colSpan ?? 1, columns);

                return (
                    <div key={item.name} css={styles.fieldWrapper(colSpan)}>
                        <label>{item.label}</label>

                        {item.type === "select" ? (
                            <select
                                css={styles.input}
                                value={values[item.name] ?? ""}
                                onChange={(e) => handleChange(item.name, e.target.value)}
                            >
                                {item.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : item.type === "textarea" ? (
                            <textarea
                                css={styles.input}
                                placeholder={item.placeholder}
                                value={values[item.name] ?? ""}
                                onChange={(e) => handleChange(item.name, e.target.value)}
                            />
                        ) : (
                            <input
                                css={styles.input}
                                type={item.type}
                                placeholder={item.placeholder}
                                value={values[item.name] ?? ""}
                                onChange={(e) => handleChange(item.name, e.target.value)}
                            />
                        )}
                    </div>
                );
            })}

            <div css={styles.fieldWrapper(columns)}>
                {submitButton ?? <Button type="submit">Submit</Button>}
            </div>
        </form>
    );
};

export default FormBuilder;
