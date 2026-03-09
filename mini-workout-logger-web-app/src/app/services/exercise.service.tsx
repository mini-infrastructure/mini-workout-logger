import type {ExerciseReadDTO} from "../dtos/exercise-read.dto.tsx";
import type {ApiResponseDTO} from "../dtos/api-response.dto.tsx";
import axios from "axios";
import type {ExerciseWriteDTO} from "../dtos/exercise-write.dto.tsx";
import {handleApiError} from "../utils/throwError.tsx";

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class ExerciseService {

    async getAll(): Promise<ExerciseReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<ExerciseReadDTO[]>>(
                `${apiUrl}/exercises?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching exercises:', error);
            return [];
        }
    }

    async getById(id: string): Promise<ExerciseReadDTO> {
        try {
            const response = await axios.get<ApiResponseDTO<ExerciseReadDTO>>(
                `${apiUrl}/exercises/${id}?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching exercise with id ${id}:`, error);
            throw error;
        }
    }

    async create(exercise: ExerciseWriteDTO): Promise<ExerciseReadDTO> {
        try {
            const response = await axios.post<ApiResponseDTO<ExerciseReadDTO>>(
                `${apiUrl}/exercises?lang=${lang}`,
                exercise
            );
            return response.data.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    async update(id: number, exercise: ExerciseWriteDTO): Promise<ExerciseReadDTO> {
        try {
            const response = await axios.put<ApiResponseDTO<ExerciseReadDTO>>(
                `${apiUrl}/exercises/${id}?lang=${lang}`,
                exercise
            );
            return response.data.data;
        } catch (error) {
            handleApiError(error);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await axios.delete(
                `${apiUrl}/exercises/${id}?lang=${lang}`
            );
        } catch (error) {
            console.error(`Error deleting exercise with id ${id}:`, error);
            throw error;
        }
    }

    async getAllExerciseGroupNames(): Promise<string[]> {
        try {
            const response = await axios.get<ApiResponseDTO<string[]>>(
                `${apiUrl}/exercises/groups?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching exercise group names:', error);
            return [];
        }
    }

}

export default new ExerciseService();