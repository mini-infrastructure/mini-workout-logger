import type { Interpolation, Theme } from '@emotion/react';
import { FaPlay } from 'react-icons/fa';
import { MdDelete, MdOpenInNew } from 'react-icons/md';
import { IoCopy } from 'react-icons/io5';
import { IoMdArchive } from 'react-icons/io';
import Card from '../card/card.component.tsx';
import Badge from '../badge/badge.component.tsx';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component.tsx';
import type { DropdownMenuItem } from '../dropdown-menu/dropdown-menu.component.tsx';
import type { WorkoutReadDTO } from '../../dtos/workout-read.dto.tsx';
import styles from './workout-card.component.style.tsx';

export type WorkoutCardProps = {
    workout: WorkoutReadDTO;
    onStart?: () => void;
    onOpen?: () => void;
    selectedTagIds?: number[];
    onTagClick?: (tagId: number) => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const WorkoutCard = ({ workout, onStart, onOpen, selectedTagIds = [], onTagClick, customCss }: WorkoutCardProps) => {
    const dropdownItems: DropdownMenuItem[] = [
        {
            label: 'Open',
            icon: <MdOpenInNew />,
            iconColor: 'info',
            onClick: onOpen,
        },
        {
            label: 'Start',
            icon: <FaPlay />,
            iconColor: 'primary',
            onClick: onStart,
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

    const tags = workout.tags ?? [];

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

                {tags.length > 0 && (
                    <div css={styles.tags} onClick={(e) => e.stopPropagation()}>
                        {tags.map((tag) => (
                            <Badge
                                key={tag.id}
                                selected={selectedTagIds.includes(tag.id)}
                                onClick={() => onTagClick?.(tag.id)}
                            >
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default WorkoutCard;
