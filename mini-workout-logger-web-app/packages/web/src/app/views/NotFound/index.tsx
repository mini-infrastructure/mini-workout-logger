import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './index.style';

const NotFoundView = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>404</h1>
            <p css={styles.message}>Page not found</p>
            <PrimaryButton
                label="Voltar"
                icon={<IoMdArrowRoundBack />}
                onClick={handleGoBack}
            />
        </div>
    );
};

export default NotFoundView;
