import type {ExerciseReadDTO} from "../dtos/exercise-read.dto.tsx";
import type {ExerciseExecutionHistoryReadDTO} from "../dtos/exercise-execution-history-read.dto.tsx";
import type {MediaReadDTO} from "../dtos/media-read.dto.tsx";
import type {ApiResponseDTO} from "../dtos/api-response.dto.tsx";
import axios from "axios";
import type {ExerciseWriteDTO} from "../dtos/exercise-write.dto.tsx";
import {handleApiError} from "../utils/throwError.tsx";

const apiUrl = import.meta.env.VITE_API_URL;
const lang = import.meta.env.VITE_API_LANGUAGE || 'en_US';

class ExerciseService {

    async getAll(params?: Record<string, string | number>): Promise<ApiResponseDTO<ExerciseReadDTO[]>> {
        try {
            const response = await axios.get<ApiResponseDTO<ExerciseReadDTO[]>>(
                `${apiUrl}/exercises`,
                { params: { lang, ...params } }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching exercises:', error);
            return { status: 500, message: '', data: [], pagination: null, errors: null };
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

    async favorite(id: number): Promise<ExerciseReadDTO> {
        try {
            const response = await axios.patch<ApiResponseDTO<ExerciseReadDTO[]>>(
                `${apiUrl}/exercises/${id}/favorite?lang=${lang}`
            );
            return response.data.data[0];
        } catch (error) {
            handleApiError(error);
        }
    }

    async unfavorite(id: number): Promise<ExerciseReadDTO> {
        try {
            const response = await axios.patch<ApiResponseDTO<ExerciseReadDTO[]>>(
                `${apiUrl}/exercises/${id}/unfavorite?lang=${lang}`
            );
            return response.data.data[0];
        } catch (error) {
            handleApiError(error);
        }
    }

    async getFavorites(): Promise<ExerciseReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<ExerciseReadDTO[]>>(
                `${apiUrl}/exercises/favorites?lang=${lang}`
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching favorited exercises:', error);
            return [];
        }
    }

    async uploadMedia(id: number, file: File, role: 'COVER' | 'EXECUTION' = 'COVER'): Promise<MediaReadDTO> {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post<ApiResponseDTO<MediaReadDTO[]>>(
            `${apiUrl}/exercises/${id}/media/${role}?lang=${lang}`,
            formData
        );
        return response.data.data[0];
    }

    async deleteMedia(exerciseId: number, mediaId: number): Promise<void> {
        await axios.delete(`${apiUrl}/exercises/${exerciseId}/media/${mediaId}?lang=${lang}`);
    }

    async getHistory(id: number): Promise<ExerciseExecutionHistoryReadDTO[]> {
        try {
            const response = await axios.get<ApiResponseDTO<ExerciseExecutionHistoryReadDTO[]>>(
                `${apiUrl}/exercises/${id}/history?lang=${lang}`
            );
            return response.data.data ?? [];
        } catch (error) {
            console.error(`Error fetching history for exercise ${id}:`, error);
            return [];
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