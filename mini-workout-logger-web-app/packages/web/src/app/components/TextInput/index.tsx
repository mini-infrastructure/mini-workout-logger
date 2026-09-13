import { useState, useRef, useId, type ReactNode, type ChangeEvent, type FocusEvent } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { FiX, FiCheck } from 'react-icons/fi';
import styles from './index.style';

export type ValidationRule = {
    label: string;
    validate: (value: string) => boolean;
};

export type TextInputProps = {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel';
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    onIconClick?: () => void;
    /** Element to render on the right side of the input (e.g., filter button) */
    rightElement?: ReactNode;
    error?: string;
    helperText?: string;
    validationRules?: ValidationRule[];
    loading?: boolean;
    disabled?: boolean;
    required?: boolean;
    showClearButton?: boolean;
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    customCss?: SerializedStyles;
};

const TextInput = ({
    name,
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    icon,
    iconPosition = 'right',
    onIconClick,
    rightElement,
    error,
    helperText,
    validationRules,
    loading = false,
    disabled = false,
    required = false,
    showClearButton = false,
    onFocus,
    onBlur,
    customCss,
}: TextInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasBeenFocused, setHasBeenFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();

    const hasValue = value.length > 0;
    const shouldFloat = isFocused || hasValue;
    const hasIcon = icon || loading;
    const showClear = showClearButton && hasValue && !disabled && !loading;

    const handleContainerClick = () => {
        if (!disabled) {
            inputRef.current?.focus();
        }
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        setHasBeenFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleClear = () => {
        onChange('');
        inputRef.current?.focus();
    };

    const handleIconClick = () => {
        if (onIconClick && !disabled) {
            onIconClick();
        }
    };

    const getLabelStyle = () => {
        if (!hasBeenFocused) {
            return shouldFloat ? styles.labelFloating : undefined;
        }
        return shouldFloat ? styles.labelAnimateUp : styles.labelAnimateDown;
    };

    const renderIcon = () => {
        if (loading) {
            return (
                <div css={styles.iconContainer}>
                    <div css={styles.loadingSpinner} />
                </div>
            );
        }

        if (icon) {
            return (
                <div
                    css={[styles.iconContainer, onIconClick && styles.iconClickable]}
                    onClick={handleIconClick}
                >
                    {icon}
                </div>
            );
        }

        return null;
    };

    const renderValidationRules = () => {
        if (!validationRules || validationRules.length === 0) return null;

        return (
            <ul css={styles.validationList}>
                {validationRules.map((rule, index) => {
                    const isValid = rule.validate(value);
                    return (
                        <li
                            key={index}
                            css={[
                                styles.validationItem,
                                isValid ? styles.validationItemValid : styles.validationItemInvalid,
                            ]}
                        >
                            <span css={styles.validationIcon}>
                                {isValid ? <FiCheck /> : <FiX />}
                            </span>
                            {rule.label}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div css={[styles.wrapper, customCss]}>
            <div
                css={[
                    styles.container,
                    isFocused && styles.containerFocused,
                    error && styles.containerError,
                    disabled && styles.containerDisabled,
                ]}
                onClick={handleContainerClick}
            >
                {hasIcon && iconPosition === 'left' && renderIcon()}

                <div css={styles.inputWrapper}>
                    <label
                        htmlFor={inputId}
                        css={[
                            styles.label,
                            (hasIcon && iconPosition === 'left') ? styles.labelWithIconLeft : undefined,
                            getLabelStyle(),
                        ]}
                    >
                        {label}
                        {required && <span css={styles.requiredMarker}> *</span>}
                    </label>
                    <input
                        ref={inputRef}
                        id={inputId}
                        name={name}
                        type={type}
                        value={value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        css={[
                            styles.input,
                            (hasIcon && iconPosition === 'left') ? styles.inputWithIconLeft : undefined,
                            (hasIcon && iconPosition === 'right' || showClear) ? styles.inputWithIconRight : undefined,
                        ]}
                    />
                </div>

                {showClear && (
                    <button
                        type="button"
                        css={styles.clearButton}
                        onClick={handleClear}
                        tabIndex={-1}
                    >
                        <FiX />
                    </button>
                )}

                {hasIcon && iconPosition === 'right' && renderIcon()}

                {rightElement && (
                    <div css={styles.rightElementContainer}>
                        {rightElement}
                    </div>
                )}
            </div>

            {error && <span css={styles.errorText}>{error}</span>}
            {!error && helperText && <span css={styles.helperText}>{helperText}</span>}
            {!error && !helperText && renderValidationRules()}
        </div>
    );
};

export default TextInput;
