import Layout from '../../components/Layout';
import styles from './index.style';

const ExercisesView = () => {
    return (
        <Layout>
            <div css={styles.container}>
                <h1 css={styles.title}>Exercises Database</h1>
                <div css={styles.placeholder}>
                    Exercise database content will be implemented here.
                </div>
            </div>
        </Layout>
    );
};

export default ExercisesView;
