import OnlyIconButton from "../only-icon-button.component.tsx";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {css} from "@emotion/react";
import styles from "./navigation.button.component.style.tsx";
import {useNavigate} from "react-router-dom";

const navButtonCss = css({
    backgroundColor: 'var(--color-container2)',
    border: 'none',
    color: 'var(--color-white)',
    ':hover': {
        backgroundColor: 'var(--color-border)',
        color: 'var(--color-white)',
    },
});

const NavigationButtons = () => {
    const navigate = useNavigate();
    return (
        <div css={styles.wrapper}>
            <OnlyIconButton
                icon={<IoIosArrowBack />}
                iconColor="--color-border"
                onToggle={() => navigate(-1)}
                customCss={navButtonCss}
            />
            <OnlyIconButton
                icon={<IoIosArrowForward />}
                iconColor="--color-border"
                onToggle={() => navigate(1)}
                customCss={navButtonCss}
            />
        </div>
    );
};

export default NavigationButtons;
