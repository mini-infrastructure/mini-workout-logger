import { css } from '@emotion/react';

const styles = {
    container: css({
        minHeight: '100vh',
        padding: 'var(--space-xl)',
    }),
    title: css({
        fontSize: 'var(--font-size-2xl)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--space-md)',
    }),
    subtitle: css({
        fontSize: 'var(--font-size-md)',
        color: 'var(--color-gray)',
    }),
};

function App() {
    return (
        <div css={styles.container}>
            <h1 css={styles.title}>Component Showcase</h1>
            <p css={styles.subtitle}>New components will be displayed here for validation.</p>
        </div>
    );
}

export default App;
