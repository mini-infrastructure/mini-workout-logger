import { useState } from 'react';
import { css } from '@emotion/react';
import { FiMenu, FiX, FiPlus, FiHeart, FiCheck, FiChevronDown } from 'react-icons/fi';

import PrimaryButton from './app/components/PrimaryButton';
import SecondaryButton from './app/components/SecondaryButton';
import IconButton from './app/components/IconButton';
import Card from './app/components/Card';
import StatCard from './app/components/StatCard';
import FolderCard from './app/components/FolderCard';
import ProgressBar from './app/components/ProgressBar';
import ProgressCard from './app/components/ProgressCard';
import ActionCard from './app/components/ActionCard';
import { useAlert } from './app/context/alert.context';

const styles = {
    container: css({
        minHeight: '100vh',
        padding: 'var(--space-xl)',
    }),
    title: css({
        fontSize: 'var(--font-size-2xl)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--space-xl)',
    }),
    section: css({
        marginBottom: 'var(--space-2xl)',
    }),
    sectionTitle: css({
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-semibold)',
        marginBottom: 'var(--space-md)',
        color: 'var(--color-gray)',
    }),
    row: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--space-md)',
    }),
    cardRow: css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 'var(--space-lg)',
    }),
    progressContainer: css({
        width: '20rem',
    }),
    progressInteractive: css({
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-md)',
        width: '20rem',
    }),
    progressBarWrapper: css({
        flex: 1,
    }),
};

function App() {
    const [primarySelected, setPrimarySelected] = useState(false);
    const [secondarySelected, setSecondarySelected] = useState(false);
    const [iconSelected, setIconSelected] = useState(false);
    const [interactiveProgress, setInteractiveProgress] = useState(20);
    const pushAlert = useAlert();

    const handleIncreaseProgress = () => {
        setInteractiveProgress(prev => Math.min(prev + 10, 100));
    };

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>Component Showcase</h1>

            {/* Primary Button */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>PrimaryButton</h2>
                <div css={styles.row}>
                    <PrimaryButton label="Default" />
                    <PrimaryButton label="With icon" icon={<FiPlus />} />
                    <PrimaryButton label="Icon right" icon={<FiHeart />} iconPosition="right" />
                    <PrimaryButton label="Disabled" disabled />
                    <PrimaryButton
                        label={primarySelected ? 'Selected' : 'Toggle me'}
                        icon={<FiPlus />}
                        selectedIcon={<FiCheck />}
                        isSelected={primarySelected}
                        animateIcon
                        onClick={() => setPrimarySelected(!primarySelected)}
                    />
                </div>
            </section>

            {/* Secondary Button */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>SecondaryButton</h2>
                <div css={styles.row}>
                    <SecondaryButton label="Default" />
                    <SecondaryButton label="With icon" icon={<FiPlus />} />
                    <SecondaryButton label="Icon right" icon={<FiHeart />} iconPosition="right" />
                    <SecondaryButton label="Dropdown" icon={<FiChevronDown />} iconPosition="right" />
                    <SecondaryButton label="Disabled" disabled />
                    <SecondaryButton
                        label={secondarySelected ? 'Selected' : 'Toggle me'}
                        icon={<FiPlus />}
                        selectedIcon={<FiCheck />}
                        isSelected={secondarySelected}
                        animateIcon
                        onClick={() => setSecondarySelected(!secondarySelected)}
                    />
                </div>
            </section>

            {/* Icon Button */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>IconButton</h2>
                <div css={styles.row}>
                    <IconButton icon={<FiMenu />} tooltip="Menu" />
                    <IconButton icon={<FiPlus />} tooltip="Add" />
                    <IconButton icon={<FiHeart />} tooltip="Favorite" />
                    <IconButton icon={<FiPlus />} disabled tooltip="Disabled" />
                    <IconButton
                        icon={<FiMenu />}
                        selectedIcon={<FiX />}
                        isSelected={iconSelected}
                        animateIcon
                        tooltip="Toggle menu"
                        onClick={() => setIconSelected(!iconSelected)}
                    />
                </div>
            </section>

            {/* Progress Bar */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>ProgressBar</h2>
                <div css={styles.cardRow}>
                    <div css={styles.progressContainer}>
                        <ProgressBar label="$12 saved" current={12} total={50} color="red" />
                    </div>
                    <div css={styles.progressContainer}>
                        <ProgressBar label="Progress" current={75} total={100} color="green" />
                    </div>
                    <div css={styles.progressContainer}>
                        <ProgressBar label="Tasks done" current={3} total={10} color="blue" showPercentage={false} />
                    </div>
                    <div css={styles.progressInteractive}>
                        <div css={styles.progressBarWrapper}>
                            <ProgressBar
                                label="Interactive"
                                current={interactiveProgress}
                                total={100}
                                color="pink"
                                animate={false}
                            />
                        </div>
                        <IconButton
                            icon={<FiPlus />}
                            tooltip="Increase"
                            onClick={handleIncreaseProgress}
                        />
                    </div>
                </div>
            </section>

            {/* Progress Card */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>ProgressCard</h2>
                <div css={styles.cardRow}>
                    <ProgressCard
                        color="red"
                        title="Shoes"
                        value="$55"
                        progressLabel="$12 saved"
                        current={12}
                        total={55}
                        displayMode="percentage"
                        onClick={() => alert('Shoes clicked!')}
                    />
                    <ProgressCard
                        color="yellow"
                        title="Vacation"
                        value="$1,200"
                        progressLabel="$340 saved"
                        current={340}
                        total={1200}
                        displayMode="percentage"
                    />
                    <ProgressCard
                        color="blue"
                        title="Books"
                        value="10 total"
                        progressLabel="Read"
                        current={7}
                        total={10}
                        displayMode="fraction"
                        onClick={() => alert('Books clicked!')}
                    />
                </div>
            </section>

            {/* Stat Card */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>StatCard</h2>
                <div css={styles.cardRow}>
                    <StatCard value="$42" label="donated" color="yellow" size="wide" />
                    <StatCard value={5} label="causes" color="pink" onClick={() => alert('Causes clicked!')} />
                    <StatCard value={12} label="kind acts" color="blue" />
                </div>
            </section>

            {/* Card */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Card</h2>
                <div css={styles.cardRow}>
                    <Card color="red" title="Workout Plan" description="Your weekly routine" />
                    <Card color="green" size="wide" title="Weekly Summary" description="Keep it up! Your progress is growing fast." />
                    <Card color="blue" title="Exercises" description="12 total" onClick={() => alert('Clicked!')} />
                </div>
            </section>

            {/* Folder Card */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>FolderCard</h2>
                <div css={styles.cardRow}>
                    <FolderCard color="red" title="Workouts" description="12 plans" onClick={() => alert('Workouts clicked!')} />
                    <FolderCard color="yellow" title="Exercises" description="48 total" onClick={() => alert('Exercises clicked!')} />
                    <FolderCard color="pink" title="Goals" description="5 active" />
                </div>
            </section>

            {/* Action Card */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>ActionCard</h2>
                <div css={styles.cardRow}>
                    <ActionCard
                        title="Add New Savings"
                        icon={<FiPlus />}
                        onClick={() => alert('Add savings clicked!')}
                    />
                    <ActionCard
                        title="New Workout"
                        icon={<FiPlus />}
                        onClick={() => alert('New workout clicked!')}
                    />
                </div>
            </section>

            {/* Alert */}
            <section css={styles.section}>
                <h2 css={styles.sectionTitle}>Alert</h2>
                <div css={styles.row}>
                    <SecondaryButton
                        label="Success"
                        onClick={() => pushAlert('Operation completed successfully!', 'success')}
                    />
                    <SecondaryButton
                        label="Error"
                        onClick={() => pushAlert('Something went wrong. Please try again.', 'error')}
                    />
                    <SecondaryButton
                        label="Warning"
                        onClick={() => pushAlert('This action cannot be undone.', 'warning')}
                    />
                    <SecondaryButton
                        label="Info"
                        onClick={() => pushAlert('Your session will expire in 5 minutes.', 'info')}
                    />
                </div>
            </section>
        </div>
    );
}

export default App;
