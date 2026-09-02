export interface PaginationDTO {
    page: number;
    size: number;
    total_elements: number;
    total_pages: number;
}

export interface ApiResponseDTO<T> {
    status: number;
    message: string;
    data: T;
    pagination: PaginationDTO | null;
    errors: unknown;
}