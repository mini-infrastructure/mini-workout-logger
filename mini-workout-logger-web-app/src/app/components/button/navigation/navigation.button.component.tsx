import Button from "../button.component.tsx";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./navigation.button.component.style.tsx";
import {useNavigate} from "react-router-dom";

const NavigationButtons = () => {
    const navigate = useNavigate();
    return (
        <div css={styles.wrapper}>
            <Button
                icon={<IoIosArrowBack />}
                customCss={styles.navigationButtonWrapper}
                onClick={() => navigate(-1)}
            />
            <Button
                icon={<IoIosArrowForward />}
                customCss={styles.navigationButtonWrapper}
                onClick={() => navigate(1)}
            />
        </div>
    );
};

export default NavigationButtons;
