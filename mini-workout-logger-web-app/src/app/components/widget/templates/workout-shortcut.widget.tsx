import {css} from '@emotion/react';
import {useNavigate} from 'react-router-dom';

type WorkoutShortcutWidgetProps = {
    count: number;
    editMode?: boolean;
};

const WorkoutShortcutWidget = ({ count, editMode = false }: WorkoutShortcutWidgetProps) => {
    const navigate = useNavigate();

    return (
        <div
            css={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--stack-gap-condensed)',
                width: '100%',
                height: '100%',
                cursor: editMode ? 'default' : 'pointer',
            })}
            onClick={editMode ? undefined : () => navigate('/workouts')}
        >
            <span css={css({ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1, color: 'var(--color-white)', fontFamily: 'var(--font-number)' })}>
                {count}
            </span>
            <span css={css({ fontSize: 'var(--size-small)', color: 'var(--color-white)', textTransform: 'uppercase', letterSpacing: '0.08em' })}>
                {count === 1 ? 'workout' : 'workouts'}
            </span>
        </div>
    );
};

export default WorkoutShortcutWidget;
