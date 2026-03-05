import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./exercise-card.component.style.tsx";
import Badge, {getRandomBadgeVariant} from "../badge/badge.component.tsx";
import {
    ExerciseCategoryIcons,
    ExerciseDifficultyIcons, ExerciseEquipmentIcons,
    getExerciseDifficultyVariant, getExerciseEquipmentVariant,
    getIconFromMap,
} from "../../models/exercise.model.tsx";
import LabelCard, {CardHeader} from "../card/label-card.component.tsx";
import type {DropdownMenuItem} from "../dropdown-menu/dropdown-menu.component.tsx";
import {FiCopy, FiEdit, FiTrash2} from "react-icons/fi";
import {useState} from "react";
import ExerciseModal from "./exercise-modal-component.tsx";
import ExerciseService from "../../services/exercise.service.tsx";

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
            icon: <FiEdit size={14} />,
            iconColor: "primary",
            onClick: () => setIsModalOpen(true),
        },
        {
            label: "Clone",
            icon: <FiCopy size={14} />,
            iconColor: "info",
            onClick: () => console.log("Clone"),
        },
        {
            dividerBefore: true,
            label: "Delete",
            icon: <FiTrash2 size={14} />,
            iconColor: "danger",
            onClick: handleDelete,
        },
    ];

    return (
        <LabelCard dropdownItems={dropdownItems}>

            <CardHeader>{exercise.name}</CardHeader>

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

            {/*  Characteristics  */}
            <div css={[styles.session]}>
                <div css={styles.badgesWrapper}>
                    {/* Exercise Category */}
                    <Badge
                        icon={getIconFromMap(ExerciseCategoryIcons, exercise.category)}
                        // variant={getRandomBadgeVariant()}
                    >
                        {exercise.category}
                    </Badge>

                    {/* Exercise Difficulty */}
                    <Badge
                        icon={getIconFromMap(ExerciseDifficultyIcons, exercise.difficulty)}
                        // variant={getExerciseDifficultyVariant(exercise.difficulty)}
                    >
                        {exercise.difficulty}
                    </Badge>
                </div>
            </div>

            <ExerciseModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                exercise={exercise}
            />

        </LabelCard>
    );
};

export default ExerciseCard;
