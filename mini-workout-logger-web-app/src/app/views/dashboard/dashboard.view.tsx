import PrimaryButton from "../../components/button/button.primary.component.tsx";
import Layout from "../../components/layout/layout.component.tsx";
import {FaPlay} from "react-icons/fa";
import BlobCard from "../../components/card/blob-card.component.tsx";

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
