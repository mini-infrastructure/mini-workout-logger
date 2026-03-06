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

export function convertColorVariantToThemeColor(variant: ColorVariant) {
    const map: Record<ColorVariant, string> = {
        gray: "border1",
        success: "green",
        primary: "primary",
        danger: "red",
        warning: "yellow",
        pink: "pink",
        purple: "purple",
        orange: "orange",
    };

    return map[variant];
}
