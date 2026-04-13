import { useState } from 'react';
import type { Interpolation, Theme } from '@emotion/react';
import { MdOpenInNew } from 'react-icons/md';
import Card from '../card/card.component.tsx';
import Rating from '../rating/rating.component.tsx';
import Badge from '../badge/badge.component.tsx';
import Divider from '../divider/divider.component.tsx';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component.tsx';
import type { DropdownMenuItem } from '../dropdown-menu/dropdown-menu.component.tsx';
import ExerciseDrawer from '../exercise-drawer/exercise-drawer.component.tsx';
import type { ExerciseReadDTO } from '../../dtos/exercise-read.dto.tsx';
import {
    ExerciseCategoryIcons,
    ExerciseCategoryVariants,
    ExerciseDifficultyVariants,
    getIconFromMap,
    getVariantFromMap,
} from '../../models/exercise.model.tsx';
import styles from './exercise-card.component.style.tsx';

const DIFFICULTY_LEVELS = [
    { label: 'NOVICE', level: 1 },
    { label: 'BEGINNER', level: 2 },
    { label: 'INTERMEDIATE', level: 3 },
    { label: 'ADVANCED', level: 4 },
];

export type ExerciseCardProps = {
    exercise: ExerciseReadDTO;
    onClick?: () => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const ExerciseCard = ({ exercise, onClick, customCss }: ExerciseCardProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const difficultyVariant = getVariantFromMap(ExerciseDifficultyVariants, exercise.difficulty);
    const categoryVariant = getVariantFromMap(ExerciseCategoryVariants, exercise.category);
    const categoryIcon = getIconFromMap(ExerciseCategoryIcons, exercise.category);

    const dropdownItems: DropdownMenuItem[] = [
        {
            label: 'Open',
            icon: <MdOpenInNew />,
            iconColor: 'info',
            onClick: () => setDrawerOpen(true),
        },
    ];

    return (
        <>
            <Card onClick={onClick} customCss={customCss}>
                <div css={styles.container}>
                    <div css={styles.header}>
                        <span css={styles.name}>{exercise.name}</span>
                        <DropdownMenu items={dropdownItems} />
                    </div>
                    <Divider customCss={styles.divider} />
                    <div css={styles.footer}>
                        {exercise.category && (
                            <Badge icon={categoryIcon} variant={categoryVariant}>
                                {exercise.category}
                            </Badge>
                        )}
                        {exercise.difficulty && (
                            <Rating
                                levelsInfo={DIFFICULTY_LEVELS}
                                selectedLevelLabel={exercise.difficulty}
                                variant={difficultyVariant}
                            />
                        )}
                    </div>
                </div>
            </Card>

            <ExerciseDrawer
                exercise={exercise}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </>
    );
};

export default ExerciseCard;
