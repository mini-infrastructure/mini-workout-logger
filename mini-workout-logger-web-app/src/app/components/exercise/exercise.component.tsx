import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./exercise.component.style.tsx";
import Badge, {getRandomBadgeVariant} from "../badge/badge.component.tsx";
import {
    ExerciseCategoryIcons,
    ExerciseDifficultyIcons,
    getExerciseDifficultyVariant,
    getIconFromMap,
} from "../../models/exercise.model.tsx";
import LabelCard, {CardHeader, LabelColor} from "../card/label-card.component.tsx";
import {FaRegPlayCircle} from "react-icons/fa";
import Button from "../button/button.component.tsx";
import {MdOutlineEdit} from "react-icons/md";
import {FaRegTrashCan} from "react-icons/fa6";

export type ExerciseCardProps = {
    exercise: ExerciseReadDTO,
    key?: string | number;
    customCss?: Interpolation<Theme> | Interpolation<Theme>[];
};

const ExerciseCard = ({
                          exercise,
                          customCss,
                      }: ExerciseCardProps) => {
    return (
        <LabelCard>

            <CardHeader>{exercise.name}</CardHeader>

            {/*  Muscles badges  */}
            <div css={styles.session}>
                <div css={styles.badgesWrapper}>
                    {exercise.rootMuscles?.map((muscle) => (
                        <Badge key={muscle}>{muscle}</Badge>
                    ))}
                </div>
            </div>

            {/*  Characteristics  */}
            <div css={[styles.session]}>
                <div css={styles.badgesWrapper}>
                    <Badge
                        icon={getIconFromMap(ExerciseCategoryIcons, exercise.category)}
                        variant={getRandomBadgeVariant()}
                    >
                        {exercise.category}
                    </Badge>
                    <Badge
                        icon={getIconFromMap(ExerciseDifficultyIcons, exercise.difficulty)}
                        variant={getExerciseDifficultyVariant(exercise.difficulty)}
                    >
                        {exercise.difficulty}
                    </Badge>
                </div>
            </div>

        </LabelCard>
    );
};

export default ExerciseCard;
