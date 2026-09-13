import Layout from '../../components/Layout';
import styles from './index.style';

const PlansView = () => {
    return (
        <Layout>
            <div css={styles.container}>
                <h1 css={styles.title}>Workout Plans</h1>
                <div css={styles.placeholder}>
                    Workout plans content will be implemented here.
                </div>
            </div>
        </Layout>
    );
};

export default PlansView;
