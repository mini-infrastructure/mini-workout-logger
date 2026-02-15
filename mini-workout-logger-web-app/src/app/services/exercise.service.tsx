import axios from 'axios';
import type {ApiResponseDTO} from "../dtos/api-response.dto.tsx";
import type {ExerciseReadDTO} from "../dtos/exercise-read.dto.tsx";
const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class ExerciseService {

    async getAll(): Promise<ExerciseReadDTO[]> {}
    async getById(id: string): Promise<ExerciseReadDTO> {}
    async create(exercise: ExerciseReadDTO): Promise<ExerciseReadDTO> {}
    async update(id: string, exercise: ExerciseReadDTO): Promise<ExerciseReadDTO> {}
    async delete(id: string): Promise<void> {}

}

export default new ExerciseService();