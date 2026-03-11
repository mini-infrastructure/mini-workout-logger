import {useEffect, useMemo, useState} from "react";
import type {ButtonMultiSelectFieldOptions, FormOption} from "./form.input.component.tsx";
import ButtonSelect from "./button.select.input.component.tsx";
import SecondaryButton from "../../button/button.secondary.component.tsx";
import Badge from "../../badge/badge.component.tsx";
import styles from "./form.input.component.style.tsx";

export type ButtonMultiSelectValue = {
    first: string;
    second: string;
};

type ButtonMultiSelectProps = {
    options: ButtonMultiSelectFieldOptions;
    value: ButtonMultiSelectValue[];
    onChange: (val: ButtonMultiSelectValue[]) => void;
};

const ButtonMultiSelect = ({
                               options,
                               value,
                               onChange,
                           }: ButtonMultiSelectProps) => {
    console.log('Value:', value);

    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");

    const usedFirstValues = value.map(v => v.first);

    const availableFirstOptions = useMemo(
        () => options.first.options.filter(o => !usedFirstValues.includes(o.value)),
        [options.first.options, usedFirstValues]
    );

    const addOption = () => {
        if (!firstValue || !secondValue) return;

        onChange([
            ...value,
            { first: firstValue, second: secondValue }
        ]);

        setFirstValue("");
        setSecondValue("");
    };

    const removeOption = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const getLabel = (val: string, options: FormOption[]) =>
        options.find(o => o.value === val)?.label ?? val;

    return (
        <div css={styles.wrapper}>

            <div css={styles.buttonMultiSelectContainer}>
                <ButtonSelect
                    options={availableFirstOptions}
                    placeholder={options.first.label}
                    inputEnabled={options.first.inputEnabled}
                    value={firstValue}
                    onChange={setFirstValue}
                />

                <ButtonSelect
                    options={options.second.options}
                    placeholder={options.second.label}
                    inputEnabled={options.second.inputEnabled}
                    value={secondValue}
                    onChange={setSecondValue}
                />
            </div>

            <div css={styles.buttonMultiSelectAddButton}>
                <SecondaryButton
                    onClick={addOption}
                    disabled={!firstValue || !secondValue}
                >
                    Add option
                </SecondaryButton>
            </div>

            <div css={styles.multiselectSelectedItems(value.length > 0)}>
                {value.map((item, index) => {

                    const firstLabel = getLabel(item.first, options.first.options);
                    const secondLabel = getLabel(item.second, options.second.options);

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
