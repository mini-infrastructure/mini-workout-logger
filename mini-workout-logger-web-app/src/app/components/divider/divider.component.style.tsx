import {css} from '@emotion/react';
import theme from "../../themes/theme.ts";
import {transparentize} from "polished";

const styles = {
    divider: css({
        display: 'flex',
        width: '90%',
        borderTopStyle: 'solid',
        marginBottom: '1rem',
        marginTop: '1rem',
        color: transparentize(0.8, theme.colors.primary.darkGray),
    }),
};

export default styles;
