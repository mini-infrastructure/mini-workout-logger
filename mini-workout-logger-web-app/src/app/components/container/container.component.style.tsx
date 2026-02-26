import {css, Theme} from '@emotion/react';
import {transparentize} from 'polished';

const styles = {
    wrapper: (theme: Theme) => css({
        backgroundColor: transparentize(0.5, theme.colors.container1),
        borderRadius: '1.5rem',
    }),
};

export default styles;
