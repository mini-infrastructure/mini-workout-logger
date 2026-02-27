import type {ExerciseReadDTO} from "../../dtos/exercise-read.dto.tsx";
import type {Interpolation, Theme} from "@emotion/react";
import styles from "./exercise.component.style.tsx";

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
            <p>{exercise.name}</p>
        </div>
    );
};

export default ExerciseCard;
