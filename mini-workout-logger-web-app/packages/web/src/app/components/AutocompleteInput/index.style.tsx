import { css } from '@emotion/react';

const styles = {
    wrapper: css({
        position: 'relative',
    }),
    dropdown: css({
        // Position directly below the input, not below the helper text
        top: 'var(--input-height)',
    }),
};

export default styles;
