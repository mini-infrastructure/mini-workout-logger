import { useState } from 'react';

import type { Interpolation, Theme } from '@emotion/react';
import { MdOpenInNew } from 'react-icons/md';
import { FaRegStar, FaStar } from 'react-icons/fa';
import Card from '../card/card.component.tsx';
import Rating from '../rating/rating.component.tsx';
import Badge from '../badge/badge.component.tsx';
import Divider from '../divider/divider.component.tsx';
import DropdownMenu from '../dropdown-menu/dropdown-menu.component.tsx';
import type { DropdownMenuItem } from '../dropdown-menu/dropdown-menu.component.tsx';
import Button from '../button/button.component.tsx';
import { capitalize } from '../badge/badge.component.tsx';
import ExerciseDrawer from '../exercise-drawer/exercise-drawer.component.tsx';
import type { ExerciseReadDTO } from '../../dtos/exercise-read.dto.tsx';
import {
    ExerciseCategoryIcons,
    ExerciseDifficultyVariants,
    ExerciseEquipmentIcons,
    ExerciseEquipmentVariants,
    getIconFromMap,
    getVariantFromMap,
} from '../../models/exercise.model.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import { useAlert } from '../../context/alert.context.tsx';
import styles from './exercise-card.component.style.tsx';

const DIFFICULTY_LEVELS = [
    { label: 'NOVICE', level: 1 },
    { label: 'BEGINNER', level: 2 },
    { label: 'INTERMEDIATE', level: 3 },
    { label: 'ADVANCED', level: 4 },
];

export type ExerciseCardProps = {
    exercise: ExerciseReadDTO;
    isFavorited?: boolean;
    onFavoriteToggle?: (id: number, favorited: boolean) => void;
    onClick?: () => void;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const ExerciseCard = ({ exercise, isFavorited = false, onFavoriteToggle, onClick, customCss }: ExerciseCardProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pushAlert = useAlert();

    const difficultyVariant = getVariantFromMap(ExerciseDifficultyVariants, exercise.difficulty);
    const categoryIcon = getIconFromMap(ExerciseCategoryIcons, exercise.category);
    const equipmentIcon = getIconFromMap(ExerciseEquipmentIcons, exercise.equipment);
    const equipmentVariant = getVariantFromMap(ExerciseEquipmentVariants, exercise.equipment);

    const handleFavorite = async () => {
        if (isFavorited) {
            await ExerciseService.unfavorite(exercise.id);
            pushAlert(`${exercise.name} removed from favorites.`, 'info');
        } else {
            await ExerciseService.favorite(exercise.id);
            pushAlert(`${exercise.name} added to favorites.`, 'success');
        }
        onFavoriteToggle?.(exercise.id, !isFavorited);
    };

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
                        <div css={styles.actions}>
                            <span onClick={(e) => e.stopPropagation()}>
                                <Button
                                    icon={<FaRegStar />}
                                    clickedIcon={<FaStar />}
                                    isClicked={isFavorited}
                                    customIconCss={styles.favoriteIcon}
                                    onClick={handleFavorite}
                                    customCss={styles.favoriteButton}
                                />
                            </span>
                            <DropdownMenu items={dropdownItems} />
                        </div>
                    </div>
                    <div css={styles.attributes}>
                        {exercise.equipment && (
                            <div css={styles.attributeRow}>
                                <span css={styles.attributeLabel}>Equipment</span>
                                <Badge icon={equipmentIcon} variant={equipmentVariant}>{capitalize(exercise.equipment)}</Badge>
                            </div>
                        )}
                        {exercise.mechanics && (
                            <div css={styles.attributeRow}>
                                <span css={styles.attributeLabel}>Mechanics</span>
                                <Badge>{capitalize(exercise.mechanics)}</Badge>
                            </div>
                        )}
                        {exercise.force && (
                            <div css={styles.attributeRow}>
                                <span css={styles.attributeLabel}>Force</span>
                                <Badge>{capitalize(exercise.force)}</Badge>
                            </div>
                        )}
                        {exercise.role && (
                            <div css={styles.attributeRow}>
                                <span css={styles.attributeLabel}>Role</span>
                                <Badge>{capitalize(exercise.role)}</Badge>
                            </div>
                        )}
                        {exercise.type && (
                            <div css={styles.attributeRow}>
                                <span css={styles.attributeLabel}>Type</span>
                                <Badge>{capitalize(exercise.type)}</Badge>
                            </div>
                        )}
                        {exercise.group_name && (
                            <div css={styles.attributeRow}>
                                <span css={styles.attributeLabel}>Group</span>
                                <Badge>{exercise.group_name}</Badge>
                            </div>
                        )}
                        {exercise.root_muscles && exercise.root_muscles.length > 0 && (
                            <div css={styles.attributeRow}>
                                <span css={styles.attributeLabel}>Muscles</span>
                                <div css={styles.attributeBadges}>
                                    {exercise.root_muscles.map(muscle => (
                                        <Badge key={muscle}>{muscle}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <Divider customCss={styles.divider} />
                    <div css={styles.footer}>
                        {exercise.category && (
                            <Badge icon={categoryIcon}>
                                {capitalize(exercise.category)}
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
