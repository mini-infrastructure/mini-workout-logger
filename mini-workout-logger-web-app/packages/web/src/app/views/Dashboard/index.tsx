import PrimaryButton from "../../components/PrimaryButton/index.tsx";
import Layout from "../../components/Layout/index.tsx";
import {FaPlay} from "react-icons/fa";
import BlobCard from "../../components/BlobCard/index.tsx";

const DashboardView = () => {
    return (
        <>
            <Layout>
                <BlobCard>
                    <p>28 fev, 2026</p>
                    <h1>Good morning! 💪</h1>
                    <p>You have 4 workouts ready. Lets do it?</p>
                    <PrimaryButton
                        icon={<FaPlay />}
                    >
                        Start workout
                    </PrimaryButton>
                </BlobCard>
            </Layout>
        </>
    );
};

export default DashboardView;
