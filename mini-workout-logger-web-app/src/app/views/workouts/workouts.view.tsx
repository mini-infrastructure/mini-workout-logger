import Layout from "../../components/layout/layout.component.tsx";
import * as React from "react";
import styles from "./workouts.view.style.tsx";
import Badge from "../../components/badge/badge.component.tsx";
import {FaRunning} from "react-icons/fa";

const WorkoutsView = () => {
    return (
        <Layout>
            <div css={styles.badgeContainer}>
                <h2>Badge Examples</h2>

                {/* Badges Simples */}
                <div css={styles.badgeGroup}>
                    <Badge variant="gray">Gray Badge</Badge>
                    <Badge variant="primary">Primary Badge</Badge>
                    <Badge variant="success">Success Badge</Badge>
                    <Badge variant="danger">Danger Badge</Badge>
                    <Badge variant="warning">Warning Badge</Badge>
                    <Badge variant="pink">Pink Badge</Badge>
                    <Badge variant="purple">Purple Badge</Badge>
                    <Badge variant="orange">Orange Badge</Badge>
                </div>

                {/* Badges com Ícones */}
                <div css={styles.badgeGroup}>
                    <Badge
                        icon={<FaRunning />}
                        variant="primary"
                    >
                        Strength Training
                    </Badge>
                    <Badge
                        icon={<FaRunning />}
                        variant="success"
                    >
                        Cardio
                    </Badge>

                    {/* Badge com botão de remover */}
                    <Badge
                        icon={<FaRunning />}
                        variant="danger"
                        onRemove={() => console.log('Removed')}
                    >
                        Removable Badge
                    </Badge>
                </div>

                {/* Badges selecionáveis */}
                <div css={styles.badgeGroup}>
                    <Badge
                        variant="purple"
                        selected
                    >
                        Selected Badge
                    </Badge>
                </div>
            </div>
        </Layout>
    );
};

export default WorkoutsView;
