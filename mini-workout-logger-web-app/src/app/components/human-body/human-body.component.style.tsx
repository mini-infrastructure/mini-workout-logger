import { css } from '@emotion/react';

const styles = {
    container: css({
        height: '100%',

        '& svg': {
            height: '100%',
            width: 'auto',
            display: 'block',
        },
    }),
};

export const globalMuscleStyles = css`
    [id^="Muscle."] {
        transition: filter 0.15s ease;
    }

    [id^="Muscle."]:hover,
    [id^="Muscle."]:hover path {
        filter: brightness(1.5);
    }

    .muscle--interactive [id^="Muscle."] {
        cursor: pointer;
    }

    .muscle--selected,
    .muscle--selected path {
        fill: var(--color-blue) !important;
        opacity: 0.8;
    }

    .muscle--highlighted,
    .muscle--highlighted path {
        fill: var(--color-orange) !important;
        opacity: 0.8;
    }
`;

export default styles;
