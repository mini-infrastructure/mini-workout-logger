import {css} from '@emotion/react';
import {transparentize} from "polished";

const styles = {
    wrapper: css({
        backgroundColor: 'color-mix(in srgb, var(--color-container1) 50%, transparent)',
        borderRadius: 'var(--borderRadius-xlarge)',
    }),
};

export default styles;
