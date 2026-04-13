import type { Interpolation, Theme } from '@emotion/react';
import Card from '../card/card.component.tsx';
import Rating from '../rating/rating.component.tsx';
import type { ExerciseReadDTO } from '../../dtos/exercise-read.dto.tsx';
import { ExerciseCategoryIcons, ExerciseCategoryVariants, ExerciseDifficultyVariants, getIconFromMap, getVariantFromMap } from '../../models/exercise.model.tsx';
import Badge from '../badge/badge.component.tsx';
import styles from './exercise-card.component.style.tsx';
import Divider from "../divider/divider.component.tsx";

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
    const difficultyVariant = getVariantFromMap(ExerciseDifficultyVariants, exercise.difficulty);
    const categoryVariant = getVariantFromMap(ExerciseCategoryVariants, exercise.category);
    const categoryIcon = getIconFromMap(ExerciseCategoryIcons, exercise.category);

    return (
        <Card onClick={onClick} customCss={customCss}>
            <div css={styles.container}>
                <span css={styles.name}>{exercise.name}</span>
                <Divider customCss={styles.divider} />
                <div css={styles.footer}>
                    {exercise.category && (
                        <Badge icon={categoryIcon}>
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
    );
};

export default ExerciseCard;
