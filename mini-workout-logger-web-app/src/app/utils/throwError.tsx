import axios from "axios";
import type {ApiResponseDTO} from "../dtos/api-response.dto.tsx";

export function handleApiError(error: unknown, pushAlert?: (message: string, variant: 'error') => void): never {
    let message;

    if (axios.isAxiosError(error)) {
        const response = error.response?.data;

        if (response?.message) {
            message = response.message;
        } else if (response?.errors?.length) {
            message = response.errors.join("\n");
        } else if (error.message) {
            message = error.message;
        }
    } else if (error instanceof Error) {
        message = error.message;
    }

    if (message === "No message available") {
        message = "An unknown error occurred";
    }

    pushAlert?.(message ?? "An unknown error occurred", 'error');
    throw new Error(message);
}

export function validateApiResponse<T>(response: ApiResponseDTO<T>): T {
    if (response.status !== 200 || response.status !== 201) {
        throw new Error(response.message || "API error");
    }

    return response.data.data;
}
