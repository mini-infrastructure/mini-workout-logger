import {css} from '@emotion/react';
import theme from "../../themes/theme.ts";

const styles = {
    divider: css({
        display: 'flex',
        width: '90%',
        borderTopStyle: 'solid',
        marginBottom: '1rem',
        marginTop: '1rem',
        color: theme.colors.primary.darkGrayTransparency,
    }),
};

export default styles;
