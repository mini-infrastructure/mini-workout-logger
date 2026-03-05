import {css} from '@emotion/react';

const styles = {
    divider: (theme: any) => css({
        width: '90%',
        border: 'none',
        borderBottom: `1px solid ${theme.colors.border1}`,
    }),
};

export default styles;
