import { useEffect, useState } from 'react';
import type { ExerciseReadDTO } from '../dtos/exercise-read.dto.tsx';
import type { PaginationDTO } from '../dtos/api-response.dto.tsx';
import ExerciseService from '../services/exercise.service.tsx';

const PAGE_SIZE = 20;

export function useExercises(query?: string, page: number = 0, filters: Record<string, string[]> = {}) {
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
            const params: Record<string, string | number> = { page, size: PAGE_SIZE, sort: 'name,asc', ...flatFilters };
            if (query) params.name = query;

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
    }, [query, page, JSON.stringify(filters)]);

    return { exercises, pagination, loading, error };
}
