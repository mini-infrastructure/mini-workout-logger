import { useState } from 'react';
import { css } from '@emotion/react';
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
import Image from '../image/image.component.tsx';
import ExerciseDrawer from '../exercise-drawer/exercise-drawer.component.tsx';
import type { ExerciseReadDTO } from '../../dtos/exercise-read.dto.tsx';
import {
    ExerciseDifficultyVariants,
    getVariantFromMap,
} from '../../models/exercise.model.tsx';
import ExerciseService from '../../services/exercise.service.tsx';
import { useAlert } from '../../context/alert.context.tsx';
import BlobGlassBackground from '../background/blob-glass/blob-glass.component.tsx';
import styles from './exercise-card.component.style.tsx';

const DIFFICULTY_LEVELS = [
    { label: 'NOVICE',        level: 1 },
    { label: 'BEGINNER',      level: 2 },
    { label: 'INTERMEDIATE',  level: 3 },
    { label: 'ADVANCED',      level: 4 },
];

export type ExerciseCardProps = {
    key?: unknown;
    exercise: ExerciseReadDTO;
    isFavorited?: boolean;
    onFavoriteToggle?: (id: number, favorited: boolean) => void;
    activeFilters?: Record<string, string[]>;
    onFilterChange?: (key: string, value: string) => void;
    onClick?: () => void;
    mini?: boolean;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const ExerciseCard = ({
    exercise,
    isFavorited = false,
    onFavoriteToggle,
    activeFilters = {},
    onFilterChange,
    onClick,
    mini = false,
    customCss,
}: ExerciseCardProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pushAlert = useAlert();

    const difficultyVariant = getVariantFromMap(ExerciseDifficultyVariants, exercise.difficulty);

    const isFilterActive = (key: string, value: string): boolean =>
        activeFilters[key]?.includes(value) ?? false;

    const handleFilterToggle = (key: string, value: string) => () =>
        onFilterChange?.(key, value);

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

    const handleCoverUpload = async (file: File) => {
        try {
            await ExerciseService.uploadMedia(exercise.id, file, 'COVER');
            pushAlert('Cover image updated.', 'success');
        } catch {
            pushAlert('Failed to upload cover image.', 'error');
        }
    };

    const cover = exercise.cover_media;
    const coverSrc = cover ? `data:${cover.content_type};base64,${cover.data}` : undefined;

    const miniDropdownItems: DropdownMenuItem[] = [
        {
            label: 'Details',
            icon: <MdOpenInNew />,
            iconColor: 'info',
            onClick: () => setDrawerOpen(true),
        },
    ];

    if (mini) {
        return (
            <>
                <Card onClick={onClick} customCss={customCss}>
                    <div css={styles.outerMini}>
                        <Image src={coverSrc} size={styles.coverSizeMini} onUpload={handleCoverUpload} customCss={styles.coverMediaMini} />
                        <span css={[styles.name, css({ flex: 1, minWidth: 0 })]}>{exercise.name}</span>
                        <div css={styles.actions} onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu items={miniDropdownItems} />
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
    }

    return (
        <>
            <Card onClick={onClick} customCss={customCss}>
                <div css={styles.outer}>
                    <Image src={coverSrc} size={styles.coverSize} onUpload={handleCoverUpload} customCss={styles.coverMedia} />

                    <div css={styles.content}>
                        <div css={styles.header}>
                            <span css={styles.name}>{exercise.name}</span>
                            <div css={styles.actions}>
                                <span
                                    css={styles.favoriteWrapper}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <BlobGlassBackground
                                        color="var(--color-yellow)"
                                        single
                                        opacity={45}
                                    />
                                    <Button
                                        icon={<FaRegStar />}
                                        clickedIcon={<FaStar />}
                                        isClicked={isFavorited}
                                        customIconCss={styles.favoriteIcon}
                                        onClick={handleFavorite}
                                        noBorder
                                        customCss={styles.favoriteButton}
                                    />
                                </span>
                                <DropdownMenu items={dropdownItems} />
                            </div>
                        </div>

                        <Divider customCss={styles.divider} />

                        <div css={styles.footer}>
                            <div css={styles.footerBadges}>
                            {exercise.category && (
                                <Badge
                                    selected={isFilterActive('category', exercise.category)}
                                    onClick={handleFilterToggle('category', exercise.category)}
                                    onRemove={isFilterActive('category', exercise.category) ? handleFilterToggle('category', exercise.category) : undefined}
                                >
                                    {capitalize(exercise.category)}
                                </Badge>
                            )}
                            {exercise.equipment && (
                                <Badge
                                    selected={isFilterActive('equipment', exercise.equipment)}
                                    onClick={handleFilterToggle('equipment', exercise.equipment)}
                                    onRemove={isFilterActive('equipment', exercise.equipment) ? handleFilterToggle('equipment', exercise.equipment) : undefined}
                                >
                                    {capitalize(exercise.equipment)}
                                </Badge>
                            )}
                            {exercise.mechanics && (
                                <Badge
                                    selected={isFilterActive('mechanics', exercise.mechanics)}
                                    onClick={handleFilterToggle('mechanics', exercise.mechanics)}
                                    onRemove={isFilterActive('mechanics', exercise.mechanics) ? handleFilterToggle('mechanics', exercise.mechanics) : undefined}
                                >
                                    {capitalize(exercise.mechanics)}
                                </Badge>
                            )}
                            {exercise.force && (
                                <Badge
                                    selected={isFilterActive('force', exercise.force)}
                                    onClick={handleFilterToggle('force', exercise.force)}
                                    onRemove={isFilterActive('force', exercise.force) ? handleFilterToggle('force', exercise.force) : undefined}
                                >
                                    {capitalize(exercise.force)}
                                </Badge>
                            )}
                            {exercise.role && (
                                <Badge
                                    selected={isFilterActive('role', exercise.role)}
                                    onClick={handleFilterToggle('role', exercise.role)}
                                    onRemove={isFilterActive('role', exercise.role) ? handleFilterToggle('role', exercise.role) : undefined}
                                >
                                    {capitalize(exercise.role)}
                                </Badge>
                            )}
                            {exercise.type && (
                                <Badge
                                    selected={isFilterActive('type', exercise.type)}
                                    onClick={handleFilterToggle('type', exercise.type)}
                                    onRemove={isFilterActive('type', exercise.type) ? handleFilterToggle('type', exercise.type) : undefined}
                                >
                                    {capitalize(exercise.type)}
                                </Badge>
                            )}
                        </div>
                        {exercise.difficulty && (
                            <Rating
                                levelsInfo={DIFFICULTY_LEVELS}
                                selectedLevelLabel={exercise.difficulty}
                                variant={difficultyVariant}
                            />
                        )}
                    </div>
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
