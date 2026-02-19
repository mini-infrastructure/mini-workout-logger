import { css } from '@emotion/react';
import { darken } from 'polished';

const styles = {
    divider: (theme: any) => css({
        display: 'flex',
        width: '90%',
        borderTopStyle: 'solid',
        marginBottom: '1rem',
        marginTop: '1rem',
        borderColor: darken(0.01, theme.colors.body),
    }),
};

export default styles;
