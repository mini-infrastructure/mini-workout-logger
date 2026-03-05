import Button from "../button.component.tsx";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import styles from "./navigation.button.component.style.tsx";
import {useNavigate} from "react-router-dom";

const NavigationButtons = () => {
    const navigate = useNavigate();
    return (
        <div css={styles.wrapper}>
            <Button
                icon={<IoIosArrowBack />}
                onClick={() => navigate(-1)}
            />
            <Button
                icon={<IoIosArrowForward />}
                onClick={() => navigate(1)}
            />
        </div>
    );
};

export default NavigationButtons;
