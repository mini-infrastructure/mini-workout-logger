import type { Interpolation, Theme } from '@emotion/react';
import { FaPlay } from 'react-icons/fa';
import {MdDelete, MdEdit, MdOpenInNew} from 'react-icons/md';
import { IoCopy } from 'react-icons/io5';
import { IoMdArchive } from 'react-icons/io';
import Card from '../card/card.component.tsx';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component.tsx';
import type { DropdownMenuItem } from '../dropdown-menu/dropdown-menu.component.tsx';
import type { WorkoutReadDTO } from '../../dtos/workout-read.dto.tsx';
import styles from './workout-card.component.style.tsx';

export type WorkoutCardProps = {
    workout: WorkoutReadDTO;
    onStart?: () => void;
    onEdit?: () => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const WorkoutCard = ({ workout, onStart, onEdit, customCss }: WorkoutCardProps) => {
    const dropdownItems: DropdownMenuItem[] = [
        {
            label: 'Start',
            icon: <FaPlay />,
            iconColor: 'primary',
            onClick: onStart,
        },
        {
            label: 'Open',
            icon: <MdOpenInNew />,
            iconColor: 'info',
            onClick: onEdit,
        },
        {
            label: 'Copy',
            icon: <IoCopy />,
            iconColor: 'info',
        },
        {
            label: 'Archive',
            icon: <IoMdArchive />,
            iconColor: 'danger',
            dividerBefore: true,
        },
        {
            label: 'Delete',
            icon: <MdDelete />,
            iconColor: 'danger',
        },
    ];

    return (
        <Card customCss={customCss}>
            <div css={styles.container}>
                <div css={styles.header}>
                    <span css={styles.name}>{workout.name}</span>
                    <span onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu items={dropdownItems} />
                    </span>
                </div>

                {workout.workout_exercises?.length > 0 && (
                    <ul css={styles.exerciseList}>
                        {workout.workout_exercises.map((we) => (
                            <li key={we.id} css={styles.exerciseItem}>
                                <span css={styles.exerciseName}>{we.exercise.name}</span>
                                <span css={styles.exerciseSets}>x{we.sets.length}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Card>
    );
};

export default WorkoutCard;
