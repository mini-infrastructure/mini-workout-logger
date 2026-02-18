export interface ApiResponseDTO<T> {
    status: number;
    message: string;
    data: T;
    errors: unknown;
}