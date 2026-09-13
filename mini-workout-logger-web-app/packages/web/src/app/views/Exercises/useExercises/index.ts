import { useState, useEffect, useCallback, useRef } from 'react';
import {
    ExerciseService,
    MuscleService,
    type ExerciseReadDTO,
    type MuscleReadDTO,
} from '@mini/shared';

const PAGE_SIZE = 50;

export type ExerciseFilters = {
    name: string;
    muscles: string[];
    category: string[];
    difficulty: string[];
    equipment: string[];
    force: string[];
    mechanics: string[];
    type: string[];
    role: string[];
    energy_system: string[];
};

const initialFilters: ExerciseFilters = {
    name: '',
    muscles: [],
    category: [],
    difficulty: [],
    equipment: [],
    force: [],
    mechanics: [],
    type: [],
    role: [],
    energy_system: [],
};

export const useExercises = () => {
    const [exercises, setExercises] = useState<ExerciseReadDTO[]>([]);
    const [muscles, setMuscles] = useState<MuscleReadDTO[]>([]);
    const [filters, setFilters] = useState<ExerciseFilters>(initialFilters);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [totalElements, setTotalElements] = useState(0);

    const abortControllerRef = useRef<AbortController | null>(null);

    // Fetch muscles on mount
    useEffect(() => {
        MuscleService.getAll().then(setMuscles);
    }, []);

    // Build query params from filters
    const buildParams = useCallback((pageNum: number): Record<string, string | number> => {
        const params: Record<string, string | number> = {
            page: pageNum,
            size: PAGE_SIZE,
        };

        if (filters.name.trim()) {
            params.name = filters.name.trim();
        }
        if (filters.muscles.length > 0) {
            params.muscles = filters.muscles.join(',');
        }
        if (filters.category.length > 0) {
            params.category = filters.category.join(',');
        }
        if (filters.difficulty.length > 0) {
            params.difficulty = filters.difficulty.join(',');
        }
        if (filters.equipment.length > 0) {
            params.equipment = filters.equipment.join(',');
        }
        if (filters.force.length > 0) {
            params.force = filters.force.join(',');
        }
        if (filters.mechanics.length > 0) {
            params.mechanics = filters.mechanics.join(',');
        }
        if (filters.type.length > 0) {
            params.type = filters.type.join(',');
        }
        if (filters.role.length > 0) {
            params.role = filters.role.join(',');
        }
        if (filters.energy_system.length > 0) {
            params.energy_system = filters.energy_system.join(',');
        }

        return params;
    }, [filters]);

    // Fetch exercises
    const fetchExercises = useCallback(async (pageNum: number, append: boolean = false) => {
        // Cancel previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        if (append) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const params = buildParams(pageNum);
            const response = await ExerciseService.getAll(params);

            if (append) {
                setExercises(prev => [...prev, ...response.data]);
            } else {
                setExercises(response.data);
            }

            if (response.pagination) {
                setTotalElements(response.pagination.total_elements);
                setHasMore(pageNum < response.pagination.total_pages - 1);
            } else {
                setHasMore(false);
            }

            setPage(pageNum);
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('Failed to fetch exercises:', error);
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [buildParams]);

    // Initial fetch and refetch on filter change
    useEffect(() => {
        fetchExercises(0, false);
    }, [JSON.stringify(filters)]);

    // Load more (for infinite scroll)
    const loadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            fetchExercises(page + 1, true);
        }
    }, [fetchExercises, loadingMore, hasMore, page]);

    // Update a single filter
    const updateFilter = useCallback(<K extends keyof ExerciseFilters>(
        key: K,
        value: ExerciseFilters[K]
    ) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setFilters(initialFilters);
    }, []);

    // Check if any filter is active
    const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
        if (key === 'name') return (value as string).trim().length > 0;
        return (value as string[]).length > 0;
    });

    return {
        exercises,
        muscles,
        filters,
        loading,
        loadingMore,
        hasMore,
        totalElements,
        updateFilter,
        clearFilters,
        loadMore,
        hasActiveFilters,
        refetch: () => fetchExercises(0, false),
    };
};
