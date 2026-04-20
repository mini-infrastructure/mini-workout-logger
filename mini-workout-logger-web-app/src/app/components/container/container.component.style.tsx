import {css} from '@emotion/react';
import {transparentize} from 'polished';

const styles = {
    wrapper: css({
        backgroundColor: transparentize(0.5, '#0D1117'),
        borderRadius: 'var(--borderRadius-xlarge)',
    }),
};

export default styles;
