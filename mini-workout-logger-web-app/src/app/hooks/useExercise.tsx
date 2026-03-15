import type {ExerciseReadDTO} from "../dtos/exercise-read.dto.tsx";
import {useEffect, useState} from "react";
import ExerciseService from "../services/exercise.service.tsx";

export function useExercise(id: string) {
    const [exercise, setExercise] = useState<ExerciseReadDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        ExerciseService.getById(id)
            .then((data) => {
                setExercise(Array.isArray(data) ? data[0] : data);
            })
            .catch(() => {
                setError('Error fetching exercises');
                setExercise(null);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return { exercise, loading, error };
}
