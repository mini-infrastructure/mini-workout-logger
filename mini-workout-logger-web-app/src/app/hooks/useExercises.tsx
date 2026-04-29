import { useEffect, useState } from 'react';
import type { ExerciseReadDTO } from '../dtos/exercise-read.dto.tsx';
import type { PaginationDTO } from '../dtos/api-response.dto.tsx';
import ExerciseService from '../services/exercise.service.tsx';

const PAGE_SIZE = 20;

export function useExercises(query?: string, page: number = 0, filters: Record<string, string[]> = {}, muscles: string[] = [], pageSize: number = PAGE_SIZE, excludeIds: number[] = []) {
    const [exercises, setExercises] = useState<ExerciseReadDTO[]>([]);
    const [pagination, setPagination] = useState<PaginationDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

            ExerciseService.getAll(params)
                .then((response) => {
                    setExercises(response.data ?? []);
                    setPagination(response.pagination);
                })
                .catch(() => {
                    setError('Error fetching exercises');
                    setExercises([]);
                    setPagination(null);
                })
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(timeout);
    }, [query, page, pageSize, JSON.stringify(filters), JSON.stringify(muscles), JSON.stringify(excludeIds)]);

    return { exercises, pagination, loading, error };
}
