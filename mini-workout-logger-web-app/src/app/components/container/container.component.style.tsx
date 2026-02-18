import {css} from '@emotion/react';
import theme from "../../themes/theme.ts";
import {transparentize} from "polished";

const styles = {
    wrapper: css({
        backgroundColor: transparentize(0.5, theme.colors.primary.lightGray),
        borderRadius: '1.5rem',
    }),
};

export default styles;
