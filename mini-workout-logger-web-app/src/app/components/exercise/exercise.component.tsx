import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./exercise.component.style.tsx";
import {MdOutlineDescription, MdOutlineDownhillSkiing, MdOutlineEdit} from "react-icons/md";
import Button from "../button/button.component.tsx";
import { FaRegTrashCan } from "react-icons/fa6";
import Badge, {getRandomBadgeVariant} from "../badge/badge.component.tsx";
import { LuBicepsFlexed } from "react-icons/lu";
import {FaList} from "react-icons/fa";
import {
    ExerciseCategoryIcons,
    ExerciseDifficultyIcons,
    getExerciseDifficultyVariant,
    getIconFromMap,
} from "../../models/exercise.model.tsx";
import Card from "../card/card.component.tsx";

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
        <Card>

            {/*  Header  */}
            <div css={styles.headerWrapper}>
                <div css={styles.nameIconWrapper}>
                    <div css={styles.iconWrapper}>
                        <MdOutlineDownhillSkiing />
                    </div>

                    <p>{exercise.name}</p>
                </div>

                <div css={styles.buttonsWrapper}>
                    <Button
                        icon={<MdOutlineEdit />}
                        customCss={[styles.headerButton, styles.editButton]}
                    />
                    <Button
                        icon={<FaRegTrashCan />}
                        customCss={[styles.headerButton, styles.trashButton]}
                    />
                </div>
            </div>

            {/*  Description  */}
            <div css={styles.session}>
                <div css={[styles.sessionHeader]}>
                    <MdOutlineDescription />
                    <p>This exercise should be performed...</p>
                </div>
            </div>

            {/*  Muscles badges  */}
            <div css={styles.session}>
                <div css={[styles.sessionHeader]}>
                    <LuBicepsFlexed />
                    <p>Muscles groups</p>
                </div>
                <div css={styles.badgesWrapper}>
                    {exercise.muscles.map((muscle) => (
                        <Badge key={muscle.id}>{muscle.name}</Badge>
                    ))}
                </div>
            </div>

            {/*  Characteristics  */}
            <div css={[styles.session]}>
                <div css={[styles.sessionHeader]}>
                    <FaList />
                    <p>Characteristics</p>
                </div>
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

        </Card>
    );
};

export default ExerciseCard;
