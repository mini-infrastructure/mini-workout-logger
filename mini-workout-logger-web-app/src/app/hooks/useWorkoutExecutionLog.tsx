import { useEffect, useState, useRef } from 'react';
import type { WorkoutExecutionLogReadDTO } from '../dtos/workout-execution-log-read.dto.tsx';
import type { PaginationDTO } from '../dtos/api-response.dto.tsx';
import WorkoutExecutionService from '../services/workout-execution.service.tsx';

export const useWorkoutExecutionLog = () => {
    const [entries, setEntries] = useState<WorkoutExecutionLogReadDTO[]>([]);
    const [pagination, setPagination] = useState<PaginationDTO | null>(null);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setPage(0);
    }, [search]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setLoading(true);
            WorkoutExecutionService.getLog({ page, size: 10, search: search || undefined })
                .then(({ data, pagination: p }) => {
                    setEntries(data);
                    setPagination(p);
                })
                .finally(() => setLoading(false));
        }, 300);
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, [page, search]);

    return { entries, pagination, page, setPage, search, setSearch, loading };
};
