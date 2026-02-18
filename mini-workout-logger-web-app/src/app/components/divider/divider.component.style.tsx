import {css} from '@emotion/react';
import theme from "../../themes/theme.ts";
import {darken} from "polished";

const styles = {
    divider: css({
        display: 'flex',
        width: '90%',
        borderTopStyle: 'solid',
        marginBottom: '1rem',
        marginTop: '1rem',
        color: darken(0.01, theme.colors.primary.lightGray),
    }),
};

export default styles;
