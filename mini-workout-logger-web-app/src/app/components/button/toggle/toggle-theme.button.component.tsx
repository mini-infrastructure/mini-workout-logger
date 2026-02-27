import {ThemeToggleContext} from "../../../themes/theme-context.ts";
import {useContext} from "react";
import ToggleButton from "./toggle.button.component.tsx";
import { RiMoonFill } from "react-icons/ri";
import { MdWbSunny } from "react-icons/md";
import styles from "./toggle.button.component.style";

const ToggleThemeButton = () => {
    const context = useContext(ThemeToggleContext);

    if (!context) return null;

    const { toggleTheme, isDark } = context;

    return (
        <ToggleButton
            onIcon={<RiMoonFill />}
            onIconCustomCss={styles.iconOnCustom}
            offIconCustomCss={styles.offIconCustomCss}
            offSliderCustomCss={styles.sliderOffCustom}
            offIcon={<MdWbSunny />}
            onClick={toggleTheme}
            isOn={isDark}
        />
    )
};

export default ToggleThemeButton;
