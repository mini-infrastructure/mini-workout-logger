import {ThemeToggleContext} from "../../../themes/theme-context.ts";
import {useContext} from "react";
import ToggleButton from "./toggle.button.component.tsx";
import { RiMoonFill } from "react-icons/ri";
import { IoSunnySharp } from "react-icons/io5";

const ToggleThemeButton = () => {
    const context = useContext(ThemeToggleContext);

    if (!context) return null;

    const { toggleTheme, isDark } = context;

    return (
        <ToggleButton
            onIcon={<RiMoonFill />}
            offIcon={<IoSunnySharp />}
            onClick={toggleTheme}
            isOn={isDark}
        />
    )
};

export default ToggleThemeButton;
