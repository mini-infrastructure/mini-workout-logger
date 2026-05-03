import { css } from '@emotion/react';

type WorkoutShortcutWidgetProps = {
    count: number;
};

const WorkoutShortcutWidget = ({ count }: WorkoutShortcutWidgetProps) => {
    return (
        <div css={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--stack-gap-condensed)' })}>
            <span css={css({ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1, color: 'var(--color-text)', fontFamily: 'var(--font-number)' })}>
                {count}
            </span>
            <span css={css({ fontSize: 'var(--size-small)', color: 'var(--color-gray)', textTransform: 'uppercase', letterSpacing: '0.08em' })}>
                {count === 1 ? 'workout' : 'workouts'}
            </span>
        </div>
    );
};

export default WorkoutShortcutWidget;
