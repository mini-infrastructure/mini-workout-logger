import { useState } from 'react';
import { css } from '@emotion/react';
import { FiMenu, FiX, FiPlus, FiHeart, FiCheck, FiChevronDown } from 'react-icons/fi';

import PrimaryButton from './app/components/PrimaryButton';
import SecondaryButton from './app/components/SecondaryButton';
import IconButton from './app/components/IconButton';

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
};

function App() {
    const [primarySelected, setPrimarySelected] = useState(false);
    const [secondarySelected, setSecondarySelected] = useState(false);
    const [iconSelected, setIconSelected] = useState(false);

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
        </div>
    );
}

export default App;
