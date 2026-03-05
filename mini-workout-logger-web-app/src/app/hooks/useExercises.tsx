import {useEffect, useState} from "react";
import type {ExerciseReadDTO} from "../dtos/exercise-read.dto.tsx";
import ExerciseService from "../services/exercise.service.tsx";

export function useExercises() {
    const [exercises, setExercises] = useState<ExerciseReadDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        ExerciseService.getAll()
            .then((data) => {
                setExercises(data ?? []);
            })
            .catch(() => {
                setError('Error fetching exercises');
                setExercises([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return { exercises, loading, error };
}
