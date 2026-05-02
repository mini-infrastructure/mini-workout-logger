export interface MediaReadDTO {
    id: number;
    filename: string;
    content_type: string;
    size: number;
    data: string; // base64-encoded file content
}
