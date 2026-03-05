import type {ReactNode, SyntheticEvent} from "react";
import {useState} from "react";
import styles from "./form.input.component.style.tsx";

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
};

export type FormBuilderProps = {
    items: FormItem[];
    columns: number;
    onSubmit: (values: Record<string, any>) => void;
    submitButton?: ReactNode;
};

const FormBuilder = ({
                         items,
                         columns,
                         onSubmit,
                         submitButton,
                     }: FormBuilderProps) => {
    const [values, setValues] = useState<Record<string, any>>({});

    const handleChange = (name: string, value: any) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(values);
    };

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
                                onChange={(e) => handleChange(item.name, e.target.value)}
                            />
                        ) : (
                            <input
                                css={styles.input}
                                type={item.type}
                                placeholder={item.placeholder}
                                onChange={(e) => handleChange(item.name, e.target.value)}
                            />
                        )}
                    </div>
                );
            })}

            <div css={styles.fieldWrapper(columns)}>
                {submitButton ?? <button type="submit">Submit</button>}
            </div>
        </form>
    );
};

export default FormBuilder;
