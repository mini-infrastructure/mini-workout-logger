import {css} from '@emotion/react';
import theme from '../../themes/theme';

const styles = {
    button: css({
        display: 'flex',
        width: '100%',
        padding: '1rem 2rem',
        borderRadius: 10,
        border: 'none',
        cursor: 'pointer',

        fontWeight: 700,
        fontSize: '1rem',

        transition: 'all 0.2s ease',

        ':hover': {
            opacity: 0.9,
            transform: 'translateY(-2px)',
        },
        ':active': {
            transform: 'translateY(0)',
        },
        ':disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
        },
    }),

    icon: css({
        fontSize: "1rem",
        marginRight: "0.6rem",
    }),

    buttonPrimary: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary.darkBlue,
        color: theme.colors.primary.white,
        width: 'auto',
    }),
};

export default styles;
