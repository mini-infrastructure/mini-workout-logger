import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./exercise.component.style.tsx";
import {MdOutlineDownhillSkiing, MdOutlineEdit} from "react-icons/md";
import Button from "../button/button.component.tsx";
import { FaRegTrashCan } from "react-icons/fa6";
import Badge from "../badge/badge.component.tsx";


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
        <div
            css={[
                styles.cardWrapper,
                ...(customCss
                    ? Array.isArray(customCss)
                        ? customCss
                        : [customCss]
                    : []),
            ]}
        >

            {/*  Header.   */}
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
            <p>Exercise detailed description</p>
            <div css={styles.badgesWrapper}>
                {exercise.muscles.map((muscle) => (
                    <Badge key={muscle.id}>{muscle.name}</Badge>
                ))}
            </div>
            <div></div>

        </div>
    );
};

export default ExerciseCard;
