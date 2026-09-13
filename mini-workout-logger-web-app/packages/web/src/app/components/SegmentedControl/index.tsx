import { useRef, useLayoutEffect, type ReactNode } from 'react';
import styles from './index.style';

export type SegmentedControlOption = {
    value: string;
    label?: string;
    icon?: ReactNode;
    disabled?: boolean;
};

type SegmentedControlProps = {
    options: SegmentedControlOption[];
    selected?: string;
    onSelect?: (value: string) => void;
    size?: 'md' | 'lg';
};

const SegmentedControl = ({
    options,
    selected,
    onSelect,
    size = 'md',
}: SegmentedControlProps) => {
    const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);

    const selectedIndex = options.findIndex((opt) => opt.value === selected);
    const hasSelection = selectedIndex !== -1;
    const isLarge = size === 'lg';

    useLayoutEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        if (!hasSelection) {
            slider.style.width = '0px';
            slider.style.transform = 'translateX(0px)';
            return;
        }

        const selectedButton = optionsRef.current[selectedIndex];
        if (!selectedButton) return;

        let offsetLeft = 0;
        for (let i = 0; i < selectedIndex; i++) {
            const btn = optionsRef.current[i];
            if (btn) offsetLeft += btn.offsetWidth;
        }

        slider.style.width = `${selectedButton.offsetWidth}px`;
        slider.style.transform = `translateX(${offsetLeft}px)`;
    }, [selectedIndex, hasSelection, options]);

    const handleOptionClick = (option: SegmentedControlOption) => {
        if (option.disabled) return;
        onSelect?.(option.value);
    };

    const isIconMode = options.every((opt) => opt.icon && !opt.label);

    return (
        <div css={[styles.container, isLarge && styles.containerLarge]}>
            {hasSelection && (
                <div
                    ref={sliderRef}
                    css={[styles.slider, isLarge && styles.sliderLarge]}
                />
            )}
            <div css={styles.optionsWrapper}>
                {options.map((option, index) => {
                    const isSelected = option.value === selected;

                    return (
                        <button
                            key={option.value}
                            ref={(el) => {
                                optionsRef.current[index] = el;
                            }}
                            css={[
                                styles.option,
                                isLarge && styles.optionLarge,
                                isIconMode && styles.optionIcon,
                                isIconMode && isLarge && styles.optionIconLarge,
                                isSelected && styles.optionSelected,
                            ]}
                            onClick={() => handleOptionClick(option)}
                            disabled={option.disabled}
                            type="button"
                        >
                            {option.icon && (
                                <span css={[styles.icon, isLarge && styles.iconLarge]}>
                                    {option.icon}
                                </span>
                            )}
                            {option.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default SegmentedControl;
