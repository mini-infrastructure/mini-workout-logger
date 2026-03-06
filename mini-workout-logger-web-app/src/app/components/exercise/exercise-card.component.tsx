import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./exercise-card.component.style.tsx";
import Badge from "../badge/badge.component.tsx";
import {
    ExerciseCategoryIcons,
    ExerciseDifficultyIcons,
    ExerciseEquipmentIcons, getExerciseDifficultyVariant,
    getIconFromMap,
} from "../../models/exercise.model.tsx";
import type {DropdownMenuItem} from "../dropdown-menu/dropdown-menu.component.tsx";
import DropdownMenu from "../dropdown-menu/dropdown-menu.component.tsx";
import {FiCopy, FiEdit, FiTrash2} from "react-icons/fi";
import {useState} from "react";
import ExerciseModal from "./exercise-modal-component.tsx";
import ExerciseService from "../../services/exercise.service.tsx";
import Card from "../card/card.component.tsx";
import {MdOutlineCheckBox} from "react-icons/md";
import Divider from "../divider/divider.component.tsx";
import Rating, {RatingLevelItem} from "../rating/rating.component.tsx";

export type ExerciseCardProps = {
    exercise: ExerciseReadDTO,
    key?: string | number;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const ExerciseCard = ({
                          exercise,
                      }: ExerciseCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        if (!exercise?.id) return;
        const confirmed = window.confirm(`Delete exercise "${exercise.name}"?`);
        if (!confirmed) return;
        try {
            await ExerciseService.delete(exercise.id);
            window.location.reload();

        } catch (error) {
            console.error("Error deleting exercise:", error);
        }
    };

    const dropdownItems: DropdownMenuItem[] = [
        {
            label: "Edit",
            icon: <FiEdit />,
            iconColor: "primary",
            onClick: () => setIsModalOpen(true),
        },
        {
            label: "Clone",
            icon: <FiCopy />,
            iconColor: "info",
            onClick: () => console.log("Clone"),
        },
        {
            label: "Select",
            icon: <MdOutlineCheckBox />,
            iconColor: "info",
            onClick: () => console.log("Select"),
        },
        {
            dividerBefore: true,
            label: "Delete",
            icon: <FiTrash2 />,
            iconColor: "danger",
            onClick: handleDelete,
        },
    ];

    const difficultyLevels: RatingLevelItem[] = [
        {
            label: 'NOVICE',
            level: 1,
        },
        {
            label: 'BEGINNER',
            level: 2,
        },
        {
            label: 'INTERMEDIATE',
            level: 3,
        },
        {
            label: 'ADVANCED',
            level: 4,
        },
    ];

    return (
        <Card customCss={styles.exerciseCard}>
            {/* Header */}
            <div css={styles.dropdownWrapper}>

                <div css={styles.header}>
                    {exercise.name}
                </div>

                <DropdownMenu
                    title="Actions"
                    items={dropdownItems}
                    trigger="button"
                    customTriggerCss={styles.dropdownButton}
                    customIconTriggerCss={styles.dropdownIconButton}
                />
            </div>

            {/* Body */}
            <div>
                {/*  Exercise muscles  */}
                <div css={styles.session}>
                    <div css={styles.badgesWrapper}>
                        {exercise.rootMuscles?.map((muscle) => (
                            <Badge key={muscle}>{muscle}</Badge>
                        ))}
                    </div>
                </div>

                {/*  Exercise equipments  */}
                <div css={styles.session}>
                    <div css={styles.badgesWrapper}>
                        {exercise.equipments?.map((equipment) => (
                            <Badge
                                key={equipment}
                                icon={getIconFromMap(ExerciseEquipmentIcons, equipment)}
                            >
                                {equipment}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div css={[styles.session, styles.footerContainer]}>
                <Divider customCss={styles.divider} />

                <div css={styles.footer}>
                    <Rating
                        levelsInfo={difficultyLevels}
                        selectedLevelLabel={exercise.difficulty}
                        variant={getExerciseDifficultyVariant(exercise.difficulty)}
                    />

                    <Badge icon={getIconFromMap(ExerciseCategoryIcons, exercise.category)}>
                        {exercise.category}
                    </Badge>
                </div>
            </div>

            {/* Edit exercise modal */}
            <ExerciseModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                exercise={exercise}
            />

        </Card>
    );
};

export default ExerciseCard;
