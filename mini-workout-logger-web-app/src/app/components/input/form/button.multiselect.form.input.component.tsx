import {useState} from "react";
import type {FormOption} from "./form.input.component.tsx";
import ButtonSelect from "./button.select.input.component.tsx";
import SecondaryButton from "../../button/button.secondary.component.tsx";
import Badge from "../../badge/badge.component.tsx";
import styles from "./form.input.component.style.tsx";

type ButtonMultiSelectProps = {
    first: {
        options: FormOption[];
        label?: string;
        inputEnabled?: boolean;
    };

    second: {
        options: FormOption[];
        label?: string;
        inputEnabled?: boolean;
    };

    value: { first: string; second: string }[];
    onChange: (val: { first: string; second: string }[]) => void;
};

const ButtonMultiSelect = ({
                               first,
                               second,
                               value,
                               onChange,
                           }: ButtonMultiSelectProps) => {

    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");

    const addOption = () => {
        if (!firstValue || !secondValue) return;

        const exists = value.some(
            (v) => v.first === firstValue && v.second === secondValue
        );

        if (exists) return;

        onChange([...value, { first: firstValue, second: secondValue }]);

        setFirstValue("");
        setSecondValue("");
    };

    const removeOption = (index: number) => {
        const newValues = value.filter((_, i) => i !== index);
        onChange(newValues);
    };

    const getLabel = (opt: string, options: FormOption[]) =>
        options.find((o) => o.value === opt)?.label ?? opt;

    return (
        <div css={styles.wrapper}>

            {/* SELECTORS */}
            <div css={styles.buttonMultiSelectContainer}>
                <ButtonSelect
                    options={first.options}
                    placeholder={first.label}
                    inputEnabled={first.inputEnabled}
                    value={firstValue}
                    onChange={setFirstValue}
                />

                <ButtonSelect
                    options={second.options}
                    placeholder={second.label}
                    inputEnabled={second.inputEnabled}
                    value={secondValue}
                    onChange={setSecondValue}
                />
            </div>

            {/* ADD BUTTON */}
            <div css={styles.buttonMultiSelectAddButton}>
                <SecondaryButton onClick={addOption}>
                    Add option
                </SecondaryButton>
            </div>

            {/* SELECTED OPTIONS */}
            <div css={styles.multiselectSelectedItems(value.length > 0)}>
                {value.map((item, index) => {

                    const firstLabel = getLabel(item.first, first.options);
                    const secondLabel = getLabel(item.second, second.options);

                    return (
                        <Badge
                            key={`${item.first}-${item.second}-${index}`}
                            onRemove={() => removeOption(index)}
                            customCss={styles.badgeCustomCss}
                        >
                            {firstLabel} + {secondLabel}
                        </Badge>
                    );
                })}
            </div>

        </div>
    );
};

export default ButtonMultiSelect;
