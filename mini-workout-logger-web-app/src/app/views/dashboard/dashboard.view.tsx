import PrimaryButton from "../../components/button/button.primary.component.tsx";
import SecondaryButton from "../../components/button/button.secondary.component.tsx";
import { FiAlertTriangle } from "react-icons/fi";
import Layout from "../../components/layout/layout.component.tsx";
import Card from "../../components/card/card.component.tsx";
import Button from "../../components/button/button.component.tsx";
import {FaPlay} from "react-icons/fa";

const DashboardView = () => {
    return (
        <>
            <Layout>
                <Card>
                    <p>28 fev, 2026</p>
                    <h1>Good morning! 💪</h1>
                    <p>You have 4 workouts ready. Lets do it?</p>
                    <PrimaryButton
                        icon={<FaPlay />}
                    >
                        Start workout
                    </PrimaryButton>
                </Card>
            </Layout>
        </>
    );
};

export default DashboardView;
