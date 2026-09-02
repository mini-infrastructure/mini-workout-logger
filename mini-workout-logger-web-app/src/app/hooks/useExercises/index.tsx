import { useEffect, useState } from 'react';
import type { ExerciseReadDTO } from '../../dtos/ExerciseReadDTO/index.ts';
import type { PaginationDTO } from '../../dtos/ApiResponseDTO/index.ts';
import ExerciseService from '../../services/ExerciseService/index.ts';

const PAGE_SIZE = 20;

export function useExercises(query?: string, page: number = 0, filters: Record<string, string[]> = {}, muscles: string[] = [], pageSize: number = PAGE_SIZE, excludeIds: number[] = [], hidden?: boolean) {
    const [exercises, setExercises] = useState<ExerciseReadDTO[]>([]);
    const [pagination, setPagination] = useState<PaginationDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // JSON-stringified snapshots let useEffect deps compare arrays/objects by
    // value; the eslint rule expects them extracted to plain variables.
    const filtersKey = JSON.stringify(filters);
    const musclesKey = JSON.stringify(muscles);
    const excludeIdsKey = JSON.stringify(excludeIds);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(true);
            const flatFilters: Record<string, string> = {};
            for (const [key, values] of Object.entries(filters)) {
                if (values.length > 0) flatFilters[key] = values.join(',');
            }
            const params: Record<string, string | number> = { page, size: pageSize, sort: 'name,asc', ...flatFilters };
            if (query) params.name = query;
            if (muscles.length > 0) params.muscles = muscles.join(',');
            if (excludeIds.length > 0) params.excludeIds = excludeIds.join(',');
            if (hidden !== undefined) params.hidden = String(hidden);

            ExerciseService.getAll(params)
                .then((response) => {
                    setExercises(response.data ?? []);
                    setPagination(response.pagination);
                })
                .catch(() => {
                    setError('Error getting exercises');
                    setExercises([]);
                    setPagination(null);
                })
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(timeout);
        // eslint's exhaustive-deps can't see through the JSON.stringify keys,
        // but they capture every mutation of filters/muscles/excludeIds.
    }, [query, page, pageSize, filtersKey, musclesKey, excludeIdsKey, hidden]);

    return { exercises, pagination, loading, error };
}
