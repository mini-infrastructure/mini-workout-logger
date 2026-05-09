import type {Interpolation, Theme} from '@emotion/react';
import Card from '../card/card.component.tsx';
import Badge from '../badge/badge.component.tsx';
import type {WorkoutExecutionReadDTO} from '../../dtos/workout-execution-read.dto.tsx';
import styles from './workout-execution-history-card.component.style.tsx';

export type WorkoutExecutionHistoryCardProps = {
    execution: WorkoutExecutionReadDTO;
    onClick?: () => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const WorkoutExecutionHistoryCard = ({ execution, onClick, customCss }: WorkoutExecutionHistoryCardProps) => {
    console.log(execution)
    const formattedDate = execution.start_time
        ? new Date(execution.start_time).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
          })
        : '—';

    return (
        <Card onClick={onClick} customCss={customCss}>
            <div css={styles.container}>
                <span css={styles.date}>{formattedDate}</span>
                <Badge variant={execution.completed ? 'success' : 'gray'}>
                    {execution.completed ? 'Completed' : 'Incomplete'}
                </Badge>
            </div>
        </Card>
    );
};

export default WorkoutExecutionHistoryCard;
