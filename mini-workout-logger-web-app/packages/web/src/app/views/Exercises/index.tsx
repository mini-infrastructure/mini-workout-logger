import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { IoMdClose } from 'react-icons/io';
import Layout from '../../components/Layout/index.tsx';
import Search from '../../components/Search/index.tsx';
import ExerciseCard from '../../components/ExerciseCard/index.tsx';
import Pagination from '../../components/Pagination/index.tsx';
import DropdownButton from '../../components/DropdownButton/index.tsx';
import HumanBody from '../../components/HumanBody/index.tsx';
import { useExercises } from '@mini/shared';
import { ExerciseService } from '@mini/shared';
import {
    exerciseCategoryOptions,
    exerciseDifficultyOptions,
    exerciseEquipmentOptions,
    exerciseMechanicsOptions,
    exerciseForceOptions,
    exerciseRoleOptions,
    exerciseTypeOptions,
    energySystemOptions,
} from '@mini/shared';
import styles from './index.style.tsx';
import SecondaryButton from "../../components/SecondaryButton/index.tsx";

const FILTER_CONFIG = [
    { key: 'category',      label: 'Category',      options: exerciseCategoryOptions   },
    { key: 'energy_system', label: 'Energy System', options: energySystemOptions       },
    { key: 'equipment',     label: 'Equipment',     options: exerciseEquipmentOptions  },
    { key: 'mechanics',     label: 'Mechanics',     options: exerciseMechanicsOptions  },
    { key: 'force',         label: 'Force',         options: exerciseForceOptions      },
    { key: 'role',          label: 'Role',          options: exerciseRoleOptions       },
    { key: 'type',          label: 'Type',          options: exerciseTypeOptions       },
    { key: 'difficulty',    label: 'Difficulty',    options: exerciseDifficultyOptions },
] as const;

const ExercisesView = () => {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState<Record<string, string[]>>({});
    const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
    const { exercises, pagination, error } = useExercises(query, page, filters, selectedMuscles, 20, [], false);
    const [favoritedIds, setFavoritedIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        ExerciseService.getFavorites().then(favorites => {
            setFavoritedIds(new Set(favorites.map(e => e.id)));
        });
    }, []);

    const handleFavoriteToggle = (id: number, favorited: boolean) => {
        setFavoritedIds(prev => {
            const next = new Set(prev);
            if (favorited) {
                next.add(id);
            } else {
                next.delete(id);
            }
            return next;
        });
    };

    const handleQueryChange = (value: string) => {
        setQuery(value);
        setPage(0);
    };

    const handleFilterChange = (key: string, value: string) => {
        if (key === 'muscle') {
            setSelectedMuscles(prev =>
                prev.includes(value) ? prev.filter(m => m !== value) : [...prev, value]
            );
            setPage(0);
            return;
        }
        setFilters(prev => {
            const current = prev[key] ?? [];
            const next = { ...prev };
            if (current.includes(value)) {
                const updated = current.filter(v => v !== value);
                if (updated.length === 0) {
                    delete next[key];
                } else {
                    next[key] = updated;
                }
            } else {
                next[key] = [...current, value];
            }
            return next;
        });
        setPage(0);
    };

    const handleFilterSet = (key: string, values: string[]) => {
        setFilters(prev => {
            const next = { ...prev };
            if (values.length === 0) {
                delete next[key];
            } else {
                next[key] = values;
            }
            return next;
        });
        setPage(0);
    };

    const hasFilters = Object.values(filters).some(v => v.length > 0) || selectedMuscles.length > 0;

    const handleMuscleSelection = (muscles: string[]) => {
        setSelectedMuscles(muscles);
        setPage(0);
    };

    const handleClearAll = () => {
        setFilters({});
        setSelectedMuscles([]);
        setPage(0);
    };

    return (
        <Layout>
            <div css={styles.pageWrapper}>
                <Search
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Search exercises..."
                />
                <div css={styles.filterBar}>
                    {FILTER_CONFIG.map(({ key, label, options }) => (
                        <DropdownButton
                            key={key}
                            label={label}
                            options={options}
                            selected={filters[key] ?? []}
                            onChange={(values) => handleFilterSet(key, values)}
                        />
                    ))}
                    {hasFilters && (
                        <SecondaryButton
                            icon={<IoMdClose />}
                            onClick={handleClearAll}
                            customCss={styles.clearFiltersButton}
                        >
                            Clear filters
                        </SecondaryButton>
                    )}
                </div>
                <div css={styles.contentRow}>
                    <div css={styles.leftColumn}>
                        {error && <p>{error}</p>}
                        <ul css={styles.resultList}>
                            {exercises.map(e => (
                                <li key={e.id}>
                                    <ExerciseCard
                                        exercise={e}
                                        isFavorited={favoritedIds.has(e.id)}
                                        onFavoriteToggle={handleFavoriteToggle}
                                        activeFilters={selectedMuscles.length > 0
                                            ? { ...filters, muscle: selectedMuscles }
                                            : filters}
                                        onFilterChange={handleFilterChange}
                                    />
                                </li>
                            ))}
                        </ul>
                        {pagination && pagination.total_pages > 1 && (
                            <Pagination
                                page={page}
                                totalPages={pagination.total_pages}
                                onPageChange={setPage}
                                customCss={css({ marginTop: 'var(--stack-gap-condensed)' })}
                            />
                        )}
                    </div>
                    <div css={styles.rightPanel}>
                        <HumanBody
                            selectedMuscles={selectedMuscles}
                            onSelectionChange={handleMuscleSelection}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};


export default ExercisesView;
