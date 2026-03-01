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
import LabelCard from "../card/label-card.component.tsx";
import {FaRegPlayCircle} from "react-icons/fa";

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
        <LabelCard icon={<FaRegPlayCircle />}>

            <p>{exercise.name}</p>

            {/*/!*  Header  *!/*/}
            {/*<div css={styles.headerWrapper}>*/}
            {/*    <div css={styles.nameIconWrapper}>*/}
            {/*        <div css={styles.iconWrapper}>*/}
            {/*            <MdOutlineDownhillSkiing />*/}
            {/*        </div>*/}

            {/*        <p>{exercise.name}</p>*/}
            {/*    </div>*/}

            {/*    <div css={styles.buttonsWrapper}>*/}
            {/*        <Button*/}
            {/*            icon={<MdOutlineEdit />}*/}
            {/*            customCss={[styles.headerButton, styles.editButton]}*/}
            {/*        />*/}
            {/*        <Button*/}
            {/*            icon={<FaRegTrashCan />}*/}
            {/*            customCss={[styles.headerButton, styles.trashButton]}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*/!*  Description  *!/*/}
            {/*<div css={styles.session}>*/}
            {/*    <div css={[styles.sessionHeader]}>*/}
            {/*        <MdOutlineDescription />*/}
            {/*        <p>This exercise should be performed...</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*  Muscles badges  */}
            <div css={styles.session}>
                {/*<div css={[styles.sessionHeader]}>*/}
                {/*    <LuBicepsFlexed />*/}
                {/*    <p>Muscles groups</p>*/}
                {/*</div>*/}
                <div css={styles.badgesWrapper}>
                    {exercise.muscles.map((muscle) => (
                        <Badge key={muscle.id}>{muscle.name}</Badge>
                    ))}
                </div>
            </div>

            {/*  Characteristics  */}
            <div css={[styles.session]}>
                {/*<div css={[styles.sessionHeader]}>*/}
                {/*    <FaList />*/}
                {/*    <p>Characteristics</p>*/}
                {/*</div>*/}
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
