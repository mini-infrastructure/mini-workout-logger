import type {WorkoutReadDTO} from "../dtos/workout-read.dto.tsx";

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class WorkoutService {

    async getAll(): Promise<WorkoutReadDTO[]> {}
    async getById(id: string): Promise<WorkoutReadDTO> {}
    async create(workout: WorkoutReadDTO): Promise<WorkoutReadDTO> {}
    async update(id: string, workout: WorkoutReadDTO): Promise<WorkoutReadDTO> {}
    async delete(id: string): Promise<void> {}

}

export default new WorkoutService();