import {useEffect, useState} from "react";
import MuscleService from "../services/muscle.service.tsx";

export function useRootMuscles() {
    const [rootMuscles, setRootMuscles] = useState<String[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        MuscleService.getRootMuscles()
            .then(setRootMuscles)
            .catch(() => setError("Failed to fetch root muscles"))
            .finally(() => setLoading(false));
    }, []);

    return { rootMuscles, loading, error };
}