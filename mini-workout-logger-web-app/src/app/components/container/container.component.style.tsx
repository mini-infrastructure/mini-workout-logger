import {css, Theme} from '@emotion/react';
import {transparentize} from 'polished';

const styles = {
    wrapper: (theme: Theme) => css({
        backgroundColor: transparentize(0.5, theme.colors.body),
        borderRadius: '1.5rem',
    }),
};

export default styles;
