import {css} from '@emotion/react';
import {darken} from 'polished';

const styles = {
    divider: (theme: any) => css({
        display: 'flex',
        width: '90%',
        borderTopStyle: 'solid',
        borderColor: theme.colors.border1,
    }),
};

export default styles;
