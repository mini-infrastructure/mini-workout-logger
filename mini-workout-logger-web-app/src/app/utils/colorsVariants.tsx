export type ColorVariant =
    | "gray"
    | "success"
    | "primary"
    | "danger"
    | "warning"
    | "pink"
    | "purple"
    | "orange"
    ;

export const colorVariants: ColorVariant[] = [
    "gray",
    "success",
    "primary",
    "danger",
    "warning",
    "pink",
    "purple",
    "orange",
];

/**
 * Maps a semantic color variant to its CSS custom property name (without the `--color-` prefix).
 * Used to build `var(--color-${key})` references in style files.
 */
export function convertColorVariantToThemeColor(variant: ColorVariant): string {
    const map: Record<ColorVariant, string> = {
        gray:    "border",
        success: "green",
        primary: "primary",
        danger:  "red",
        warning: "yellow",
        pink:    "pink",
        purple:  "purple",
        orange:  "orange",
    };

    return map[variant];
}
