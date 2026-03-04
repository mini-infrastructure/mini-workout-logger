import {css} from '@emotion/react';
import {darken} from 'polished';

const styles = {
    divider: (theme: any) => css({
        width: '90%',
        border: 'none',
        borderBottom: `1px solid ${theme.colors.border1}`,
    }),
};

export default styles;
