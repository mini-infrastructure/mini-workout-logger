import { css, keyframes } from '@emotion/react';

const floatUp = keyframes({
    from: {
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 'var(--font-size-md)',
    },
    to: {
        top: 'var(--space-sm)',
        transform: 'translateY(0)',
        fontSize: 'var(--input-label-size)',
    },
});

const floatDown = keyframes({
    from: {
        top: 'var(--space-sm)',
        transform: 'translateY(0)',
        fontSize: 'var(--input-label-size)',
    },
    to: {
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 'var(--font-size-md)',
    },
});

const spin = keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
});

const styles = {
    wrapper: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
    }),

    container: css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: 'var(--input-height)',
        backgroundColor: 'var(--input-bg)',
        borderRadius: 'var(--radius-sm)',
        border: 'var(--input-border-width) solid var(--input-border-color)',
        transition: 'border-color var(--transition-fast)',
        cursor: 'text',
    }),

    containerFocused: css({
        borderColor: 'var(--input-border-focus)',
    }),

    containerError: css({
        borderColor: 'var(--input-border-error)',
    }),

    containerDisabled: css({
        opacity: 0.6,
        cursor: 'not-allowed',
    }),

    inputWrapper: css({
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingTop: 'var(--space-lg)',
        paddingBottom: 'var(--space-sm)',
    }),

    input: css({
        width: '100%',
        height: '100%',
        padding: 0,
        paddingRight: 'var(--input-padding-x)',
        paddingLeft: 'var(--input-padding-x)',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: 'var(--input-text)',
        fontSize: 'var(--font-size-md)',
        fontFamily: 'var(--font-family)',
        lineHeight: 'var(--line-height-normal)',

        '&::placeholder': {
            color: 'transparent',
        },

        '&:disabled': {
            cursor: 'not-allowed',
        },
    }),

    inputWithIconLeft: css({
        paddingLeft: 0,
    }),

    inputWithIconRight: css({
        paddingRight: 0,
    }),

    label: css({
        position: 'absolute',
        left: 'var(--input-padding-x)',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--input-label-color)',
        fontSize: 'var(--font-size-md)',
        fontWeight: 'var(--font-weight-regular)',
        pointerEvents: 'none',
        transition: 'all var(--transition-fast)',
        transformOrigin: 'left center',
    }),

    labelWithIconLeft: css({
        left: 0,
    }),

    labelFloating: css({
        top: 'var(--space-sm)',
        transform: 'translateY(0)',
        fontSize: 'var(--input-label-size)',
        fontWeight: 'var(--font-weight-medium)',
    }),

    labelAnimateUp: css({
        animation: `${floatUp} var(--transition-fast) forwards`,
    }),

    labelAnimateDown: css({
        animation: `${floatDown} var(--transition-fast) forwards`,
    }),

    iconContainer: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: '2.5rem',
        height: '100%',
        color: 'var(--input-text)',
        fontSize: 'var(--font-size-lg)',
    }),

    iconClickable: css({
        cursor: 'pointer',
        transition: 'opacity var(--transition-fast)',

        '&:hover': {
            opacity: 0.7,
        },
    }),

    clearButton: css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2rem',
        height: '2rem',
        marginRight: 'var(--space-xs)',
        padding: 0,
        border: 'none',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'transparent',
        color: 'var(--input-text)',
        fontSize: 'var(--font-size-md)',
        cursor: 'pointer',
        transition: 'background-color var(--transition-fast)',

        '&:hover': {
            backgroundColor: 'rgba(15, 22, 32, 0.1)',
        },
    }),

    loadingSpinner: css({
        width: '1.25rem',
        height: '1.25rem',
        border: '0.125rem solid rgba(15, 22, 32, 0.2)',
        borderTopColor: 'var(--input-text)',
        borderRadius: 'var(--radius-full)',
        animation: `${spin} 0.8s linear infinite`,
    }),

    helperText: css({
        fontSize: 'var(--font-size-xs)',
        color: 'var(--input-helper-color)',
        paddingLeft: 'var(--input-padding-x)',
    }),

    errorText: css({
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-red)',
        paddingLeft: 'var(--input-padding-x)',
    }),

    validationList: css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2xs)',
        paddingLeft: 'var(--input-padding-x)',
        margin: 0,
        listStyle: 'none',
    }),

    validationItem: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-xs)',
        fontSize: 'var(--font-size-xs)',
    }),

    validationItemValid: css({
        color: 'var(--color-green)',
    }),

    validationItemInvalid: css({
        color: 'var(--color-red)',
    }),

    validationIcon: css({
        fontSize: 'var(--font-size-sm)',
    }),
};

export default styles;
