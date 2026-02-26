import type {ButtonProps} from "./button.component.tsx";
import {ThemeToggleContext} from "../../themes/theme-context.ts";
import {FaMoon, FaSun} from "react-icons/fa";
import Button from "./button.component.tsx";
import {useContext} from "react";

type ToggleThemeButtonProps =  ButtonProps & {};

const ToggleThemeButton = ({}: ToggleThemeButtonProps) => {
    const context = useContext(ThemeToggleContext);

    if (!context) return null;

    const { toggleTheme, isDark } = context;

    return (
        <Button
            onClick={toggleTheme}
            icon={isDark ? <FaSun /> : <FaMoon />}
        >
        </Button>
    );
};


export default ToggleThemeButton;