import {useNavigate} from 'react-router-dom';
import Error from "../../components/Error/index.tsx";
import {MdLocalPostOffice} from "react-icons/md";

const NotFoundView = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Error
            status={404}
            title="Something went wrong..."
            message="This page is missing or assembled incorrectly"
            actionLabel="Go to home"
            onAction={handleGoHome}
            buttonIcon={<MdLocalPostOffice />}
        />
    );
};

export default NotFoundView;
