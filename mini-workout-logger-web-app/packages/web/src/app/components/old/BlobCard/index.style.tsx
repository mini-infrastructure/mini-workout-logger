import { css } from '@emotion/react';

const styles = {
    /**
     * Removes the Card's own backdrop-filter and background so that
     * BlobGlassBackground can own the glass effect completely.
     */
    blobCard: css({
        isolation: 'isolate',
    }),
};

export default styles;
