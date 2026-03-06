import type {ColorVariant} from "../../utils/colorsVariants.tsx";
import styles from "./rating.component.style.tsx";
import {convertColorVariantToThemeColor} from "../../utils/colorsVariants.tsx";
import {PropsWithChildren} from "react";

export type RatingLevelItem = {
    label: string;
    level: number;
};

export type RatingProps = {
    levelsInfo: RatingLevelItem[];
    selectedLevelLabel: any;
    variant?: ColorVariant;
};

export type RateProps = {
    key: any;
    isFilled: boolean;
    variant: ColorVariant;
};

const Rate = ({
                  isFilled,
                  variant,
              }: PropsWithChildren<RateProps>) => {
    return (
        <span css={[
            styles.rate,
            isFilled && styles.rateFilled(convertColorVariantToThemeColor(variant))
        ]} />
    );
};

const Rating = ({
                    levelsInfo,
                    selectedLevelLabel,
                    variant,
                }: RatingProps) => {

    const numOfLevels = Math.max(...levelsInfo.map(item => item.level));

    const levelsByLabel = Object.fromEntries(
        levelsInfo.map(item => [item.label, item])
    );

    const selectedLevel = selectedLevelLabel
        ? levelsByLabel[selectedLevelLabel]?.level ?? 0
        : 0;

    return (
        <div css={styles.ratesContainer}>
            {Array.from({ length: numOfLevels }, (_, index) => {
                const level = index + 1;

                return (
                    <Rate
                        key={level}
                        isFilled={level <= selectedLevel}
                        variant={variant || "primary"}
                    />
                );
            })}
            <div className="selected-level-label">
                {selectedLevelLabel}
            </div>
        </div>
    );
};

export default Rating;
