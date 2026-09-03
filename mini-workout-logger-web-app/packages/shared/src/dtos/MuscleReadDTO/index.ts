export interface MuscleReadDTO {
    id: number;
    code?: string;
    name: string;
    parent_code?: string;
    muscle_groups: MuscleReadDTO[];
}